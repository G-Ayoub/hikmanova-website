import type { Localized } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/const";

/**
 * Company facts. Anything set to `null` or an empty list renders a visible
 * "Coming soon" placeholder on the site; fill it in and the section appears.
 */

export interface Stat { value: string; label: Localized }
export interface Leader { name: string; role: Localized; photo?: string; linkedin?: string }
export interface Office { city: Localized; country: Localized; address?: Localized }
export interface ClientLogo { name: string; logo: string; url?: string }
export interface Testimonial { quote: Localized; author: string; role: Localized; company: string }
export interface OpenRole { title: Localized; location: Localized; type: Localized; applyUrl?: string }

const l = (en: string, ar: string): Localized => ({ en, ar });

export const company = {
  email: CONTACT_EMAIL,

  /** Key numbers for the Home page, e.g. { value: "10+", label: l("Years of experience", "...") } */
  stats: [
    { value: "8+", label: l("Years of experience", "سنوات من الخبرة") },
    { value: "4", label: l("Countries served", "دول نخدمها") },
    { value: "100+", label: l("Stadium staff tracked at FIFA World Cup Qatar 2022", "موظف في الملاعب تم تتبّعهم خلال كأس العالم FIFA قطر 2022") },
    { value: "5", label: l("Patents & registered IP", "براءات اختراع وملكية فكرية مسجّلة") },
  ] as Stat[],

  /** CEO, COO, ... (names and roles carried over from the previous site) */
  leadership: [
    { name: "Khalil.L", role: l("Founder & CEO", "المؤسس والرئيس التنفيذي") },
    { name: "Hichem.B", role: l("CTO", "المدير التقني") },
    { name: "Ayoub.G", role: l("Lead Data Engineer", "كبير مهندسي البيانات") },
  ] as Leader[],

  offices: [
    { city: l("Algiers", "الجزائر العاصمة"), country: l("Algeria", "الجزائر") },
  ] as Office[],

  regions: [
    l("Algeria", "الجزائر"),
    l("Saudi Arabia", "المملكة العربية السعودية"),
    l("Qatar", "قطر"),
    l("France", "فرنسا"),
  ],

  social: {
    linkedin: "https://www.linkedin.com/company/hikmanova/" as string | null,
    /** International format without "+" or spaces, e.g. "213555000000" */
    whatsapp: null as string | null,
  },

  /** Only clients who have given permission to be shown. */
  clientLogos: [] as ClientLogo[],
  testimonials: [] as Testimonial[],

  openRoles: [] as OpenRole[],

  /** Path under client/public, e.g. "/hikmanova-company-profile.pdf" */
  profilePdf: null as string | null,
};
