

# SEO Keywords Integration for Homepage

## Analysis of Provided Keywords

The user provided **300+ Portuguese keywords** targeting:
- **TikTok downloads**: `baixar video tiktok`, `tiktok download`, `download tiktok video`
- **MP3 conversion**: `converter video para mp3`, `tiktok mp3 downloader`, `transformar video em mp3`
- **No watermark**: `tiktok sem marca d'água`, `download tiktok without watermark`
- **Misspellings**: `baixar vidro tiktok`, `baxar video tiktok`, `baixar tiktok vídeos`
- **Competitor terms**: `save tik tok`, `salva tik tok`, `snaptik`, `savett`

## Implementation Strategy

### 1. Update SEO Config Keywords (src/lib/seo-config.ts)

Add a new `portugueseKeywords` object with categorized Portuguese search terms:

```text
portugueseKeywords: {
  primary: [
    "baixar video tiktok",
    "baixar tiktok",
    "download tiktok video",
    "tiktok download",
    ...
  ],
  mp3: [
    "converter video para mp3",
    "tiktok mp3 downloader",
    "transformar video em mp3",
    "baixar musica mp3",
    ...
  ],
  noWatermark: [
    "tiktok sem marca d'água",
    "baixar tiktok sem marca dagua",
    ...
  ],
  misspellings: [
    "baixar vidro tiktok",
    "baxar video tiktok",
    ...
  ]
}
```

Update `seoConfig.home.keywords` to include these Portuguese keywords.

### 2. Expand Branded Keywords (src/lib/seo-config.ts)

Significantly expand the `brandedKeywords.portuguese` section with the high-volume terms:

```typescript
portuguese: "anytt cc baixar tiktok, baixar video tiktok, tiktok sem marca d'água, converter video para mp3, salvar video tiktok, baixar tiktok gratis, tiktok mp3 downloader, transformar video em mp3, baixar musica tiktok, save tik tok, salva tik tok, ..."
```

### 3. Add Portuguese FAQs to Homepage (src/pages/Index.tsx)

Add Portuguese-optimized FAQ entries that naturally incorporate keywords:

```typescript
{
  question: "Como baixar vídeo do TikTok sem marca d'água?",
  answer: "Com Anytt cc você pode baixar video tiktok sem marca d'água gratuitamente. Basta colar o link do TikTok e clicar em download."
},
{
  question: "Como converter vídeo TikTok para MP3?",
  answer: "Anytt cc permite transformar video em mp3 facilmente. Baixe o áudio de qualquer vídeo TikTok em formato MP3."
}
```

### 4. Add SEO Keyword Section to Homepage (src/pages/Index.tsx)

Create a new `PopularSearches` section at the bottom of the page with keyword-rich anchor text:

```tsx
<section className="py-12 px-4 bg-muted/10">
  <div className="container mx-auto max-w-4xl">
    <h3 className="text-lg font-semibold text-center mb-6">Popular Downloads</h3>
    <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
      <span>baixar video tiktok</span>
      <span>•</span>
      <span>tiktok sem marca d'água</span>
      <span>•</span>
      <span>converter video para mp3</span>
      ...
    </div>
  </div>
</section>
```

### 5. Update index.html Meta Tags

Add Portuguese keywords to the main `<meta name="keywords">` tag in index.html:

```html
<meta name="keywords" content="anytt cc, anytt, baixar video tiktok, tiktok sem marca d'água, converter video para mp3, tiktok mp3 downloader, save tik tok, salva tik tok, ...">
```

---

## Technical Details

### Files to Modify

| File | Changes |
|------|---------|
| `src/lib/seo-config.ts` | Add `portugueseKeywords` object, expand `brandedKeywords.portuguese` |
| `src/pages/Index.tsx` | Add Portuguese FAQs, add `PopularSearches` keyword section |
| `index.html` | Update meta keywords tag with Portuguese terms |

### Keyword Categories to Include

1. **Primary Portuguese TikTok Terms** (~50 keywords):
   - `baixar video tiktok`, `baixar tiktok`, `download tiktok video`, `tiktok download`, `salvar video tiktok`

2. **MP3/Audio Conversion** (~40 keywords):
   - `converter video para mp3`, `transformar video em mp3`, `tiktok mp3`, `baixar audio`, `extrair audio`

3. **No Watermark Terms** (~30 keywords):
   - `tiktok sem marca d'água`, `sem watermark`, `tirar marca d'água`, `download sem logo`

4. **Save/Saver Terms** (~25 keywords):
   - `save tik tok`, `salva tik tok`, `salvar video`, `save tiktok video`, `tik tok saver`

5. **Common Misspellings** (~40 keywords for hidden SEO):
   - `baixar vidro tiktok`, `baxar video tiktok`, `baixar tictoc`, `baixar timtok`, `baixar tktk`

6. **Competitor Terms** (~15 keywords):
   - `snaptik alternative`, `savett alternative`, `ssstik`, `tikmate`

### SEO Impact

- **Target audience**: Portuguese-speaking users (Brazil, Portugal)
- **Search volume**: These keywords represent millions of monthly searches
- **Competition**: Many misspellings have low competition but high intent
- **Visibility boost**: Adding 200+ targeted Portuguese keywords will significantly improve ranking for Brazilian/Portuguese traffic

