import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AdAnalyticsEvent {
  event_type: "load" | "failure" | "timeout" | "click";
  ad_component: string;
  ad_position?: string;
  error_reason?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body: AdAnalyticsEvent = await req.json();
    const userAgent = req.headers.get("user-agent") || undefined;

    // Validate required fields
    if (!body.event_type || !body.ad_component) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: event_type, ad_component" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate event_type
    const validEventTypes = ["load", "failure", "timeout", "click"];
    if (!validEventTypes.includes(body.event_type)) {
      return new Response(
        JSON.stringify({ error: "Invalid event_type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert the analytics event
    const { error } = await supabase.from("ad_analytics").insert({
      event_type: body.event_type,
      ad_component: body.ad_component,
      ad_position: body.ad_position || null,
      error_reason: body.error_reason || null,
      user_agent: userAgent,
    });

    if (error) {
      console.error("Failed to insert ad analytics:", error);
      return new Response(
        JSON.stringify({ error: "Failed to track analytics" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Tracked ad event: ${body.event_type} for ${body.ad_component}`);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in track-ad-analytics:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
