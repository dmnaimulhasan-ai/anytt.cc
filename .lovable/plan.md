

# Add Comprehensive Keywords Across All Pages

## Overview
Add 100+ new TikTok, Pinterest, Bangla, and format/quality keywords across all site pages -- in meta tags, visible keyword clouds, popular searches sections, and FAQ content.

## Scope of Changes

### 1. Update Keyword Database (`src/lib/seo-config.ts`)

Add new keyword categories:

**TikTok New Categories:**
- `slideshow`: "TikTok slideshow", "slideshow saver", "save TikTok slideshow as individual photos", "download TikTok carousel images high quality"
- `photoMode`: "TikTok photos", "photo mode", "TikTok carousel", "download TikTok carousel as mp4", "TikTok photo mode downloader online"
- `liveAndStory`: "TikTok live", "TikTok story", "TikTok clips", "download TikTok live stream recording", "TikTok story downloader no watermark 2026"
- `hdAnd4k`: "TikTok HD", "TikTok 4K", "TikTok video downloader HD 1080p no watermark", "TikTok 4K video saver free online", "TikTok download 1080p"
- `audioExtended`: "TikTok mp3", "TikTok audio", "TikTok song", "TikTok voiceover", "TikTok music", "extract TikTok original sound high quality", "TikTok sound downloader to mp3 320kbps", "TikTok background music downloader online"
- `metadata`: "TikTok metadata", "TikTok captions", "download TikTok clips with original captions", "TikTok video metadata extractor free"
- `trending`: "TikTok trends", "TikTok trending", "TikTok algorithm", "TikTok SEO", "TikTok hashtags"
- `conversational`: "how to download TikTok video without app", "can I download TikTok slideshow as video", "best way to download TikTok mp3 original", "TikTok downloader for CapCut editing", "TikTok video downloader for Android 15"

**Pinterest New Categories:**
- `board`: "board downloader", "board saver", "Pinterest board bulk downloader zip", "save entire Pinterest board to gallery", "Pinterest board downloader pro free"
- `carousel`: "Pinterest carousel", "Pinterest carousel downloader no watermark", "download Pinterest carousel images online"
- `imageAndGif`: "Pinterest image", "Pinterest GIF", "Pinterest photo", "Pinterest aesthetic", "Pinterest HD", "Pinterest image downloader for Shopify", "Pinterest image downloader for Figma"
- `bulk`: "bulk downloader", "pin downloader", "pin saver", "bulk download Pinterest pins with titles", "save Pinterest board to zip file"
- `utility`: "Pinterest tool", "Pinterest free", "Pinterest online", "Pinterest mobile", "Pinterest offline", "Pinterest links"
- `conversationalPinterest`: "where to find best Pinterest board downloader", "is there a free Pinterest carousel downloader", "fastest way to save Pinterest carousels", "save Pinterest pins for Procreate"

**Bangla Keywords (new `bangla` object):**
- TikTok Bangla: "TikTok video download kivabe kore", "no watermark TikTok download bangla", "watermark chara TikTok download korar site", "mobile gallery-te TikTok save korar upay"
- Pinterest Bangla: "Pinterest theke video download korar niyom", "Pinterest board ekbare download bangla", "Pinterest theke sob photo ekbare download"
- Bangla script: "টিকটক ভিডিও", "লোগো ছাড়া", "ভিডিও ডাউনলোড", "পিন্টারেস্ট ভিডিও", "গান ডাউনলোড", "টিকটক এমপি৩", "ওয়াটারমার্ক ছাড়া"

**Format & Quality (new `formatExtended` object):**
- "MP4 downloader", "MP3 extractor", "HD 1080p", "4K downloader", "fast downloader", "no login", "bulk save", "media saver", "video converter", "audio only", "high res", "one click", "free online"

### 2. Update TikTok Downloader Page (`src/pages/TikTokDownloader.tsx`)

- Add new FAQ entries covering slideshow, carousel, 4K, live, photo mode, captions, and conversational queries
- Expand visible keyword cloud grid with new cards: "Slideshow & Carousel", "Photo Mode", "Live & Story", "4K Ultra HD", "Trending & SEO", "Captions & Metadata"
- Expand "Popular TikTok Downloads" footer section with new keyword spans: "TikTok 4K", "TikTok carousel", "TikTok captions", "photo mode download", "TikTok live download", "save TikTok slideshow", etc.

### 3. Update Pinterest Downloader Page (`src/pages/PinterestDownloader.tsx`)

- Add new FAQ entries for boards, carousels, bulk download, GIFs, and Figma/Shopify use cases
- Add visible keyword cloud section (similar to TikTok page) with cards: "Board Downloader", "Pin Saver", "Carousel Download", "Image & GIF", "Bulk Download", "HD Quality"
- Add "Popular Pinterest Downloads" footer section with keyword spans

### 4. Update Home Page (`src/pages/Index.tsx`)

- Expand "Popular Downloads" section with new keywords: "TikTok 4K", "TikTok carousel", "photo mode", "Pinterest board downloader", "Pinterest carousel", "pin saver", Bangla keywords
- Add Bangla keyword spans in the popular searches section

### 5. Update Meta Keywords on All Pages

Update `seoConfig` in `seo-config.ts` to include the new keyword strings in meta `keywords` for:
- `home.keywords` -- add new TikTok + Pinterest + Bangla keywords
- `tiktok.keywords` -- add slideshow, carousel, 4K, photo mode, live, audio extended, conversational
- Pinterest page -- update inline keywords string with board, carousel, bulk, GIF, Figma, Shopify terms
- `faq.keywords` -- add conversational keywords
- `about.keywords` -- add trending/SEO keywords

### 6. Update Multilingual Pages (ES, PT, ID, TR, TH, VI)

Add localized versions of new keyword categories to each page's visible keyword cloud and popular searches section (where they exist). Focus on high-value terms: slideshow, carousel, 4K, photo mode, live.

---

## Technical Details

### Files Modified (8+)

| File | Changes |
|------|---------|
| `src/lib/seo-config.ts` | Add ~8 new keyword objects (tiktok extended, pinterest extended, bangla, format), update seoConfig meta keywords |
| `src/pages/TikTokDownloader.tsx` | Add FAQs, expand keyword clouds, expand popular searches |
| `src/pages/PinterestDownloader.tsx` | Add FAQs, add keyword cloud section, add popular searches |
| `src/pages/Index.tsx` | Expand popular downloads with new + Bangla keywords |
| `src/pages/TikTokDownloaderES.tsx` | Add localized keyword clouds |
| `src/pages/TikTokDownloaderPT.tsx` | Add localized keyword clouds |
| `src/pages/TikTokDownloaderID.tsx` | Add localized keyword clouds |
| `src/pages/TikTokDownloaderTR.tsx` | Add localized keyword clouds |
| `src/pages/TikTokDownloaderTH.tsx` | Add localized keyword clouds |
| `src/pages/TikTokDownloaderVI.tsx` | Add localized keyword clouds |
| `src/pages/PinterestFAQ.tsx` | Add new FAQ entries for boards, carousels, bulk |

### Content Policy Note
Keywords related to downloading private/restricted content (e.g., "download TikTok from private account", "private video") will be excluded per existing content policy constraints.

### Verification
After implementation, each page will be checked to confirm:
- Meta keywords tag contains the new terms
- Visible keyword clouds render correctly
- Popular searches section displays new spans
- FAQs include new questions with schema markup

