import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { url } = await req.json();
    
    if (!url) {
      console.error('No URL provided');
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing Facebook URL:', url);

    // Validate Facebook URL
    const facebookRegex = /(?:https?:\/\/)?(?:www\.|m\.|web\.|mbasic\.)?(?:facebook\.com|fb\.watch|fb\.com)/i;
    if (!facebookRegex.test(url)) {
      console.error('Invalid Facebook URL:', url);
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid Facebook URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use a free Facebook video download API
    const apiUrl = `https://www.fdownloader.net/api/ajaxSearch`;
    console.log('Fetching from FDownloader API');
    
    const formData = new URLSearchParams();
    formData.append('q', url);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Origin': 'https://www.fdownloader.net',
        'Referer': 'https://www.fdownloader.net/',
      },
      body: formData.toString()
    });

    if (!response.ok) {
      console.error('FDownloader API error:', response.status, response.statusText);
      
      // Try alternative API
      return await tryAlternativeApi(url, corsHeaders);
    }

    const data = await response.json();
    console.log('FDownloader API response status:', data.status);

    if (data.status !== 'ok' || !data.links) {
      console.log('Trying alternative API...');
      return await tryAlternativeApi(url, corsHeaders);
    }

    // Parse the response to extract video URLs
    const hdLink = data.links?.find((l: any) => l.quality === 'HD' || l.quality === '720p') || data.links?.[0];
    const sdLink = data.links?.find((l: any) => l.quality === 'SD' || l.quality === '360p');

    const result: VideoData = {
      id: extractVideoId(url),
      title: data.title || 'Facebook Video',
      author: data.author || 'Facebook User',
      authorAvatar: '',
      thumbnail: data.thumbnail || '',
      duration: data.duration || 0,
      videoUrl: sdLink?.url || hdLink?.url || '',
      videoUrlNoWatermark: hdLink?.url || sdLink?.url || '',
      musicUrl: '',
      musicTitle: ''
    };

    if (!result.videoUrl) {
      console.log('No video URL found, trying alternative...');
      return await tryAlternativeApi(url, corsHeaders);
    }

    console.log('Returning video data for:', result.title?.substring(0, 50));

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing Facebook URL:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function extractVideoId(url: string): string {
  // Extract video ID from various Facebook URL formats
  const patterns = [
    /\/videos\/(\d+)/,
    /\/watch\/?\?v=(\d+)/,
    /\/reel\/(\d+)/,
    /story_fbid=(\d+)/,
    /\/(\d+)\/?$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return Date.now().toString();
}

async function tryAlternativeApi(url: string, corsHeaders: Record<string, string>) {
  try {
    console.log('Trying alternative GetFVid API...');
    
    // Try GetFVid API
    const apiUrl = 'https://getfvid.com/api/v1/fb';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({ url })
    });

    if (response.ok) {
      const data = await response.json();
      
      if (data.success && (data.hd || data.sd)) {
        const result: VideoData = {
          id: extractVideoId(url),
          title: data.title || 'Facebook Video',
          author: data.author || 'Facebook User',
          authorAvatar: '',
          thumbnail: data.thumbnail || '',
          duration: 0,
          videoUrl: data.sd || data.hd || '',
          videoUrlNoWatermark: data.hd || data.sd || '',
          musicUrl: '',
          musicTitle: ''
        };

        return new Response(
          JSON.stringify({ success: true, data: result }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Try SnapSave API
    console.log('Trying SnapSave API...');
    const snapSaveResponse = await fetch('https://snapsave.app/action.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Origin': 'https://snapsave.app',
        'Referer': 'https://snapsave.app/',
      },
      body: `url=${encodeURIComponent(url)}`
    });

    if (snapSaveResponse.ok) {
      const html = await snapSaveResponse.text();
      
      // Parse video URLs from response
      const hdMatch = html.match(/href="(https:\/\/[^"]+)"\s*[^>]*>\s*(?:HD|1080p|720p)/i);
      const sdMatch = html.match(/href="(https:\/\/[^"]+)"\s*[^>]*>\s*(?:SD|480p|360p)/i);
      const anyMatch = html.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/i);
      
      const videoUrl = hdMatch?.[1] || sdMatch?.[1] || anyMatch?.[1];
      
      if (videoUrl) {
        const result: VideoData = {
          id: extractVideoId(url),
          title: 'Facebook Video',
          author: 'Facebook User',
          authorAvatar: '',
          thumbnail: '',
          duration: 0,
          videoUrl: sdMatch?.[1] || videoUrl,
          videoUrlNoWatermark: hdMatch?.[1] || videoUrl,
          musicUrl: '',
          musicTitle: ''
        };

        return new Response(
          JSON.stringify({ success: true, data: result }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // All APIs failed
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Could not fetch video. Make sure the URL is correct and the video is public.' 
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Alternative API error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Could not fetch video. Please try again later.' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
