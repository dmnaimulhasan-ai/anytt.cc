import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";
const MAX_RUNTIME_MS = 55_000;
const MIN_REMAINING_MS = 5_000;
const RATE_LIMIT_PER_HOUR = 15;
const DEDUP_WINDOW_DAYS = 7;

async function hashUrl(url: string): Promise<string> {
  // Normalize: lowercase + strip trailing slash + drop common tracking params
  let norm = url.trim();
  try {
    const u = new URL(norm);
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "_t", "_r", "is_from_webapp", "sender_device"].forEach((p) =>
      u.searchParams.delete(p),
    );
    norm = (u.origin + u.pathname + (u.search ? "?" + u.searchParams.toString() : "")).toLowerCase().replace(/\/+$/, "");
  } catch {
    norm = norm.toLowerCase();
  }
  const data = new TextEncoder().encode(norm);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function isDuplicate(supabase: any, chatId: number, urlHash: string): Promise<boolean> {
  const cutoff = new Date(Date.now() - DEDUP_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const { data } = await supabase
    .from("telegram_processed_urls")
    .select("id")
    .eq("chat_id", chatId)
    .eq("url_hash", urlHash)
    .gte("processed_at", cutoff)
    .limit(1)
    .maybeSingle();
  return !!data;
}

async function markProcessed(supabase: any, chatId: number, urlHash: string, url: string, platform: string) {
  await supabase
    .from("telegram_processed_urls")
    .upsert(
      { chat_id: chatId, url_hash: urlHash, url, platform, processed_at: new Date().toISOString() },
      { onConflict: "chat_id,url_hash" },
    );
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TIKTOK_REGEX = /https?:\/\/(?:www\.|m\.|vm\.|vt\.)?tiktok\.com\/\S+/gi;
const PINTEREST_REGEX = /https?:\/\/(?:[\w.-]+\.)?(?:pinterest\.[\w.]+|pin\.it)\/\S+/gi;

function detectUrls(text: string): Array<{ platform: "tiktok" | "pinterest"; url: string }> {
  if (!text) return [];
  const found: Array<{ platform: "tiktok" | "pinterest"; url: string }> = [];
  const seen = new Set<string>();
  for (const m of text.matchAll(TIKTOK_REGEX)) {
    if (!seen.has(m[0])) { seen.add(m[0]); found.push({ platform: "tiktok", url: m[0] }); }
  }
  for (const m of text.matchAll(PINTEREST_REGEX)) {
    if (!seen.has(m[0])) { seen.add(m[0]); found.push({ platform: "pinterest", url: m[0] }); }
  }
  return found;
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

  const detectedList = detectUrls(trimmed);
  if (detectedList.length === 0) {
    await sendMessage(
      chat_id,
      `❌ I couldn't find a TikTok or Pinterest URL in your message.\n\nSend me a link like:\n<code>https://www.tiktok.com/@user/video/123</code>\n<code>https://pin.it/abc</code>`,
      lovableKey,
      tgKey,
      message_id,
    );
    return;
  }

  if (detectedList.length > 1) {
    await sendMessage(
      chat_id,
      `🔎 Found <b>${detectedList.length}</b> links — processing one by one...`,
      lovableKey,
      tgKey,
      message_id,
    );
  }

  const results: Array<{ index: number; url: string; platform: string; ok: boolean; reason?: string }> = [];
  const shortUrl = (u: string) => (u.length > 55 ? u.slice(0, 52) + "..." : u);

  for (let i = 0; i < detectedList.length; i++) {
    const detected = detectedList[i];
    const prefix = detectedList.length > 1 ? `(${i + 1}/${detectedList.length}) ` : "";

    // Skip duplicates already processed for this chat in the last N days
    const urlHash = await hashUrl(detected.url);
    if (await isDuplicate(supabase, chat_id, urlHash)) {
      await sendMessage(
        chat_id,
        `⏭️ ${prefix}Already downloaded recently — skipping <a href="${detected.url}">this ${detected.platform} link</a>.`,
        lovableKey,
        tgKey,
        i === 0 ? message_id : undefined,
      );
      results.push({ index: i + 1, url: detected.url, platform: detected.platform, ok: false, reason: "Duplicate (already sent)" });
      continue;
    }

    // Rate limit per URL
    const allowed = await checkRateLimit(supabase, chat_id);
    if (!allowed) {
      await sendMessage(
        chat_id,
        `⏰ Rate limit reached (${RATE_LIMIT_PER_HOUR} downloads / hour).\nSkipped remaining ${detectedList.length - i} link(s). Try again later.`,
        lovableKey,
        tgKey,
      );
      // Mark remaining as failed (rate-limited)
      for (let j = i; j < detectedList.length; j++) {
        results.push({ index: j + 1, url: detectedList[j].url, platform: detectedList[j].platform, ok: false, reason: "Rate limit" });
      }
      break;
    }

    await sendMessage(chat_id, `⏳ ${prefix}Processing your ${detected.platform} link...`, lovableKey, tgKey, i === 0 ? message_id : undefined);

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
          `❌ ${prefix}Could not download.\nReason: ${apiData.error || "Unknown error"}\n\nMake sure the URL is public and valid.`,
          lovableKey,
          tgKey,
        );
        results.push({ index: i + 1, url: detected.url, platform: detected.platform, ok: false, reason: apiData.error || "Unknown error" });
        continue;
      }

      if (detected.platform === "tiktok") {
        const v = apiData.data;
        const caption =
          `✅ ${prefix}<b>${v.title || "TikTok Video"}</b>\n` +
          `👤 @${v.author || "unknown"}\n` +
          `🌐 Powered by <a href="https://anytt.cc">anytt.cc</a>`;

        const videoUrl = v.videoUrlNoWatermark || v.videoUrl;
        const videoResult = await sendVideo(chat_id, videoUrl, caption, lovableKey, tgKey);

        if (!videoResult.ok) {
          await sendMessage(
            chat_id,
            `${caption}\n\n📥 <a href="${videoUrl}">Download HD Video</a>` +
              (v.musicUrl ? `\n🎵 <a href="${v.musicUrl}">Download MP3</a>` : ""),
            lovableKey,
            tgKey,
          );
        } else if (v.musicUrl) {
          await tg("sendAudio", {
            chat_id,
            audio: v.musicUrl,
            title: v.musicTitle || "Original Sound",
            performer: v.author || "TikTok",
          }, lovableKey, tgKey);
        }
        results.push({ index: i + 1, url: detected.url, platform: detected.platform, ok: true });
      } else {
        const v = apiData.data;
        const isVideo = v.type === "video" || v.videoUrl;
        const mediaUrl = v.videoUrl || v.imageUrl || v.url;
        const caption =
          `✅ ${prefix}<b>${v.title || "Pinterest Media"}</b>\n` +
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
        results.push({ index: i + 1, url: detected.url, platform: detected.platform, ok: true });
      }
    } catch (err) {
      console.error("Process error:", err);
      await sendMessage(chat_id, `❌ ${prefix}Server error on this link. Continuing...`, lovableKey, tgKey);
      results.push({ index: i + 1, url: detected.url, platform: detected.platform, ok: false, reason: "Server error" });
    }

    // Small delay between sequential downloads to avoid Telegram flood limits
    if (i < detectedList.length - 1) {
      await new Promise((r) => setTimeout(r, 600));
    }
  }

  // Final summary (only when there were multiple links)
  if (detectedList.length > 1) {
    const success = results.filter((r) => r.ok);
    const failed = results.filter((r) => !r.ok);

    const successLines = success.map((r) => `  ${r.index}. ${r.platform} — <a href="${r.url}">${shortUrl(r.url)}</a>`).join("\n");
    const failedLines = failed.map((r) => `  ${r.index}. ${r.platform} — <a href="${r.url}">${shortUrl(r.url)}</a>\n     <i>${r.reason || "Failed"}</i>`).join("\n");

    let summary = `📊 <b>Summary:</b> ${success.length}/${detectedList.length} succeeded\n\n`;
    if (success.length > 0) summary += `✅ <b>Success:</b>\n${successLines}\n\n`;
    if (failed.length > 0) summary += `❌ <b>Failed:</b>\n${failedLines}`;

    await sendMessage(chat_id, summary.trim(), lovableKey, tgKey);
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
