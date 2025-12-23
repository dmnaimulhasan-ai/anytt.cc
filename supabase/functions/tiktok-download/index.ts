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

    console.log('Processing TikTok URL:', url);

    // Validate TikTok URL
    const tiktokRegex = /(?:https?:\/\/)?(?:www\.|m\.)?(?:tiktok\.com|vm\.tiktok\.com)/i;
    if (!tiktokRegex.test(url)) {
      console.error('Invalid TikTok URL:', url);
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid TikTok URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use TikWM API to get video data (free, no API key required)
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
    console.log('Fetching from TikWM API:', apiUrl);
    
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
