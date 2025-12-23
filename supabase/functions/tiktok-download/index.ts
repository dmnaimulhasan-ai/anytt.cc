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
  platform: string;
}

type Platform = 'tiktok' | 'instagram' | 'facebook' | 'youtube' | 'twitter' | 'snapchat';

function detectPlatform(url: string): Platform | null {
  const patterns: Record<Platform, RegExp> = {
    tiktok: /(?:tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)/i,
    instagram: /(?:instagram\.com|instagr\.am)/i,
    facebook: /(?:facebook\.com|fb\.watch|fb\.com)/i,
    youtube: /(?:youtube\.com|youtu\.be|youtube\.shorts)/i,
    twitter: /(?:twitter\.com|x\.com|t\.co)/i,
    snapchat: /(?:snapchat\.com|snap\.com)/i,
  };

  for (const [platform, regex] of Object.entries(patterns)) {
    if (regex.test(url)) {
      return platform as Platform;
    }
  }
  return null;
}

async function fetchTikTok(url: string): Promise<VideoData> {
  const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
  console.log('Fetching TikTok from TikWM API:', apiUrl);
  
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch TikTok video');
  }

  const data = await response.json();
  if (data.code !== 0 || !data.data) {
    throw new Error(data.msg || 'Could not fetch TikTok video');
  }

  const videoData = data.data;
  return {
    id: videoData.id || '',
    title: videoData.title || 'TikTok Video',
    author: videoData.author?.nickname || videoData.author?.unique_id || 'Unknown',
    authorAvatar: videoData.author?.avatar || '',
    thumbnail: videoData.cover || videoData.origin_cover || '',
    duration: videoData.duration || 0,
    videoUrl: videoData.play || '',
    videoUrlNoWatermark: videoData.hdplay || videoData.play || '',
    musicUrl: videoData.music || '',
    musicTitle: videoData.music_info?.title || 'Original Sound',
    platform: 'tiktok'
  };
}

