/**
 * Runs after `vite build`. Using the same route and content lists the app renders from, it:
 * - copies index.html to <route>/index.html for every page, so GitHub Pages answers deep
 *   links with HTTP 200 instead of serving 404.html (which search engines would not index);
 * - writes 404.html for unknown URLs;
 * - writes sitemap.xml and robots.txt.
 */
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { allPaths } from "../client/src/data/routes";
import { SITE_URL } from "../client/src/const";

const outDir = path.resolve(import.meta.dirname, "..", "dist", "public");
const today = new Date().toISOString().slice(0, 10);
const indexHtml = path.join(outDir, "index.html");

for (const route of allPaths()) {
  if (route === "/") continue;
  const dir = path.join(outDir, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(indexHtml, path.join(dir, "index.html"));
}
copyFileSync(indexHtml, path.join(outDir, "404.html"));

const urls = allPaths()
  .filter((p) => p !== "/sitemap")
  .map((p) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");

writeFileSync(
  path.join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`prerendered ${allPaths().length} route entry points; sitemap.xml: ${allPaths().length - 1} URLs`);
