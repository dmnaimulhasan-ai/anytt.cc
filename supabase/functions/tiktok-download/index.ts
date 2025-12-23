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
  // Using a free Instagram API
  const apiUrl = `https://api.saveig.app/api/v1/media?url=${encodeURIComponent(url)}`;
  console.log('Fetching Instagram:', apiUrl);
  
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  if (!response.ok) {
    // Fallback API
    const fallbackUrl = `https://www.saveig.app/api/ajaxSearch`;
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
    
    if (!fallbackResponse.ok) {
      throw new Error('Failed to fetch Instagram content');
    }
    
    const fallbackData = await fallbackResponse.json();
    if (!fallbackData.data) {
      throw new Error('Could not fetch Instagram content');
    }
    
    // Parse the HTML response to extract video URLs
    const htmlContent = fallbackData.data;
    const videoMatch = htmlContent.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/);
    const thumbMatch = htmlContent.match(/src="(https:\/\/[^"]+\.jpg[^"]*)"/);
    
    return {
      id: Date.now().toString(),
      title: 'Instagram Reel',
      author: 'Instagram User',
      authorAvatar: '',
      thumbnail: thumbMatch ? thumbMatch[1] : '',
      duration: 0,
      videoUrl: videoMatch ? videoMatch[1] : '',
      videoUrlNoWatermark: videoMatch ? videoMatch[1] : '',
      musicUrl: '',
      musicTitle: '',
      platform: 'instagram'
    };
  }

  const data = await response.json();
  return {
    id: data.id || Date.now().toString(),
    title: data.title || 'Instagram Content',
    author: data.author || 'Instagram User',
    authorAvatar: data.authorAvatar || '',
    thumbnail: data.thumbnail || '',
    duration: data.duration || 0,
    videoUrl: data.videoUrl || '',
    videoUrlNoWatermark: data.videoUrl || '',
    musicUrl: '',
    musicTitle: '',
    platform: 'instagram'
  };
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
  
  // Using a free YouTube download API
  const apiUrl = `https://www.y2mate.com/mates/analyzeV2/ajax`;
  const formData = new URLSearchParams();
  formData.append('k_query', url);
  formData.append('k_page', 'home');
  formData.append('hl', 'en');
  formData.append('q_auto', '0');
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    body: formData.toString()
  });

  if (!response.ok) {
    throw new Error('Failed to fetch YouTube video');
  }

  const data = await response.json();
  
  return {
    id: videoId,
    title: data.title || 'YouTube Video',
    author: data.a || 'YouTube Creator',
    authorAvatar: '',
    thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    duration: 0,
    videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
    videoUrlNoWatermark: `https://www.youtube.com/watch?v=${videoId}`,
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
  
  // Using Facebook video download API
  const apiUrl = `https://www.getfvid.com/downloader`;
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    body: `url=${encodeURIComponent(url)}`
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Facebook video');
  }

  const html = await response.text();
  const hdMatch = html.match(/href="(https:\/\/[^"]*\.mp4[^"]*)"[^>]*>.*?HD/si);
  const sdMatch = html.match(/href="(https:\/\/[^"]*\.mp4[^"]*)"/i);
  
  const videoUrl = hdMatch ? hdMatch[1] : (sdMatch ? sdMatch[1] : '');
  
  if (!videoUrl) {
    throw new Error('No video found. Make sure the post is public.');
  }
  
  return {
    id: Date.now().toString(),
    title: 'Facebook Video',
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

async function fetchSnapchat(url: string): Promise<VideoData> {
  console.log('Fetching Snapchat:', url);
  
  // Snapchat stories/spotlight download
  const apiUrl = `https://snapinsta.io/api/ajaxSearch`;
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    body: `q=${encodeURIComponent(url)}&t=snap`
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Snapchat content');
  }

  const data = await response.json();
  
  if (!data.data) {
    throw new Error('Could not fetch Snapchat content');
  }
  
  const videoMatch = data.data.match(/href="(https:\/\/[^"]+)"/);
  
  return {
    id: Date.now().toString(),
    title: 'Snapchat Story',
    author: 'Snapchat User',
    authorAvatar: '',
    thumbnail: '',
    duration: 0,
    videoUrl: videoMatch ? videoMatch[1] : '',
    videoUrlNoWatermark: videoMatch ? videoMatch[1] : '',
    musicUrl: '',
    musicTitle: '',
    platform: 'snapchat'
  };
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
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
