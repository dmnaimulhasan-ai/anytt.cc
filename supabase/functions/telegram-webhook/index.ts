// Telegram webhook endpoint — processes updates instantly (no polling delay).
// Telegram POSTs each update here as soon as it arrives.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { processMessage, deriveTelegramWebhookSecret, safeEqual } from "../_shared/telegram-handler.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-telegram-bot-api-secret-token",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const TELEGRAM_API_KEY = Deno.env.get("TELEGRAM_API_KEY");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!LOVABLE_API_KEY || !TELEGRAM_API_KEY || !SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ error: "Missing env" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Verify Telegram secret token to prevent unauthorized invocations.
  const expectedSecret = await deriveTelegramWebhookSecret(TELEGRAM_API_KEY);
  const actualSecret = req.headers.get("X-Telegram-Bot-Api-Secret-Token") ?? req.headers.get("x-telegram-bot-api-secret-token");
  if (!safeEqual(actualSecret, expectedSecret)) {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  let update: any;
  try {
    update = await req.json();
  } catch {
    return new Response("Bad request", { status: 400, headers: corsHeaders });
  }

  const message = update?.message;
  if (!message?.chat?.id || typeof update.update_id !== "number") {
    // Ignore non-message updates silently — Telegram retries on non-2xx.
    return new Response(JSON.stringify({ ok: true, ignored: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  // Idempotent persist — Telegram retries failed deliveries.
  const { data: existing } = await supabase
    .from("telegram_messages")
    .select("update_id, processed")
    .eq("update_id", update.update_id)
    .maybeSingle();

  if (existing?.processed) {
    return new Response(JSON.stringify({ ok: true, duplicate: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  await supabase.from("telegram_messages").upsert(
    {
      update_id: update.update_id,
      chat_id: message.chat.id,
      user_id: message.from?.id ?? null,
      username: message.from?.username ?? null,
      text: message.text ?? null,
      raw_update: update,
    },
    { onConflict: "update_id" },
  );

  // Acknowledge Telegram immediately, then process in background to avoid
  // Telegram's 60s timeout retrying the same update.
  const work = (async () => {
    try {
      await processMessage(
        {
          update_id: update.update_id,
          chat_id: message.chat.id,
          text: message.text ?? null,
          message_id: message.message_id,
        },
        supabase,
        LOVABLE_API_KEY,
        TELEGRAM_API_KEY,
        SUPABASE_URL,
        SERVICE_KEY,
      );
      await supabase
        .from("telegram_messages")
        .update({ processed: true, processed_at: new Date().toISOString() })
        .eq("update_id", update.update_id);
    } catch (err) {
      console.error("Webhook handler error:", err);
    }
  })();

  // @ts-ignore — EdgeRuntime is available on Supabase Edge Functions
  if (typeof EdgeRuntime !== "undefined" && (EdgeRuntime as any).waitUntil) {
    // @ts-ignore
    (EdgeRuntime as any).waitUntil(work);
  } else {
    await work;
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
