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

    // 1) Try TikWM user/posts endpoint first
    let profileData: any = null;
    let videos: ProfileVideo[] = [];

    try {
      const apiUrl = `https://www.tikwm.com/api/user/posts`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.tikwm.com/',
          'Origin': 'https://www.tikwm.com',
        },
        body: `unique_id=${encodeURIComponent(username)}&count=30&cursor=0`
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.code === 0 && data?.data) {
          profileData = data.data;
          videos = (profileData.videos || []).map((v: any) => ({
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
        }
      }
    } catch (e) {
      console.log('TikWM user/posts failed, using fallback');
    }

    // 2) Fallback A: TikWM search endpoint (more stable than user/posts)
    if (videos.length === 0) {
      console.log('Using fallback search endpoint for:', username);
      try {
        const searchResp = await fetch(
          `https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(username)}&count=30&cursor=0`,
          {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            }
          }
        );

        if (searchResp.ok) {
          const searchData = await searchResp.json();
          const rawVideos = searchData?.data?.videos || searchData?.videos || [];

          const matched = rawVideos.filter((v: any) => {
            const uid = String(v?.author?.unique_id || v?.author?.uniqueId || '').toLowerCase();
            return uid === username.toLowerCase();
          });

          const picked = (matched.length ? matched : rawVideos).slice(0, 12);
          videos = picked.map((v: any) => ({
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

          if (picked[0]?.author) {
            profileData = {
              unique_id: picked[0].author?.unique_id || username,
              nickname: picked[0].author?.nickname || username,
              avatar: picked[0].author?.avatar || '',
              follower_count: picked[0].author?.follower_count || 0,
              following_count: picked[0].author?.following_count || 0,
              total_favorited: picked[0].author?.total_favorited || 0,
              video_count: videos.length,
            };
          }
        }
      } catch {
        console.log('Search fallback failed, trying HTML scrape fallback');
      }
    }

    // 3) Fallback B: scrape profile page and resolve each video via working single-video API
    if (videos.length === 0) {
      console.log('Using fallback profile scraping for:', username);
      const profileUrl = `https://www.tiktok.com/@${encodeURIComponent(username)}`;
      const profileResponse = await fetch(profileUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Language': 'en-US,en;q=0.9'
        }
      });

      if (profileResponse.ok) {
        const html = await profileResponse.text();
        const videoMatches = [...html.matchAll(/\/@[\w.]+\/video\/\d+/g)];
        const videoPaths = Array.from(new Set(videoMatches.map(m => m[0]))).slice(0, 12);

        if (videoPaths.length > 0) {
          const resolved = await Promise.all(
            videoPaths.map(async (path) => {
              try {
                const fullVideoUrl = `https://www.tiktok.com${path}`;
                const r = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(fullVideoUrl)}`, {
                  headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                  }
                });
                if (!r.ok) return null;
                const d = await r.json();
                if (d?.code !== 0 || !d?.data) return null;
                const v = d.data;
                return {
                  id: v.id || '',
                  title: v.title || 'TikTok Video',
                  thumbnail: v.cover || v.origin_cover || '',
                  duration: v.duration || 0,
                  videoUrl: v.play || '',
                  videoUrlNoWatermark: v.hdplay || v.play || '',
                  musicUrl: v.music || '',
                  plays: v.play_count || 0,
                  likes: v.digg_count || 0,
                  comments: v.comment_count || 0,
                } as ProfileVideo;
              } catch {
                return null;
              }
            })
          );

          videos = resolved.filter((v): v is ProfileVideo => Boolean(v));
        }
      }

      profileData = profileData || {
        unique_id: username,
        nickname: username,
        avatar: '',
        follower_count: 0,
        following_count: 0,
        total_favorited: 0,
        video_count: videos.length,
      };
    }

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

    if (result.videos.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'No downloadable videos found for this profile.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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