async function fetchInstagram(url: string): Promise<VideoData> {
  console.log('Fetching Instagram:', url);
  
  // Approach 1: Try SnapInsta API
  try {
    const apiUrl = 'https://snapinsta.app/api/ajaxSearch';
    const formData = new URLSearchParams();
    formData.append('q', url);
    formData.append('t', 'media');
    formData.append('lang', 'en');
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Origin': 'https://snapinsta.app',
        'Referer': 'https://snapinsta.app/'
      },
      body: formData.toString()
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('SnapInsta response received');
      
      if (data.data) {
        const htmlContent = data.data;
        const videoMatch = htmlContent.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/i) ||
                          htmlContent.match(/href="(https:\/\/[^"]+)"/i);
        const thumbMatch = htmlContent.match(/src="(https:\/\/[^"]+\.jpg[^"]*)"/i);
        
        if (videoMatch && videoMatch[1]) {
          return {
            id: Date.now().toString(),
            title: 'Instagram Reel',
            author: 'Instagram User',
            authorAvatar: '',
            thumbnail: thumbMatch ? thumbMatch[1] : '',
            duration: 0,
            videoUrl: videoMatch[1],
            videoUrlNoWatermark: videoMatch[1],
            musicUrl: '',
            musicTitle: '',
            platform: 'instagram'
          };
        }
      }
    }
  } catch (err) {
    console.log('SnapInsta failed:', err);
  }

  // Approach 2: Try SaveIG API
  try {
    const fallbackUrl = 'https://www.saveig.app/api/ajaxSearch';
    const formData = new URLSearchParams();
    formData.append('q', url);
    formData.append('t', 'media');
    formData.append('lang', 'en');
    
    const fallbackResponse = await fetch(fallbackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: formData.toString()
    });
    
    if (fallbackResponse.ok) {
      const fallbackData = await fallbackResponse.json();
      if (fallbackData.data) {
        const htmlContent = fallbackData.data;
        const videoMatch = htmlContent.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/);
        const thumbMatch = htmlContent.match(/src="(https:\/\/[^"]+\.jpg[^"]*)"/);
        
        if (videoMatch && videoMatch[1]) {
          return {
            id: Date.now().toString(),
            title: 'Instagram Reel',
            author: 'Instagram User',
            authorAvatar: '',
            thumbnail: thumbMatch ? thumbMatch[1] : '',
            duration: 0,
            videoUrl: videoMatch[1],
            videoUrlNoWatermark: videoMatch[1],
            musicUrl: '',
            musicTitle: '',
            platform: 'instagram'
          };
        }
      }
    }
  } catch (err) {
    console.log('SaveIG failed:', err);
  }

  // Approach 3: Try direct page scraping
  try {
    const pageResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (pageResponse.ok) {
      const html = await pageResponse.text();
      
      // Look for video URLs
      const videoMatch = html.match(/"video_url":"([^"]+)"/i) ||
                        html.match(/property="og:video"[^>]*content="([^"]+)"/i) ||
                        html.match(/https:\/\/[^"'\s]*?\.mp4[^"'\s]*/gi);
      
      if (videoMatch) {
        const videoUrl = (Array.isArray(videoMatch) ? videoMatch[0] : videoMatch[1]).replace(/\\/g, '');
        
        // Get thumbnail
        const thumbMatch = html.match(/property="og:image"[^>]*content="([^"]+)"/i);
        
        return {
          id: Date.now().toString(),
          title: 'Instagram Content',
          author: 'Instagram User',
          authorAvatar: '',
          thumbnail: thumbMatch ? thumbMatch[1] : '',
          duration: 0,
          videoUrl: videoUrl,
          videoUrlNoWatermark: videoUrl,
          musicUrl: '',
          musicTitle: '',
          platform: 'instagram'
        };
      }
    }
  } catch (err) {
    console.log('Direct scraping failed:', err);
  }

  throw new Error('Could not extract Instagram content. Make sure the post is public and the URL is correct.');
}

