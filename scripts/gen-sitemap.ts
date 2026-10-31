/**
 * Runs after `vite build`. Using the same route and content lists the app renders from, it:
 * - writes <route>/index.html for every page with that page's own title, description, canonical URL,
 *   Open Graph / Twitter tags and JSON-LD, plus the page content pre-rendered by dist/server
 *   (client/src/entry-server.tsx), so crawlers and link previews (WhatsApp, LinkedIn, X) see the full
 *   page without running JavaScript, and GitHub Pages answers deep links with HTTP 200;
 * - writes 404.html (noindex) for unknown URLs;
 * - writes sitemap.xml and robots.txt.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { allPaths, HOME_TITLE, pageMeta, type PageMeta } from "../client/src/data/routes";
import { SITE_NAME, SITE_URL } from "../client/src/const";

const outDir = path.resolve(import.meta.dirname, "..", "dist", "public");
const today = new Date().toISOString().slice(0, 10);
const template = readFileSync(path.join(outDir, "index.html"), "utf8");

const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeText = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** Public URL of a page. GitHub Pages serves <route>/index.html at "<route>/" (it redirects the bare path there). */
const urlFor = (p: string) => SITE_URL + (p === "/" ? "/" : `${p}/`);
/** Meta descriptions are cut around 160 characters by search engines. */
const clip = (s: string, max = 160) => (s.length <= max ? s : s.slice(0, s.lastIndexOf(" ", max - 1)) + "…");

/** Replace the content of an existing tag in the template; fail the build if the tag is missing. */
function setTag(html: string, pattern: RegExp, replacement: string) {
  if (!pattern.test(html)) throw new Error(`index.html is missing a tag matching ${pattern}`);
  return html.replace(pattern, replacement);
}
const setMeta = (html: string, attr: "name" | "property", key: string, value: string) =>
  setTag(html, new RegExp(`<meta ${attr}="${key.replace(/[:]/g, "\\$&")}" content="[^"]*" />`), `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`);

function jsonLd(route: string, meta: PageMeta, title: string, description: string): object[] {
  const url = urlFor(route);
  const image = SITE_URL + meta.image;
  const publisher = { "@type": "Organization", name: SITE_NAME, url: urlFor("/") };
  const items: object[] = [];
  if (meta.kind === "post") {
    items.push({
      "@context": "https://schema.org", "@type": "Article", headline: meta.title.en, description, image, url,
      datePublished: meta.date, author: { "@type": "Organization", name: meta.author ?? SITE_NAME }, publisher,
    });
  } else if (meta.kind === "service") {
    items.push({ "@context": "https://schema.org", "@type": "Service", name: meta.title.en, description, url, image, provider: publisher, areaServed: ["DZ", "SA", "QA", "FR"] });
  } else if (meta.kind === "solution") {
    items.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: meta.name ?? title, description, url, image, applicationCategory: "BusinessApplication", publisher });
  }
  if (meta.parent) {
    items.push({
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: urlFor("/") },
        { "@type": "ListItem", position: 2, name: meta.parent.label.en, item: urlFor(meta.parent.path) },
        { "@type": "ListItem", position: 3, name: meta.title.en, item: url },
      ],
    });
  }
  return items;
}

function renderHead(route: string, body: string): string {
  const meta = pageMeta(route);
  if (!meta) throw new Error(`No page meta for ${route}`);
  const title = meta.title.en ? `${meta.title.en} | ${SITE_NAME}` : HOME_TITLE.en;
  const description = clip(meta.description.en);
  const url = urlFor(route);
  const image = SITE_URL + meta.image;

  let html = template;
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${escapeText(title)}</title>`);
  html = setMeta(html, "name", "description", description);
  html = setTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  html = setMeta(html, "property", "og:type", meta.kind === "post" ? "article" : "website");
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);
  html = setMeta(html, "name", "twitter:image", image);
  const ld = jsonLd(route, meta, meta.title.en, description)
    .map((o) => `    <script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`)
    .join("\n");
  if (ld) html = html.replace("</head>", `${ld}\n  </head>`);
  html = setTag(html, /<div id="root"><\/div>/, `<div id="root">${body}</div>`);
  return html;
}

async function main() {
  const serverEntry = path.resolve(import.meta.dirname, "..", "dist", "server", "entry-server.js");
  const { render } = (await import(pathToFileURL(serverEntry).href)) as { render: (p: string) => Promise<string> };
  const paths = allPaths();
  for (const route of paths) {
    const body = await render(route);
    if (!body.includes("<h1")) throw new Error(`Pre-rendered ${route} has no <h1>; check the route renders`);
    const dir = route === "/" ? outDir : path.join(outDir, route);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "index.html"), renderHead(route, body));
  }
  writeFileSync(
    path.join(outDir, "404.html"),
    setMeta(template, "name", "robots", "noindex"),
  );

  const urls = paths
    .filter((p) => p !== "/sitemap")
    .map((p) => `  <url><loc>${urlFor(p)}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n");
  writeFileSync(
    path.join(outDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  console.log(`pre-rendered ${paths.length} pages with per-page meta; sitemap.xml: ${paths.length - 1} URLs`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
