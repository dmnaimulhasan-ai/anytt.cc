export const BASE_URL = "https://anytt.cc";

export const seoConfig = {
  home: {
    title: "AnyTT - Free Video Downloader | TikTok, Facebook Without Watermark 2025",
    description: "Download TikTok and Facebook videos without watermark in HD quality. Free online video downloader - no registration, works on iPhone, Android & PC. Save videos instantly!",
    keywords: "video downloader, TikTok downloader, Facebook video downloader, download without watermark, HD video download, free video saver, AnyTT, TikTok video download, Facebook Reels download, video downloader 2025",
  },
  tiktok: {
    title: "TikTok Video Downloader - Download TikTok Without Watermark Free 2025",
    description: "Free TikTok video downloader. Save TikTok videos without watermark in HD quality. Works on iPhone, Android, and PC. No registration required. Batch download up to 100 videos!",
    keywords: "TikTok downloader, download TikTok video, TikTok without watermark, save TikTok, TikTok MP4, TikTok HD download, TikTok video saver, batch TikTok download, sssTikTok, SnapTik alternative",
  },
  youtube: {
    title: "YouTube Video Downloader - Download YouTube Videos Free HD 2025",
    description: "Free YouTube video downloader. Download YouTube videos in HD, Full HD, and 4K quality. Save YouTube Shorts, music videos, and more. Fast, free, and easy to use!",
    keywords: "YouTube downloader, download YouTube video, YouTube to MP4, YouTube HD download, YouTube Shorts downloader, save YouTube video, free YouTube download, Y2Mate alternative",
  },
  facebook: {
    title: "Facebook Video Downloader - Download FB Videos HD Free 2025",
    description: "Free Facebook video downloader. Download Facebook videos, Reels, and Stories in HD quality. Works on all devices. No login required. Save FB videos instantly!",
    keywords: "Facebook video downloader, download Facebook video, FB video saver, Facebook Reels download, Facebook HD video, save Facebook video, FB downloader, FBDown alternative",
  },
  about: {
    title: "About AnyTT - Free Video Downloader for TikTok & Facebook",
    description: "AnyTT is a free online video downloader supporting TikTok and Facebook. Download videos without watermark in HD quality. Trusted by 5000+ daily users worldwide.",
    keywords: "about AnyTT, video downloader, TikTok Facebook downloader, free video download service, AnyTT features, best video downloader 2025",
  },
};

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
  "description": "Free online video downloader for TikTok and Facebook. Download videos without watermark in HD quality.",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Requires JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Person",
    "name": "NAIMUL"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "18500",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "Download TikTok videos without watermark",
    "Download Facebook videos and Reels",
    "Batch download support up to 100 videos",
    "No registration required",
    "Works on iPhone, Android, and PC",
    "Free forever with no limits"
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
  "description": "AnyTT is a free online video downloader for TikTok and Facebook videos without watermark.",
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
    "reviewCount": "18500",
    "bestRating": "5",
    "worstRating": "1"
  }
});
