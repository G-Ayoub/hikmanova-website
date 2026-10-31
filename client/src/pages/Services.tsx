import { Link } from "wouter";
import Layout from "@/components/Layout";
import { CTA, defaultCta, ForwardArrow, PageHero, serviceIcons } from "@/components/site";
import { ui, useI18n } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { services } from "@/data/services";

const copy = {
  subtitle: {
    en: "End-to-end engineering for AI, connected devices and enterprise platforms — delivered on your infrastructure.",
    ar: "هندسة متكاملة للذكاء الاصطناعي والأجهزة المتصلة ومنصات المؤسسات — تُنفَّذ على بنيتك التحتية.",
  },
};

export default function Services() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.services), t(copy.subtitle));

  return (
    <Layout>
      <PageHero title={t(ui.nav.services)} subtitle={t(copy.subtitle)} />
      <section className="pb-16 md:pb-24">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group card-hover p-8 rounded-lg border border-border bg-card flex flex-col">
                <Icon className="w-10 h-10 text-primary mb-4" aria-hidden />
                <h2 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">{t(s.name)}</h2>
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
