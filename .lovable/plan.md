

# Add More Real Working SEO Keywords

## Overview
Expand the keyword coverage in `src/lib/seo-config.ts` and visible keyword sections on pages by adding proven, high-traffic keywords sourced from competitor analysis (SnapTik, SssTik, TikMate, SaveTT, TTDownloader) and real search trends for TikTok/Pinterest downloaders in 2026.

## New Keywords to Add

### 1. Missing Competitor Brand Keywords
Currently missing high-traffic competitor terms that users actively search:
- **4k tokkit**, **toolsmart**, **tikdownloader**, **tiktokdownloader**, **savefrom**, **y2mate tiktok**, **keepvid tiktok**, **videoder tiktok**
- **savett**, **tiktok download bot**, **tiktok dl**, **tiktok grabber**
- **snaptik pro**, **snaptik online**, **snaptik download**, **ssstik download**, **ssstiktok app**
- **tmate download**, **tik download**, **tiktok video grabber**

### 2. Missing High-Intent Action Keywords
Real queries users type into Google:
- **how to download tiktok video**, **how to save tiktok video**, **how to download tiktok without watermark**
- **download tiktok video free**, **save tiktok video free**, **tiktok video download free online**
- **copy tiktok link and download**, **paste tiktok link download**
- **tiktok repost download**, **tiktok slideshow download**, **tiktok story download**, **tiktok live download**
- **download tiktok draft**, **tiktok private video download**, **tiktok photo download**

### 3. Missing Device/Platform Specific Keywords
- **tiktok downloader safari**, **tiktok downloader firefox**, **tiktok download mac**, **tiktok download linux**
- **download tiktok on laptop**, **save tiktok on ipad**, **tiktok downloader tablet**
- **tiktok downloader online free no app**, **tiktok downloader without login**, **tiktok downloader without sign up**

### 4. Missing Format/Quality Keywords
- **tiktok download 1080p**, **tiktok download full hd**, **tiktok download 720p**
- **tiktok to gif**, **tiktok to mp4 converter online**, **tiktok audio download mp3 free**
- **tiktok sound download**, **tiktok ringtone download**, **download tiktok sound as mp3**

### 5. Missing Pinterest Keywords
- **pinterest image downloader**, **pinterest photo downloader**, **save pinterest images**, **pinterest gif downloader**
- **pinterest board downloader**, **download all pinterest images**, **pinterest bulk downloader**
- **how to download pinterest video on iphone**, **how to save pinterest video android**
- **pinterest reel download**, **pinterest story download**, **pinterest to mp4**

### 6. Missing Multilingual Keywords

**Spanish (high volume)**:
- **descargar tiktok sin marca de agua gratis**, **bajar tiktok gratis**, **guardar video tiktok gratis**, **tiktok descargar video sin marca de agua**

**Turkish (emerging market)**:
- **tiktok video indirme**, **tiktok indirme**, **tiktok video indir**, **tiktokvideo indirme siteleri**

**Thai (high TikTok usage)**:
- **โหลดtiktok**, **ดาวน์โหลด tiktok**, **โหลดวีดีโอ tiktok**

**Vietnamese (huge TikTok market)**:
- **tải video tiktok**, **tải tiktok không logo**, **download video tiktok không watermark**

## File Changes

### File 1: `src/lib/seo-config.ts`

**A) Add new `tiktokKeywords` categories:**
- `actionIntent` - "how to" and action-based queries
- `contentType` - slideshow, story, live, repost, photo queries
- `formatQuality` - 1080p, gif, ringtone, full HD queries
- `moreCompetitors` - 4k tokkit, savett, y2mate tiktok, etc.

**B) Add new `pinterestKeywords` categories:**
- `contentType` - image, gif, board, reel, story downloads
- `actionIntent` - "how to download pinterest video" queries

**C) Add new `brandedKeywords` entries:**
- `turkish` - TikTok download keywords in Turkish
- `thai` - TikTok download keywords in Thai
- `vietnamese` - TikTok download keywords in Vietnamese

**D) Update combined keyword strings** to include new categories in `allTiktokKeywords`, `allEnglishKeywords`, and page-level `seoConfig` keyword fields.

### File 2: `src/pages/Index.tsx`

Update the "Popular Downloads" visible keyword cloud section to include ~10 additional high-traffic terms:
- tiktok reels download, tiktok slideshow download, tiktok to gif, how to download tiktok, tiktok dl, savett, 4k tokkit, pinterest video downloader, download tiktok free

### File 3: `src/pages/PinterestDownloader.tsx`

Update SEO keywords meta to include the new Pinterest keyword categories.

### File 4: `src/pages/TikTokDownloader.tsx`

Update SEO keywords meta to include new action intent and content type keywords.

## Technical Notes

- All changes are meta-tag and visible text only -- no functional or UX changes
- Keywords are sourced from competitor traffic analysis (Ahrefs data on snaptik.app, ssstik.io), Google autocomplete patterns, and real search trends
- Focus on keywords with proven search volume from competitor sites that collectively receive millions of monthly visits
- Turkish, Thai, and Vietnamese markets are added because they represent top TikTok usage countries currently missing from the keyword strategy

