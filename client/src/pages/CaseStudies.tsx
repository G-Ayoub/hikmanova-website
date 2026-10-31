import { Link } from "wouter";
import Layout from "@/components/Layout";
import { CTA, defaultCta, ForwardArrow, PageHero } from "@/components/site";
import { ui, useI18n } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { solutions } from "@/data/solutions";
import { asset } from "@/lib/asset";

const copy = {
  subtitle: {
    en: "How we approached real challenges: the problem, the solution, the stack and the results.",
    ar: "كيف تعاملنا مع تحديات حقيقية: المشكلة والحل والتقنيات والنتائج.",
  },
};

export default function CaseStudies() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.caseStudies), t(copy.subtitle));
  const studies = solutions.filter((s) => s.caseStudy);

  return (
    <Layout>
      <PageHero title={t(ui.nav.caseStudies)} subtitle={t(copy.subtitle)} />
      <section className="pb-16 md:pb-24">
        <div className="container space-y-8">
          {studies.map((s) => (
            <article key={s.slug} className="grid grid-cols-1 md:grid-cols-5 gap-0 rounded-lg overflow-hidden border border-border bg-card">
              <img src={asset(s.image)} alt="" loading="lazy" className="md:col-span-2 w-full h-56 md:h-full object-cover" />
              <div className="md:col-span-3 p-6 md:p-8">
                <p className="text-sm font-semibold text-primary mb-2">
                  {t(ui.categories[s.category])}
                  {s.client && <> · {t(s.client)}</>}
                </p>
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">{s.name}</h2>
                <h3 className="font-semibold mb-1">{t(ui.solution.challenge)}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{t(s.caseStudy!.challenge)}</p>
                <h3 className="font-semibold mb-1">{t(ui.solution.results)}</h3>
                <ul className="text-muted-foreground mb-6 list-disc ps-5 space-y-1">
                  {s.caseStudy!.results.map((r) => (
                    <li key={r.en}>{t(r)}</li>
                  ))}
                </ul>
                <Link href={`/solutions/${s.slug}#case-study`} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                  {t(ui.solution.readCaseStudy)} <ForwardArrow />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTA {...defaultCta} />
    </Layout>
  );
}