async function fetchYouTube(url: string): Promise<VideoData> {
  // Extract video ID
  let videoId = '';
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      videoId = match[1];
      break;
    }
  }
  
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  console.log('Fetching YouTube video ID:', videoId);
  
  // Approach 1: Try ssyoutube API
  try {
    const apiUrl = 'https://ssyoutube.com/api/ajaxSearch/index';
    const formData = new URLSearchParams();
    formData.append('query', url);
    formData.append('vt', 'mp4');
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Origin': 'https://ssyoutube.com',
        'Referer': 'https://ssyoutube.com/'
      },
      body: formData.toString()
    });

    if (response.ok) {
      const data = await response.json();
      console.log('SSYouTube response:', data.status);
      
      if (data.status === 'ok' && data.links) {
        // Find the best quality MP4
        const mp4Links = data.links.mp4 || {};
        const qualities = Object.keys(mp4Links).sort((a, b) => parseInt(b) - parseInt(a));
        
        if (qualities.length > 0) {
          const bestQuality = mp4Links[qualities[0]];
          return {
            id: videoId,
            title: data.title || 'YouTube Video',
            author: data.a || 'YouTube Creator',
            authorAvatar: '',
            thumbnail: data.thumb || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
            duration: 0,
            videoUrl: bestQuality.k || bestQuality,
            videoUrlNoWatermark: bestQuality.k || bestQuality,
            musicUrl: '',
            musicTitle: '',
            platform: 'youtube'
          };
        }
      }
    }
  } catch (err) {
    console.log('SSYouTube failed:', err);
  }

  // Approach 2: Try y2save API
  try {
    const apiUrl = 'https://www.y2save.com/api/ajaxSearch/index';
    const formData = new URLSearchParams();
    formData.append('query', url);
    formData.append('vt', 'mp4');
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: formData.toString()
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Y2Save response:', data.status);
      
      if (data.status === 'ok' && data.links) {
        const mp4Links = data.links.mp4 || {};
        const qualities = Object.keys(mp4Links).sort((a, b) => parseInt(b) - parseInt(a));
        
        if (qualities.length > 0) {
          const bestQuality = mp4Links[qualities[0]];
          return {
            id: videoId,
            title: data.title || 'YouTube Video',
            author: data.a || 'YouTube Creator',
            authorAvatar: '',
            thumbnail: data.thumb || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
            duration: 0,
            videoUrl: bestQuality.k || bestQuality,
            videoUrlNoWatermark: bestQuality.k || bestQuality,
            musicUrl: '',
            musicTitle: '',
            platform: 'youtube'
          };
        }
      }
    }
  } catch (err) {
    console.log('Y2Save failed:', err);
  }

  // Approach 3: Return embed URL with basic info (user can watch/save from YouTube)
  // This is a fallback that at least shows the video info
  try {
    // Fetch video page for title/metadata
    const pageResponse = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      method: 'GET',
      headers: {
        'Accept': 'text/html',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (pageResponse.ok) {
      const html = await pageResponse.text();
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const authorMatch = html.match(/"ownerChannelName":"([^"]+)"/i);
      
      // Note: This returns the YouTube watch URL since direct download requires more complex extraction
      return {
        id: videoId,
        title: titleMatch ? titleMatch[1].replace(' - YouTube', '').trim() : 'YouTube Video',
        author: authorMatch ? authorMatch[1] : 'YouTube Creator',
        authorAvatar: '',
        thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        duration: 0,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        videoUrlNoWatermark: `https://www.youtube.com/embed/${videoId}`,
        musicUrl: '',
        musicTitle: '',
        platform: 'youtube'
      };
    }
  } catch (err) {
    console.log('YouTube page fetch failed:', err);
  }

  // Final fallback with basic info
  return {
    id: videoId,
    title: 'YouTube Video',
    author: 'YouTube Creator',
    authorAvatar: '',
    thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    duration: 0,
    videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
    videoUrlNoWatermark: `https://www.youtube.com/embed/${videoId}`,
    musicUrl: '',
    musicTitle: '',
    platform: 'youtube'
  };
}

async function fetchTwitter(url: string): Promise<VideoData> {
  console.log('Fetching Twitter/X:', url);
  
  // Using Twitter video download API
  const apiUrl = `https://twitsave.com/info?url=${encodeURIComponent(url)}`;
  
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Accept': 'text/html',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Twitter/X video');
  }

  const html = await response.text();
  
  // Parse the HTML to find video URLs
  const videoMatch = html.match(/href="(https:\/\/[^"]*video[^"]*\.mp4[^"]*)"/i);
  const thumbMatch = html.match(/poster="([^"]+)"/);
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  
  if (!videoMatch) {
    throw new Error('No video found in this tweet');
  }
  
  return {
    id: Date.now().toString(),
    title: titleMatch ? titleMatch[1].replace(' - TwitSave', '').trim() : 'Twitter/X Video',
    author: 'Twitter User',
    authorAvatar: '',
    thumbnail: thumbMatch ? thumbMatch[1] : '',
    duration: 0,
    videoUrl: videoMatch[1],
    videoUrlNoWatermark: videoMatch[1],
    musicUrl: '',
    musicTitle: '',
    platform: 'twitter'
  };
}

