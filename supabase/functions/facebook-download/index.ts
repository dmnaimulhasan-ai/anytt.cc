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

    // Try RapidAPI Facebook Video Downloader (free tier available)
    const result = await tryFacebookDownload(url);
    
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

async function tryFacebookDownload(url: string): Promise<VideoData | null> {
  // Method 1: Try FBDown API
  try {
    console.log('Trying FBDown API...');
    const fbdownResponse = await fetch('https://www.getfvid.com/downloader', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Origin': 'https://www.getfvid.com',
        'Referer': 'https://www.getfvid.com/',
      },
      body: `url=${encodeURIComponent(url)}`
    });

    if (fbdownResponse.ok) {
      const html = await fbdownResponse.text();
      console.log('GetFVid response length:', html.length);
      
      // Parse download links from HTML
      const hdMatch = html.match(/href="(https:\/\/[^"]*fbcdn[^"]*)"[^>]*>.*?HD/is) ||
                      html.match(/class="btn[^"]*"[^>]*href="(https:\/\/[^"]*fbcdn[^"]*)"/i);
      const sdMatch = html.match(/href="(https:\/\/[^"]*fbcdn[^"]*)"[^>]*>.*?SD/is) ||
                      html.match(/class="btn[^"]*"[^>]*href="(https:\/\/[^"]*fbcdn[^"]*)"[^>]*>.*?Normal/is);
      
      const videoUrl = hdMatch?.[1] || sdMatch?.[1];
      
      if (videoUrl) {
        console.log('Found video URL from GetFVid');
        return {
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
      }
    }
  } catch (error) {
    console.log('GetFVid method failed:', error);
  }

  // Method 2: Try SaveFrom-style API
  try {
    console.log('Trying SaveFrom API...');
    const saveFromResponse = await fetch(`https://api.savefrom.biz/api/convert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({ url })
    });

    if (saveFromResponse.ok) {
      const data = await saveFromResponse.json();
      console.log('SaveFrom response:', JSON.stringify(data).substring(0, 200));
      
      if (data.url || data.urls || data.medias) {
        const videoUrl = data.url || data.urls?.[0]?.url || data.medias?.[0]?.url;
        const hdUrl = data.urls?.find((u: any) => u.quality?.includes('HD') || u.quality?.includes('720'))?.url;
        
        if (videoUrl) {
          return {
            id: extractVideoId(url),
            title: data.title || 'Facebook Video',
            author: data.author || 'Facebook User',
            authorAvatar: '',
            thumbnail: data.thumbnail || data.thumb || '',
            duration: data.duration || 0,
            videoUrl: videoUrl,
            videoUrlNoWatermark: hdUrl || videoUrl,
            musicUrl: '',
            musicTitle: ''
          };
        }
      }
    }
  } catch (error) {
    console.log('SaveFrom method failed:', error);
  }

  // Method 3: Direct Facebook graph scraping
  try {
    console.log('Trying direct Facebook fetch...');
    const fbResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      redirect: 'follow'
    });

    if (fbResponse.ok) {
      const html = await fbResponse.text();
      console.log('Facebook page length:', html.length);
      
      // Try to find video URLs in the page source
      const hdVideoMatch = html.match(/"playable_url_quality_hd"\s*:\s*"([^"]+)"/i) ||
                           html.match(/hd_src\s*:\s*"([^"]+)"/i) ||
                           html.match(/"hd_src"\s*:\s*"([^"]+)"/i);
      
      const sdVideoMatch = html.match(/"playable_url"\s*:\s*"([^"]+)"/i) ||
                           html.match(/sd_src\s*:\s*"([^"]+)"/i) ||
                           html.match(/"sd_src"\s*:\s*"([^"]+)"/i);
      
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i) ||
                         html.match(/"title"\s*:\s*"([^"]+)"/i);
      
      const thumbMatch = html.match(/"thumbnailUrl"\s*:\s*"([^"]+)"/i) ||
                         html.match(/"thumbnail"\s*:\s*\{\s*"uri"\s*:\s*"([^"]+)"/i);
      
      let hdUrl = hdVideoMatch?.[1];
      let sdUrl = sdVideoMatch?.[1];
      
      // Unescape URLs
      if (hdUrl) hdUrl = hdUrl.replace(/\\u0025/g, '%').replace(/\\\//g, '/').replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
      if (sdUrl) sdUrl = sdUrl.replace(/\\u0025/g, '%').replace(/\\\//g, '/').replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
      
      const videoUrl = hdUrl || sdUrl;
      
      if (videoUrl) {
        console.log('Found video URL from direct scrape');
        let title = titleMatch?.[1] || 'Facebook Video';
        title = title.replace(/\s*\|\s*Facebook\s*$/, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
        
        let thumbnail = thumbMatch?.[1];
        if (thumbnail) thumbnail = thumbnail.replace(/\\\//g, '/');
        
        return {
          id: extractVideoId(url),
          title: title,
          author: 'Facebook User',
          authorAvatar: '',
          thumbnail: thumbnail || '',
          duration: 0,
          videoUrl: sdUrl || videoUrl,
          videoUrlNoWatermark: hdUrl || videoUrl,
          musicUrl: '',
          musicTitle: ''
        };
      }
    }
  } catch (error) {
    console.log('Direct Facebook fetch failed:', error);
  }

  // Method 4: Try fbdownloader.app API
  try {
    console.log('Trying fbdownloader.app API...');
    const response = await fetch('https://v3.fbdownloader.app/api/ajaxSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Origin': 'https://fbdownloader.app',
        'Referer': 'https://fbdownloader.app/',
      },
      body: `q=${encodeURIComponent(url)}`
    });

    if (response.ok) {
      const data = await response.json();
      console.log('fbdownloader.app response status:', data.status);
      
      if (data.status === 'ok' && data.links) {
        const hdLink = data.links.find((l: any) => l.quality === 'HD' || l.quality === '720p');
        const sdLink = data.links.find((l: any) => l.quality === 'SD' || l.quality === '360p') || data.links[0];
        
        if (hdLink?.url || sdLink?.url) {
          return {
            id: extractVideoId(url),
            title: data.title || 'Facebook Video',
            author: data.author || 'Facebook User',
            authorAvatar: '',
            thumbnail: data.thumbnail || '',
            duration: data.duration || 0,
            videoUrl: sdLink?.url || hdLink?.url,
            videoUrlNoWatermark: hdLink?.url || sdLink?.url,
            musicUrl: '',
            musicTitle: ''
          };
        }
      }
    }
  } catch (error) {
    console.log('fbdownloader.app method failed:', error);
  }

  console.log('All methods failed');
  return null;
}
