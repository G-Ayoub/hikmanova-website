/**
 * Build-time renderer: scripts/gen-sitemap.ts calls render(path) for every route and writes the HTML
 * into that page's index.html, so crawlers that don't run JavaScript still see the full content.
 */
import { renderToString } from "react-dom/server";
import App, { pageFor } from "./App";
import { setMountingOverPrerender } from "./lib/prerender";
import { BASE } from "./lib/asset";

export async function render(path: string): Promise<string> {
  await pageFor(path).preload();
  // Render content in its final, visible state (no entrance-animation starting styles).
  setMountingOverPrerender(true);
  // wouter matches routes under the base path, so the location includes it.
  return renderToString(<App ssrPath={BASE + (path === "/" ? "/" : path)} />);
}
