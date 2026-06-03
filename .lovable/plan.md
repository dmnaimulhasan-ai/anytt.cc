## Plan: Add Low-Difficulty Keywords from Semrush Research

### Research summary (Semrush, US database)

Found a cluster of **low-difficulty, high-volume** keywords — most under KD 30, all with low competition (≤0.05). Pinterest cluster scores especially well (KD 23 for the seed).

### Selected low-difficulty keywords to target

**Pinterest cluster (KD ~23, all low competition):**
- pinterest downloader (49,500/mo)
- pinterest video downloader (33,100/mo)
- pinterest download (22,200/mo)
- download pinterest videos (18,100/mo)
- pinterest images (18,100/mo)
- pinterest video download (14,800/mo)
- download pinterest video (8,100/mo)
- pintrest downloader (4,400/mo — common typo)
- pinterest image downloader (2,400/mo)
- pinterest to mp4 (1,900/mo)
- pinterest video downloader online (1,900/mo)
- pinterest photo downloader (1,600/mo)
- how to download pinterest videos (1,000/mo)
- how to download videos from pinterest (880/mo)
- how to download video from pinterest on iphone (50/mo)

**TikTok cluster (low competition variants):**
- tiktok to mp4 (40,500/mo, comp 0)
- save tiktok (14,800/mo)
- sstiktok (14,800/mo)
- tik tok saving (14,800/mo)
- tiktok download video (33,100/mo)
- download tiktok videos (14,800/mo)
- tittok (18,100/mo — common typo)
- sss tiktok (18,100/mo)

### Implementation

Two files edited, no new files, no deletions:

**1. `src/lib/seo-config.ts`**
- Add a new `lowDifficulty` array inside `pinterestKeywords` with the 15 Pinterest terms above
- Add a new `lowDifficulty` array inside `tiktokKeywords` with the 8 TikTok terms above
- Wire both into the existing combined keyword strings (`allPinterestKeywords`, `allTiktokKeywords`) so they auto-flow into every page's `<meta name="keywords">`

**2. `src/pages/Index.tsx`** (homepage only, per user's earlier rule)
- Append the new keywords as visible `<span>` chips in the existing "Popular Searches" footer keyword cloud so crawlers index them as on-page content (not just meta)

### Notes

- All selected keywords are KD ≤ 45 with competition ≤ 0.05 — realistic targets for the site's current authority
- Common typo variants (pintrest, tittok, sss tiktok) included because they get real search volume
- "how to" question keywords included to pick up People Also Ask boxes
- Estimated time: < 5 minutes
