import { useEffect } from "react";
import { SITE_NAME, SITE_URL } from "@/const";

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
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;
    setMeta("property", "og:title", fullTitle);

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
    }

    const url = SITE_URL + window.location.pathname.replace(/\/$/, "");
    setMeta("property", "og:url", url || SITE_URL);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url || SITE_URL + "/";
  }, [title, description]);
}
