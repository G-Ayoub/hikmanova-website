import type { Language } from "@/contexts/LanguageContext";

/** Arabic pages live under this prefix (after the site base): /ar/, /ar/solutions/orbix … English has none. */
export const AR_PREFIX = "/ar";

/** Split a site path (without the base) into its language and the language-neutral page path. */
export function splitLangPath(path: string): { language: Language; path: string } {
  if (path === AR_PREFIX || path.startsWith(AR_PREFIX + "/")) {
    return { language: "ar", path: path.slice(AR_PREFIX.length) || "/" };
  }
  return { language: "en", path: path || "/" };
}

/** The site path (without the base) of a page in the given language. */
export function withLang(path: string, language: Language): string {
  if (language === "en") return path || "/";
  return AR_PREFIX + (path === "/" || !path ? "/" : path);
}
