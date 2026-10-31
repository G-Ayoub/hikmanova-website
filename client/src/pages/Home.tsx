import { useRef } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Cpu, Radio, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CTA, defaultCta, Eyebrow, ForwardArrow, industryIcons, SectionHeading, SolutionCard } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageDescriptions } from "@/data/routes";
import { asset } from "@/lib/asset";
import { Reveal } from "@/components/motion";
import { solutions } from "@/data/solutions";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { company } from "@/data/company";

const l = (en: string, ar: string): Localized => ({ en, ar });

const copy = {
  eyebrow: l("AI + IoT for North Africa & the Gulf", "الذكاء الاصطناعي وإنترنت الأشياء لشمال أفريقيا والخليج"),
  title: l("Intelligent systems, built and hosted where your data lives", "أنظمة ذكية تُبنى وتُستضاف حيث تقيم بياناتك"),
  subtitle: pageDescriptions["/"],
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
      <section className="hero overflow-hidden">
        <div className="container pt-16 md:pt-28 pb-16 md:pb-24">
          <Reveal className="mx-auto max-w-4xl text-center">
            <Eyebrow>{t(copy.eyebrow)}</Eyebrow>
            <h1 className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.25rem] font-serif font-semibold mb-6">{t(copy.title)}</h1>
            <p className="mx-auto max-w-[36em] text-xl md:text-[1.375rem] md:leading-[1.45] tracking-[-0.012em] text-muted-foreground mb-10">{t(copy.subtitle)}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href="/solutions">
                  {t(copy.ctaPrimary)} <ForwardArrow />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">{t(ui.bookWorkshop)}</Link>
              </Button>
            </div>
          </Reveal>

          <HeroStage iotAlt={t(copy.heroArtIot)} lamanaAlt={t(copy.heroArtLamana)} />

          {company.stats.length > 0 && (
            <Reveal>
              <h2 className="sr-only">{t(copy.numbersTitle)}</h2>
              <dl className="mx-auto mt-16 md:mt-24 max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 text-center">
                {company.stats.map((stat) => (
                  <div key={stat.label.en} className="flex flex-col-reverse justify-end gap-1">
                    <dt className="text-[0.9375rem] text-muted-foreground">{t(stat.label)}</dt>
                    <dd className="font-serif text-[2.5rem] md:text-[3.25rem] font-semibold tracking-[-0.03em] leading-none">
                      <span dir="ltr" className="inline-block">{stat.value}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 md:py-28">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
            <div className="[&>div]:mb-0">
              <SectionHeading eyebrow={t(ui.nav.solutions)} title={t(copy.solutionsTitle)} />
            </div>
            <Link href="/solutions" className="pressable group inline-flex items-center gap-1.5 min-h-11 font-medium text-primary shrink-0">
              {t(copy.viewAllSolutions)} <ForwardArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {topRow.map((s, i) => (
              <Reveal key={s.slug} className="md:col-span-2" delay={i * 0.06}>
                <SolutionCard solution={s} />
              </Reveal>
            ))}
            {wideRow.map((s, i) => (
              <Reveal key={s.slug} className="md:col-span-3" delay={i * 0.06}>
                <SolutionCard solution={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services: an inset grouped list */}
      <section className="py-16 md:py-28 bg-card">
        <div className="container">
          <SectionHeading eyebrow={t(ui.nav.services)} title={t(copy.servicesTitle)} />
          <Reveal>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {services.map((service, i) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="pressable group flex items-start gap-5 py-6 border-t border-[var(--hairline)]">
                    <span className="font-serif text-[0.9375rem] font-medium text-muted-foreground min-w-7 pt-1 tabular-nums" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex flex-1 flex-col gap-1">
                      <span className="font-serif text-[1.3125rem] font-semibold tracking-[-0.015em] transition-colors group-hover:text-primary">{t(service.name)}</span>
                      <span className="text-muted-foreground">{t(service.summary)}</span>
                    </span>
                    <ChevronRight className="mt-1.5 w-5 h-5 shrink-0 text-muted-foreground/60 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 md:py-28">
        <div className="container">
          <SectionHeading eyebrow={t(ui.nav.industries)} title={t(copy.industriesTitle)} />
          <Reveal className="flex flex-wrap gap-2.5">
            {industries.map((industry) => {
              const Icon = industryIcons[industry.icon];
              return (
                <Link
                  key={industry.slug}
                  href={`/industries#${industry.slug}`}
                  className="inline-flex items-center gap-2 min-h-11 px-[1.125rem] rounded-full bg-card shadow-[0_0_0_1px_var(--hairline)] font-medium transition-[color,box-shadow,transform] duration-200 hover:text-primary hover:shadow-[0_0_0_1px_var(--primary)] active:scale-[0.97] active:duration-75"
                >
                  <Icon className="w-4 h-4 text-primary" aria-hidden />
                  {t(industry.name)}
                </Link>
              );
            })}
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {copy.pillars.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title.en} delay={i * 0.06} className="p-7 md:p-8 rounded-xl bg-card shadow-[0_0_0_1px_var(--hairline)]">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[0.875rem] bg-secondary text-primary">
                  <Icon className="w-[22px] h-[22px]" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="font-serif text-[1.3125rem] font-semibold mt-5 mb-2">{t(title)}</h3>
                <p className="text-muted-foreground">{t(text)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA {...defaultCta} />
    </Layout>
  );
}

/**
 * Product illustrations on a soft stage. As the stage scrolls into view it settles from slightly
 * smaller and lower to full size, tied 1:1 to scroll position (no timer), and stays put with reduced motion.
 */
function HeroStage({ iotAlt, lamanaAlt }: { iotAlt: string; lamanaAlt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { scale, y: lift }}
      className="relative mx-auto mt-14 md:mt-20 max-w-5xl aspect-[16/11] sm:aspect-[16/10]"
    >
      <img
        src={asset("/images/iot-cold-chain.svg")}
        alt={iotAlt}
        className="absolute top-0 end-0 w-[82%] rounded-xl bg-card surface-shadow ring-1 ring-[var(--hairline)]"
      />
      <img
        src={asset("/images/lamana.svg")}
        alt={lamanaAlt}
        className="absolute bottom-0 start-0 w-[60%] rounded-xl bg-card surface-shadow ring-4 ring-background"
      />
    </motion.div>
  );
}
