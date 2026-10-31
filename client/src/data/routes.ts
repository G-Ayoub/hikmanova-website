import type { Localized } from "@/lib/i18n";
import { ui } from "@/lib/i18n";
import { solutions } from "./solutions";
import { services } from "./services";
import { posts } from "./posts";
import { hasClientProof } from "./company";

const l = (en: string, ar: string): Localized => ({ en, ar });

export interface SiteRoute {
  path: string;
  label: Localized;
}

/** One-line description of each top-level page: hero subtitle, meta description and share text. */
export const pageDescriptions = {
  "/": l(
    "HikmaNova designs AI agents, connected devices and sovereign enterprise platforms for telecom, events, religious tourism, logistics and the public sector — from proof of concept to production.",
    "تصمم HikmaNova وكلاء ذكاء اصطناعي وأجهزة متصلة ومنصات مؤسسية سيادية لقطاعات الاتصالات والفعاليات والسياحة الدينية والخدمات اللوجستية والقطاع العام — من إثبات المفهوم إلى التشغيل الفعلي.",
  ),
  "/solutions": l(
    "Products we have built and deployed — each one available as a solution you can adopt, adapt and host on your own infrastructure.",
    "منتجات بنيناها ونشرناها — كل منها متاح كحل يمكنك تبنيه وتكييفه واستضافته على بنيتك التحتية.",
  ),
  "/services": l(
    "End-to-end engineering for AI, connected devices and enterprise platforms — delivered on your infrastructure.",
    "هندسة متكاملة للذكاء الاصطناعي والأجهزة المتصلة ومنصات المؤسسات — تُنفَّذ على بنيتك التحتية.",
  ),
  "/industries": l(
    "Sectors where our AI, IoT and sovereign platforms are already at work across North Africa and the Gulf.",
    "قطاعات تعمل فيها حلولنا في الذكاء الاصطناعي وإنترنت الأشياء والمنصات السيادية في شمال أفريقيا والخليج.",
  ),
  "/case-studies": l(
    "How we approached real challenges: the problem, the solution, the stack and the results.",
    "كيف تعاملنا مع تحديات حقيقية: المشكلة والحل والتقنيات والنتائج.",
  ),
  "/technology": l(
    "A proven, open stack — deployed on-premises or in national data centres, with security built in from the first line of code.",
    "تقنيات مفتوحة ومجرّبة — تُنشر داخل المؤسسة أو في مراكز البيانات الوطنية، مع أمان مدمج منذ السطر الأول من الشيفرة.",
  ),
  "/innovation": l(
    "We turn field problems into original products — and protect the ideas behind them.",
    "نحوّل التحديات الميدانية إلى منتجات أصيلة — ونحمي الأفكار التي تقف خلفها.",
  ),
  "/clients": l(
    "Organisations across telecom, satellite, academia and digital services that we have worked with.",
    "مؤسسات في قطاعات الاتصالات والأقمار الصناعية والتعليم العالي والخدمات الرقمية عملنا معها.",
  ),
  "/about": l(
    "A UK-registered technology company building AI and IoT systems for real-world operations across Europe, Africa and the Middle East.",
    "شركة تقنية مسجّلة في المملكة المتحدة تبني أنظمة الذكاء الاصطناعي وإنترنت الأشياء للعمليات الفعلية في أوروبا وأفريقيا والشرق الأوسط.",
  ),
  "/careers": l(
    "Join a small team shipping AI and IoT systems that run in stadiums, holy sites and national data centres.",
    "انضم إلى فريق صغير يطوّر أنظمة ذكاء اصطناعي وإنترنت أشياء تعمل في الملاعب والمشاعر المقدسة ومراكز البيانات الوطنية.",
  ),
  "/blog": l(
    "Notes from the field on AI agents, IoT, data platforms and sovereign cloud, from the engineers who build and run these systems.",
    "ملاحظات من الميدان حول وكلاء الذكاء الاصطناعي وإنترنت الأشياء ومنصات البيانات والسحابة السيادية، من المهندسين الذين يبنون هذه الأنظمة ويشغّلونها.",
  ),
  "/contact": l(
    "Tell us about your project, or book a proof-of-concept workshop with our team.",
    "أخبرنا عن مشروعك، أو احجز ورشة إثبات مفهوم مع فريقنا.",
  ),
  "/privacy": l(
    "How HikmaNova Ltd collects, uses and protects personal data under the UK GDPR, how long we keep it, and how to exercise your rights.",
    "كيف تجمع HikmaNova Ltd البيانات الشخصية وتستخدمها وتحميها وفق اللائحة العامة لحماية البيانات في المملكة المتحدة، ومدة الاحتفاظ بها، وكيفية ممارسة حقوقك.",
  ),
  "/terms": l(
    "Terms of use for the HikmaNova website: use of content, trademarks, liability, and the law of England and Wales that governs them.",
    "شروط استخدام موقع HikmaNova: استخدام المحتوى والعلامات التجارية والمسؤولية، وقانون إنجلترا وويلز الذي يحكمها.",
  ),
  "/cookies": l(
    "The HikmaNova website sets no tracking or advertising cookies. See what is stored in your browser and how to clear it.",
    "لا يضع موقع HikmaNova أي ملفات تعريف ارتباط للتتبّع أو الإعلانات. تعرّف على ما يُحفظ في متصفحك وكيفية مسحه.",
  ),
  "/sitemap": l(
    "Every page on the HikmaNova website: solutions, services, industries, case studies, insights, company and legal pages.",
    "جميع صفحات موقع HikmaNova: الحلول والخدمات والقطاعات ودراسات الحالة والرؤى وصفحات الشركة والصفحات القانونية.",
  ),
} satisfies Record<string, Localized>;

