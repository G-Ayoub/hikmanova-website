import { Quote } from "lucide-react";
import Layout from "@/components/Layout";
import { ClientLogoGrid, CTA, defaultCta, PageHero, SectionHeading } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageDescriptions } from "@/data/routes";
import { company } from "@/data/company";

const l = (en: string, ar: string): Localized => ({ en, ar });

const copy = {
  subtitle: pageDescriptions["/clients"],
  testimonialsTitle: l("What they say", "ماذا يقولون"),
  permission: l(
    "Operators, universities and digital-services companies we have built and tested systems with.",
    "مشغّلون وجامعات وشركات خدمات رقمية بنينا معها أنظمتنا واختبرناها.",
  ),
};

export default function Clients() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.clients), t(copy.subtitle));

  return (
    <Layout>
      <PageHero title={t(ui.nav.clients)} subtitle={t(copy.subtitle)} />

      {company.clientLogos.length > 0 && (
      <section className="py-16 md:py-24">
        <div className="container">
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl">{t(copy.permission)}</p>
          {(
            <ClientLogoGrid />
          )}
        </div>
      </section>
      )}

      {company.testimonials.length > 0 && (
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <SectionHeading title={t(copy.testimonialsTitle)} />
          {(
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {company.testimonials.map((q) => (
                <figure key={q.author} className="p-6 rounded-xl bg-background ring-1 ring-[var(--hairline)]">
                  <Quote className="w-6 h-6 text-primary mb-3" aria-hidden />
                  <blockquote className="mb-4">{t(q.quote)}</blockquote>
                  <figcaption className="text-sm">
                    <strong>{q.author}</strong> — {t(q.role)}, {q.company}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
      )}

      <CTA {...defaultCta} />
    </Layout>
  );
}