async function fetchFacebook(url: string): Promise<VideoData> {
  console.log('Fetching Facebook:', url);
  
  // Try multiple approaches for Facebook video extraction
  
  // Approach 1: Direct page scraping
  try {
    const pageResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    if (pageResponse.ok) {
      const html = await pageResponse.text();
      console.log('Facebook page fetched, searching for video URLs...');
      
      // Look for video URLs in the page source
      // Pattern 1: HD video URL in JSON data
      const hdMatch = html.match(/"hd_src":"([^"]+)"/i) || 
                      html.match(/hd_src\\?":\\?"([^"\\]+)/i) ||
                      html.match(/"playable_url_quality_hd":"([^"]+)"/i);
      
      // Pattern 2: SD video URL in JSON data
      const sdMatch = html.match(/"sd_src":"([^"]+)"/i) || 
                      html.match(/sd_src\\?":\\?"([^"\\]+)/i) ||
                      html.match(/"playable_url":"([^"]+)"/i);
      
      // Pattern 3: Direct video URL
      const directMatch = html.match(/https:\/\/[^"'\s]*?\.mp4[^"'\s]*/gi);
      
      let videoUrl = '';
      
      if (hdMatch && hdMatch[1]) {
        videoUrl = hdMatch[1].replace(/\\/g, '');
        console.log('Found HD video URL');
      } else if (sdMatch && sdMatch[1]) {
        videoUrl = sdMatch[1].replace(/\\/g, '');
        console.log('Found SD video URL');
      } else if (directMatch && directMatch[0]) {
        videoUrl = directMatch[0];
        console.log('Found direct video URL');
      }
      
      // Extract title
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i) ||
                        html.match(/"title":"([^"]+)"/i);
      
      if (videoUrl) {
        // Decode URL entities
        videoUrl = videoUrl.replace(/&amp;/g, '&').replace(/\\u0025/g, '%');
        
        return {
          id: Date.now().toString(),
          title: titleMatch ? titleMatch[1].replace(' | Facebook', '').trim() : 'Facebook Video',
          author: 'Facebook User',
          authorAvatar: '',
          thumbnail: '',
          duration: 0,
          videoUrl: videoUrl,
          videoUrlNoWatermark: videoUrl,
          musicUrl: '',
          musicTitle: '',
          platform: 'facebook'
        };
      }
    }
  } catch (err) {
    console.log('Direct scraping failed:', err);
  }

  // Approach 2: Try FBDown.net API
  try {
    const apiUrl = 'https://fbdown.net/api.php';
    const formData = new URLSearchParams();
    formData.append('url', url);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Origin': 'https://fbdown.net',
        'Referer': 'https://fbdown.net/'
      },
      body: formData.toString()
    });

    if (response.ok) {
      const data = await response.json();
      console.log('FBDown API response:', JSON.stringify(data).substring(0, 200));
      
      if (data.hd || data.sd || data.url) {
        return {
          id: Date.now().toString(),
          title: data.title || 'Facebook Video',
          author: 'Facebook User',
          authorAvatar: '',
          thumbnail: data.thumb || '',
          duration: 0,
          videoUrl: data.hd || data.sd || data.url,
          videoUrlNoWatermark: data.hd || data.sd || data.url,
          musicUrl: '',
          musicTitle: '',
          platform: 'facebook'
        };
      }
    }
  } catch (err) {
    console.log('FBDown API failed:', err);
  }

  // Approach 3: Try snapsave.app
  try {
    const apiUrl = 'https://snapsave.app/api/ajaxSearch';
    const formData = new URLSearchParams();
    formData.append('q', url);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: formData.toString()
    });

    if (response.ok) {
      const data = await response.json();
      console.log('SnapSave response received');
      
      if (data.data) {
        // Parse the HTML response
        const htmlContent = data.data;
        const videoMatch = htmlContent.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/i) ||
                          htmlContent.match(/href="(https:\/\/[^"]+)"/i);
        
        if (videoMatch && videoMatch[1]) {
          return {
            id: Date.now().toString(),
            title: 'Facebook Video',
            author: 'Facebook User',
            authorAvatar: '',
            thumbnail: '',
            duration: 0,
            videoUrl: videoMatch[1],
            videoUrlNoWatermark: videoMatch[1],
            musicUrl: '',
            musicTitle: '',
            platform: 'facebook'
          };
        }
      }
    }
  } catch (err) {
    console.log('SnapSave API failed:', err);
  }

  throw new Error('Could not extract Facebook video. Make sure the video is public and the URL is correct.');
}

