export const BASE_URL = "https://anytt.cc";

/**
 * SEO Configuration for all pages
 * Optimized for maximum organic traffic with target keywords
 */
/**
 * Multilingual branded keywords for global SEO reach
 */
export const brandedKeywords = {
  // Primary branded keywords
  primary: "anytt cc, anytt, anytt.cc, any tt cc, anytt downloader, tt cc, anytt video downloader, anytt tiktok",
  // Multilingual variations
  spanish: "anytt cc descargar tiktok, anytt descargador de videos, descargar tiktok sin marca de agua",
  portuguese: "anytt cc baixar tiktok, anytt baixar video tiktok, baixar tiktok sem marca d'agua",
  french: "anytt cc télécharger tiktok, anytt téléchargeur vidéo, télécharger tiktok sans filigrane",
  german: "anytt cc tiktok herunterladen, anytt video downloader, tiktok ohne wasserzeichen",
  indonesian: "anytt cc unduh tiktok, anytt download video tiktok, unduh tiktok tanpa watermark",
  hindi: "anytt cc tiktok download, anytt वीडियो डाउनलोडर, टिकटॉक वीडियो डाउनलोड",
  arabic: "anytt cc تحميل تيك توك, anytt تنزيل فيديو, تحميل تيك توك بدون علامة مائية",
  russian: "anytt cc скачать тикток, anytt загрузчик видео, скачать тикток без водяного знака",
  japanese: "anytt cc tiktokダウンロード, anytt 動画ダウンローダー, tiktok透かしなし",
  korean: "anytt cc 틱톡 다운로드, anytt 동영상 다운로더, 틱톡 워터마크 없이"
};

export const seoConfig = {
  home: {
    title: "Anytt cc - Free TikTok Video Downloader Without Watermark 2026",
    description: "Anytt cc - #1 TikTok video downloader. Download TikTok videos without watermark in HD quality. 100% free, no registration. Works on iPhone, Android & PC. Save TikTok videos instantly with anytt cc!",
    keywords: `${brandedKeywords.primary}, ${brandedKeywords.spanish}, ${brandedKeywords.portuguese}, ${brandedKeywords.indonesian}, tiktok downloader, tiktok video downloader, download tiktok video, tiktok no watermark, save tiktok video, tiktok saver, snaptik, ssstik, tiktok download, tiktok mp4, tiktok to mp3, tikmate, tiktok video saver, tiktok hd download, tiktok downloader online, download tiktok without watermark, tiktok video download free, tiktok audio download, douyin downloader, tiktok slideshow download, tiktok story download, save tiktok without logo, tiktok converter, download tiktok 4k`,
    h1: "Anytt cc - TikTok Video Downloader",
    h2: "Download TikTok Videos Without Watermark in HD Quality",
    h3: ["How to Download Videos", "Why Choose Anytt cc", "Frequently Asked Questions"]
  },
  tiktok: {
    title: "Anytt cc TikTok Downloader - Download Free TikTok Video Without Watermark 2026",
    description: "Anytt cc - The best free TikTok video downloader. Save TikTok videos without watermark in HD. Works on iPhone, Android, PC. No registration. Download TikTok MP4 & MP3 with anytt cc!",
    keywords: `${brandedKeywords.primary}, ${brandedKeywords.french}, ${brandedKeywords.german}, ${brandedKeywords.arabic}, tiktok downloader, tiktok video downloader, download tiktok without watermark, tiktok no watermark, save tiktok, tiktok mp4 download, tiktok hd download, tiktok video saver, tiktok to mp3, snaptik alternative, ssstiktok, tikmate, tiktok download 2026, remove tiktok watermark, tiktok audio extractor, tiktok sound download, download tiktok iphone, download tiktok android, tiktok batch download, tiktok slideshow saver, tiktok reels download, tiktok story saver, tiktok 1080p download`,
    h1: "Anytt cc - TikTok Video Downloader Without Watermark",
    h2: "Save TikTok Videos in HD Quality - Free & Fast",
    h3: ["How to Download TikTok Videos", "TikTok Audio Download", "FAQ"]
  },
  about: {
    title: "About Anytt cc - Best Free TikTok Video Downloader 2026",
    description: "Anytt cc is the #1 free TikTok video downloader trusted by millions worldwide. Download TikTok videos without watermark in HD. Fast, free, no registration required. Learn about anytt cc!",
    keywords: `${brandedKeywords.primary}, ${brandedKeywords.hindi}, ${brandedKeywords.russian}, about anytt cc, tiktok downloader, best tiktok downloader, free tiktok saver, tiktok video download service, anytt cc features, top tiktok downloader 2026, trusted tiktok tool`,
    h1: "About Anytt cc Video Downloader",
    h2: "The Fastest Free TikTok Video Downloader Online",
    h3: ["Our Features", "Why Users Love Anytt cc", "Contact Us"]
  },
  faq: {
    title: "Anytt cc FAQ - TikTok Downloader Help | How to Download TikTok Videos",
    description: "Get answers about Anytt cc TikTok video downloader. Learn how to save TikTok on iPhone, Android, PC without watermark. Free anytt cc guide and troubleshooting tips!",
    keywords: `${brandedKeywords.primary}, ${brandedKeywords.japanese}, ${brandedKeywords.korean}, tiktok downloader faq, how to download tiktok, save tiktok video help, tiktok download guide, anytt cc tutorial, download tiktok iphone, download tiktok android, tiktok no watermark how`,
    h1: "Anytt cc - Frequently Asked Questions",
    h2: "Everything You Need to Know About Anytt cc",
    h3: ["General Questions", "TikTok Questions", "Technical Support"]
  }
};

/**
 * Image Alt Text Templates
 */
