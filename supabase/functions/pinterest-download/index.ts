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

    // Step 1: Resolve short URLs (pin.it) to full URLs
    let resolvedUrl = url;
    if (url.includes('pin.it')) {
      console.log('Resolving short URL...');
      const shortResponse = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        }
      });
      resolvedUrl = shortResponse.url;
      console.log('Resolved to:', resolvedUrl);
    }

    // Step 2: Fetch the Pinterest page
    const response = await fetch(resolvedUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch Pinterest page:', response.status);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch Pinterest content. Please check the URL.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = await response.text();
    
    let videoUrl = '';
    let thumbnail = '';
    let title = '';
    let author = '';
    let pinId = '';

    // Method 1: Look for video tag with src attribute containing v1.pinimg.com
    // Pattern: <video ... src="https://v1.pinimg.com/videos/...m3u8" ...>
    const videoSrcMatch = html.match(/src="(https:\/\/v\d?\.pinimg\.com\/videos\/[^"]+)"/i);
    if (videoSrcMatch) {
      let extractedUrl = videoSrcMatch[1];
      console.log('Found video src:', extractedUrl);
      
      // Convert HLS (m3u8) to MP4 if needed
      if (extractedUrl.includes('hls') && extractedUrl.includes('.m3u8')) {
        videoUrl = extractedUrl.replace('/hls/', '/720p/').replace('.m3u8', '.mp4');
      } else if (extractedUrl.includes('.mp4')) {
        videoUrl = extractedUrl;
      } else {
        // Try to construct 720p mp4 URL
        videoUrl = extractedUrl.replace('hls', '720p').replace('m3u8', 'mp4');
      }
      console.log('Converted to MP4:', videoUrl);
    }

    // Method 2: Look for video in script data (PWS_DATA or initialReduxState)
    if (!videoUrl) {
      // Try to find video URLs in JSON data embedded in the page
      const jsonDataMatches = html.matchAll(/"(https:\/\/v\d?\.pinimg\.com\/videos\/[^"]+\.mp4[^"]*)"/g);
      for (const match of jsonDataMatches) {
        if (match[1]) {
          videoUrl = match[1].replace(/\\u002F/g, '/');
          console.log('Found video URL in JSON data:', videoUrl);
          break;
        }
      }
    }

    // Method 3: Look for video_list in JSON with V_720P or similar quality markers
    if (!videoUrl) {
      const v720Match = html.match(/"V_720P":\s*\{[^}]*"url":\s*"([^"]+)"/);
      if (v720Match) {
        videoUrl = v720Match[1].replace(/\\u002F/g, '/');
        console.log('Found V_720P video:', videoUrl);
      }
    }

    // Method 4: Look for any video URL pattern in the page
    if (!videoUrl) {
      const anyVideoMatch = html.match(/https:\/\/v\d?\.pinimg\.com\/videos\/mc\/720p\/[^"'\s]+\.mp4/);
      if (anyVideoMatch) {
        videoUrl = anyVideoMatch[0];
        console.log('Found video URL pattern:', videoUrl);
      }
    }

    // Get thumbnail from og:image
    const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/);
    if (ogImageMatch) {
      thumbnail = ogImageMatch[1];
    }

    // Get title from og:title or title tag
    const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/);
    if (ogTitleMatch) {
      title = ogTitleMatch[1];
    } else {
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/);
      if (titleMatch) {
        title = titleMatch[1];
      }
    }

    // Extract pin ID from URL
    const pinIdMatch = resolvedUrl.match(/pin\/(\d+)/);
    if (pinIdMatch) {
      pinId = pinIdMatch[1];
    }

    // Try to get author from the page
    const authorMatch = html.match(/"username":\s*"([^"]+)"/);
    if (authorMatch) {
      author = authorMatch[1];
    }

    if (!videoUrl) {
      console.error('No video found in Pinterest pin. HTML length:', html.length);
      // Log a snippet of HTML for debugging
      console.log('HTML snippet:', html.substring(0, 1000));
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'No video found. Make sure this is a Pinterest video pin (not an image or Idea Pin).' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Successfully found Pinterest video');

    const result: VideoData = {
      id: pinId || 'pinterest-' + Date.now(),
      title: title || 'Pinterest Video',
      author: author || 'Pinterest User',
      authorAvatar: '',
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
