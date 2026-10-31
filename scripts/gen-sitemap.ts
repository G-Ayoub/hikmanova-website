/**
 * Runs after `vite build`. Using the same route and content lists the app renders from, it:
 * - writes <route>/index.html (English) and ar/<route>/index.html (Arabic) for every page, each with its own
 *   lang/dir, title, description, canonical URL, hreflang alternates, Open Graph / Twitter tags and JSON-LD,
 *   plus the page content pre-rendered by dist/server (client/src/entry-server.tsx), so crawlers and link
 *   previews see the full page in the right language without running JavaScript;
 * - writes 404.html (noindex) for unknown URLs;
 * - writes sitemap.xml (both languages, with alternates) and robots.txt.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { allPaths, hasArabicVersion, HOME_TITLE, pageMeta, type PageMeta } from "../client/src/data/routes";
import { withLang } from "../client/src/lib/langPath";
import { SITE_NAME, SITE_URL } from "../client/src/const";

type Lang = "en" | "ar";
const LANGS: Lang[] = ["en", "ar"];

const outDir = path.resolve(import.meta.dirname, "..", "dist", "public");
const today = new Date().toISOString().slice(0, 10);
const template = readFileSync(path.join(outDir, "index.html"), "utf8");

const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeText = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** Public URL of a page. GitHub Pages serves <route>/index.html at "<route>/" (it redirects the bare path there). */
const urlFor = (p: string, lang: Lang = "en") => {
  const sitePath = withLang(p, lang);
  return SITE_URL + (sitePath === "/" ? "/" : `${sitePath.replace(/\/$/, "")}/`);
};
/** Meta descriptions are cut around 160 characters by search engines. */
const clip = (s: string, max = 160) => (s.length <= max ? s : s.slice(0, s.lastIndexOf(" ", max - 1)) + "…");

/** Replace the content of an existing tag in the template; fail the build if the tag is missing. */
function setTag(html: string, pattern: RegExp, replacement: string) {
  if (!pattern.test(html)) throw new Error(`index.html is missing a tag matching ${pattern}`);
  return html.replace(pattern, replacement);
}
const setMeta = (html: string, attr: "name" | "property", key: string, value: string) =>
  setTag(html, new RegExp(`<meta ${attr}="${key.replace(/[:]/g, "\\$&")}" content="[^"]*" />`), `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`);

function jsonLd(route: string, lang: Lang, meta: PageMeta, description: string): object[] {
  const url = urlFor(route, lang);
  const image = SITE_URL + meta.image;
  const title = meta.title[lang];
  const inLanguage = lang;
  const publisher = { "@type": "Organization", name: SITE_NAME, url: urlFor("/") };
  const items: object[] = [];
  if (meta.kind === "post") {
    items.push({
      "@context": "https://schema.org", "@type": "Article", headline: title, description, image, url, inLanguage,
      datePublished: meta.date, author: { "@type": "Organization", name: meta.author ?? SITE_NAME }, publisher,
    });
  } else if (meta.kind === "service") {
    items.push({ "@context": "https://schema.org", "@type": "Service", name: title, description, url, image, inLanguage, provider: publisher, areaServed: ["GB", "FR", "DZ", "SA", "QA"] });
  } else if (meta.kind === "solution") {
    items.push({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: meta.name ?? title, description, url, image, inLanguage, applicationCategory: "BusinessApplication", publisher });
  }
  if (meta.parent) {
    items.push({
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: urlFor("/", lang) },
        { "@type": "ListItem", position: 2, name: meta.parent.label[lang], item: urlFor(meta.parent.path, lang) },
        { "@type": "ListItem", position: 3, name: title, item: url },
      ],
    });
  }
  return items;
}

function renderPage(route: string, lang: Lang, body: string): string {
  const meta = pageMeta(route);
  if (!meta) throw new Error(`No page meta for ${route}`);
  const bilingual = hasArabicVersion(route);
  // An Arabic page without a real translation is kept out of search and points at the English page.
  const indexable = lang === "en" || bilingual;
  const title = meta.title[lang] ? `${meta.title[lang]} | ${SITE_NAME}` : HOME_TITLE[lang];
  const description = clip(meta.description[lang]);
  const canonical = indexable ? urlFor(route, lang) : urlFor(route, "en");
  const image = SITE_URL + meta.image;

  let html = template;
  html = setTag(html, /<html lang="[^"]*">/, `<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">`);
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${escapeText(title)}</title>`);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "name", "robots", indexable ? "index, follow" : "noindex, follow");
  html = setTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`);
  html = setMeta(html, "property", "og:type", meta.kind === "post" ? "article" : "website");
  html = setMeta(html, "property", "og:locale", lang === "ar" ? "ar_AR" : "en_US");
  html = setMeta(html, "property", "og:locale:alternate", lang === "ar" ? "en_US" : "ar_AR");
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", canonical);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);
  html = setMeta(html, "name", "twitter:image", image);

  const head: string[] = [];
  if (bilingual) {
    head.push(
      `    <link rel="alternate" hreflang="en" href="${urlFor(route, "en")}" />`,
      `    <link rel="alternate" hreflang="ar" href="${urlFor(route, "ar")}" />`,
      `    <link rel="alternate" hreflang="x-default" href="${urlFor(route, "en")}" />`,
    );
  }
  if (indexable) {
    for (const o of jsonLd(route, lang, meta, description)) {
      head.push(`    <script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`);
    }
  }
  if (head.length) html = html.replace("</head>", `${head.join("\n")}\n  </head>`);
  html = setTag(html, /<div id="root"><\/div>/, `<div id="root">${body}</div>`);
  return html;
}

async function main() {
  const serverEntry = path.resolve(import.meta.dirname, "..", "dist", "server", "entry-server.js");
  const { render } = (await import(pathToFileURL(serverEntry).href)) as { render: (p: string, lang: Lang) => Promise<string> };
  const paths = allPaths();
  let pages = 0;
  for (const route of paths) {
    for (const lang of LANGS) {
      const body = await render(route, lang);
      if (!body.includes("<h1")) throw new Error(`Pre-rendered ${lang} ${route} has no <h1>; check the route renders`);
      const sitePath = withLang(route, lang);
      const dir = sitePath === "/" ? outDir : path.join(outDir, sitePath);
      mkdirSync(dir, { recursive: true });
      writeFileSync(path.join(dir, "index.html"), renderPage(route, lang, body));
      pages++;
    }
  }
  writeFileSync(path.join(outDir, "404.html"), setMeta(template, "name", "robots", "noindex"));

  // Sitemap: every indexable page, each listing its language alternates.
  const entries: string[] = [];
  for (const route of paths.filter((p) => p !== "/sitemap")) {
    const bilingual = hasArabicVersion(route);
    const alternates = bilingual
      ? ["en", "ar"].map((l) => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(route, l as Lang)}"/>`).join("") +
        `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(route, "en")}"/>`
      : "";
    for (const lang of bilingual ? LANGS : (["en"] as Lang[])) {
      entries.push(`  <url>\n    <loc>${urlFor(route, lang)}</loc>\n    <lastmod>${today}</lastmod>${alternates}\n  </url>`);
    }
  }
  writeFileSync(
    path.join(outDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`,
  );
  writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  console.log(`pre-rendered ${pages} pages (${paths.length} in English and Arabic); sitemap.xml: ${entries.length} URLs`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
