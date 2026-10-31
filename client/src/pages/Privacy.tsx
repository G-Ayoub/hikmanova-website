import { pageDescriptions } from "@/data/routes";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { ui, type Localized } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/const";
import { company, legalEntity } from "@/data/company";

const l = (en: string, ar: string): Localized => ({ en, ar });
const entity = legalEntity();
const name = company.legal.name;

const sections: LegalSection[] = [
  {
    heading: l("Who we are", "من نحن"),
    paragraphs: [
      l(
        `This website is operated by ${entity.en}. ${name} is the data controller for personal data collected through this website, under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.`,
        `يُدار هذا الموقع من قِبل ${entity.ar}. وتُعدّ ${name} الجهة المسؤولة عن البيانات الشخصية التي تُجمع عبر هذا الموقع، وفقاً للائحة العامة لحماية البيانات في المملكة المتحدة (UK GDPR) وقانون حماية البيانات لعام 2018.`,
      ),
      l(
        `For any question about this policy or your data, write to ${CONTACT_EMAIL}.`,
        `لأي استفسار حول هذه السياسة أو بياناتك، راسلنا على ${CONTACT_EMAIL}.`,
      ),
    ],
  },
  {
    heading: l("Data we collect", "البيانات التي نجمعها"),
    list: [
      l("Contact form: your name, email address, subject and message, which you choose to send us.", "نموذج التواصل: اسمك وبريدك الإلكتروني والموضوع والرسالة التي تختار إرسالها إلينا."),
      l("Preferences: your chosen language and colour theme, stored only in your browser's local storage and never sent to us.", "التفضيلات: اللغة والمظهر اللذان تختارهما، ويُحفظان في التخزين المحلي لمتصفحك فقط ولا يُرسلان إلينا."),
      l("Technical data: like any website, our hosting and font providers receive your IP address and browser information when pages load.", "البيانات التقنية: كأي موقع، يتلقى مزودو الاستضافة والخطوط عنوان IP ومعلومات المتصفح عند تحميل الصفحات."),
    ],
    afterList: [l("We do not use analytics or advertising trackers.", "لا نستخدم أدوات تحليلات أو تتبّع إعلاني.")],
  },
  {
    heading: l("How we use it and our legal basis", "كيف نستخدمها والأساس القانوني"),
    list: [
      l(
        "To reply to your message and follow up on your request — based on our legitimate interest in responding to people who contact us.",
        "للرد على رسالتك ومتابعة طلبك — استناداً إلى مصلحتنا المشروعة في الرد على من يتواصل معنا.",
      ),
      l(
        "When you ask about our services, to take the steps you request before entering into a contract with us.",
        "عند استفسارك عن خدماتنا، لاتخاذ الخطوات التي تطلبها قبل إبرام عقد معنا.",
      ),
    ],
    afterList: [l(
      "We do not sell your data or share it for marketing, and we do not use it for automated decision-making.",
      "لا نبيع بياناتك ولا نشاركها لأغراض تسويقية، ولا نستخدمها في اتخاذ قرارات آلية.",
    )],
  },
  {
    heading: l("Service providers and international transfers", "مزودو الخدمات ونقل البيانات دولياً"),
    list: [
      l("GitHub Pages (GitHub, Inc.) — website hosting.", "GitHub Pages (شركة GitHub) — استضافة الموقع."),
      l("Formspree — delivers contact-form messages to our inbox.", "Formspree — يوصل رسائل نموذج التواصل إلى بريدنا."),
      l("Google Fonts (Google LLC) — serves the typefaces used on the site.", "Google Fonts (شركة Google) — يوفر الخطوط المستخدمة في الموقع."),
    ],
    afterList: [l(
      "These providers may process data in the United States. Such transfers rely on the safeguards each provider offers under UK data protection law, such as the UK Extension to the EU–US Data Privacy Framework or the UK International Data Transfer Addendum.",
      "قد يعالج هؤلاء المزودون البيانات في الولايات المتحدة. ويستند هذا النقل إلى الضمانات التي يوفرها كل مزود بموجب قانون حماية البيانات في المملكة المتحدة، مثل الامتداد البريطاني لإطار خصوصية البيانات بين الاتحاد الأوروبي والولايات المتحدة أو الملحق البريطاني لنقل البيانات الدولية.",
    )],
  },
  {
    heading: l("How long we keep it", "مدة الاحتفاظ بالبيانات"),
    paragraphs: [l(
      "We keep contact-form messages for up to 24 months after our last contact with you, then delete them. If your enquiry leads to a contract, we keep the related correspondence for the duration of the contract and any period required by law for business records.",
      "نحتفظ برسائل نموذج التواصل لمدة أقصاها 24 شهراً من آخر تواصل معك، ثم نحذفها. وإذا أفضى استفسارك إلى عقد، نحتفظ بالمراسلات المتعلقة به طوال مدة العقد وأي مدة يفرضها القانون لحفظ السجلات التجارية.",
    )],
  },
  {
    heading: l("Your rights", "حقوقك"),
    paragraphs: [l(
      `Under UK data protection law you can ask us to access, correct or delete your personal data, to restrict or object to how we use it, and to receive it in a portable format. Write to ${CONTACT_EMAIL}; we will reply within one month.`,
      `بموجب قانون حماية البيانات في المملكة المتحدة، يحق لك أن تطلب منا الاطلاع على بياناتك الشخصية أو تصحيحها أو حذفها، وتقييد استخدامنا لها أو الاعتراض عليه، والحصول عليها بصيغة قابلة للنقل. راسلنا على ${CONTACT_EMAIL}، وسنرد خلال شهر واحد.`,
    )],
  },
  {
    heading: l("Complaints", "الشكاوى"),
    paragraphs: [l(
      "If you are unhappy with how we handle your data, please contact us first so we can try to put it right. You also have the right to complain to the UK Information Commissioner's Office (ICO): ico.org.uk, 0303 123 1113.",
      "إذا لم تكن راضياً عن طريقة تعاملنا مع بياناتك، يُرجى التواصل معنا أولاً لنحاول معالجة الأمر. كما يحق لك تقديم شكوى إلى مكتب مفوض المعلومات في المملكة المتحدة (ICO): ico.org.uk، هاتف 0303 123 1113.",
    )],
  },
  {
    heading: l("Changes", "التعديلات"),
    paragraphs: [l("We may update this policy; the date above shows the latest version.", "قد نحدّث هذه السياسة، ويشير التاريخ أعلاه إلى آخر نسخة.")],
  },
];

export default function Privacy() {
  return <LegalPage description={pageDescriptions["/privacy"]} title={ui.nav.privacy} updated={l("October 2026", "أكتوبر 2026")} sections={sections} />;
}
