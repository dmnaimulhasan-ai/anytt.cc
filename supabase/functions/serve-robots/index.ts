import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const robotsTxt = `# Anytt cc - TikTok & Pinterest Video Downloader
# https://anytt.cc
# Last updated: 2026-03-01

# Allow all crawlers
User-agent: *
Allow: /

# Core pages - explicitly allow
Allow: /tiktok-downloader
Allow: /pinterest-downloader
Allow: /pinterest-faq
Allow: /faq
Allow: /about
Allow: /blog
Allow: /blog/*
Allow: /download

# Multilingual landing pages
Allow: /es/descargar-tiktok
Allow: /pt/baixar-tiktok
Allow: /id/unduh-tiktok
Allow: /tr/tiktok-indir
Allow: /th/tiktok-download
Allow: /vi/tai-tiktok
Allow: /bn/tiktok-download
Allow: /hi/tiktok-download

# Allow CSS and JS files for proper rendering
Allow: /*.js$
Allow: /*.css$
Allow: /assets/*

# Block internal / API / temp URLs
Disallow: /api/
Disallow: /*.json$
Disallow: /*?sessionid=*
Disallow: /*?token=*
Disallow: /*?url=*

# Block pagination parameters that create duplicate content
Disallow: /*?page=*
Disallow: /*?sort=*
Disallow: /*?filter=*

# === AI Crawlers - Explicitly Allow ===

# OpenAI (ChatGPT)
User-agent: GPTBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: ChatGPT-User
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

# Google AI (Gemini, Bard)
User-agent: Google-Extended
Allow: /

# Perplexity AI
User-agent: PerplexityBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

# Anthropic (Claude)
User-agent: ClaudeBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: anthropic-ai
Allow: /

# Apple AI (Siri, etc.)
User-agent: Applebot-Extended
Allow: /

# Microsoft Copilot
User-agent: Bingbot
Allow: /

# Common Crawl (used by many AI training datasets)
User-agent: CCBot
Allow: /

# Sitemap & AI documentation
Sitemap: https://anytt.cc/sitemap.xml`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  return new Response(robotsTxt, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
});
