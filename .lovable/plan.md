
# Telegram Mini App Implementation Plan

`@GEN_ZDownloader` bot-এর সাথে একটি full-featured Telegram Mini App যোগ করা হবে যা anytt.cc-এর সব downloader feature Telegram-এর ভিতরে চালাবে।

## যা তৈরি হবে

- **Full app** Mini App-এ — TikTok + Pinterest downloader, download history সহ
- **Telegram native theme** — dark/light auto-sync, system colors ব্যবহার
- নতুন route `/tg` — anytt.cc/tg থেকে serve হবে
- Bot-এ "Open App" button — `/start`-এ এবং inline keyboard-এ

## File Changes

### ১. Telegram WebApp SDK (`index.html`)
`<head>`-এর ভেতরে যোগ:
```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

### ২. New Hook — `src/hooks/useTelegramWebApp.ts`
- `window.Telegram.WebApp` access করার wrapper
- `ready()` + `expand()` auto-call (full screen)
- Telegram theme params → CSS variables এ map (bg, text, button, hint colors)
- `isInTelegram` boolean — non-Telegram browser এ graceful fallback
- User info expose (`user.first_name`, `user.id`)
- `hapticFeedback` helper (impact/notification)

### ৩. New Page — `src/pages/TelegramMiniApp.tsx`
Layout:
```text
┌─────────────────────────────┐
│ 👋 Hi, [first_name]!        │  ← Telegram user greeting
├─────────────────────────────┤
│ [TikTok] [Pinterest] tabs   │
├─────────────────────────────┤
│  PlatformDownloader (reuse) │  ← existing component
├─────────────────────────────┤
│  Recent Downloads (5)       │  ← from useDownloadHistory
└─────────────────────────────┘
```
- Existing `PlatformDownloader` component reuse
- Existing `useDownloadHistory` hook reuse
- Telegram theme CSS variables apply (no brand teal — native look)
- Header/Footer/Ads hide করা (clean Mini App experience)
- Haptic feedback on download success
- `tg.MainButton` ব্যবহার "Paste & Download" এর জন্য

### ৪. Route Registration — `src/App.tsx`
```tsx
<Route path="/tg" element={<TelegramMiniApp />} />
```

### ৫. Telegram Bot Update — `supabase/functions/telegram-poll/index.ts`
`/start` command-এ inline keyboard যোগ:
```ts
reply_markup: {
  inline_keyboard: [[
    { text: "🚀 Open Mini App", web_app: { url: "https://anytt.cc/tg" } }
  ]]
}
```
লিংক paste করলে আগের মতই কাজ করবে (dual mode — bot + mini app দুটোই)।

### ৬. BotFather Configuration (User-side step)
User-কে instructions দেব:
1. `@BotFather` → `/mybots` → bot select
2. **Bot Settings → Menu Button → Configure**
3. URL: `https://anytt.cc/tg`
4. Text: `Open Downloader`

এর পর Telegram chat-এর নিচে permanent menu button দেখাবে।

### ৭. PWA Service Worker — `vite.config.ts`
`/tg` route যাতে cache না হয় (Telegram fresh load করুক):
```ts
navigateFallbackDenylist: [..., /^\/tg/]
```

## Technical Details

**Theme integration:** Telegram passes 8+ theme colors (`bg_color`, `text_color`, `hint_color`, `button_color`, etc.) via `tg.themeParams`। এগুলো CSS variables-এ inject হবে যাতে Tailwind classes (`bg-background`, `text-foreground`) Telegram colors use করে।

**Viewport:** `tg.expand()` call করলে Mini App full height নেবে। `tg.viewportHeight` listen করে dynamic resize handle হবে।

**SEO:** `/tg` route-এ `<meta name="robots" content="noindex">` যাতে Google index না করে (Mini App, public page নয়)।

**Backward compat:** `useTelegramWebApp` hook detect করবে user Telegram-এ আছে কিনা — না থাকলে normal anytt.cc UI দেখাবে (যাতে কেউ link share করলেও broken না হয়)।

## যা পরিবর্তন হবে না

- Bot-এর existing link-paste behavior অপরিবর্তিত
- Main anytt.cc site (`/`, `/tiktok-downloader`, etc.) অপরিবর্তিত
- Existing edge functions (`tiktok-download`, `pinterest-download`) reuse হবে
- Database schema unchanged

## Deliverables

কাজ শেষে user পাবেন:
- ✅ `https://anytt.cc/tg` — Telegram Mini App URL
- ✅ Bot-এ inline button দিয়ে Mini App খোলা যাবে
- ✅ BotFather setup করার step-by-step Bangla guide
- ✅ Native Telegram look & feel (dark/light auto)
