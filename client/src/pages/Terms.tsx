import { pageDescriptions } from "@/data/routes";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { ui, type Localized } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/const";

const l = (en: string, ar: string): Localized => ({ en, ar });

const sections: LegalSection[] = [
  {
    heading: l("Acceptance", "القبول"),
    paragraphs: [l("By using this website you agree to these terms. If you do not agree, please do not use the site.", "باستخدامك هذا الموقع فإنك توافق على هذه الشروط. وإن لم توافق، يُرجى عدم استخدام الموقع.")],
  },
  {
    heading: l("Use of content", "استخدام المحتوى"),
    paragraphs: [l("All text, images, logos and product names on this site belong to HikmaNova or their respective owners. You may view and share links to the site, but you may not:", "جميع النصوص والصور والشعارات وأسماء المنتجات في هذا الموقع مملوكة لـ HikmaNova أو لأصحابها. يمكنك تصفح الموقع ومشاركة روابطه، لكن لا يجوز لك:")],
    list: [
      l("copy or republish the content for commercial purposes without permission;", "نسخ المحتوى أو إعادة نشره لأغراض تجارية دون إذن؛"),
      l("remove copyright or proprietary notices;", "إزالة إشعارات حقوق النشر أو الملكية؛"),
      l("attempt to disrupt or reverse engineer the website.", "محاولة تعطيل الموقع أو إجراء هندسة عكسية له."),
    ],
  },
  {
    heading: l("Trademarks and client names", "العلامات التجارية وأسماء العملاء"),
    paragraphs: [l("Third-party names and trademarks are the property of their owners and are shown with permission or for descriptive purposes only.", "أسماء الجهات الأخرى وعلاماتها التجارية ملك لأصحابها، وتُعرض بإذن منهم أو لأغراض وصفية فقط.")],
  },
  {
    heading: l("No warranty", "إخلاء المسؤولية"),
    paragraphs: [l("The website is provided for information only. We aim to keep it accurate but make no warranty that it is complete or error-free, and we are not liable for decisions made solely on its content.", "يُقدَّم الموقع لأغراض إعلامية فقط. نسعى إلى دقة محتواه، لكننا لا نضمن اكتماله أو خلوه من الأخطاء، ولا نتحمل مسؤولية القرارات المتخذة بناءً عليه وحده.")],
  },
  {
    heading: l("External links", "الروابط الخارجية"),
    paragraphs: [l("We are not responsible for the content of websites we link to.", "لسنا مسؤولين عن محتوى المواقع التي نضع روابط إليها.")],
  },
  {
    heading: l("Governing law and contact", "القانون الواجب التطبيق والتواصل"),
    paragraphs: [l(`These terms are governed by the laws of Algeria. Questions: ${CONTACT_EMAIL}.`, `تخضع هذه الشروط لقوانين الجزائر. للاستفسارات: ${CONTACT_EMAIL}.`)],
  },
];

export default function Terms() {
  return <LegalPage description={pageDescriptions["/terms"]} title={ui.nav.terms} updated={l("October 2026", "أكتوبر 2026")} sections={sections} />;
}
