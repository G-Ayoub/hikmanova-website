import { Link, useParams } from "wouter";
import { CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { BackArrow, ComingSoon, CTA, defaultCta, ForwardArrow, SectionHeading, serviceIcons, TagList } from "@/components/site";
import { ui, useI18n } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getSolution } from "@/data/solutions";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import NotFound from "./NotFound";
import { asset } from "@/lib/asset";

export default function SolutionDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const solution = getSolution(slug);
  const { t } = useI18n();
  usePageMeta(solution ? `${solution.name} — ${t(solution.tagline)}` : t(ui.solution.notFound), solution && t(solution.overview));

  if (!solution) return <NotFound />;

  const relatedServices = services.filter((s) => solution.services.includes(s.slug));
  const solutionIndustries = industries.filter((i) => solution.industries.includes(i.slug));
  const cs = solution.caseStudy;

  return (
    <Layout>
      <section className="signal-hero">
        <div className="container py-12 md:py-16">
          <Link href="/solutions" className="inline-flex items-center gap-2 text-sm text-[var(--on-navy-muted)] hover:text-white mb-6">
            <BackArrow /> {t(ui.nav.solutions)}
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  {t(ui.categories[solution.category])}
                </span>
                {cs && (
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                    {t(ui.solution.caseStudyBadge)}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.05] mb-4">{solution.name}</h1>
              <p className="text-xl text-[var(--on-navy-muted)] mb-6">{t(solution.tagline)}</p>
              {solution.client && (
                <p className="text-sm">
                  <span className="text-[var(--on-navy-muted)]">{t(ui.solution.client)}: </span>
                  <strong>{t(solution.client)}</strong>
                </p>
              )}
            </div>
            <img src={asset(solution.image)} alt="" className="w-full rounded-2xl border border-white/10 aspect-video object-cover bg-[#F4F7FF] shadow-[0_30px_60px_rgba(0,0,0,0.35)]" />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-4">{t(ui.solution.overview)}</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{t(solution.overview)}</p>
            </div>

            {solution.monitors && (
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">{t(ui.solution.monitors)}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {solution.monitors.map((m) => (
                    <div key={m.group.en} className="p-5 rounded-lg border border-border bg-card">
                      <h3 className="font-serif font-bold mb-3 text-primary">{t(m.group)}</h3>
                      <ul className="space-y-1.5 text-sm">
                        {m.items.map((item) => (
                          <li key={item.en} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--teal)] shrink-0" aria-hidden />
                            <span>{t(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-serif font-bold mb-4">{t(ui.solution.features)}</h2>
              <ul className="space-y-3">
                {solution.features.map((f) => (
                  <li key={f.en} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden />
                    <span>{t(f)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {solution.benefits && (
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">{t(ui.solution.benefits)}</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {solution.benefits.map((b) => (
                    <li key={b.en} className="flex gap-3 p-4 rounded-lg bg-accent/60 border border-border">
                      <CheckCircle2 className="w-5 h-5 text-[var(--teal)] shrink-0 mt-0.5" aria-hidden />
                      <span>{t(b)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cs && (
              <div id="case-study" className="space-y-8 scroll-mt-24">
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">{t(ui.solution.challenge)}</h2>
                  <p className="leading-relaxed text-muted-foreground">{t(cs.challenge)}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">{t(ui.solution.solution)}</h2>
                  <p className="leading-relaxed text-muted-foreground">{t(cs.solution)}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">{t(ui.solution.results)}</h2>
                  <ul className="space-y-3 mb-6">
                    {cs.results.map((r) => (
                      <li key={r.en} className="flex gap-3 p-4 rounded-lg bg-card border border-border">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden />
                        <span>{t(r)}</span>
                      </li>
                    ))}
                  </ul>
                  <ComingSoon title={`${t(ui.solution.metrics)} — ${t(ui.comingSoon)}`} />
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-8">
            <div className="p-6 rounded-lg border border-border bg-card">
              <h2 className="font-serif font-bold mb-4">{t(ui.solution.stack)}</h2>
              <TagList items={solution.stack} />
            </div>
            <div className="p-6 rounded-lg border border-border bg-card">
              <h2 className="font-serif font-bold mb-4">{t(ui.solution.industries)}</h2>
              <ul className="space-y-2 text-sm">
                {solutionIndustries.map((i) => (
                  <li key={i.slug}>
                    <Link href={`/industries#${i.slug}`} className="hover:text-primary">{t(i.name)}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <Button asChild size="lg" className="w-full gap-2">
              <Link href="/contact">
                {t(ui.bookWorkshop)} <ForwardArrow />
              </Link>
            </Button>
          </aside>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-card">
        <div className="container">
          <SectionHeading title={t(ui.solution.related)} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((s) => {
              const Icon = serviceIcons[s.icon];
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group p-6 rounded-lg border border-border bg-background hover:border-primary transition-colors">
                  <Icon className="w-7 h-7 text-primary mb-3" aria-hidden />
                  <h3 className="font-serif font-bold mb-2 group-hover:text-primary">{t(s.name)}</h3>
                  <p className="text-sm text-muted-foreground">{t(s.summary)}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTA {...defaultCta} />
    </Layout>
  );
}
