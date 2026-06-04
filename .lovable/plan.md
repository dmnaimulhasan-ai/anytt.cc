# Plan: Remove All Ads & Promote Ads-Free Experience

## 1. Strip all ad code

**Delete ad component files** (`src/components/ads/`):

- `MonetagMultiTag.tsx`, `MonetagPopunder.tsx`, `VignetteBanner.tsx`
- `BannerAd.tsx`, `NativeBanner.tsx`, `FloatingBanner.tsx`
- `InlineAd.tsx`, `ResponsiveAd.tsx`, `ScrollBanner.tsx`, `SmartlinkButton.tsx`, `SocialBar.tsx`

**Delete ad-related files:**

- `public/monetag-sw.js` (Monetag service worker)
- `src/hooks/useAdMonetization.ts`
- `src/hooks/useAdAnalytics.ts`
- `supabase/functions/track-ad-analytics/` (edge function + DB table reference)

**Remove from `src/App.tsx`:**

- Imports + JSX for `FloatingBanner`, `VignetteBanner`, `MonetagPopunder`, `MonetagMultiTag`

**Search & strip remaining usages:** `rg "ads/|BannerAd|NativeBanner|MonetagPopunder|MonetagMultiTag|VignetteBanner|FloatingBanner|InlineAd|ResponsiveAd|ScrollBanner|SmartlinkButton|SocialBar|useAdAnalytics|useAdMonetization"` across `src/pages/**` and `src/components/**`, removing imports + JSX (Blog.tsx, downloader pages, etc.).

**Clean HTML/config:**

- `index.html`: remove any Monetag/ad scripts, meta, preconnects
- `public/_headers`, `public/manifest.webmanifest`, `vite.config.ts` PWA config: remove `monetag-sw.js` references
- Memory note `mem://monetization/ad-strategy` + `mem://technical/ad-analytics-tracking`: mark obsolete / remove from index

## 2. New blog post: "Why AnyTT.cc Is 100% Free & Ad-Free"

Add to `src/lib/blog-data.ts` (new entry, today's date, top of array):

- **slug:** `anytt-ads-free-tiktok-downloader`
- **title:** "AnyTT.cc — 100% Free & Ad-Free TikTok Downloader (2026)"
- **excerpt:** No ads, no popups, no trackers — just clean, fast TikTok & Pinterest downloads.
- **category:** Announcements
- Full Markdown/JSX content covering: ad-free promise, no popups/redirects, privacy benefits, speed gains, comparison vs ad-heavy competitors, FAQ.

## 3. SEO keywords (added to `src/lib/seo-config.ts` + new blog post + Index/TikTok/Pinterest pages)

New low-difficulty target keywords:

- `ad free tiktok downloader`
- `no ads tiktok downloader`
- `tiktok downloader without popup`
- `clean tiktok downloader no ads`
- `safe ad free video downloader`
- `pinterest downloader no ads`
- `tiktok downloader without redirects`
- `free no ads tiktok saver`

Inject into relevant pages' `<SEOHead keywords=...>` and add to `worldwide-keywords.ts` site-wide list.

## 4. Update SEO findings

After scan: mark related ad/monetization findings (if any) as fixed.

## Out of scope

- No layout redesign of existing pages (only ad slot removals)
- No change to download functionality, auth, or backend (besides removing `track-ad-analytics`)

Confirm and I'll execute.

&nbsp;

Must ads free website this is highlighted