export const altTexts = {
  logo: "AnyTT - Free TikTok Video Downloader Logo",
  tiktokIcon: "TikTok video downloader icon - download TikTok without watermark",
  downloadButton: "Download video button - save HD video without watermark",
  thumbnail: (platform: string, title: string) => `${platform} video thumbnail - ${title}`,
  step: (num: number, action: string) => `Step ${num}: ${action} - AnyTT video download guide`
};

/**
 * Internal Linking Strategy
 */
export const internalLinks = {
  home: { path: "/", anchor: "AnyTT Video Downloader" },
  tiktok: { path: "/tiktok-downloader", anchor: "TikTok Video Downloader" },
  faq: { path: "/faq", anchor: "FAQ - Common Questions" },
  about: { path: "/about", anchor: "About AnyTT" },
  blog: { path: "/blog", anchor: "TikTok Download Tips & Guides" },
  privacy: { path: "/privacy-policy", anchor: "Privacy Policy" },
  terms: { path: "/terms-of-service", anchor: "Terms of Service" },
  dmca: { path: "/dmca", anchor: "DMCA Policy" }
};

/**
 * Schema.org Structured Data Generators
 */
export const getVideoObjectSchema = (platform: string) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": `${platform} Video Download`,
  "description": `Download ${platform} videos without watermark using AnyTT free video downloader`,
  "thumbnailUrl": `${BASE_URL}/pwa-512x512.png`,
  "uploadDate": "2024-01-01T00:00:00Z",
  "publisher": {
    "@type": "Organization",
    "name": "AnyTT",
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/pwa-192x192.png`
    }
  }
});

export const getWebApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Anytt cc - TikTok Video Downloader",
  "alternateName": ["Anytt cc", "AnyTT", "anytt.cc", "any tt cc", "anytt downloader", "anytt video downloader", "tt cc"],
  "url": BASE_URL,
  "description": "Anytt cc - The #1 free online TikTok video downloader. Download TikTok videos without watermark in HD quality with anytt cc.",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Requires JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "Anytt cc"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "58000",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "Anytt cc - Download TikTok videos without watermark",
    "Anytt cc TikTok video downloader - HD quality",
    "No registration required - use anytt cc instantly",
    "Works on iPhone, Android, and PC",
    "Free forever with no limits",
    "MP3 audio extraction with anytt cc"
  ]
});

export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Anytt cc",
  "alternateName": ["Anytt cc", "AnyTT", "anytt.cc", "any tt cc", "anytt downloader", "anytt video downloader", "tt cc", "anytt tiktok"],
  "url": BASE_URL,
  "logo": `${BASE_URL}/pwa-512x512.png`,
  "description": "Anytt cc is the #1 free online TikTok video downloader. Download TikTok videos without watermark in HD quality with anytt cc.",
  "foundingDate": "2024",
  "sameAs": [
    "https://t.me/GEN_ZDownloader"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "url": "https://t.me/GEN_ZDownloader"
  }
});

export const getSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Anytt cc - TikTok Video Downloader",
  "alternateName": ["Anytt cc", "AnyTT", "anytt.cc"],
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "52000",
    "bestRating": "5",
    "worstRating": "1"
  }
});

export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const getHowToSchema = (platform: string) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": `How to Download ${platform} Videos Without Watermark`,
  "description": `Step-by-step guide to download ${platform} videos for free using AnyTT`,
  "image": `${BASE_URL}/pwa-512x512.png`,
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "tool": {
    "@type": "HowToTool",
    "name": "AnyTT Video Downloader"
  },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Copy Video Link",
      "text": `Open ${platform} and copy the video URL you want to download`,
      "image": `${BASE_URL}/pwa-192x192.png`
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Paste URL",
      "text": "Paste the video URL into AnyTT's download box"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Download Video",
      "text": "Click the Download button and save your video in HD quality"
    }
  ],
  "totalTime": "PT1M"
});

/**
 * Article Schema for Blog Posts
 */
export const getArticleSchema = (article: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.image || `${BASE_URL}/pwa-512x512.png`,
  "author": {
    "@type": "Organization",
    "name": article.author || "AnyTT"
  },
  "publisher": {
    "@type": "Organization",
    "name": "AnyTT",
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/pwa-192x192.png`
    }
  },
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${BASE_URL}/blog/${article.slug}`
  }
});

/**
 * WebSite Schema with SearchAction for Sitelinks Search Box
 */
export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Anytt cc",
  "alternateName": [
    "Anytt cc", "AnyTT", "anytt.cc", "any tt cc", "anytt downloader", "anytt video downloader", "tt cc",
    "Anytt cc TikTok Video Downloader", "anytt tiktok downloader",
    // Multilingual variations
    "anytt cc descargar tiktok", "anytt cc baixar tiktok", "anytt cc télécharger tiktok",
    "anytt cc tiktok herunterladen", "anytt cc unduh tiktok"
  ],
  "url": BASE_URL,
  "description": "Anytt cc - The #1 free online TikTok video downloader. Download TikTok videos without watermark in HD quality with anytt cc.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

/**
 * ItemList Schema for Blog Index
 */
export const getItemListSchema = (items: Array<{ name: string; url: string; position: number }>) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": items.map(item => ({
    "@type": "ListItem",
    "position": item.position,
    "name": item.name,
    "url": item.url
  }))
});

/**
 * LocalBusiness/Service Schema (optional, for trust)
 */
export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "TikTok Video Download Service",
  "provider": {
    "@type": "Organization",
    "name": "AnyTT"
  },
  "description": "Free online TikTok video downloading service without watermark",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "TikTok Video Download Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "TikTok Video Download"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "TikTok Audio Download (MP3)"
        }
      }
    ]
  }
});
