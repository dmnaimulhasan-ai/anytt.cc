import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { hashIP } from "../_shared/hash-ip.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface ProfileVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  videoUrl: string;
  videoUrlNoWatermark: string;
  musicUrl: string;
  plays: number;
  likes: number;
  comments: number;
}

interface ProfileData {
  username: string;
  nickname: string;
  avatar: string;
  followers: number;
  following: number;
  likes: number;
  videos: ProfileVideo[];
  totalVideos: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const rawIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                  req.headers.get('x-real-ip') || 'unknown';
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
      .eq('endpoint', 'tiktok-profile')
      .gte('window_start', windowStart);

    if ((count || 0) >= 10) {
      return new Response(
        JSON.stringify({ success: false, error: 'Rate limit exceeded. Please wait a moment.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    await supabase.from('rate_limits').insert({
      ip_address: clientIP,
      endpoint: 'tiktok-profile',
      window_start: new Date().toISOString()
    });

    const body = await req.json();
    let username = body?.username;

    if (!username || typeof username !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Username is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clean username - remove @ and validate
    username = username.trim().replace(/^@/, '');
    
    if (!/^[\w.]{1,30}$/.test(username)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid username format. Use letters, numbers, dots, or underscores.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching TikTok profile:', username);

    // Use TikWM API to fetch user profile videos
    const apiUrl = `https://www.tikwm.com/api/user/posts?unique_id=${encodeURIComponent(username)}&count=30`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      console.error('TikWM profile API error:', response.status);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch profile. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();

    if (data.code !== 0 || !data.data) {
      console.error('TikWM profile error:', data.msg);
      return new Response(
        JSON.stringify({ success: false, error: data.msg || 'Could not find this user. Make sure the username is correct.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const profileData = data.data;
    const videos: ProfileVideo[] = (profileData.videos || []).map((v: any) => ({
      id: v.video_id || v.id || '',
      title: v.title || 'TikTok Video',
      thumbnail: v.cover || v.origin_cover || '',
      duration: v.duration || 0,
      videoUrl: v.play || '',
      videoUrlNoWatermark: v.hdplay || v.wmplay || v.play || '',
      musicUrl: v.music || '',
      plays: v.play_count || 0,
      likes: v.digg_count || 0,
      comments: v.comment_count || 0,
    }));

    const result: ProfileData = {
      username: profileData.unique_id || username,
      nickname: profileData.nickname || username,
      avatar: profileData.avatar || '',
      followers: profileData.follower_count || 0,
      following: profileData.following_count || 0,
      likes: profileData.total_favorited || 0,
      videos,
      totalVideos: profileData.video_count || videos.length,
    };

    console.log(`Profile ${username}: ${videos.length} videos fetched`);

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Profile fetch error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
