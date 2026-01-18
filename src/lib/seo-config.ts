export const BASE_URL = "https://anytt.cc";

/**
 * SEO Configuration for all pages
 * Optimized for maximum organic traffic with target keywords
 */
export const seoConfig = {
  home: {
    title: "AnyTT - Free TikTok & YouTube Video Downloader Without Watermark 2026",
    description: "Download TikTok & YouTube videos without watermark in HD quality. 100% free online video downloader - no registration, works on iPhone, Android & PC. Save videos instantly!",
    keywords: "video downloader, TikTok downloader, YouTube downloader, download without watermark, HD video download, free video saver, AnyTT, TikTok video download, YouTube Shorts download, video downloader 2026, snaptik alternative, y2mate alternative, savefrom alternative",
    h1: "TikTok & YouTube Video Downloader",
    h2: "Download Videos Without Watermark in HD Quality",
    h3: ["How to Download Videos", "Why Choose AnyTT", "Frequently Asked Questions"]
  },
  tiktok: {
    title: "TikTok Video Downloader - Download TikTok Without Watermark Free 2026",
    description: "Free TikTok video downloader. Save TikTok videos without watermark in HD quality. Works on iPhone, Android, and PC. No registration required. Download TikTok MP4 & MP3!",
    keywords: "TikTok downloader, download TikTok video, TikTok without watermark, save TikTok, TikTok MP4, TikTok HD download, TikTok video saver, TikTok to MP3, sssTikTok, SnapTik alternative, TikTok download 2026, remove TikTok watermark",
    h1: "TikTok Video Downloader Without Watermark",
    h2: "Save TikTok Videos in HD Quality - Free & Fast",
    h3: ["How to Download TikTok Videos", "TikTok Audio Download", "FAQ"]
  },
  youtube: {
    title: "YouTube Video Downloader - Download YouTube Videos HD Free 2026",
    description: "Free YouTube video downloader. Download YouTube videos in HD, Full HD & 4K. Save YouTube Shorts, music videos & more. Fast, free, works on all devices!",
    keywords: "YouTube downloader, download YouTube video, YouTube to MP4, YouTube HD download, YouTube Shorts downloader, save YouTube video, YouTube 4K download, Y2Mate alternative, SaveFrom alternative, YouTube video converter, download YouTube free 2026",
    h1: "YouTube Video Downloader - HD & 4K Quality",
    h2: "Download YouTube Videos, Shorts & Music for Free",
    h3: ["How to Download YouTube Videos", "Supported Formats", "FAQ"]
  },
  about: {
    title: "About AnyTT - Free Video Downloader for TikTok & YouTube",
    description: "AnyTT is a free online video downloader supporting TikTok & YouTube. Download videos without watermark in HD quality. Trusted by 50,000+ daily users worldwide.",
    keywords: "about AnyTT, video downloader, TikTok YouTube downloader, free video download service, AnyTT features, best video downloader 2026",
    h1: "About AnyTT Video Downloader",
    h2: "The Fastest Free Video Downloader Online",
    h3: ["Our Features", "Why Users Love Us", "Contact Us"]
  },
  faq: {
    title: "FAQ - AnyTT Video Downloader | Common Questions Answered",
    description: "Get answers to common questions about downloading TikTok & YouTube videos with AnyTT. Learn how to save videos without watermark on any device.",
    keywords: "AnyTT FAQ, video downloader help, TikTok download questions, YouTube download help, how to download videos, video saver FAQ, download troubleshooting",
    h1: "Frequently Asked Questions",
    h2: "Everything You Need to Know About AnyTT",
    h3: ["General Questions", "Platform-Specific Questions", "Technical Support"]
  }
};

/**
 * Image Alt Text Templates
 */
export const altTexts = {
  logo: "AnyTT - Free Video Downloader Logo",
  tiktokIcon: "TikTok video downloader icon - download TikTok without watermark",
  youtubeIcon: "YouTube video downloader icon - save YouTube videos HD",
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
  youtube: { path: "/youtube-downloader", anchor: "YouTube Video Downloader" },
  faq: { path: "/faq", anchor: "FAQ - Common Questions" },
  about: { path: "/about", anchor: "About AnyTT" },
  blog: { path: "/blog", anchor: "Video Download Tips & Guides" },
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
  "name": "AnyTT Video Downloader",
  "url": BASE_URL,
  "description": "Free online video downloader for TikTok and YouTube. Download videos without watermark in HD quality.",
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
    "name": "AnyTT"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "52000",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "Download TikTok videos without watermark",
    "Download YouTube videos in HD and 4K",
    "No registration required",
    "Works on iPhone, Android, and PC",
    "Free forever with no limits",
    "MP3 audio extraction support"
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
  "name": "AnyTT",
  "url": BASE_URL,
  "logo": `${BASE_URL}/pwa-512x512.png`,
  "description": "AnyTT is a free online video downloader for TikTok and YouTube videos without watermark.",
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
  "name": "AnyTT Video Downloader",
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
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Copy Video Link",
      "text": `Open ${platform} and copy the video URL you want to download`
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
