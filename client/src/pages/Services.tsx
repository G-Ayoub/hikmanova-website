import { Link } from "wouter";
import Layout from "@/components/Layout";
import { CTA, defaultCta, ForwardArrow, PageHero, serviceIcons } from "@/components/site";
import { ui, useI18n } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageDescriptions } from "@/data/routes";
import { services } from "@/data/services";

const copy = {
  subtitle: pageDescriptions["/services"],
};

export default function Services() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.services), t(copy.subtitle));

  return (
    <Layout>
      <PageHero title={t(ui.nav.services)} subtitle={t(copy.subtitle)} />
      <section className="py-16 md:py-24">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group card-hover p-8 rounded-xl bg-card ring-1 ring-[var(--hairline)] flex flex-col">
                <Icon className="w-10 h-10 text-primary mb-4" aria-hidden />
                <h2 className="text-2xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors">{t(s.name)}</h2>
                <p className="text-muted-foreground mb-4 flex-1">{t(s.description)}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {t(ui.learnMore)} <ForwardArrow />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <CTA {...defaultCta} />
    </Layout>
  );
}
