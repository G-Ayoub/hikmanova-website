import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { ui, type Localized } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/const";

const l = (en: string, ar: string): Localized => ({ en, ar });

const sections: LegalSection[] = [
  {
    heading: l("Who we are", "من نحن"),
    paragraphs: [l(
      "This website is operated by HikmaNova, Algiers, Algeria. This policy explains what personal data we collect through the website and how we use it.",
      "يُدار هذا الموقع من قِبل HikmaNova، الجزائر العاصمة، الجزائر. توضح هذه السياسة البيانات الشخصية التي نجمعها عبر الموقع وكيفية استخدامها.",
    )],
  },
  {
    heading: l("Data we collect", "البيانات التي نجمعها"),
    list: [
      l("Contact form: your name, email address, subject and message, which you choose to send us.", "نموذج التواصل: اسمك وبريدك الإلكتروني والموضوع والرسالة التي تختار إرسالها إلينا."),
      l("Preferences: your chosen language and colour theme, stored only in your browser's local storage.", "التفضيلات: اللغة والمظهر اللذان تختارهما، ويُحفظان في التخزين المحلي لمتصفحك فقط."),
      l("Technical data: like any website, our hosting and font providers receive your IP address and browser information when pages load.", "البيانات التقنية: كأي موقع، يتلقى مزودو الاستضافة والخطوط عنوان IP ومعلومات المتصفح عند تحميل الصفحات."),
    ],
    paragraphs: [l("We do not use analytics or advertising trackers.", "لا نستخدم أدوات تحليلات أو تتبّع إعلاني.")],
  },
  {
    heading: l("How we use it", "كيف نستخدمها"),
    paragraphs: [l(
      "We use contact-form messages only to reply to you and to follow up on your request. We do not sell or share your data for marketing.",
      "نستخدم رسائل نموذج التواصل فقط للرد عليك ومتابعة طلبك. ولا نبيع بياناتك ولا نشاركها لأغراض تسويقية.",
    )],
  },
  {
    heading: l("Service providers", "مزودو الخدمات"),
    list: [
      l("GitHub Pages — website hosting.", "GitHub Pages — استضافة الموقع."),
      l("Formspree — delivers contact-form messages to our inbox.", "Formspree — يوصل رسائل نموذج التواصل إلى بريدنا."),
      l("Google Fonts — serves the typefaces used on the site.", "Google Fonts — يوفر الخطوط المستخدمة في الموقع."),
    ],
  },
  {
    heading: l("Retention and your rights", "مدة الاحتفاظ وحقوقك"),
    paragraphs: [l(
      `We keep messages only as long as needed to handle your request. You can ask us to access, correct or delete your data at any time by writing to ${CONTACT_EMAIL}.`,
      `نحتفظ بالرسائل فقط للمدة اللازمة لمعالجة طلبك. ويمكنك في أي وقت طلب الاطلاع على بياناتك أو تصحيحها أو حذفها بمراسلتنا على ${CONTACT_EMAIL}.`,
    )],
  },
  {
    heading: l("Changes", "التعديلات"),
    paragraphs: [l("We may update this policy; the date above shows the latest version.", "قد نحدّث هذه السياسة، ويشير التاريخ أعلاه إلى آخر نسخة.")],
  },
];

export default function Privacy() {
  return <LegalPage title={ui.nav.privacy} updated={l("October 2026", "أكتوبر 2026")} sections={sections} />;
}
