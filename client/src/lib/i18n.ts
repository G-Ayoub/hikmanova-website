import { useLanguage, type Language } from "@/contexts/LanguageContext";

/**
 * A piece of user-facing text in every supported language.
 * `fr` is optional so French can be filled in progressively later;
 * anything missing falls back to English.
 */
export type Localized = { en: string; ar: string; fr?: string };

export function L(value: Localized, lang: Language): string {
  return (value as Record<string, string | undefined>)[lang] || value.en;
}

/** Hook returning `t(localized)` bound to the current language. */
export function useI18n() {
  const { language, isRTL } = useLanguage();
  return {
    language,
    isRTL,
    t: (value: Localized) => L(value, language),
  };
}

const l = (en: string, ar: string): Localized => ({ en, ar });

/** Interface strings shared across pages (navigation, buttons, headings). */
export const ui = {
  brandTagline: l("AI & IoT solutions for North Africa and the Gulf", "حلول الذكاء الاصطناعي وإنترنت الأشياء لشمال أفريقيا والخليج"),
  learnMore: l("Learn more", "اعرف المزيد"),
  viewAll: l("View all", "عرض الكل"),
  back: l("Back", "رجوع"),
  contactUs: l("Contact us", "تواصل معنا"),
  bookWorkshop: l("Book a POC workshop", "احجز ورشة إثبات مفهوم"),
  downloadProfile: l("Download company profile (PDF)", "تحميل الملف التعريفي للشركة (PDF)"),
  englishOnly: l(
    "",
    "هذا المقال متوفر حالياً باللغة الإنجليزية فقط.",
  ),
  nav: {
    home: l("Home", "الرئيسية"),
    solutions: l("Solutions", "الحلول"),
    services: l("Services", "الخدمات"),
    industries: l("Industries", "القطاعات"),
    caseStudies: l("Case Studies", "دراسات الحالة"),
    about: l("About", "من نحن"),
    insights: l("Insights", "رؤى"),
    contact: l("Contact", "اتصل بنا"),
    technology: l("Technology & Security", "التقنية والأمان"),
    innovation: l("IP & Innovation", "الملكية الفكرية والابتكار"),
    clients: l("Clients & Partners", "العملاء والشركاء"),
    careers: l("Careers", "الوظائف"),
    privacy: l("Privacy Policy", "سياسة الخصوصية"),
    terms: l("Terms of Service", "شروط الخدمة"),
    cookies: l("Cookie Policy", "سياسة ملفات تعريف الارتباط"),
    sitemap: l("Sitemap", "خريطة الموقع"),
    menu: l("Toggle menu", "فتح القائمة"),
    theme: l("Toggle theme", "تبديل المظهر"),
  },
  footer: {
    company: l("Company", "الشركة"),
    offer: l("What we do", "ما نقدمه"),
    legal: l("Legal", "قانوني"),
    getInTouch: l("Get in touch", "تواصل معنا"),
    rights: l("All rights reserved.", "جميع الحقوق محفوظة."),
  },
  categories: {
    all: l("All", "الكل"),
    AI: l("AI Solutions", "حلول الذكاء الاصطناعي"),
    IoT: l("IoT & Smart Devices", "إنترنت الأشياء والأجهزة الذكية"),
    Platform: l("Platforms & Digital Products", "المنصات والمنتجات الرقمية"),
  },
  solution: {
    overview: l("Overview", "نظرة عامة"),
    features: l("Key capabilities", "القدرات الرئيسية"),
    monitors: l("What it monitors", "ما الذي يراقبه"),
    benefits: l("Benefits", "الفوائد"),
    stack: l("Technology stack", "التقنيات المستخدمة"),
    industries: l("Industries", "القطاعات"),
    client: l("Client", "العميل"),
    challenge: l("The challenge", "التحدي"),
    solution: l("Our solution", "الحل"),
    results: l("Results", "النتائج"),
    related: l("Related services", "خدمات ذات صلة"),
    caseStudyBadge: l("Case study", "دراسة حالة"),
    readCaseStudy: l("Read the case study", "اقرأ دراسة الحالة"),
    notFound: l("Solution not found", "الحل غير موجود"),
  },
  service: {
    capabilities: l("What we deliver", "ما نقدمه"),
    technologies: l("Technologies", "التقنيات"),
    relatedSolutions: l("Solutions built with this", "حلول مبنية بهذه الخدمة"),
    notFound: l("Service not found", "الخدمة غير موجودة"),
  },
  blog: {
    readArticle: l("Read article", "اقرأ المقال"),
    minRead: l("min read", "دقائق قراءة"),
    backToInsights: l("Back to Insights", "العودة إلى الرؤى"),
    notFound: l("Article not found", "المقال غير موجود"),
    more: l("More articles", "مقالات أخرى"),
  },
  notFound: {
    title: l("Page not found", "الصفحة غير موجودة"),
    subtitle: l("Sorry, the page you're looking for doesn't exist.", "عذراً، الصفحة التي تبحث عنها غير موجودة."),
    backHome: l("Back to home", "العودة إلى الرئيسية"),
    suggestions: l("Helpful links", "روابط مفيدة"),
  },
};
