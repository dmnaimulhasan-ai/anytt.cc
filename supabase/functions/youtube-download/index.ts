import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    // Rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const windowStart = new Date(Date.now() - 60 * 1000).toISOString();
    
    const { count } = await supabase
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .eq('endpoint', 'youtube-download')
      .gte('window_start', windowStart);

    if ((count || 0) >= 10) {
      console.log('Rate limit exceeded for youtube-download, IP:', clientIP);
      return new Response(
        JSON.stringify({ success: false, error: 'Rate limit exceeded. Please wait a moment before trying again.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Track this request
    await supabase.from('rate_limits').insert({
      ip_address: clientIP,
      endpoint: 'youtube-download',
      window_start: new Date().toISOString()
    });

    const { url } = await req.json();
    
    if (!url) {
      console.error('No URL provided');
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate URL is a string and not too long
    if (typeof url !== 'string' || url.length > 500) {
      console.error('Invalid URL format');
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid URL format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing YouTube URL:', url.substring(0, 100));

    // Validate YouTube URL
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)/i;
    if (!youtubeRegex.test(url)) {
      console.error('Invalid YouTube URL:', url.substring(0, 50));
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid YouTube URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract video ID from URL
    let videoId = '';
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        videoId = match[1];
        break;
      }
    }

    if (!videoId) {
      console.error('Could not extract video ID from URL:', url.substring(0, 50));
      return new Response(
        JSON.stringify({ success: false, error: 'Could not extract video ID from URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Extracted video ID:', videoId);

    // Use free noembed proxy service (more reliable from edge functions)
    console.log('Fetching video info for:', videoId);
    
    const noembedUrl = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;
    const response = await fetch(noembedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      console.error('Noembed failed:', response.status);
      // Fallback to basic info
      const result: VideoData = {
        id: videoId,
        title: 'YouTube Video',
        author: 'Unknown',
        authorAvatar: '',
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        duration: 0,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        videoUrlNoWatermark: `https://www.youtube.com/watch?v=${videoId}`,
        musicUrl: '',
        musicTitle: ''
      };
      return new Response(
        JSON.stringify({ success: true, data: result }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const data = await response.json();
    console.log('Got noembed data for:', data.title);
    
    // Check for error in response
    if (data.error) {
      // noembed sometimes blocks edge runtimes (e.g. returns "401 Unauthorized"); don't hard-fail the UX.
      console.error('Noembed error:', data.error);
      const fallback: VideoData = {
        id: videoId,
        title: 'YouTube Video',
        author: 'Unknown',
        authorAvatar: '',
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        duration: 0,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        videoUrlNoWatermark: `https://www.youtube.com/watch?v=${videoId}`,
        musicUrl: '',
        musicTitle: ''
      };
      return new Response(
        JSON.stringify({ success: true, data: fallback, note: `Metadata provider error: ${String(data.error)}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const result: VideoData = {
      id: videoId,
      title: data.title || 'YouTube Video',
      author: data.author_name || 'Unknown',
      authorAvatar: '',
      thumbnail: data.thumbnail_url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      duration: 0,
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      videoUrlNoWatermark: `https://www.youtube.com/watch?v=${videoId}`,
      musicUrl: '',
      musicTitle: ''
    };

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing YouTube URL:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
