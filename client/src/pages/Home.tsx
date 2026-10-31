import { Link } from "wouter";
import { Cpu, Radio, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CTA, defaultCta, Eyebrow, ForwardArrow, industryIcons, SectionHeading, SolutionCard } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { asset } from "@/lib/asset";
import { solutions } from "@/data/solutions";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { company } from "@/data/company";

const l = (en: string, ar: string): Localized => ({ en, ar });

const copy = {
  eyebrow: l("AI + IoT for North Africa & the Gulf", "الذكاء الاصطناعي وإنترنت الأشياء لشمال أفريقيا والخليج"),
  title: l("Intelligent systems, built and hosted where your data lives", "أنظمة ذكية تُبنى وتُستضاف حيث تقيم بياناتك"),
  subtitle: l(
    "HikmaNova designs AI agents, connected devices and sovereign enterprise platforms for telecom, events, religious tourism, logistics and the public sector — from proof of concept to production.",
    "تصمم HikmaNova وكلاء ذكاء اصطناعي وأجهزة متصلة ومنصات مؤسسية سيادية لقطاعات الاتصالات والفعاليات والسياحة الدينية والخدمات اللوجستية والقطاع العام — من إثبات المفهوم إلى التشغيل الفعلي.",
  ),
  ctaPrimary: l("Explore our solutions", "استكشف حلولنا"),
  heroArtIot: l("Connected refrigerator streaming temperature to a dashboard", "ثلاجة متصلة ترسل درجات الحرارة إلى لوحة متابعة"),
  heroArtLamana: l("Parcel route from France to Algeria tracked on a phone", "مسار طرد من فرنسا إلى الجزائر يُتابَع عبر الهاتف"),
  numbersTitle: l("HikmaNova in numbers", "HikmaNova بالأرقام"),
  solutionsTitle: l("Products built and deployed across the region", "منتجات بنيناها ونشرناها في المنطقة"),
  viewAllSolutions: l("View all solutions", "عرض كل الحلول"),
  servicesTitle: l("End-to-end engineering, delivered on your infrastructure", "هندسة متكاملة تُنفَّذ على بنيتك التحتية"),
  industriesTitle: l("Where our systems are at work", "حيث تعمل أنظمتنا"),
  pillars: [
    { icon: ShieldCheck, title: l("Sovereign by design", "سيادي بطبيعته"), text: l("On-prem and national-cloud hosting that meets data-localisation rules.", "استضافة داخلية وعلى السحابة الوطنية تلبي متطلبات توطين البيانات.") },
    { icon: Cpu, title: l("AI on your data", "ذكاء اصطناعي على بياناتك"), text: l("Agents that query databases, answer customers and write reports.", "وكلاء يستعلمون قواعد البيانات ويجيبون العملاء ويكتبون التقارير.") },
    { icon: Radio, title: l("Connected in the field", "اتصال في الميدان"), text: l("BLE, NFC, iBeacon and sensors proven at stadiums and holy sites.", "تقنيات BLE وNFC وiBeacon ومستشعرات أثبتت كفاءتها في الملاعب والمشاعر المقدسة.") },
  ],
};

export default function Home() {
  const { t } = useI18n();
  usePageMeta(t(copy.eyebrow), t(copy.subtitle));

  // Featured solutions on Home, by slug: three cards on top, two wide cards below.
  const pick = (slugs: string[]) => slugs.map((slug) => solutions.find((s) => s.slug === slug)).filter((s) => s !== undefined);
  const topRow = pick(["orbix", "teammonitor", "telecom-power-monitoring"]);
  const wideRow = pick(["iot-cold-chain", "nusuk-card"]);

  return (
    <Layout>
      {/* Hero */}
      <section className="signal-hero">
        <div className="container pt-16 md:pt-24 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-14 items-center">
            <div>
              <Eyebrow>{t(copy.eyebrow)}</Eyebrow>
              <h1 className="text-[2.5rem] md:text-6xl lg:text-[4rem] font-serif font-bold leading-[1.04] mb-6">{t(copy.title)}</h1>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--on-navy-muted)] mb-9 max-w-[34em]">{t(copy.subtitle)}</p>
              <div className="flex flex-col sm:flex-row gap-3.5">
                <Button asChild size="lg" className="h-[3.25rem] px-6 gap-2.5 text-base font-semibold">
                  <Link href="/solutions">
                    {t(copy.ctaPrimary)} <ForwardArrow />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-[3.25rem] px-6 text-base font-semibold bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white">
                  <Link href="/contact">{t(ui.bookWorkshop)}</Link>
                </Button>
              </div>
            </div>

            <div className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[420px]">
              <img
                src={asset("/images/iot-cold-chain.svg")}
                alt={t(copy.heroArtIot)}
                className="absolute top-0 end-0 w-[86%] rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
              />
              <img
                src={asset("/images/lamana.svg")}
                alt={t(copy.heroArtLamana)}
                className="absolute bottom-0 start-0 w-[70%] rounded-2xl border-4 border-[var(--navy)] shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>

          {company.stats.length > 0 && (
            <>
              <h2 className="sr-only">{t(copy.numbersTitle)}</h2>
              <dl className="mt-16 pt-9 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
                {company.stats.map((stat) => (
                  <div key={stat.label.en} className="flex flex-col-reverse justify-end gap-1.5">
                    <dt className="text-[0.9375rem] text-[var(--on-navy-muted)]">{t(stat.label)}</dt>
                    <dd className="font-serif text-4xl md:text-[2.75rem] font-bold">
                      <span dir="ltr" className="inline-block">{stat.value}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="[&>div]:mb-0">
              <SectionHeading eyebrow={t(ui.nav.solutions)} title={t(copy.solutionsTitle)} />
            </div>
            <Link href="/solutions" className="inline-flex items-center gap-2 min-h-11 font-semibold text-primary hover:underline shrink-0">
              {t(copy.viewAllSolutions)} <ForwardArrow />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {topRow.map((s) => (
              <div key={s.slug} className="md:col-span-2">
                <SolutionCard solution={s} />
              </div>
            ))}
            {wideRow.map((s) => (
              <div key={s.slug} className="md:col-span-3">
                <SolutionCard solution={s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container">
          <SectionHeading eyebrow={t(ui.nav.services)} title={t(copy.servicesTitle)} />
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {services.map((service, i) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="group flex gap-5 py-6 border-t border-border">
                  <span className="font-serif font-semibold text-primary min-w-7" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex flex-col gap-1.5">
                    <span className="font-serif text-xl font-bold group-hover:text-primary transition-colors">{t(service.name)}</span>
                    <span className="text-muted-foreground">{t(service.summary)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading eyebrow={t(ui.nav.industries)} title={t(copy.industriesTitle)} />
          <div className="flex flex-wrap gap-3">
            {industries.map((industry) => {
              const Icon = industryIcons[industry.icon];
              return (
                <Link
                  key={industry.slug}
                  href={`/industries#${industry.slug}`}
                  className="inline-flex items-center gap-2.5 min-h-12 px-5 rounded-full bg-card border border-border font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" aria-hidden />
                  {t(industry.name)}
                </Link>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {copy.pillars.map(({ icon: Icon, title, text }) => (
              <div key={title.en} className="p-7 rounded-lg bg-card border border-border">
                <Icon className="w-8 h-8 text-primary" strokeWidth={1.8} aria-hidden />
                <h3 className="font-serif text-xl font-bold mt-4 mb-2">{t(title)}</h3>
                <p className="text-muted-foreground">{t(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA {...defaultCta} />
    </Layout>
  );
}
