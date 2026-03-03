

# SaveTT.cc Competitor Keywords যোগ করা

## বিশ্লেষণ

SaveTT.cc এর সাইট স্ক্র্যাপ করে নিচের SEO keyword patterns পাওয়া গেছে:

### SaveTT.cc যে ভাষাগুলো টার্গেট করে
EN, ES, PT, FR, DE, RU, AR, TH, BG, ID - মোট 10+ ভাষা

### SaveTT.cc এর কী SEO Keywords আছে যা আমাদের নেই

**Brand hijacking terms (savett variations):**
- savett, save tt, savett.cc, save tt cc (কিছু ইতোমধ্যে আছে, আরো variation যোগ হবে)

**German (DE) keywords - সম্পূর্ণ নতুন market:**
- TikTok-Downloader, TikTok herunterladen, TikTok ohne Wasserzeichen, TikTok Video herunterladen, TikTok Video speichern, TikTok kostenlos herunterladen, TikTok MP3 herunterladen, TikTok-Video-Downloader, TikTok herunterladen Android, TikTok herunterladen iPhone, TikTok herunterladen PC

**Russian (RU) keywords - expanded:**
- загрузчик тикток, скачать тикток, скачать видео тикток, тикток без водяного знака, скачать тикток бесплатно, тикток видео скачать, тикток mp3 скачать, тикток скачать без водяного знака, загрузить тикток видео, тикток сохранить видео

**French (FR) keywords - expanded:**
- télécharger tiktok, téléchargeur tiktok, télécharger vidéo tiktok, tiktok sans filigrane, télécharger tiktok gratuit, sauvegarder vidéo tiktok, tiktok mp3 télécharger, téléchargeur de vidéos tiktok

**Bulgarian (BG) keywords - সম্পূর্ণ নতুন:**
- изтегляне на TikTok видео, TikTok без воден знак, изтегли TikTok видео, TikTok видео изтегляне безплатно

**Spanish (ES) expanded:**
- descargador de TikTok, descargar tiktok sin marca de agua, guardar video tiktok, descargar video tiktok gratis, tiktok descargador, descargar tiktok Android, descargar tiktok iPhone

**SaveTT-specific competitor terms:**
- savett alternative, savett cc alternative, better than savett, savett vs anytt, savett cc download, savett tiktok downloader, savett mp3, savett download

## ফাইল পরিবর্তন

### 1. `src/lib/seo-config.ts`

**নতুন category যোগ: `savettCompetitor`**
- ~15 savett brand hijacking keywords

**`brandedKeywords.german` expand:**
- ~15 নতুন German TikTok download keywords

**`brandedKeywords.russian` expand:**
- ~15 নতুন Russian keywords

**`brandedKeywords.french` expand:**
- ~12 নতুন French keywords

**`brandedKeywords.spanish` expand:**
- ~10 নতুন Spanish keywords

**নতুন `brandedKeywords.bulgarian` যোগ:**
- ~10 Bulgarian keywords

### 2. `src/lib/worldwide-keywords.ts`

**নতুন arrays যোগ:**
- `germanKeywords` (~25 keywords) - TikTok download German market
- `russianKeywords` (~20 keywords) - Russian market expansion
- `frenchKeywords` (~20 keywords) - French market
- `bulgarianKeywords` (~15 keywords) - Bulgarian market (savett.cc এর unique market)
- `savettCompetitorKeywords` (~20 keywords) - savett brand hijacking across languages

**`allWorldwideKeywords` update:**
- সব নতুন arrays include করা

## টেকনিক্যাল ডিটেইলস

```text
seo-config.ts changes:
  - Add savettCompetitor category to tiktokKeywords (~15 terms)
  - Expand brandedKeywords.german (~15 new terms)
  - Expand brandedKeywords.russian (~15 new terms)
  - Expand brandedKeywords.french (~12 new terms)
  - Expand brandedKeywords.spanish (~10 new terms)
  - Add brandedKeywords.bulgarian (~10 new terms)
  - Wire bulgarian into home/tiktok page keywords

worldwide-keywords.ts changes:
  - Add germanKeywords array (~25 terms)
  - Add russianKeywords array (~20 terms)
  - Add frenchKeywords array (~20 terms)
  - Add bulgarianKeywords array (~15 terms)
  - Add savettCompetitorKeywords array (~20 terms)
  - Include all in allWorldwideKeywords export
```

মোট ~200 নতুন keyword যোগ হবে, যা SaveTT.cc এর সব major market (DE, RU, FR, BG, ES) কভার করবে এবং তাদের brand terms hijack করবে।

