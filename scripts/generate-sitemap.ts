/**
 * Auto-generates public/sitemap.xml from a single source of truth.
 *
 * - Static routes: defined in STATIC_ROUTES below (mirror src/App.tsx).
 * - Blog posts: parsed from src/lib/blog-data.ts so adding a post there
 *   automatically adds it to the sitemap on the next dev/build.
 *
 * Runs automatically via the Vite plugin in vite.config.ts (buildStart hook).
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BASE_URL = "https://anytt.cc";

type Entry = {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
};

const today = new Date().toISOString().slice(0, 10);

const STATIC_ROUTES: Entry[] = [
  { path: "/", lastmod: today, changefreq: "daily", priority: "1.0" },
  { path: "/tiktok-downloader", lastmod: today, changefreq: "weekly", priority: "0.9" },
  { path: "/pinterest-downloader", lastmod: today, changefreq: "weekly", priority: "0.9" },
  { path: "/tiktok-profile-downloader", lastmod: today, changefreq: "weekly", priority: "0.9" },
  { path: "/pinterest-faq", lastmod: today, changefreq: "monthly", priority: "0.8" },
  { path: "/es/descargar-tiktok", lastmod: today, changefreq: "weekly", priority: "0.9" },
  { path: "/pt/baixar-tiktok", lastmod: today, changefreq: "weekly", priority: "0.9" },
  { path: "/id/unduh-tiktok", lastmod: today, changefreq: "weekly", priority: "0.9" },
  { path: "/tr/tiktok-indir", lastmod: today, changefreq: "weekly", priority: "0.9" },
  { path: "/th/tiktok-download", lastmod: today, changefreq: "weekly", priority: "0.9" },
  { path: "/vi/tai-tiktok", lastmod: today, changefreq: "weekly", priority: "0.9" },
  { path: "/bn/tiktok-download", lastmod: today, changefreq: "weekly", priority: "0.9" },
  { path: "/hi/tiktok-download", lastmod: today, changefreq: "weekly", priority: "0.9" },
  { path: "/faq", lastmod: today, changefreq: "monthly", priority: "0.8" },
  { path: "/blog", lastmod: today, changefreq: "weekly", priority: "0.8" },
  { path: "/download", lastmod: today, changefreq: "monthly", priority: "0.6" },
  { path: "/about", lastmod: today, changefreq: "monthly", priority: "0.6" },
  { path: "/privacy-policy", lastmod: "2026-01-23", changefreq: "yearly", priority: "0.4" },
  { path: "/terms-of-service", lastmod: "2026-01-23", changefreq: "yearly", priority: "0.4" },
  { path: "/dmca", lastmod: "2026-01-23", changefreq: "yearly", priority: "0.4" },
  { path: "/tg", lastmod: today, changefreq: "monthly", priority: "0.5" },
];

function parseBlogPosts(): Entry[] {
  const file = resolve(ROOT, "src/lib/blog-data.ts");
  const src = readFileSync(file, "utf-8");

  // Match each blog post object's slug and date by walking the file.
  // blog-data.ts uses `slug: "..."` and `date: "Mon DD, YYYY"` per post.
  const slugRe = /slug:\s*"([^"]+)"/g;
  const dateRe = /date:\s*"([^"]+)"/g;

  const slugs: string[] = [];
  const dates: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = slugRe.exec(src))) slugs.push(m[1]);
  while ((m = dateRe.exec(src))) dates.push(m[1]);

  return slugs.map((slug, i) => ({
    path: `/blog/${slug}`,
    lastmod: toISODate(dates[i]) ?? today,
    changefreq: "monthly" as const,
    priority: "0.7",
  }));
}

function toISODate(human?: string): string | undefined {
  if (!human) return undefined;
  const d = new Date(human);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
}

function render(entries: Entry[]): string {
  const urls = entries
    .map((e) =>
      [
        "  <url>",
        `    <loc>${BASE_URL}${e.path}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
        e.priority ? `    <priority>${e.priority}</priority>` : null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function generateSitemap(): number {
  const entries = [...STATIC_ROUTES, ...parseBlogPosts()];
  // De-duplicate by path (last wins).
  const map = new Map<string, Entry>();
  for (const e of entries) map.set(e.path, e);
  const unique = Array.from(map.values());

  const out = resolve(ROOT, "public/sitemap.xml");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(unique), "utf-8");
  return unique.length;
}

// Allow `node scripts/generate-sitemap.ts` (or tsx) to run it directly.
const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const n = generateSitemap();
  console.log(`[sitemap] wrote public/sitemap.xml (${n} entries)`);
}
