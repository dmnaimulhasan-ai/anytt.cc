## Plan: Add "No Captions Video" SEO Keywords

### Goal 

শুধু homepageadd কর

Add the following TikTok content-style keywords to maximize SEO reach for users searching specific "no captions video" content types:

- no captions video
- no captions video sad
- no captions video ইমোশনাল
- no captions video attitude
- no captions video emotional
- no captions video বৃষ্টির
- no captions video viral
- no captions video মেয়েদের
- no captions video rain weather
- no captions video night

### Implementation Steps

1. **Add keyword array in `src/lib/seo-config.ts**`
  - Create new `noCaptionsVideo` array inside `tiktokKeywords` object
  - Include all 10 keywords provided
2. **Wire into combined keywords**
  - Add `...tiktokKeywords.noCaptionsVideo` to `allTiktokKeywords` combined string
  - This automatically injects them into the `<meta name="keywords">` tag site-wide
3. **Update homepage meta keywords**
  - `seoConfig.home.keywords` will inherit them via `allTiktokKeywords`
4. **Add to visible "Popular Searches" section in `src/pages/Index.tsx**`
  - Insert the keywords as visible `<span>` elements in the footer keyword cloud
  - This ensures crawlers index them as on-page content (not just meta tags)

### Technical Details

- No new dependencies
- No file deletions
- Two files edited: `src/lib/seo-config.ts`, `src/pages/Index.tsx`
- Estimated time: < 5 minutes