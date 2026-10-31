/**
 * Writes sitemap.xml and robots.txt into dist/public after `vite build`,
 * using the same route and content lists the app renders from.
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { allPaths } from "../client/src/data/routes";
import { SITE_URL } from "../client/src/const";

const outDir = path.resolve(import.meta.dirname, "..", "dist", "public");
const today = new Date().toISOString().slice(0, 10);

const urls = allPaths()
  .filter((p) => p !== "/sitemap")
  .map((p) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");

writeFileSync(
  path.join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`sitemap.xml: ${allPaths().length - 1} URLs`);
