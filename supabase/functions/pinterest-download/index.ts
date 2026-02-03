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
      .eq('endpoint', 'pinterest-download')
      .gte('window_start', windowStart);

    if ((count || 0) >= 15) {
      console.log('Rate limit exceeded for pinterest-download');
      return new Response(
        JSON.stringify({ success: false, error: 'Rate limit exceeded. Please wait a moment before trying again.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Track this request
    await supabase.from('rate_limits').insert({
      ip_address: clientIP,
      endpoint: 'pinterest-download',
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
    
    // Validate Pinterest URL - support various formats including pin.it short links
    const pinterestRegex = /(?:https?:\/\/)?(?:www\.|m\.)?(?:pinterest\.(?:com|co\.uk|ca|de|fr|es|it|jp|au|nz|at|ch|ru|nl|pl|pt|se|dk|no|fi|be|ie|mx|br|ar|cl|co)|pin\.it)/i;
    if (!pinterestRegex.test(url)) {
      console.error('Invalid Pinterest URL pattern:', url);
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid Pinterest URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing Pinterest URL:', url);

    // Fetch the Pinterest page directly
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Cache-Control': 'no-cache',
      },
      redirect: 'follow'
    });

    if (!response.ok) {
      console.error('Failed to fetch Pinterest page:', response.status);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch Pinterest content. Please check the URL.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = await response.text();
    
    // Extract video URL from various possible locations in the HTML
    let videoUrl = '';
    let thumbnail = '';
    let title = '';
    let author = '';
    let authorAvatar = '';
    let pinId = '';

    // Try to extract from __PWS_DATA__ JSON (Pinterest Web Service data)
    const pwsMatch = html.match(/<script[^>]*id="__PWS_DATA__"[^>]*>([^<]+)<\/script>/);
    if (pwsMatch) {
      try {
        const pwsData = JSON.parse(pwsMatch[1]);
        
        // Navigate through the data structure to find video info
        const resources = pwsData?.props?.initialReduxState?.resources || {};
        const pins = pwsData?.props?.initialReduxState?.pins || {};
        
        // Find pin data from resources or pins
        for (const key in resources) {
          const resource = resources[key];
          if (resource?.data?.videos?.video_list) {
            const videoList = resource.data.videos.video_list;
            // Get the highest quality video available
            const videoKey = Object.keys(videoList).find(k => 
              videoList[k]?.url && videoList[k].url.includes('.mp4')
            );
            if (videoKey) {
              videoUrl = videoList[videoKey].url;
              thumbnail = resource.data.images?.orig?.url || resource.data.images?.['736x']?.url || '';
              title = resource.data.title || resource.data.description || 'Pinterest Video';
              pinId = resource.data.id || '';
              
              // Get author info
              if (resource.data.pinner) {
                author = resource.data.pinner.username || resource.data.pinner.full_name || '';
                authorAvatar = resource.data.pinner.image_medium_url || '';
              }
              break;
            }
          }
        }
        
        // Also check pins object
        if (!videoUrl) {
          for (const key in pins) {
            const pin = pins[key];
            if (pin?.videos?.video_list) {
              const videoList = pin.videos.video_list;
              const videoKey = Object.keys(videoList).find(k => 
                videoList[k]?.url && videoList[k].url.includes('.mp4')
              );
              if (videoKey) {
                videoUrl = videoList[videoKey].url;
                thumbnail = pin.images?.orig?.url || pin.images?.['736x']?.url || '';
                title = pin.title || pin.description || 'Pinterest Video';
                pinId = pin.id || '';
                break;
              }
            }
          }
        }
      } catch (e) {
        console.log('Failed to parse PWS data:', e);
      }
    }

    // Try alternate method - look for video meta tags
    if (!videoUrl) {
      const videoMetaMatch = html.match(/<meta[^>]*property="og:video"[^>]*content="([^"]+)"/);
      if (videoMetaMatch) {
        videoUrl = videoMetaMatch[1];
      }
    }

    // Try to find video in embedded JSON-LD
    if (!videoUrl) {
      const jsonLdMatch = html.match(/<script type="application\/ld\+json"[^>]*>([^<]+)<\/script>/g);
      if (jsonLdMatch) {
        for (const match of jsonLdMatch) {
          try {
            const jsonContent = match.match(/>([^<]+)</)?.[1];
            if (jsonContent) {
              const jsonData = JSON.parse(jsonContent);
              if (jsonData.contentUrl) {
                videoUrl = jsonData.contentUrl;
                thumbnail = jsonData.thumbnailUrl || thumbnail;
                title = jsonData.name || title;
              }
            }
          } catch (e) {
            // Continue to next match
          }
        }
      }
    }

    // Get thumbnail from og:image if not found
    if (!thumbnail) {
      const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/);
      if (ogImageMatch) {
        thumbnail = ogImageMatch[1];
      }
    }

    // Get title from og:title if not found
    if (!title) {
      const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/);
      if (ogTitleMatch) {
        title = ogTitleMatch[1];
      }
    }

    // Extract pin ID from URL if not found
    if (!pinId) {
      const pinIdMatch = url.match(/pin\/(\d+)/);
      if (pinIdMatch) {
        pinId = pinIdMatch[1];
      }
    }

    if (!videoUrl) {
      console.error('No video found in Pinterest pin');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'No video found. Make sure this is a Pinterest video pin (not an image).' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Successfully found Pinterest video');

    const result: VideoData = {
      id: pinId || 'pinterest-' + Date.now(),
      title: title || 'Pinterest Video',
      author: author || 'Pinterest User',
      authorAvatar: authorAvatar || '',
      thumbnail: thumbnail || '',
      duration: 0,
      videoUrl: videoUrl,
      videoUrlNoWatermark: videoUrl, // Pinterest videos don't have watermarks
      musicUrl: '',
      musicTitle: ''
    };

    console.log('Returning video data for pin:', result.id);

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing Pinterest URL:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
