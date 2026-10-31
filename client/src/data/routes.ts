import type { Localized } from "@/lib/i18n";
import { ui } from "@/lib/i18n";
import { solutions } from "./solutions";
import { services } from "./services";
import { posts } from "./posts";

export interface SiteRoute {
  path: string;
  label: Localized;
}

/** Top-level pages, in sitemap order. */
export const staticRoutes: SiteRoute[] = [
  { path: "/", label: ui.nav.home },
  { path: "/solutions", label: ui.nav.solutions },
  { path: "/services", label: ui.nav.services },
  { path: "/industries", label: ui.nav.industries },
  { path: "/case-studies", label: ui.nav.caseStudies },
  { path: "/technology", label: ui.nav.technology },
  { path: "/innovation", label: ui.nav.innovation },
  { path: "/clients", label: ui.nav.clients },
  { path: "/about", label: ui.nav.about },
  { path: "/careers", label: ui.nav.careers },
  { path: "/blog", label: ui.nav.insights },
  { path: "/contact", label: ui.nav.contact },
  { path: "/privacy", label: ui.nav.privacy },
  { path: "/terms", label: ui.nav.terms },
  { path: "/cookies", label: ui.nav.cookies },
  { path: "/sitemap", label: ui.nav.sitemap },
];

/** Every indexable URL on the site. */
export function allPaths(): string[] {
  return [
    ...staticRoutes.map((r) => r.path),
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...services.map((s) => `/services/${s.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
}
