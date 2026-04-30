import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";
const MAX_RUNTIME_MS = 55_000;
const MIN_REMAINING_MS = 5_000;
const RATE_LIMIT_PER_HOUR = 15;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TIKTOK_REGEX = /https?:\/\/(?:www\.|m\.|vm\.|vt\.)?tiktok\.com\/\S+/i;
const PINTEREST_REGEX = /https?:\/\/(?:[\w.-]+\.)?(?:pinterest\.[\w.]+|pin\.it)\/\S+/i;

function detectUrl(text: string): { platform: "tiktok" | "pinterest"; url: string } | null {
  if (!text) return null;
  const tt = text.match(TIKTOK_REGEX);
  if (tt) return { platform: "tiktok", url: tt[0] };
  const pt = text.match(PINTEREST_REGEX);
  if (pt) return { platform: "pinterest", url: pt[0] };
  return null;
}

async function tg(method: string, body: Record<string, unknown>, lovableKey: string, tgKey: string) {
  const res = await fetch(`${GATEWAY_URL}/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": tgKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(`Telegram ${method} failed [${res.status}]:`, JSON.stringify(data));
  }
  return { ok: res.ok, data };
}

async function sendMessage(chatId: number, text: string, lovableKey: string, tgKey: string, replyTo?: number) {
  return tg("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...(replyTo ? { reply_to_message_id: replyTo } : {}),
  }, lovableKey, tgKey);
}

async function sendVideo(chatId: number, videoUrl: string, caption: string, lovableKey: string, tgKey: string) {
  return tg("sendVideo", {
    chat_id: chatId,
    video: videoUrl,
    caption,
    parse_mode: "HTML",
    supports_streaming: true,
  }, lovableKey, tgKey);
}

async function sendPhoto(chatId: number, photoUrl: string, caption: string, lovableKey: string, tgKey: string) {
  return tg("sendPhoto", {
    chat_id: chatId,
    photo: photoUrl,
    caption,
    parse_mode: "HTML",
  }, lovableKey, tgKey);
}

async function checkRateLimit(supabase: any, chatId: number): Promise<boolean> {
  const windowStart = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("telegram_rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("chat_id", chatId)
    .gte("window_start", windowStart);
  if ((count || 0) >= RATE_LIMIT_PER_HOUR) return false;
  await supabase.from("telegram_rate_limits").insert({
    chat_id: chatId,
    window_start: new Date().toISOString(),
  });
  return true;
}

async function processMessage(
  msg: { chat_id: number; text: string | null; update_id: number; message_id?: number },
  supabase: any,
  lovableKey: string,
  tgKey: string,
  supabaseUrl: string,
  serviceKey: string,
) {
  const { chat_id, text, message_id } = msg;
  if (!text) return;

  const trimmed = text.trim();

  // Commands
  if (trimmed === "/start" || trimmed === "/help") {
    await sendMessage(
      chat_id,
      `👋 <b>Welcome to Anytt cc Bot!</b>\n\n` +
        `Send me any <b>TikTok</b> or <b>Pinterest</b> URL and I'll download it for you — no watermark, HD quality, free.\n\n` +
        `<b>Commands:</b>\n` +
        `/start — Show this message\n` +
        `/help — Same as /start\n\n` +
        `<b>Try it:</b> paste a TikTok or Pinterest link 🎬\n\n` +
        `🌐 <a href="https://anytt.cc">anytt.cc</a>`,
      lovableKey,
      tgKey,
    );
    return;
  }

  const detected = detectUrl(trimmed);
  if (!detected) {
    await sendMessage(
      chat_id,
      `❌ I couldn't find a TikTok or Pinterest URL in your message.\n\nSend me a link like:\n<code>https://www.tiktok.com/@user/video/123</code>\n<code>https://pin.it/abc</code>`,
      lovableKey,
      tgKey,
      message_id,
    );
    return;
  }

  // Rate limit
  const allowed = await checkRateLimit(supabase, chat_id);
  if (!allowed) {
    await sendMessage(
      chat_id,
      `⏰ Rate limit reached (${RATE_LIMIT_PER_HOUR} downloads / hour).\nPlease try again later.`,
      lovableKey,
      tgKey,
    );
    return;
  }

  await sendMessage(chat_id, `⏳ Processing your ${detected.platform} link...`, lovableKey, tgKey, message_id);

  try {
    const fnName = detected.platform === "tiktok" ? "tiktok-download" : "pinterest-download";
    const apiResp = await fetch(`${supabaseUrl}/functions/v1/${fnName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
      },
      body: JSON.stringify({ url: detected.url }),
    });
    const apiData = await apiResp.json();

    if (!apiData.success || !apiData.data) {
      await sendMessage(
        chat_id,
        `❌ Could not download.\nReason: ${apiData.error || "Unknown error"}\n\nMake sure the URL is public and valid.`,
        lovableKey,
        tgKey,
      );
      return;
    }

    if (detected.platform === "tiktok") {
      const v = apiData.data;
      const caption =
        `✅ <b>${v.title || "TikTok Video"}</b>\n` +
        `👤 @${v.author || "unknown"}\n` +
        `🌐 Powered by <a href="https://anytt.cc">anytt.cc</a>`;

      const videoUrl = v.videoUrlNoWatermark || v.videoUrl;
      const videoResult = await sendVideo(chat_id, videoUrl, caption, lovableKey, tgKey);

      if (!videoResult.ok) {
        // Fallback to link if Telegram refuses (e.g. >50MB)
        await sendMessage(
          chat_id,
          `${caption}\n\n📥 <a href="${videoUrl}">Download HD Video</a>` +
            (v.musicUrl ? `\n🎵 <a href="${v.musicUrl}">Download MP3</a>` : ""),
          lovableKey,
          tgKey,
        );
      } else if (v.musicUrl) {
        // Send MP3 separately
        await tg("sendAudio", {
          chat_id,
          audio: v.musicUrl,
          title: v.musicTitle || "Original Sound",
          performer: v.author || "TikTok",
        }, lovableKey, tgKey);
      }
    } else {
      // Pinterest
      const v = apiData.data;
      const isVideo = v.type === "video" || v.videoUrl;
      const mediaUrl = v.videoUrl || v.imageUrl || v.url;
      const caption =
        `✅ <b>${v.title || "Pinterest Media"}</b>\n` +
        `🌐 Powered by <a href="https://anytt.cc">anytt.cc</a>`;

      if (isVideo) {
        const r = await sendVideo(chat_id, mediaUrl, caption, lovableKey, tgKey);
        if (!r.ok) {
          await sendMessage(chat_id, `${caption}\n\n📥 <a href="${mediaUrl}">Download</a>`, lovableKey, tgKey);
        }
      } else {
        const r = await sendPhoto(chat_id, mediaUrl, caption, lovableKey, tgKey);
        if (!r.ok) {
          await sendMessage(chat_id, `${caption}\n\n📥 <a href="${mediaUrl}">Download</a>`, lovableKey, tgKey);
        }
      }
    }
  } catch (err) {
    console.error("Process error:", err);
    await sendMessage(chat_id, `❌ Server error. Please try again in a moment.`, lovableKey, tgKey);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const startTime = Date.now();

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

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  // Read offset
  const { data: state, error: stateErr } = await supabase
    .from("telegram_bot_state")
    .select("update_offset")
    .eq("id", 1)
    .single();

  if (stateErr) {
    console.error("State read error:", stateErr);
    return new Response(JSON.stringify({ error: stateErr.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let currentOffset: number = state.update_offset;
  let totalProcessed = 0;

  while (true) {
    const elapsed = Date.now() - startTime;
    const remainingMs = MAX_RUNTIME_MS - elapsed;
    if (remainingMs < MIN_REMAINING_MS) break;

    const timeout = Math.min(50, Math.floor(remainingMs / 1000) - 5);
    if (timeout < 1) break;

    const { ok, data } = await tg("getUpdates", {
      offset: currentOffset,
      timeout,
      allowed_updates: ["message"],
    }, LOVABLE_API_KEY, TELEGRAM_API_KEY);

    if (!ok) break;

    const updates = (data.result ?? []) as any[];
    if (updates.length === 0) continue;

    // Persist messages first (idempotent)
    const rows = updates
      .filter((u) => u.message)
      .map((u) => ({
        update_id: u.update_id,
        chat_id: u.message.chat.id,
        user_id: u.message.from?.id ?? null,
        username: u.message.from?.username ?? null,
        text: u.message.text ?? null,
        raw_update: u,
      }));

    if (rows.length > 0) {
      await supabase.from("telegram_messages").upsert(rows, { onConflict: "update_id" });
    }

    // Advance offset
    const newOffset = Math.max(...updates.map((u) => u.update_id)) + 1;
    await supabase
      .from("telegram_bot_state")
      .update({ update_offset: newOffset, updated_at: new Date().toISOString() })
      .eq("id", 1);
    currentOffset = newOffset;

    // Process each message (sequential to avoid Telegram flood)
    for (const u of updates) {
      if (!u.message) continue;
      try {
        await processMessage(
          {
            update_id: u.update_id,
            chat_id: u.message.chat.id,
            text: u.message.text ?? null,
            message_id: u.message.message_id,
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
          .eq("update_id", u.update_id);
        totalProcessed++;
      } catch (err) {
        console.error("Message handler error:", err);
      }
    }
  }

  return new Response(
    JSON.stringify({ ok: true, processed: totalProcessed, finalOffset: currentOffset }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
