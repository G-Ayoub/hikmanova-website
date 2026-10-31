import { Quote } from "lucide-react";
import Layout from "@/components/Layout";
import { ComingSoon, CTA, defaultCta, PageHero, SectionHeading } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { company } from "@/data/company";
import { asset } from "@/lib/asset";

const l = (en: string, ar: string): Localized => ({ en, ar });

const copy = {
  subtitle: l(
    "Organisations across telecom, events, religious tourism and hospitality that we have worked with.",
    "مؤسسات في قطاعات الاتصالات والفعاليات والسياحة الدينية والضيافة عملنا معها.",
  ),
  logosTitle: l("Clients & partners", "العملاء والشركاء"),
  testimonialsTitle: l("What they say", "ماذا يقولون"),
  permission: l(
    "Logos and testimonials are shown only with each organisation's permission.",
    "تُعرض الشعارات والشهادات فقط بعد الحصول على إذن كل جهة.",
  ),
};

export default function Clients() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.clients), t(copy.subtitle));

  return (
    <Layout>
      <PageHero title={t(ui.nav.clients)} subtitle={t(copy.subtitle)} />

      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading title={t(copy.logosTitle)} subtitle={t(copy.permission)} />
          {company.clientLogos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {company.clientLogos.map((c) => (
                <img key={c.name} src={asset(c.logo)} alt={c.name} loading="lazy" className="h-14 w-auto mx-auto" />
              ))}
            </div>
          ) : (
            <ComingSoon />
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <SectionHeading title={t(copy.testimonialsTitle)} />
          {company.testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {company.testimonials.map((q) => (
                <figure key={q.author} className="p-6 rounded-lg border border-border bg-background">
                  <Quote className="w-6 h-6 text-primary mb-3" aria-hidden />
                  <blockquote className="mb-4">{t(q.quote)}</blockquote>
                  <figcaption className="text-sm">
                    <strong>{q.author}</strong> — {t(q.role)}, {q.company}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <ComingSoon />
          )}
        </div>
      </section>

      <CTA {...defaultCta} />
    </Layout>
  );
}
