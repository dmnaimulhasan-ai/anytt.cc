/**
 * Per-language keyword bundles for multilingual landing pages.
 * Combines localized, expanded, competitor, and 2026 trending keywords
 * from worldwide-keywords.ts to boost Google + Bing + Yandex + Baidu +
 * Naver rankings on each language route.
 */
import {
  spanishExpandedKeywords,
  portugueseExpandedKeywords,
  indonesianExpandedKeywords,
  malayKeywords,
  turkishExpandedKeywords,
  thaiMoreKeywords,
  vietnameseMoreKeywords,
  bengaliExpandedKeywords,
  bengaliMegaKeywords,
  hindiExpandedKeywords,
  hindiBeltRomanizedKeywords,
  bhojpuriKeywords,
  latamKeywords,
  globalTrending2026,
  misspellingKeywords,
  snaptikCompetitorKeywords,
  ssstikCompetitorKeywords,
  tikmateCompetitorKeywords,
  savettCompetitorKeywords,
} from "./worldwide-keywords";

// Cross-engine boosters added to every localized page
const universalBoosters = [
  ...globalTrending2026,
  ...misspellingKeywords,
  ...snaptikCompetitorKeywords,
  ...ssstikCompetitorKeywords,
  ...tikmateCompetitorKeywords,
  ...savettCompetitorKeywords,
  // Multi-engine intent
  "tiktok downloader google search",
  "tiktok downloader bing",
  "tiktok downloader yandex",
  "tiktok downloader duckduckgo",
  "tiktok downloader baidu",
  "tiktok downloader naver",
  "tiktok downloader yahoo",
  "anytt cc official",
  "anytt.cc 2026",
  "best free tiktok downloader 2026",
  "tiktok downloader no ads no popup 2026",
];

const bundles: Record<string, string[]> = {
  es: [
    ...spanishExpandedKeywords,
    ...latamKeywords,
    "descargar tiktok sin marca de agua 2026",
    "descargador tiktok españa",
    "descargar tiktok mexico",
    "descargar tiktok argentina",
    "descargar tiktok colombia",
    "descargar tiktok chile",
    "descargar tiktok peru",
    "descargar tiktok gratis online sin app 2026",
  ],
  pt: [
    ...portugueseExpandedKeywords,
    "baixar tiktok sem marca dagua 2026",
    "baixar tiktok brasil gratis",
    "baixador de tiktok portugal",
    "baixar video tiktok sem logo hd",
    "baixar audio tiktok mp3 brasil",
    "salvar tiktok no iphone brasil",
    "baixar tiktok no android brasil",
  ],
  id: [
    ...indonesianExpandedKeywords,
    ...malayKeywords,
    "download tiktok tanpa watermark 2026",
    "download tiktok mp3 gratis indonesia",
    "download video tiktok hd tanpa aplikasi",
    "cara download tiktok di iphone tanpa aplikasi",
    "download tiktok di laptop tanpa aplikasi",
    "download tiktok slideshow indonesia",
  ],
  tr: [
    ...turkishExpandedKeywords,
    "tiktok video indirme filigransız 2026",
    "tiktok mp3 indir türkçe",
    "tiktok hd indir bedava",
    "tiktok video indirici online",
    "iphone tiktok indirme uygulamasız",
    "android tiktok video kaydet",
  ],
  th: [
    ...thaiMoreKeywords,
    "โหลด tiktok ไม่มีลายน้ำ 2026",
    "ดาวน์โหลด tiktok mp3 ฟรี",
    "โหลดวิดีโอ tiktok hd ไม่มีแอป",
    "วิธีโหลด tiktok บนไอโฟน",
    "โหลด tiktok บนคอม",
    "เซฟ tiktok ลงแกลเลอรี่",
  ],
  vi: [
    ...vietnameseMoreKeywords,
    "tải tiktok không logo 2026",
    "tải nhạc tiktok mp3 miễn phí",
    "tải video tiktok hd không cần app",
    "cách tải tiktok trên iphone không cần app",
    "tải tiktok trên máy tính",
    "lưu video tiktok vào thư viện",
  ],
  bn: [
    ...bengaliExpandedKeywords,
    ...bengaliMegaKeywords,
    "টিকটক ভিডিও ডাউনলোড ওয়াটারমার্ক ছাড়া ২০২৬",
    "টিকটক এমপি৩ ডাউনলোড ফ্রি",
    "টিকটক HD ডাউনলোড অ্যাপ ছাড়া",
    "tiktok download bangla 2026",
    "tiktok downloader bangladesh no watermark",
    "tiktok mp3 download bd free",
  ],
  hi: [
    ...hindiExpandedKeywords,
    ...hindiBeltRomanizedKeywords,
    ...bhojpuriKeywords,
    "टिकटॉक वीडियो डाउनलोड बिना वॉटरमार्क 2026",
    "टिकटॉक एमपी3 डाउनलोड फ्री हिंदी",
    "टिकटॉक HD डाउनलोड बिना ऐप",
    "tiktok download kaise kare bina app 2026",
    "tiktok video downloader india hindi",
    "tiktok mp3 download hindi free",
  ],
};

export const getLangKeywordString = (lang: keyof typeof bundles): string => {
  const set = bundles[lang] ?? [];
  // Dedupe while preserving order
  const seen = new Set<string>();
  const merged: string[] = [];
  for (const k of [...set, ...universalBoosters]) {
    const key = k.toLowerCase().trim();
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(k);
    }
  }
  return merged.join(", ");
};
