
# On-Page SEO Optimization - Implementation Plan

## Overview
This plan addresses 7 on-page SEO gaps to improve keyword signals, language targeting, accessibility, and content depth across the site.

## Changes

### 1. Dynamic `lang` Attribute via SEOHead
**File:** `src/components/SEOHead.tsx`
- Add optional `lang` prop (default: `"en"`)
- Set `document.documentElement.lang` in the existing `useEffect`
- Reset to `"en"` on cleanup

**All localized pages** (ES, PT, ID, TR, TH, VI) will pass the correct lang code:
- `TikTokDownloaderES.tsx` -> `lang="es"`
- `TikTokDownloaderPT.tsx` -> `lang="pt"`
- `TikTokDownloaderID.tsx` -> `lang="id"`
- `TikTokDownloaderTR.tsx` -> `lang="tr"`
- `TikTokDownloaderTH.tsx` -> `lang="th"`
- `TikTokDownloaderVI.tsx` -> `lang="vi"`

### 2. Add Missing Hreflang Tags to `index.html`
**File:** `index.html`
- Add static hreflang links for `tr`, `th`, and `vi` so crawlers see all language variants before JavaScript loads

### 3. Keyword-Rich Headings
**File:** `src/components/AboutSection.tsx`
- H2: "Why Anytt cc?" becomes "Why Choose Anytt cc TikTok Downloader?"

**File:** `src/components/HowToSection.tsx`
- H2: "How to Download" becomes "How to Download TikTok Videos Without Watermark"
- H3s updated: "Copy TikTok Video Link", "Paste URL in Anytt cc", "Download HD Video Free"

### 4. Descriptive Content Sections (Thin Content Fix)
**File:** `src/pages/TikTokDownloader.tsx`
- Add a new "What is Anytt cc TikTok Downloader?" section (approx. 150 words) between the FAQ and keyword cloud sections, with keyword-rich paragraphs about the tool

**File:** `src/pages/PinterestDownloader.tsx`
- Add a new "What is Anytt cc Pinterest Downloader?" section (approx. 150 words) between the FAQ and features sections

### 5. Accessibility: `aria-label` on Interactive Elements
**File:** `src/components/HeroSection.tsx`
- Add `aria-label="Enter TikTok video URL to download"` to the input field
- Add `aria-label="Search and download TikTok video"` to the download button

### 6. Semantic `<time>` Elements for Blog Dates
**File:** `src/components/BlogCard.tsx`
- Wrap the date display in a `<time>` element with a `datetime` attribute for search engine freshness signals

### 7. Image Alt Text Integration
**File:** `src/components/BlogCard.tsx`
- Add descriptive `alt` text to the blog card image area using the post title for context

---

## Files Modified (11 total)

| File | Change |
|------|--------|
| `src/components/SEOHead.tsx` | Add `lang` prop, set `document.documentElement.lang` |
| `index.html` | Add tr/th/vi hreflang links |
| `src/components/AboutSection.tsx` | Keyword-rich h2 heading |
| `src/components/HowToSection.tsx` | Keyword-rich h2 and h3 headings |
| `src/pages/TikTokDownloader.tsx` | Add descriptive content section |
| `src/pages/PinterestDownloader.tsx` | Add descriptive content section |
| `src/components/HeroSection.tsx` | Add aria-labels to input and button |
| `src/components/BlogCard.tsx` | Add `<time>` element and alt text |
| `src/pages/TikTokDownloaderES.tsx` | Pass `lang="es"` to SEOHead |
| `src/pages/TikTokDownloaderPT.tsx` | Pass `lang="pt"` to SEOHead |
| `src/pages/TikTokDownloaderID.tsx` | Pass `lang="id"` to SEOHead |
| `src/pages/TikTokDownloaderTR.tsx` | Pass `lang="tr"` to SEOHead |
| `src/pages/TikTokDownloaderTH.tsx` | Pass `lang="th"` to SEOHead |
| `src/pages/TikTokDownloaderVI.tsx` | Pass `lang="vi"` to SEOHead |

## Expected Impact
- Stronger keyword signals in heading hierarchy (h1-h3)
- Correct language targeting for all 7 markets before JS hydration
- More indexable content on tool pages (fixes thin content)
- Better accessibility scores (improves Core Web Vitals)
- Enhanced structured date signals for blog content freshness