export type StaticPath = keyof typeof pageDescriptions;

/** Top-level pages, in sitemap order. Clients is listed only once there is something to show. */
export const staticRoutes: SiteRoute[] = [
  { path: "/", label: ui.nav.home },
  { path: "/solutions", label: ui.nav.solutions },
  { path: "/services", label: ui.nav.services },
  { path: "/industries", label: ui.nav.industries },
  { path: "/case-studies", label: ui.nav.caseStudies },
  { path: "/technology", label: ui.nav.technology },
  { path: "/innovation", label: ui.nav.innovation },
  ...(hasClientProof() ? [{ path: "/clients", label: ui.nav.clients }] : []),
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

export type PageKind = "page" | "solution" | "service" | "post";

export interface PageMeta {
  kind: PageKind;
  /** Page title without the site name. Empty for Home, which uses the site's full title. */
  title: Localized;
  description: Localized;
  /** Share image (1200x630 PNG) under client/public, generated by scripts/gen-og-images.ts. */
  image: string;
  /** Name of the share-card file without extension, also used by the generator. */
  ogKey: string;
  /** Parent listing for breadcrumbs on detail pages. */
  parent?: { path: string; label: Localized };
  date?: string;
  author?: string;
  /** Product name, for structured data. */
  name?: string;
}

export const HOME_TITLE = l(
  "HikmaNova — AI & IoT Solutions for North Africa & the Gulf",
  "HikmaNova — حلول الذكاء الاصطناعي وإنترنت الأشياء لشمال أفريقيا والخليج",
);

const og = (key: string) => `/og/${key}.png`;

/** Title, description and share image for any path in allPaths(). */
export function pageMeta(path: string): PageMeta | undefined {
  const [, section, slug] = path.split("/");
  if (slug) {
    if (section === "solutions") {
      const s = solutions.find((x) => x.slug === slug);
      return s && {
        kind: "solution", ogKey: `solution-${s.slug}`, image: og(`solution-${s.slug}`), name: s.name,
        title: s.seoTitle, description: s.overview,
        parent: { path: "/solutions", label: ui.nav.solutions },
      };
    }
    if (section === "services") {
      const s = services.find((x) => x.slug === slug);
      return s && {
        kind: "service", ogKey: `service-${s.slug}`, image: og(`service-${s.slug}`),
        title: s.name, description: s.description, parent: { path: "/services", label: ui.nav.services },
      };
    }
    if (section === "blog") {
      const p = posts.find((x) => x.slug === slug);
      return p && {
        kind: "post", ogKey: `post-${p.slug}`, image: og(`post-${p.slug}`),
        title: p.title, description: p.excerpt, parent: { path: "/blog", label: ui.nav.insights },
        date: p.date, author: p.author,
      };
    }
    return undefined;
  }
  const route = staticRoutes.find((r) => r.path === path);
  if (!route) return undefined;
  return {
    kind: "page", ogKey: "default", image: og("default"),
    title: path === "/" ? l("", "") : route.label,
    description: pageDescriptions[path as StaticPath],
  };
}


/**
 * Whether a page has a real Arabic version worth indexing. Articles whose body is still English-only get an
 * Arabic page for browsing, but it is noindex and points search engines at the English article.
 */
export function hasArabicVersion(path: string): boolean {
  const [, section, slug] = path.split("/");
  if (section === "blog" && slug) return !!posts.find((p) => p.slug === slug)?.contentAr;
  return true;
}
