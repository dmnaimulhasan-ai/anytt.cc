

# SnapTik, SSStiK, TikMate Competitor Keywords যোগ করা

## বিশ্লেষণ

তিনটি competitor এর সাইট রিসার্চ করে তাদের SEO keyword patterns বের করা হয়েছে:

### Competitor ভাষা Coverage

| Competitor | ভাষা সমূহ |
|---|---|
| **SnapTik** | EN, ID, AR, DE, FR, ES, RU, TR, PT, VI, TH, JA, IT, PL, KO (15 ভাষা) |
| **SSStiK/SSStiKtok** | EN, ES, PT, VI, FR, ID, TH, ZH, AR, IT, JA, HI, DE, KO, TR, RU (16 ভাষা) |
| **TikMate** | EN, ID, TH, VI, TR, PT, ES (7 ভাষা) |

### যে keywords আমাদের নেই (নতুন যোগ হবে)

**1. SnapTik Brand Hijacking (~30 terms, multilingual)**
- snaptik.app, snap tik app, snaptik video downloader, snaptik tiktok downloader
- snaptik ID (Indonesian), snaptik Deutsch, snaptik francais
- snaptik slideshow download, snaptik photo download
- snaptik not working, snaptik alternative [language], snaptik vs anytt
- Italian: "snaptik italiano", Polish: "snaptik pobierz", Korean: "스냅틱", Japanese: "スナップティック"

**2. SSStiK Brand Hijacking (~30 terms, multilingual)**
- ssstik.io, ssstik download, ssstik video downloader, ssstiktok.io
- ssstik mp3, ssstik mp4, ssstik story download
- ssstik not working, ssstik down, ssstik proxy, ssstik alternative
- ssstik Indonesia, ssstik Vietnam, ssstik Thai
- Chinese: "ssstik下载", Korean: "ssstik 다운로드", Japanese: "ssstikダウンロード"

**3. TikMate Brand Hijacking (~25 terms)**
- tikmate.app, tikmate online, tikmate download, tikmate video downloader
- tikmate no watermark, tikmate mp3, tikmate HD
- tikmate not working, tikmate alternative, tikmate vs anytt
- tikmate apk, tikmate app download, tikmate for iPhone

**4. New Language Keywords - Italian (~15 terms)**
- scaricare video TikTok, scaricare TikTok senza filigrana, TikTok downloader italiano
- scaricare video TikTok gratis, salvare video TikTok, TikTok mp3 scaricare
- snaptik alternativa italiano, ssstik alternativa italiano

**5. New Language Keywords - Polish (~15 terms)**
- pobierz wideo TikTok, TikTok bez znaku wodnego, pobierz TikTok za darmo
- TikTok downloader polski, zapisz wideo TikTok, TikTok mp3 pobierz
- snaptik alternatywa, ssstik alternatywa

**6. New Language Keywords - Korean (~15 terms)**
- 틱톡 다운로드, 틱톡 워터마크 없이, 틱톡 동영상 저장, 틱톡 mp3 다운로드
- 스냅틱 대안, ssstik 대안, 틱톡 다운로더 무료

**7. New Language Keywords - Japanese (~15 terms)**
- TikTok動画ダウンロード, TikTokウォーターマークなし, TikTok保存
- TikTok mp3ダウンロード, スナップティック代替, TikTokダウンローダー無料

**8. Cross-competitor "vs" and comparison keywords (~20 terms)**
- snaptik vs ssstik, snaptik vs tikmate, ssstik vs tikmate
- snaptik vs anytt, ssstik vs anytt, tikmate vs anytt
- best tiktok downloader snaptik or ssstik
- snaptik ssstik tikmate comparison 2026

## ফাইল পরিবর্তন

### 1. `src/lib/seo-config.ts`

**নতুন categories যোগ:**
- `snaptikCompetitor` (~30 multilingual brand hijacking terms)
- `ssstikCompetitor` (~30 multilingual brand hijacking terms)  
- `tikmateCompetitor` (~25 brand hijacking terms)
- `competitorComparison` (~20 "vs" and comparison terms)

**`allTiktokKeywords` array আপডেট:**
- নতুন 4টি category include করা

### 2. `src/lib/worldwide-keywords.ts`

**নতুন arrays যোগ:**
- `italianKeywords` (~15 terms) - Italian market (snaptik/ssstik উভয়ই target করে)
- `polishKeywords` (~15 terms) - Polish market (snaptik target করে)
- `koreanKeywords` (~15 terms) - Korean market (snaptik/ssstik উভয়ই target করে)
- `japaneseKeywords` (~15 terms) - Japanese market (snaptik/ssstik উভয়ই target করে)
- `competitorBrandKeywords` (~25 terms) - Cross-language competitor brand terms

**`allWorldwideKeywords` আপডেট:**
- সব নতুন arrays push করা

## টেকনিক্যাল ডিটেইলস

```text
seo-config.ts:
  - Add snaptikCompetitor category (~30 terms)
  - Add ssstikCompetitor category (~30 terms)
  - Add tikmateCompetitor category (~25 terms)
  - Add competitorComparison category (~20 terms)
  - Wire all into allTiktokKeywords

worldwide-keywords.ts:
  - Add italianKeywords (~15 terms)
  - Add polishKeywords (~15 terms)
  - Add koreanKeywords (~15 terms)
  - Add japaneseKeywords (~15 terms)
  - Add competitorBrandKeywords (~25 terms)
  - Push all into allWorldwideKeywords
```

মোট ~200 নতুন keyword যোগ হবে, যা SnapTik (15 ভাষা), SSStiK (16 ভাষা), এবং TikMate (7 ভাষা) এর সব major market কভার করবে এবং তাদের brand terms hijack করবে। নতুন Italian, Polish, Korean, Japanese market ও যোগ হবে যেগুলো আগে ছিল না।

