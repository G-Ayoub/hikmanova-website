import type { Localized } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/const";

/**
 * Company facts. Anything set to `null` or an empty list is simply not shown on the site;
 * fill it in and the section appears.
 */

export interface Stat { value: string; label: Localized }
export interface Leader { name: string; role: Localized; bio?: Localized; photo?: string; linkedin?: string }
export interface Advisor { name: string; focus: Localized; country: Localized; bio?: Localized; photo?: string }
export interface Office { city: Localized; country: Localized; address?: Localized; headquarters?: boolean }
export interface ClientLogo { name: string; logo: string; url?: string }
export interface Testimonial { quote: Localized; author: string; role: Localized; company: string }
export interface OpenRole { title: Localized; location: Localized; type: Localized; applyUrl?: string }

const l = (en: string, ar: string): Localized => ({ en, ar });

export const company = {
  email: CONTACT_EMAIL,

  /** UK-registered company (company deck, Oct 2026). */
  registeredIn: l("United Kingdom", "المملكة المتحدة"),

  /** Key numbers for the Home page, e.g. { value: "10+", label: l("Years of experience", "...") } */
  stats: [
    { value: "20+", label: l("Specialists in R&D, engineering, product and business", "متخصصاً في البحث والتطوير والهندسة والمنتجات والأعمال") },
    { value: "3", label: l("Regions: Europe, Africa and the Middle East", "مناطق: أوروبا وأفريقيا والشرق الأوسط") },
    { value: "100+", label: l("Stadium staff tracked at FIFA World Cup Qatar 2022", "موظف في الملاعب تم تتبّعهم خلال كأس العالم FIFA قطر 2022") },
    { value: "5", label: l("Patents & registered IP", "براءات اختراع وملكية فكرية مسجّلة") },
  ] as Stat[],

  /** Founders, from the company deck. Add `photo` (path under client/public) to show a headshot. */
  leadership: [
    {
      name: "Hicham Bourak",
      role: l("CEO & Co-Founder", "الرئيس التنفيذي والمؤسس المشارك"),
      bio: l(
        "Business development leader in digital transformation and AI innovation, driving modernisation across the public and private sectors.",
        "قائد في تطوير الأعمال متخصص في التحول الرقمي وابتكار الذكاء الاصطناعي، يقود مبادرات التحديث في القطاعين العام والخاص.",
      ),
    },
    {
      name: "Ayoub Ghafour",
      role: l("COO & Co-Founder", "الرئيس التنفيذي للعمليات والمؤسس المشارك"),
      bio: l(
        "Technology and operations leader delivering large-scale AI and IoT solutions for enterprise and public-sector organisations.",
        "قائد في التقنية والعمليات ينفّذ حلول ذكاء اصطناعي وإنترنت أشياء واسعة النطاق للمؤسسات والقطاع العام.",
      ),
    },
    {
      name: "Ibrahim Lassouani",
      role: l("CTO & Founder", "المدير التقني والمؤسس"),
      bio: l(
        "Innovation leader and AIoT expert with 10+ years in IoT, smart cities and digital transformation; inventor and technology strategist.",
        "قائد ابتكار وخبير في الذكاء الاصطناعي لإنترنت الأشياء بخبرة تتجاوز 10 سنوات في إنترنت الأشياء والمدن الذكية والتحول الرقمي؛ مخترع واستراتيجي تقني.",
      ),
    },
    {
      name: "Mohamed Tounsi",
      role: l("Co-Founder", "مؤسس مشارك"),
      bio: l(
        "Full Professor of Artificial Intelligence at Prince Sultan University, with 22+ years in AI research, data analytics and technology transfer.",
        "أستاذ دكتور في الذكاء الاصطناعي بجامعة الأمير سلطان، بخبرة تتجاوز 22 عاماً في أبحاث الذكاء الاصطناعي وتحليل البيانات ونقل التقنية.",
      ),
    },
  ] as Leader[],

  /** Board & advisory, from the company deck. */
  advisors: [
    { name: "Nadjia Drici", focus: l("Market access, adoption & international deployment", "النفاذ إلى الأسواق والتبنّي والانتشار الدولي"), country: l("Switzerland", "سويسرا"),
      bio: l("International healthcare leader in pharmaceutical digital transformation, market access and reimbursement strategy.", "قيادية دولية في قطاع الرعاية الصحية متخصصة في التحول الرقمي الدوائي والنفاذ إلى الأسواق واستراتيجيات التعويض."),
      photo: "/images/advisors/nadjia-drici.jpg" },
    { name: "Maha Ammouche", focus: l("Market adoption & MENA execution", "تبنّي الأسواق والتنفيذ في منطقة الشرق الأوسط وشمال أفريقيا"), country: l("Algeria", "الجزائر"),
      bio: l("Entrepreneur who launches and scales digital solutions across MENA markets, turning market needs into products.", "رائدة أعمال تطلق الحلول الرقمية وتوسّعها في أسواق الشرق الأوسط وشمال أفريقيا، وتحوّل احتياجات السوق إلى منتجات."),
      photo: "/images/advisors/maha-ammouche.jpg" },
    { name: "Zara Zaghoui", focus: l("Pharma AI, data science & scientific credibility", "الذكاء الاصطناعي في الصناعة الدوائية وعلوم البيانات والمصداقية العلمية"), country: l("United Kingdom", "المملكة المتحدة"),
      bio: l("AI and data science leader focused on reliable, business-focused AI built with scientific rigour.", "قيادية في الذكاء الاصطناعي وعلوم البيانات تركّز على حلول ذكاء اصطناعي موثوقة وموجّهة للأعمال مبنية بصرامة علمية."),
      photo: "/images/advisors/zara-zaghoui.jpg" },
    { name: "Othmane Allaoui", focus: l("AI infrastructure, data & enterprise scalability", "بنية الذكاء الاصطناعي التحتية والبيانات وقابلية التوسع المؤسسي"), country: l("France", "فرنسا"),
      bio: l("Senior technology leader in AI, data platforms and large-scale, telecom-grade cloud architectures.", "قائد تقني أول في الذكاء الاصطناعي ومنصات البيانات والبنى السحابية واسعة النطاق بمستوى الاتصالات."),
      photo: "/images/advisors/othmane-allaoui.jpg" },
    { name: "Matthieu Quiniou", focus: l("AI regulation, compliance & enterprise trust", "تنظيم الذكاء الاصطناعي والامتثال وثقة المؤسسات"), country: l("France", "فرنسا"),
      bio: l("Legal and technology expert in AI regulation, blockchain, digital governance and data protection.", "خبير قانوني وتقني في تنظيم الذكاء الاصطناعي وسلاسل الكتل والحوكمة الرقمية وحماية البيانات."),
      photo: "/images/advisors/matthieu-quiniou.jpg" },
    { name: "Mehdi Ammi", focus: l("Scientific AI leadership & deeptech platforms", "القيادة العلمية في الذكاء الاصطناعي ومنصات التقنيات العميقة"), country: l("France", "فرنسا"),
      bio: l("Leading expert in artificial intelligence, robotics and intelligent systems.", "خبير بارز في الذكاء الاصطناعي والروبوتات والأنظمة الذكية."),
      photo: "/images/advisors/mehdi-ammi.jpg" },
    { name: "Naji Bouchiba", focus: l("Cognitive UX & AI solution adoption", "تجربة المستخدم المعرفية وتبنّي حلول الذكاء الاصطناعي"), country: l("France", "فرنسا"),
      bio: l("Expert in cognitive psychology, human-computer interaction and UX, making AI intuitive and trusted.", "خبير في علم النفس المعرفي والتفاعل بين الإنسان والحاسوب وتجربة المستخدم، يجعل الذكاء الاصطناعي سهلاً وموثوقاً."),
      photo: "/images/advisors/naji-bouchiba.jpg" },
  ] as Advisor[],

  offices: [
    { city: l("Bournemouth", "بورنموث"), country: l("United Kingdom", "المملكة المتحدة"), headquarters: true },
    { city: l("Algiers", "الجزائر العاصمة"), country: l("Algeria", "الجزائر") },
  ] as Office[],

  regions: [
    l("United Kingdom", "المملكة المتحدة"),
    l("France", "فرنسا"),
    l("Algeria", "الجزائر"),
    l("Saudi Arabia", "المملكة العربية السعودية"),
    l("Qatar", "قطر"),
  ],

  /** Saudi registered IP for the Hajj & Umrah crowd-intelligence system (Nusuk Card). */
  saudiIpDeposit: "1607864",

  social: {
    linkedin: "https://www.linkedin.com/company/hikmanova/" as string | null,
    /** International format without "+" or spaces, e.g. "213555000000" */
    whatsapp: null as string | null,
  },

  /** Only clients who have given permission to be shown. */
  clientLogos: [
    { name: "Arabsat", logo: "/images/clients/arabsat.jpg" },
    { name: "Vodafone Qatar", logo: "/images/clients/vodafone-qatar.png" },
    { name: "Prince Sultan University", logo: "/images/clients/prince-sultan-university.jpg" },
    { name: "Naseej", logo: "/images/clients/naseej.jpg" },
  ] as ClientLogo[],
  testimonials: [] as Testimonial[],

  openRoles: [] as OpenRole[],

  /** Path under client/public, e.g. "/hikmanova-company-profile.pdf" */
  profilePdf: null as string | null,
};

/** The Clients page is shown (nav, footer, sitemap) only once there are logos or testimonials. */
export function hasClientProof() {
  return company.clientLogos.length > 0 || company.testimonials.length > 0;
}
