import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { hashIP } from "../_shared/hash-ip.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VideoData {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  thumbnail: string;
  duration: number;
  videoUrl: string;
  videoUrlNoWatermark: string;
  musicUrl: string;
  musicTitle: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting - hash IP for privacy
    const rawIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                  req.headers.get('x-real-ip') || 
                  'unknown';
    const clientIP = await hashIP(rawIP);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const windowStart = new Date(Date.now() - 60 * 1000).toISOString();
    
    const { count } = await supabase
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .eq('endpoint', 'tiktok-download')
      .gte('window_start', windowStart);

    if ((count || 0) >= 15) {
      console.log('Rate limit exceeded for tiktok-download');
      return new Response(
        JSON.stringify({ success: false, error: 'Rate limit exceeded. Please wait a moment before trying again.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Track this request
    await supabase.from('rate_limits').insert({
      ip_address: clientIP,
      endpoint: 'tiktok-download',
      window_start: new Date().toISOString()
    });

    const body = await req.json();
    let url = body?.url;
    
    if (!url) {
      console.error('No URL provided');
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate URL is a string
    if (typeof url !== 'string') {
      console.error('URL is not a string, type:', typeof url);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid URL format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clean and trim the URL
    url = url.trim();
    
    // Validate TikTok URL - support various formats including vt.tiktok.com short links
    const tiktokRegex = /(?:https?:\/\/)?(?:www\.|m\.|vm\.|vt\.)?tiktok\.com/i;
    if (!tiktokRegex.test(url)) {
      console.error('Invalid TikTok URL pattern:', url);
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid TikTok URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clean URL by removing tracking parameters - keep only the essential video path
    // TikTok URLs with tracking can be 700+ chars, but the API only needs the base URL
    try {
      const urlObj = new URL(url);
      // Keep only essential params, remove tracking junk
      const essentialParams = ['video_id'];
      const newSearchParams = new URLSearchParams();
      essentialParams.forEach(param => {
        if (urlObj.searchParams.has(param)) {
          newSearchParams.set(param, urlObj.searchParams.get(param)!);
        }
      });
      // Reconstruct clean URL with just origin + pathname
      url = urlObj.origin + urlObj.pathname;
      console.log('Cleaned TikTok URL:', url);
    } catch (e) {
      // If URL parsing fails, continue with original (might be a short link)
      console.log('Could not parse URL, using as-is:', url.substring(0, 100));
    }

    console.log('Processing TikTok URL:', url);

    // Use TikWM API to get video data (free, no API key required)
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
    console.log('Fetching from TikWM API');
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      console.error('TikWM API error:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch video data. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('TikWM API response code:', data.code);

    if (data.code !== 0 || !data.data) {
      console.error('TikWM API returned error:', data.msg || 'Unknown error');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: data.msg || 'Could not fetch video. Make sure the URL is correct and the video is public.' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const videoData = data.data;
    console.log('Successfully fetched video:', videoData.title?.substring(0, 50));

    const result: VideoData = {
      id: videoData.id || '',
      title: videoData.title || 'TikTok Video',
      author: videoData.author?.nickname || videoData.author?.unique_id || 'Unknown',
      authorAvatar: videoData.author?.avatar || '',
      thumbnail: videoData.cover || videoData.origin_cover || '',
      duration: videoData.duration || 0,
      videoUrl: videoData.play || '',
      videoUrlNoWatermark: videoData.hdplay || videoData.play || '',
      musicUrl: videoData.music || '',
      musicTitle: videoData.music_info?.title || 'Original Sound'
    };

    console.log('Returning video data for:', result.author);

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing TikTok URL:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
