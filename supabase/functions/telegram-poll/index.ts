// Legacy long-polling cron — superseded by the telegram-webhook function
// which receives updates instantly from Telegram.
//
// We keep this endpoint deployed (so the existing pg_cron schedule does not
// error) but it is now a no-op. Calling getUpdates while a webhook is
// registered returns Telegram error 409, so we simply return early.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve((req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  return new Response(
    JSON.stringify({
      ok: true,
      deprecated: true,
      message: "telegram-poll is deprecated — telegram-webhook handles updates in real time.",
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
