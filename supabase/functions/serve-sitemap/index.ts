import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Homepage - Highest Priority -->
  <url>
    <loc>https://anytt.cc/</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- TikTok Downloader - Core Feature -->
  <url>
    <loc>https://anytt.cc/tiktok-downloader</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Pinterest Downloader - New Feature -->
  <url>
    <loc>https://anytt.cc/pinterest-downloader</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://anytt.cc/pinterest-faq</loc>
    <lastmod>2026-02-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Multilingual Landing Pages -->
  <url>
    <loc>https://anytt.cc/es/descargar-tiktok</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://anytt.cc/pt/baixar-tiktok</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://anytt.cc/id/unduh-tiktok</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- FAQ Page -->
  <url>
    <loc>https://anytt.cc/faq</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog Section -->
  <url>
    <loc>https://anytt.cc/blog</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Ultimate Guide Blog Post - Pillar Content -->
  <url>
    <loc>https://anytt.cc/blog/ultimate-tiktok-download-guide-2026-complete</loc>
    <lastmod>2026-01-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog Posts - TikTok Guides -->
  <url>
    <loc>https://anytt.cc/blog/how-to-download-tiktok-videos-without-watermark</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/download-tiktok-audio-mp3</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/best-tiktok-downloader-tools-2026</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/download-tiktok-on-iphone</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/download-tiktok-without-app</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/tiktok-video-downloader-no-watermark-2026</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/tiktok-mp3-downloader-convert-audio</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/fast-tiktok-video-downloader-hd</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/tiktok-downloader-chrome-no-extension</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/tiktok-video-downloader-android-guide</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/no-watermark-tiktok-downloader-safe</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Blog Posts - Device & Feature Specific -->
  <url>
    <loc>https://anytt.cc/blog/tiktok-downloader-iphone-15-16-guide</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/download-tiktok-slideshows-photo-videos</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/tiktok-batch-downloader-multiple-videos</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/download-tiktok-live-videos-streams</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/tiktok-to-gif-converter-guide</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/download-tiktok-safari-browser-guide</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/tiktok-downloader-windows-11-pc</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/fix-tiktok-sound-not-downloading</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/download-tiktok-stories-feature</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/snaptik-ssstik-alternatives-comparison</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Blog Posts - Competitor Keywords -->
  <url>
    <loc>https://anytt.cc/blog/tikmate-alternative-best-tiktok-downloader</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/savett-alternative-tiktok-downloader</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/musically-downloader-tiktok-video-saver</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/tiktok-video-saver-app-alternative</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/snaptik-alternative-tiktok-downloader-2026</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/tiktok-seo-tips-creators-2026</loc>
    <lastmod>2026-02-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Pinterest Blog Posts -->
  <url>
    <loc>https://anytt.cc/blog/how-to-download-pinterest-videos-free</loc>
    <lastmod>2026-02-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/pinterest-idea-pin-download-guide</loc>
    <lastmod>2026-02-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/best-pinterest-video-downloaders-2026</loc>
    <lastmod>2026-02-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Turkish TikTok Downloader -->
  <url>
    <loc>https://anytt.cc/tr/tiktok-indir</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Thai TikTok Downloader -->
  <url>
    <loc>https://anytt.cc/th/tiktok-download</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Vietnamese TikTok Downloader -->
  <url>
    <loc>https://anytt.cc/vi/tai-tiktok</loc>
    <lastmod>2026-02-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Bengali TikTok Downloader -->
  <url>
    <loc>https://anytt.cc/bn/tiktok-download</loc>
    <lastmod>2026-02-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Hindi TikTok Downloader -->
  <url>
    <loc>https://anytt.cc/hi/tiktok-download</loc>
    <lastmod>2026-02-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- New Blog Posts -->
  <url>
    <loc>https://anytt.cc/blog/tiktok-downloader-2026-free-no-watermark-hd</loc>
    <lastmod>2026-02-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://anytt.cc/blog/anytt-cc-vs-snaptik-vs-ssstik-comparison</loc>
    <lastmod>2026-02-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Download Page -->
  <url>
    <loc>https://anytt.cc/download</loc>
    <lastmod>2026-02-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- About Page -->
  <url>
    <loc>https://anytt.cc/about</loc>
    <lastmod>2026-02-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Legal Pages -->
  <url>
    <loc>https://anytt.cc/privacy-policy</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>https://anytt.cc/terms-of-service</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>https://anytt.cc/dmca</loc>
    <lastmod>2026-01-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>

</urlset>`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  return new Response(sitemapXml, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
});
