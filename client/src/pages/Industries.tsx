import { Link } from "wouter";
import Layout from "@/components/Layout";
import { CTA, defaultCta, industryIcons, PageHero } from "@/components/site";
import { ui, useI18n } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageDescriptions } from "@/data/routes";
import { industries } from "@/data/industries";
import { solutions } from "@/data/solutions";
import { services } from "@/data/services";

const copy = {
  subtitle: pageDescriptions["/industries"],
};

export default function Industries() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.industries), t(copy.subtitle));

  return (
    <Layout>
      <PageHero title={t(ui.nav.industries)} subtitle={t(copy.subtitle)} />
      <section className="py-16 md:py-24">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => {
            const Icon = industryIcons[industry.icon];
            const sectorSolutions = solutions.filter((s) => s.industries.includes(industry.slug));
            const sectorServices = services.filter((s) => industry.services.includes(s.slug));
            return (
              <article id={industry.slug} key={industry.slug} className="p-6 rounded-xl bg-card ring-1 ring-[var(--hairline)] scroll-mt-24 flex flex-col">
                <Icon className="w-10 h-10 text-primary mb-4" aria-hidden />
                <h2 className="text-xl font-serif font-semibold mb-2">{t(industry.name)}</h2>
                <p className="text-muted-foreground mb-4 flex-1">{t(industry.description)}</p>
                {sectorSolutions.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">{t(ui.nav.solutions)}</p>
                    <div className="flex flex-wrap gap-2">
                      {sectorSolutions.map((s) => (
                        <Link key={s.slug} href={`/solutions/${s.slug}`} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20">
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">{t(ui.nav.services)}</p>
                  <div className="flex flex-wrap gap-2">
                    {sectorServices.map((s) => (
                      <Link key={s.slug} href={`/services/${s.slug}`} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm hover:text-primary">
                        {t(s.name)}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <CTA {...defaultCta} />
    </Layout>
  );
}
