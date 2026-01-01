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

    // Try fdown.net API (proven working method)
    const result = await tryFdownNet(url);
    
    if (result) {
      console.log('Successfully fetched video:', result.title?.substring(0, 50));
      return new Response(
        JSON.stringify({ success: true, data: result }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Could not fetch video. Make sure the URL is correct and the video is public.' 
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
  const patterns = [
    /\/videos\/(\d+)/,
    /\/watch\/?\?v=(\d+)/,
    /\/reel\/(\d+)/,
    /story_fbid=(\d+)/,
    /\/(\d+)\/?$/,
    /\/r\/([A-Za-z0-9]+)/,
    /\/v\/([A-Za-z0-9]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return Date.now().toString();
}

async function tryFdownNet(url: string): Promise<VideoData | null> {
  try {
    console.log('Trying fdown.net API...');
    
    // Use fdown.net API - the proven working method
    const response = await fetch('https://fdown.net/download.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Origin': 'https://fdown.net',
        'Referer': 'https://fdown.net/',
      },
      body: `URLz=${encodeURIComponent(url)}`
    });

    if (!response.ok) {
      console.log('fdown.net response not OK:', response.status);
      return null;
    }

    const html = await response.text();
    console.log('fdown.net response length:', html.length);

    // Parse the HTML response to extract video links
    // Look for SD link (id="sdlink")
    const sdMatch = html.match(/id="sdlink"\s+href="([^"]+)"/i) ||
                    html.match(/id="sdlink"[^>]*href="([^"]+)"/i);
    
    // Look for HD link (id="hdlink")  
    const hdMatch = html.match(/id="hdlink"\s+href="([^"]+)"/i) ||
                    html.match(/id="hdlink"[^>]*href="([^"]+)"/i);

    // Extract cover photo
    const coverMatch = html.match(/class="lib-img-show"[^>]*src="([^"]+)"/i) ||
                       html.match(/lib-img-show[^>]*src="([^"]+)"/i);

    // Extract title
    const titleMatch = html.match(/class="lib-row lib-header"[^>]*>([^<]+)</i) ||
                       html.match(/lib-header[^>]*>([^<]+)</i);

    // Extract duration
    const durationMatch = html.match(/Duration:\s*([^<]+)</i);

    const sdUrl = sdMatch?.[1];
    const hdUrl = hdMatch?.[1];
    const videoUrl = hdUrl || sdUrl;

    if (videoUrl) {
      console.log('Found video URL from fdown.net, SD:', !!sdUrl, 'HD:', !!hdUrl);
      
      let title = titleMatch?.[1]?.trim() || 'Facebook Video';
      title = title.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'");
      
      const thumbnail = coverMatch?.[1] || '';
      const durationStr = durationMatch?.[1]?.trim() || '';
      
      // Parse duration to seconds
      let duration = 0;
      if (durationStr) {
        const timeParts = durationStr.match(/(\d+)/g);
        if (timeParts) {
          if (timeParts.length === 3) {
            duration = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
          } else if (timeParts.length === 2) {
            duration = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
          } else if (timeParts.length === 1) {
            duration = parseInt(timeParts[0]);
          }
        }
      }

      return {
        id: extractVideoId(url),
        title: title,
        author: 'Facebook User',
        authorAvatar: '',
        thumbnail: thumbnail,
        duration: duration,
        videoUrl: sdUrl || videoUrl,
        videoUrlNoWatermark: hdUrl || videoUrl,
        musicUrl: '',
        musicTitle: ''
      };
    }

    // Fallback: Try alternative pattern matching for different page layouts
    const altVideoMatch = html.match(/href="(https:\/\/[^"]*video[^"]*\.mp4[^"]*)"/i) ||
                          html.match(/href="(https:\/\/[^"]*fbcdn[^"]*video[^"]*)"/i);
    
    if (altVideoMatch?.[1]) {
      console.log('Found video URL from alternative pattern');
      return {
        id: extractVideoId(url),
        title: 'Facebook Video',
        author: 'Facebook User',
        authorAvatar: '',
        thumbnail: '',
        duration: 0,
        videoUrl: altVideoMatch[1],
        videoUrlNoWatermark: altVideoMatch[1],
        musicUrl: '',
        musicTitle: ''
      };
    }

    console.log('No video URL found in fdown.net response');
    
    // Debug: log a snippet of the response
    if (html.length > 0) {
      console.log('Response snippet:', html.substring(0, 500));
    }

  } catch (error) {
    console.error('fdown.net method failed:', error);
  }

  return null;
}
