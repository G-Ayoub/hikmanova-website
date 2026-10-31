/**
 * Generates the 1200x630 share images (Open Graph / Twitter cards): English in client/public/og/, Arabic
 * (right to left, Noto Kufi Arabic embedded so any machine renders it) in client/public/og/ar/.
 * Not part of `pnpm build` because CI has no browser: run it after adding or renaming a
 * solution, service or article, then commit the PNGs.
 *
 *   pnpm og        (needs Playwright with Chromium installed locally)
 */
import { mkdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { allPaths, pageMeta } from "../client/src/data/routes";
import { ui } from "../client/src/lib/i18n";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "client", "public", "og");
const logo = `data:image/png;base64,${readFileSync(path.join(root, "client", "public", "hikmanova-logo.png")).toString("base64")}`;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const kufi = (weight: number) =>
  readFileSync(path.join(root, "node_modules", "@fontsource", "noto-kufi-arabic", "files", `noto-kufi-arabic-arabic-${weight}-normal.woff2`)).toString("base64");
const arabicFonts = [400, 600].map((w) => `@font-face { font-family: "Kufi"; font-weight: ${w}; src: url(data:font/woff2;base64,${kufi(w)}) format("woff2"); }`).join("\n");

type Lang = "en" | "ar";
const kindLabel = (kind: "page" | "solution" | "service" | "post", lang: Lang) =>
  ({ page: "", solution: ui.nav.solutions[lang], service: ui.nav.services[lang], post: ui.nav.insights[lang] })[kind];

function card(eyebrow: string, title: string, subtitle: string, lang: Lang = "en") {
  const size = title.length > 60 ? 56 : title.length > 36 ? 66 : 80;
  const ar = lang === "ar";
  return `<!doctype html><html lang="${lang}" dir="${ar ? "rtl" : "ltr"}"><head><meta charset="utf-8"><style>
  ${ar ? arabicFonts : ""}
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; font-family: -apple-system, "SF Pro Display", Inter, "Segoe UI", system-ui, sans-serif;
    color: #1D1D1F; -webkit-font-smoothing: antialiased;
    background: radial-gradient(70% 70% at 50% -15%, rgb(29 95 255 / 0.16), transparent 70%), #F5F5F7;
    padding: 72px 80px; display: flex; flex-direction: column; }
  ${ar ? `body { font-family: "Kufi", -apple-system, Inter, "Segoe UI", system-ui, sans-serif; }
  h1, p, .eyebrow { letter-spacing: 0 !important; } h1 { line-height: 1.35; } p { line-height: 1.6; }
  .brand { direction: ltr; justify-content: flex-end; }` : ""}
  .brand { display: flex; align-items: center; gap: 14px; font-size: 30px; font-weight: 600; letter-spacing: -0.02em; }
  .brand img { width: 52px; height: 52px; }
  .main { margin-top: auto; }
  .eyebrow { display: inline-flex; align-items: center; gap: 12px; color: #1D5FFF; font-size: 28px; font-weight: 600; margin-bottom: 18px; }
  .eyebrow::before { content: ""; width: 10px; height: 10px; border-radius: 50%; background: #0E9F8E; }
  h1 { font-size: ${size}px; line-height: 1.05; font-weight: 600; letter-spacing: -0.03em; max-width: 1000px; }
  p { margin-top: 22px; font-size: 30px; line-height: 1.35; color: #5F5F66; max-width: 980px; letter-spacing: -0.01em;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  </style></head><body>
    <div class="brand"><img src="${logo}" alt="">HikmaNova</div>
    <div class="main">
      ${eyebrow ? `<div class="eyebrow">${esc(eyebrow)}</div>` : ""}
      <h1>${esc(title)}</h1>
      ${subtitle ? `<p>${esc(subtitle)}</p>` : ""}
    </div>
  </body></html>`;
}

async function main() {
  const require = createRequire(import.meta.url);
  const { chromium } = require("playwright") as any;
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

  mkdirSync(path.join(outDir, "ar"), { recursive: true });
  const jobs: [string, string][] = [];
  jobs.push(["default", card("AI + IoT for North Africa & the Gulf", "Intelligent systems, built and hosted where your data lives", "")]);
  jobs.push(["ar/default", card("الذكاء الاصطناعي وإنترنت الأشياء لشمال أفريقيا والخليج", "أنظمة ذكية تُبنى وتُستضاف حيث تقيم بياناتك", "", "ar")]);
  for (const route of allPaths()) {
    const meta = pageMeta(route);
    if (!meta || meta.kind === "page") continue;
    for (const lang of ["en", "ar"] as Lang[]) {
      // Solution titles are "Name — tagline"; split at the first dash only (taglines may contain one).
      const title = meta.title[lang];
      const cut = title.indexOf(" — ");
      const [name, tagline] = meta.kind === "solution" && cut > 0
        ? [title.slice(0, cut), title.slice(cut + 3)]
        : [title, meta.description[lang]];
      jobs.push([`${lang === "ar" ? "ar/" : ""}${meta.ogKey}`, card(kindLabel(meta.kind, lang), name, tagline, lang)]);
    }
  }
  for (const [key, html] of jobs) {
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(outDir, `${key}.png`) });
  }
  await browser.close();
  console.log(`wrote ${jobs.length} share images to client/public/og`);
}

main();
