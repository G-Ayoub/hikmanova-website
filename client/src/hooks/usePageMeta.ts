import { useEffect } from "react";
import { SITE_NAME, SITE_URL } from "@/const";
import { BASE } from "@/lib/asset";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets the document title, description, canonical URL and Open Graph tags
 * for the current page. Call once at the top of every page component.
 */
export function usePageMeta(
  title: string,
  description?: string,
  /**
   * canonicalPath: site path (without base) of the preferred version; noindex: keep this page out of search;
   * fullTitle: complete title used as-is (no " | HikmaNova" suffix), e.g. for Home.
   */
  options: { canonicalPath?: string; noindex?: boolean; fullTitle?: string } = {},
) {
  const { canonicalPath, noindex = false, fullTitle: fixedTitle } = options;
  useEffect(() => {
    const fullTitle = fixedTitle ?? (title ? `${title} | ${SITE_NAME}` : SITE_NAME);
    document.title = fullTitle;
    setMeta("property", "og:title", fullTitle);

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
    }

    // Same form as the pre-rendered pages: GitHub Pages serves each page at "<route>/".
    const toUrl = (p: string) => {
      const trimmed = p.replace(/\/$/, "");
      return SITE_URL + (trimmed ? `${trimmed}/` : "/");
    };
    const url = toUrl(canonicalPath ?? window.location.pathname.slice(BASE.length));
    setMeta("property", "og:url", url);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, canonicalPath, noindex, fixedTitle]);
}
