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

    console.log('Processing YouTube URL:', url);

    // Validate YouTube URL
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)/i;
    if (!youtubeRegex.test(url)) {
      console.error('Invalid YouTube URL:', url);
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
      console.error('Could not extract video ID from URL:', url);
      return new Response(
        JSON.stringify({ success: false, error: 'Could not extract video ID from URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Extracted video ID:', videoId);

    // Use a YouTube download API
    const apiUrl = `https://yt-api.p.rapidapi.com/dl?id=${videoId}`;
    console.log('Fetching from YouTube API');
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'yt-api.p.rapidapi.com',
        'x-rapidapi-key': Deno.env.get('RAPIDAPI_KEY') || '',
      }
    });

    if (!response.ok) {
      console.error('YouTube API error:', response.status, response.statusText);
      
      // Fallback: Return basic info using oEmbed
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      const oembedResponse = await fetch(oembedUrl);
      
      if (oembedResponse.ok) {
        const oembedData = await oembedResponse.json();
        const result: VideoData = {
          id: videoId,
          title: oembedData.title || 'YouTube Video',
          author: oembedData.author_name || 'Unknown',
          authorAvatar: '',
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          duration: 0,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          videoUrlNoWatermark: `https://www.youtube.com/watch?v=${videoId}`,
          musicUrl: '',
          musicTitle: ''
        };

        return new Response(
          JSON.stringify({ success: true, data: result, note: 'Direct download not available. Use the link to watch.' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch video data. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('YouTube API response status:', data.status);

    if (data.status !== 'OK' || !data.title) {
      console.error('YouTube API returned error:', data.message || 'Unknown error');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: data.message || 'Could not fetch video. Make sure the URL is correct and the video is public.' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Successfully fetched video:', data.title?.substring(0, 50));

    // Find best quality video
    let videoUrl = '';
    if (data.formats && data.formats.length > 0) {
      const mp4Formats = data.formats.filter((f: any) => f.mimeType?.includes('video/mp4'));
      if (mp4Formats.length > 0) {
        videoUrl = mp4Formats[0].url || '';
      }
    }

    const result: VideoData = {
      id: videoId,
      title: data.title || 'YouTube Video',
      author: data.channelTitle || 'Unknown',
      authorAvatar: '',
      thumbnail: data.thumbnail?.[data.thumbnail.length - 1]?.url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      duration: data.lengthSeconds || 0,
      videoUrl: videoUrl || `https://www.youtube.com/watch?v=${videoId}`,
      videoUrlNoWatermark: videoUrl || `https://www.youtube.com/watch?v=${videoId}`,
      musicUrl: '',
      musicTitle: ''
    };

    console.log('Returning video data for:', result.author);

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