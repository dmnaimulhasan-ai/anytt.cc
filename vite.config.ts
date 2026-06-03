import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import { generateSitemap } from "./scripts/generate-sitemap";

// Regenerates public/sitemap.xml on dev start and build so new routes / blog
// posts are picked up automatically without manual edits.
function sitemapPlugin(): Plugin {
  return {
    name: "anytt-generate-sitemap",
    buildStart() {
      try {
        const n = generateSitemap();
        this.info?.(`[sitemap] wrote public/sitemap.xml (${n} entries)`);
      } catch (err) {
        this.warn?.(`[sitemap] generation failed: ${(err as Error).message}`);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      // Defer SW registration to avoid render-blocking
      injectRegister: null,
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        // Exclude sitemap.xml, robots.txt and other SEO files from service worker
        navigateFallbackDenylist: [/sitemap\.xml$/, /robots\.txt$/, /^\/tg/],
        runtimeCaching: [
          {
            // XML files (sitemap, etc.) - always fetch from network
            urlPattern: /\.xml$/i,
            handler: "NetworkOnly",
          },
          {
            // Navigation requests - always try network first, no offline fallback
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: "NetworkOnly",
          },
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
      manifest: {
        name: "Any-TT TikTok Downloader",
        short_name: "Any-TT",
        description: "Download TikTok videos without watermark",
        theme_color: "#0f0d17",
        background_color: "#0f0d17",
        display: "standalone",
        orientation: "portrait",
        start_url: "/?v=2",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
