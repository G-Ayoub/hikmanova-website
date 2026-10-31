import { pageDescriptions } from "@/data/routes";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { ui, type Localized } from "@/lib/i18n";

const l = (en: string, ar: string): Localized => ({ en, ar });

const sections: LegalSection[] = [
  {
    heading: l("Do we use cookies?", "هل نستخدم ملفات تعريف الارتباط؟"),
    paragraphs: [l(
      "This website does not set any tracking or advertising cookies, and it does not use analytics.",
      "لا يضع هذا الموقع أي ملفات تعريف ارتباط للتتبّع أو الإعلانات، ولا يستخدم أدوات تحليلات.",
    )],
  },
  {
    heading: l("Local storage", "التخزين المحلي"),
    paragraphs: [l("To remember your preferences between visits, we store two values in your browser's local storage:", "لتذكّر تفضيلاتك بين الزيارات، نحفظ قيمتين في التخزين المحلي لمتصفحك:")],
    list: [
      l("language — your chosen language (English or Arabic);", "language — اللغة التي اخترتها (الإنجليزية أو العربية)؛"),
      l("theme — light or dark mode.", "theme — الوضع الفاتح أو الداكن."),
    ],
  },
  {
    heading: l("Third parties", "الجهات الخارجية"),
    paragraphs: [l(
      "Fonts are loaded from Google Fonts and the contact form is handled by Formspree. These providers may process technical data such as your IP address under their own policies.",
      "تُحمَّل الخطوط من Google Fonts ويُعالَج نموذج التواصل عبر Formspree. وقد تعالج هذه الجهات بيانات تقنية مثل عنوان IP وفق سياساتها الخاصة.",
    )],
  },
  {
    heading: l("Managing your preferences", "إدارة تفضيلاتك"),
    paragraphs: [l("You can clear local storage at any time from your browser settings; the site will simply return to its defaults.", "يمكنك مسح التخزين المحلي في أي وقت من إعدادات المتصفح، وسيعود الموقع ببساطة إلى إعداداته الافتراضية.")],
  },
];

export default function Cookies() {
  return <LegalPage description={pageDescriptions["/cookies"]} title={ui.nav.cookies} updated={l("October 2026", "أكتوبر 2026")} sections={sections} />;
}
