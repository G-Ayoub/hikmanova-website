import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CTA, defaultCta, PageHero, SolutionCard } from "@/components/site";
import { ui, useI18n } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { solutions, type SolutionCategory } from "@/data/solutions";

const filters: ("all" | SolutionCategory)[] = ["all", "AI", "IoT", "Platform"];

const copy = {
  subtitle: {
    en: "Products we have built and deployed — each one available as a solution you can adopt, adapt and host on your own infrastructure.",
    ar: "منتجات بنيناها ونشرناها — كل منها متاح كحل يمكنك تبنيه وتكييفه واستضافته على بنيتك التحتية.",
  },
};

export default function Solutions() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.solutions), t(copy.subtitle));
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const shown = filter === "all" ? solutions : solutions.filter((s) => s.category === filter);

  return (
    <Layout>
      <PageHero title={t(ui.nav.solutions)} subtitle={t(copy.subtitle)} />

      <section className="pb-16 md:pb-24">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center mb-10" role="group" aria-label={t(ui.nav.solutions)}>
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className="rounded-full"
              >
                {t(ui.categories[f])}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map((s) => (
              <SolutionCard key={s.slug} solution={s} />
            ))}
          </div>
        </div>
      </section>

      <CTA {...defaultCta} />
    </Layout>
  );
}
