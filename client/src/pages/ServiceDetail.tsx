import { Link, useParams } from "wouter";
import { CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import { BackArrow, CTA, defaultCta, SectionHeading, serviceIcons, SolutionCard, TagList } from "@/components/site";
import { ui, useI18n } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getService } from "@/data/services";
import { solutions } from "@/data/solutions";
import NotFound from "./NotFound";

export default function ServiceDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const service = getService(slug);
  const { t } = useI18n();
  usePageMeta(service ? t(service.name) : t(ui.service.notFound), service && t(service.summary));

  if (!service) return <NotFound />;

  const Icon = serviceIcons[service.icon];
  const related = solutions.filter((s) => s.services.includes(service.slug));

  return (
    <Layout>
      <section className="hero">
        <div className="container py-12 md:py-16">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <BackArrow /> {t(ui.nav.services)}
          </Link>
          <div className="max-w-3xl">
            <Icon className="w-12 h-12 text-teal mb-4" aria-hidden />
            <h1 className="text-[2.75rem] md:text-[4.25rem] font-serif font-semibold mb-4">{t(service.name)}</h1>
            <p className="text-xl text-muted-foreground">{t(service.description)}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-semibold mb-6">{t(ui.service.capabilities)}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.capabilities.map((c) => (
                <li key={c.en} className="flex gap-3 p-4 rounded-xl bg-card ring-1 ring-[var(--hairline)]">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden />
                  <span>{t(c)}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside>
            <div className="p-6 rounded-xl bg-card ring-1 ring-[var(--hairline)]">
              <h2 className="font-serif font-semibold mb-4">{t(ui.service.technologies)}</h2>
              <TagList items={service.technologies} />
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-12 md:py-16 bg-card">
          <div className="container">
            <SectionHeading title={t(ui.service.relatedSolutions)} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((s) => (
                <SolutionCard key={s.slug} solution={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA {...defaultCta} />
    </Layout>
  );
}