async function fetchSnapchat(url: string): Promise<VideoData> {
  console.log('Fetching Snapchat:', url);
  
  // Approach 1: Try direct page scraping for Snapchat Spotlight/Stories
  try {
    const pageResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (pageResponse.ok) {
      const html = await pageResponse.text();
      
      // Look for video URLs in meta tags or JSON data
      const videoMatch = html.match(/property="og:video"[^>]*content="([^"]+)"/i) ||
                        html.match(/"video[Uu]rl":"([^"]+)"/i) ||
                        html.match(/https:\/\/[^"'\s]*?(?:cf-st\.sc-cdn\.net|snapchat)[^"'\s]*?\.mp4[^"'\s]*/gi);
      
      const thumbMatch = html.match(/property="og:image"[^>]*content="([^"]+)"/i);
      const titleMatch = html.match(/property="og:title"[^>]*content="([^"]+)"/i);
      
      if (videoMatch) {
        const videoUrl = (Array.isArray(videoMatch) ? videoMatch[0] : videoMatch[1]).replace(/\\/g, '');
        
        return {
          id: Date.now().toString(),
          title: titleMatch ? titleMatch[1] : 'Snapchat Story',
          author: 'Snapchat User',
          authorAvatar: '',
          thumbnail: thumbMatch ? thumbMatch[1] : '',
          duration: 0,
          videoUrl: videoUrl,
          videoUrlNoWatermark: videoUrl,
          musicUrl: '',
          musicTitle: '',
          platform: 'snapchat'
        };
      }
    }
  } catch (err) {
    console.log('Direct Snapchat scraping failed:', err);
  }

  // Approach 2: Try snapsave.app API
  try {
    const apiUrl = 'https://snapsave.app/api/ajaxSearch';
    const formData = new URLSearchParams();
    formData.append('q', url);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: formData.toString()
    });

    if (response.ok) {
      const data = await response.json();
      
      if (data.data) {
        const videoMatch = data.data.match(/href="(https:\/\/[^"]+)"/);
        
        if (videoMatch && videoMatch[1]) {
          return {
            id: Date.now().toString(),
            title: 'Snapchat Story',
            author: 'Snapchat User',
            authorAvatar: '',
            thumbnail: '',
            duration: 0,
            videoUrl: videoMatch[1],
            videoUrlNoWatermark: videoMatch[1],
            musicUrl: '',
            musicTitle: '',
            platform: 'snapchat'
          };
        }
      }
    }
  } catch (err) {
    console.log('SnapSave API failed:', err);
  }

  throw new Error('Could not extract Snapchat content. Make sure the story/spotlight is public.');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, platform: forcePlatform } = await req.json();
    
    if (!url) {
      console.error('No URL provided');
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Auto-detect platform or use forced platform
    const platform = forcePlatform || detectPlatform(url);
    console.log('Processing URL for platform:', platform, 'URL:', url);

    if (!platform) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Unsupported platform. We support TikTok, Instagram, Facebook, YouTube, Twitter/X, and Snapchat.' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let result: VideoData;

    switch (platform) {
      case 'tiktok':
        result = await fetchTikTok(url);
        break;
      case 'instagram':
        result = await fetchInstagram(url);
        break;
      case 'youtube':
        result = await fetchYouTube(url);
        break;
      case 'twitter':
        result = await fetchTwitter(url);
        break;
      case 'facebook':
        result = await fetchFacebook(url);
        break;
      case 'snapchat':
        result = await fetchSnapchat(url);
        break;
      default:
        throw new Error('Platform not supported');
    }

    console.log('Successfully fetched video for:', result.platform, result.title?.substring(0, 50));

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing URL:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
