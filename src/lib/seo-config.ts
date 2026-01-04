export const BASE_URL = "https://anytt.cc";

export const seoConfig = {
  home: {
    title: "AnyTT - Free Video Downloader | TikTok, YouTube, Facebook Without Watermark",
    description: "Download TikTok, YouTube, and Facebook videos without watermark in HD quality. Free online video downloader - no registration, works on all devices. Save videos instantly!",
    keywords: "video downloader, TikTok downloader, YouTube downloader, Facebook video downloader, download without watermark, HD video download, free video saver, AnyTT",
  },
  tiktok: {
    title: "TikTok Video Downloader - Download TikTok Without Watermark | AnyTT",
    description: "Free TikTok video downloader. Save TikTok videos without watermark in HD quality. Works on iPhone, Android, and PC. No registration required. Batch download supported!",
    keywords: "TikTok downloader, download TikTok video, TikTok without watermark, save TikTok, TikTok MP4, TikTok HD download, TikTok video saver, batch TikTok download",
  },
  youtube: {
    title: "YouTube Video Downloader - Download YouTube Videos Free | AnyTT",
    description: "Free YouTube video downloader. Download YouTube videos in HD, Full HD, and 4K quality. Save YouTube Shorts, music videos, and more. Fast, free, and easy to use!",
    keywords: "YouTube downloader, download YouTube video, YouTube to MP4, YouTube HD download, YouTube Shorts downloader, save YouTube video, free YouTube download",
  },
  facebook: {
    title: "Facebook Video Downloader - Download FB Videos in HD | AnyTT",
    description: "Free Facebook video downloader. Download Facebook videos, Reels, and Stories in HD quality. Works on all devices. No login required. Save FB videos instantly!",
    keywords: "Facebook video downloader, download Facebook video, FB video saver, Facebook Reels download, Facebook HD video, save Facebook video, FB downloader",
  },
  about: {
    title: "About AnyTT - Free Video Downloader for TikTok, YouTube & Facebook",
    description: "AnyTT is a free online video downloader supporting TikTok, YouTube, and Facebook. Download videos without watermark in HD quality. Learn about our features and mission.",
    keywords: "about AnyTT, video downloader, TikTok YouTube Facebook downloader, free video download service, AnyTT features",
  },
};

export const getVideoObjectSchema = (platform: string) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": `${platform} Video Download`,
  "description": `Download ${platform} videos without watermark using AnyTT free video downloader`,
  "thumbnailUrl": `${BASE_URL}/pwa-512x512.png`,
  "uploadDate": new Date().toISOString(),
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
  "description": "Free online video downloader for TikTok, YouTube, and Facebook. Download videos without watermark in HD quality.",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Any",
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
    "ratingCount": "12500",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "Download TikTok videos without watermark",
    "Download YouTube videos in HD/4K",
    "Download Facebook videos and Reels",
    "Batch download support",
    "No registration required",
    "Works on all devices"
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
  "sameAs": [
    "https://t.me/GEN_ZDownloader"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "url": "https://t.me/GEN_ZDownloader"
  }
});
