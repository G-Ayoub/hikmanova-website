/**
 * Prefix a root-relative public file path ("/images/x.jpg") with the
 * deployment base path (e.g. "/hikmanova-website"), so assets resolve
 * when the site is served from a sub-folder. Absolute URLs pass through.
 */
// import.meta.env only exists under Vite; build scripts run with tsx (they never need the base).
export const BASE = (import.meta.env?.BASE_URL ?? "/").replace(/\/$/, "");

export function asset(path: string): string {
  return path.startsWith("/") && !path.startsWith("//") ? BASE + path : path;
}
