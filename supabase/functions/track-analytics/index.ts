import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role (bypasses RLS)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, data } = await req.json();
    
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Simple rate limiting: 60 requests per minute per IP
    const windowStart = new Date(Date.now() - 60 * 1000).toISOString();
    
    const { count } = await supabase
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .eq('endpoint', 'track-analytics')
      .gte('window_start', windowStart);

    if ((count || 0) >= 60) {
      console.log('Rate limit exceeded for IP:', clientIP);
      return new Response(
        JSON.stringify({ success: false, error: 'Rate limit exceeded' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Track this request for rate limiting
    await supabase.from('rate_limits').insert({
      ip_address: clientIP,
      endpoint: 'track-analytics',
      window_start: new Date().toISOString()
    });

    // Process the action
    if (action === 'track_visitor') {
      const visitorId = data?.visitor_id;
      if (!visitorId || typeof visitorId !== 'string' || visitorId.length > 100) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid visitor_id' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      await supabase.from('visitor_stats').upsert({
        visitor_id: visitorId,
        last_visit: new Date().toISOString()
      }, { onConflict: 'visitor_id' });

      console.log('Tracked visitor:', visitorId.substring(0, 8));

    } else if (action === 'track_download') {
      const platform = data?.platform;
      const videoId = data?.video_id;

      // Validate platform
      const validPlatforms = ['tiktok', 'youtube', 'facebook'];
      if (!platform || !validPlatforms.includes(platform)) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid platform' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Validate video_id if provided
      if (videoId && (typeof videoId !== 'string' || videoId.length > 200)) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid video_id' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      await supabase.from('download_stats').insert({
        platform,
        video_id: videoId || null
      });

      console.log('Tracked download:', platform, videoId?.substring(0, 20));

    } else if (action === 'get_stats') {
      // Return aggregated stats only
      const { data: statsData, error } = await supabase
        .from('public_stats')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching stats:', error);
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to fetch stats' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, data: statsData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid action' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Cleanup old rate limit records occasionally (1% chance)
    if (Math.random() < 0.01) {
      await supabase.rpc('cleanup_rate_limits');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in track-analytics:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
