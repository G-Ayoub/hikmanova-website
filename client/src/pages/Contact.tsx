import { useRef, useState } from "react";
import { Download, Linkedin, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageDescriptions } from "@/data/routes";
import { company } from "@/data/company";
import { asset } from "@/lib/asset";
import { FORMSPREE_FORM_ID } from "@/const";

const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const l = (en: string, ar: string): Localized => ({ en, ar });

const copy = {
  title: l("Get in touch", "تواصل معنا"),
  subtitle: pageDescriptions["/contact"],
  email: l("Email", "البريد الإلكتروني"),
  offices: l("Offices", "المكاتب"),
  whatsapp: l("WhatsApp", "واتساب"),
  linkedin: l("LinkedIn", "لينكدإن"),
  form: {
    title: l("Send us a message", "أرسل لنا رسالة"),
    subtitle: l("We will get back to you as soon as possible.", "سنرد عليك في أقرب وقت ممكن."),
    name: l("Name", "الاسم"),
    namePh: l("Your name", "اسمك"),
    email: l("Email", "البريد الإلكتروني"),
    subject: l("Subject", "الموضوع"),
    subjectPh: l("How can we help?", "كيف يمكننا مساعدتك؟"),
    message: l("Message", "الرسالة"),
    messagePh: l("Tell us about your project…", "أخبرنا عن مشروعك…"),
    send: l("Send message", "إرسال الرسالة"),
    sending: l("Sending…", "جارٍ الإرسال…"),
  },
  validation: {
    name: l("Please enter your name", "يرجى إدخال اسمك"),
    email: l("Please enter a valid email", "يرجى إدخال بريد إلكتروني صحيح"),
    subject: l("Please enter a subject", "يرجى إدخال الموضوع"),
    message: l("Please enter your message", "يرجى إدخال رسالتك"),
  },
  success: l("Message sent! We'll be in touch soon.", "تم إرسال الرسالة! سنتواصل معك قريباً."),
  error: l("Your message could not be sent. Please try again or email us.", "تعذّر إرسال رسالتك. يرجى المحاولة مجدداً أو مراسلتنا عبر البريد."),
  faqTitle: l("Frequently asked questions", "الأسئلة الشائعة"),
  faqs: [
    {
      q: l("How do projects usually start?", "كيف تبدأ المشاريع عادةً؟"),
      a: l("Most engagements start with a short proof-of-concept workshop on your data and infrastructure, followed by a scoped delivery plan.", "تبدأ معظم المشاريع بورشة قصيرة لإثبات المفهوم على بياناتك وبنيتك التحتية، تليها خطة تنفيذ محددة النطاق."),
    },
    {
      q: l("Can you host everything on our premises?", "هل يمكنكم استضافة كل شيء داخل مؤسستنا؟"),
      a: l("Yes. Our products and the systems we build can run on-premises or in a national cloud to meet data-localisation rules.", "نعم. يمكن تشغيل منتجاتنا والأنظمة التي نبنيها داخل المؤسسة أو على سحابة وطنية بما يلبي متطلبات توطين البيانات."),
    },
    {
      q: l("Which languages do your systems support?", "ما اللغات التي تدعمها أنظمتكم؟"),
      a: l("Arabic (right-to-left), French and English, in the interfaces and in our AI agents.", "العربية (من اليمين إلى اليسار) والفرنسية والإنجليزية، في الواجهات وفي وكلاء الذكاء الاصطناعي."),
    },
    {
      q: l("Do you provide support after launch?", "هل تقدمون دعماً بعد الإطلاق؟"),
      a: l("Yes. We offer maintenance and managed operations, and we train your teams for hand-over.", "نعم. نقدم الصيانة والتشغيل المُدار، وندرّب فرقكم على الاستلام."),
    },
    {
      q: l("How do you handle confidentiality?", "كيف تتعاملون مع السرية؟"),
      a: l("We sign NDAs and only show client names, logos or results with written permission.", "نوقّع اتفاقيات عدم الإفصاح، ولا نعرض أسماء العملاء أو شعاراتهم أو نتائجهم إلا بإذن مكتوب."),
    },
  ],
};

