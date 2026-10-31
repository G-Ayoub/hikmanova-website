import { Link } from "wouter";
import { Cpu, Globe2, Lock } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ComingSoon, CTA, defaultCta, ForwardArrow, SectionHeading, serviceIcons, SolutionCard } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { solutions } from "@/data/solutions";
import { services } from "@/data/services";
import { company } from "@/data/company";
import { asset } from "@/lib/asset";

const l = (en: string, ar: string): Localized => ({ en, ar });

const copy = {
  eyebrow: l("AI + IoT for North Africa & the Gulf", "الذكاء الاصطناعي وإنترنت الأشياء لشمال أفريقيا والخليج"),
  title: l("Intelligent systems, built and hosted where your data lives", "أنظمة ذكية تُبنى وتُستضاف حيث تقيم بياناتك"),
  subtitle: l(
    "HikmaNova designs AI agents, connected devices and sovereign enterprise platforms for telecom, hospitality, events, logistics and the public sector — from proof of concept to production.",
    "تصمم HikmaNova وكلاء ذكاء اصطناعي وأجهزة متصلة ومنصات مؤسسية سيادية لقطاعات الاتصالات والضيافة والفعاليات والخدمات اللوجستية والقطاع العام — من إثبات المفهوم إلى التشغيل الفعلي.",
  ),
  ctaPrimary: l("Explore our solutions", "استكشف حلولنا"),
  pillars: [
    { icon: Cpu, title: l("AI that works on your data", "ذكاء اصطناعي يعمل على بياناتك"), text: l("Agents that query databases, answer customers and write reports.", "وكلاء يستعلمون قواعد البيانات ويجيبون العملاء ويكتبون التقارير.") },
    { icon: Globe2, title: l("Connected in the field", "اتصال في الميدان"), text: l("BLE, NFC, iBeacon and sensors proven at stadiums and holy sites.", "تقنيات BLE وNFC وiBeacon ومستشعرات أثبتت كفاءتها في الملاعب والمشاعر المقدسة.") },
    { icon: Lock, title: l("Sovereign by design", "سيادي بطبيعته"), text: l("On-prem and local hosting that meets data-localisation rules.", "استضافة داخلية ومحلية تلبي متطلبات توطين البيانات.") },
  ],
  numbersTitle: l("HikmaNova in numbers", "HikmaNova بالأرقام"),
  featuredTitle: l("Featured solutions", "حلول مميزة"),
  featuredSubtitle: l("Products and case studies from our work across the region.", "منتجات ودراسات حالة من أعمالنا في المنطقة."),
  servicesTitle: l("What we do", "ما نقدمه"),
  clientsTitle: l("Trusted by", "شركاء النجاح"),
};

export default function Home() {
  const { t } = useI18n();
  usePageMeta(t(copy.eyebrow), t(copy.subtitle));
  const featured = solutions.filter((s) => s.featured);

  return (
    <Layout>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 hero-gradient opacity-10 -z-10" />
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-4">{t(copy.eyebrow)}</p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">{t(copy.title)}</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">{t(copy.subtitle)}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/solutions">
                  {t(copy.ctaPrimary)} <ForwardArrow />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">{t(ui.bookWorkshop)}</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {copy.pillars.map(({ icon: Icon, title, text }) => (
              <div key={title.en} className="p-6 rounded-lg border border-border bg-background/80">
                <Icon className="w-8 h-8 text-primary mb-3" aria-hidden />
                <h2 className="font-serif text-lg font-bold mb-2">{t(title)}</h2>
                <p className="text-sm text-muted-foreground">{t(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-border">
        <div className="container">
          <h2 className="sr-only">{t(copy.numbersTitle)}</h2>
          {company.stats.length > 0 ? (
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 text-center max-w-5xl mx-auto">
              {company.stats.map((stat) => (
                <div key={stat.label.en} className="flex flex-col-reverse justify-end gap-1">
                  <dt className="text-sm text-muted-foreground">{t(stat.label)}</dt>
                  <dd className="text-3xl md:text-4xl font-serif font-bold text-primary" dir="ltr">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <ComingSoon title={`${t(copy.numbersTitle)} — ${t(ui.comingSoon)}`} />
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <SectionHeading title={t(copy.featuredTitle)} subtitle={t(copy.featuredSubtitle)} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((s) => (
              <SolutionCard key={s.slug} solution={s} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/solutions">
                {t(ui.viewAll)} <ForwardArrow />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading title={t(copy.servicesTitle)} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group p-6 rounded-lg border border-border bg-background hover:border-primary transition-colors"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" aria-hidden />
                  <h3 className="font-serif font-bold mb-2 group-hover:text-primary transition-colors">{t(service.name)}</h3>
                  <p className="text-sm text-muted-foreground">{t(service.summary)}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container">
          <SectionHeading title={t(copy.clientsTitle)} />
          {company.clientLogos.length > 0 ? (
            <div className="flex flex-wrap justify-center items-center gap-10">
              {company.clientLogos.map((c) => (
                <img key={c.name} src={asset(c.logo)} alt={c.name} loading="lazy" className="h-12 w-auto grayscale hover:grayscale-0 transition" />
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
