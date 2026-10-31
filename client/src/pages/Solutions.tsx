import { useState } from "react";
import Layout from "@/components/Layout";
import { AnimatePresence, motion } from "framer-motion";
import { Segmented, spring } from "@/components/motion";
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

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex justify-center mb-10 md:mb-14">
            <Segmented
              label={t(ui.nav.solutions)}
              value={filter}
              onChange={setFilter}
              options={filters.map((f) => ({ value: f, label: t(ui.categories[f]) }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence initial={false} mode="popLayout">
              {shown.map((s) => (
                <motion.div
                  key={s.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={spring.ui}
                >
                  <SolutionCard solution={s} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CTA {...defaultCta} />
    </Layout>
  );
}