type FormData = { name: string; email: string; subject: string; message: string };
const empty: FormData = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.contact), t(copy.subtitle));
  const [formData, setFormData] = useState<FormData>(empty);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Hidden spam trap: people never see or fill it, bots usually do; Formspree discards those submissions.
  const gotchaRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error(t(copy.validation.name));
    if (!EMAIL_RE.test(formData.email.trim())) return toast.error(t(copy.validation.email));
    if (!formData.subject.trim()) return toast.error(t(copy.validation.subject));
    if (!formData.message.trim()) return toast.error(t(copy.validation.message));

    setIsSubmitting(true);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: `Website: ${formData.subject.trim()}`,
          _gotcha: gotchaRef.current?.value ?? "",
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      toast.success(t(copy.success));
      setFormData(empty);
    } catch {
      toast.error(t(copy.error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-md border border-input bg-card transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/30";

  return (
    <Layout>
      <PageHero title={t(copy.title)} subtitle={t(copy.subtitle)} />

      <section className="py-16 md:py-24">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-12">
          <aside className="space-y-6">
            <div className="p-6 rounded-xl bg-card ring-1 ring-[var(--hairline)]">
              <h2 className="font-serif font-semibold mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" aria-hidden /> {t(copy.email)}
              </h2>
              <a href={`mailto:${company.email}`} className="text-muted-foreground hover:text-primary" dir="ltr">
                {company.email}
              </a>
            </div>

            <div className="p-6 rounded-xl bg-card ring-1 ring-[var(--hairline)]">
              <h2 className="font-serif font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" aria-hidden /> {t(copy.offices)}
              </h2>
              <ul className="space-y-1 text-muted-foreground">
                {company.offices.map((o) => (
                  <li key={o.city.en}>
                    {t(o.city)}, {t(o.country)}
                    {o.address && <span className="block text-sm">{t(o.address)}</span>}
                  </li>
                ))}
              </ul>
            </div>

            {(company.social.whatsapp || company.social.linkedin) && (
            <div className="p-6 rounded-xl bg-card ring-1 ring-[var(--hairline)] space-y-3">
              {company.social.whatsapp ? (
                <a href={`https://wa.me/${company.social.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                  <MessageCircle className="w-5 h-5 text-primary" aria-hidden /> {t(copy.whatsapp)}
                </a>
              ) : null}
              {company.social.linkedin ? (
                <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                  <Linkedin className="w-5 h-5 text-primary" aria-hidden /> {t(copy.linkedin)}
                </a>
              ) : null}
            </div>
            )}

            {company.profilePdf ? (
              <Button asChild variant="outline" className="w-full gap-2">
                <a href={asset(company.profilePdf)} download>
                  <Download className="w-4 h-4" aria-hidden /> {t(ui.downloadProfile)}
                </a>
              </Button>
            ) : null}
          </aside>

          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif font-semibold mb-2">{t(copy.form.title)}</h2>
            <p className="text-muted-foreground mb-8">{t(copy.form.subtitle)}</p>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <input ref={gotchaRef} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">{t(copy.form.name)}</label>
                  <input id="name" name="name" type="text" autoComplete="name" value={formData.name} onChange={handleChange} placeholder={t(copy.form.namePh)} className={inputClass} required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">{t(copy.form.email)}</label>
                  <input id="email" name="email" type="email" autoComplete="email" dir="ltr" value={formData.email} onChange={handleChange} placeholder="you@company.com" className={inputClass} required />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2">{t(copy.form.subject)}</label>
                <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} placeholder={t(copy.form.subjectPh)} className={inputClass} required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">{t(copy.form.message)}</label>
                <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} placeholder={t(copy.form.messagePh)} className={`${inputClass} resize-y`} required />
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full gap-2">
                {isSubmitting ? t(copy.form.sending) : <><Send className="w-4 h-4 rtl:-scale-x-100" aria-hidden /> {t(copy.form.send)}</>}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-3xl">
          <SectionHeading title={t(copy.faqTitle)} />
          <div className="space-y-4">
            {copy.faqs.map((item) => (
              <details key={item.q.en} className="group p-6 rounded-xl bg-background ring-1 ring-[var(--hairline)]">
                <summary className="font-serif font-semibold text-lg cursor-pointer list-none flex justify-between gap-4">
                  {t(item.q)}
                  <span className="text-primary transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="text-muted-foreground mt-3">{t(item.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
