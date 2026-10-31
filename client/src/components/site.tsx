import { Link } from "wouter";
import {
  ArrowLeft, ArrowRight, Brain, Building2, Hotel, Landmark, Presentation, Radio,
  Satellite, Server, ShieldCheck, Zap, Smartphone, Trophy, Truck, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import type { Solution } from "@/data/solutions";
import type { ServiceIcon } from "@/data/services";
import type { IndustryIcon } from "@/data/industries";
import { asset } from "@/lib/asset";
import { Reveal } from "@/components/motion";

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  brain: Brain,
  radio: Radio,
  smartphone: Smartphone,
  server: Server,
  shield: ShieldCheck,
  presentation: Presentation,
};

export const industryIcons: Record<IndustryIcon, LucideIcon> = {
  satellite: Satellite,
  hotel: Hotel,
  landmark: Landmark,
  truck: Truck,
  trophy: Trophy,
  building: Building2,
  server: Server,
  zap: Zap,
};

/** Arrow that points "forward" in both LTR and RTL. */
export function ForwardArrow({ className = "w-4 h-4" }: { className?: string }) {
  return <ArrowRight className={`${className} rtl:rotate-180`} aria-hidden />;
}

/** Arrow that points "back" in both LTR and RTL. */
export function BackArrow({ className = "w-4 h-4" }: { className?: string }) {
  return <ArrowLeft className={`${className} rtl:rotate-180`} aria-hidden />;
}

export function PageHero({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <section className="hero">
      <div className="container pt-16 pb-14 md:pt-28 md:pb-20">
        <Reveal className="max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-[2.75rem] md:text-[4.5rem] font-serif font-semibold mb-5">{title}</h1>
          {subtitle && <p className="text-xl md:text-[1.5rem] md:leading-[1.4] tracking-[-0.012em] text-muted-foreground">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}

/** Accent label above a hero headline. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow mb-4">
      <span className="me-2 inline-block h-1.5 w-1.5 rounded-full bg-teal align-middle" aria-hidden />
      {children}
    </p>
  );
}

/** Small category / status chip. */
export function Chip({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "teal" }) {
  const tones = {
    blue: "bg-secondary text-secondary-foreground",
    teal: "bg-accent text-accent-foreground",
  };
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

export function SectionHeading({ title, subtitle, eyebrow, center = false }: { title: string; subtitle?: string; eyebrow?: string; center?: boolean }) {
  return (
    <Reveal className={`mb-10 md:mb-14 ${center ? "text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className={`text-[2rem] md:text-[3rem] font-serif font-semibold ${subtitle ? "mb-4" : ""} ${center ? "mx-auto max-w-[20em]" : "max-w-[18em]"}`}>{title}</h2>
      {subtitle && <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
    </Reveal>
  );
}

export function SolutionCard({ solution }: { solution: Solution }) {
  const { t } = useI18n();
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="group card-hover rounded-xl overflow-hidden bg-card h-full flex flex-col shadow-[0_0_0_1px_var(--hairline)]"
    >
      <div className="overflow-hidden aspect-video bg-muted">
        <img
          src={asset(solution.image)}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="p-6 md:p-7 flex-1 flex flex-col gap-2">
        <div className="flex flex-wrap gap-1.5">
          <Chip>{t(ui.categories[solution.category])}</Chip>
          {solution.caseStudy && (
            <Chip tone="teal">
              {t(ui.solution.caseStudyBadge)}
              {solution.client && <> · {t(solution.client)}</>}
            </Chip>
          )}
        </div>
        <h3 className="mt-2 font-serif text-[1.5rem] font-semibold">{solution.name}</h3>
        <p className="text-muted-foreground flex-1">{t(solution.tagline)}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-primary">
          {t(ui.learnMore)} <ForwardArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className="px-3 py-1 rounded-full bg-muted text-foreground/80 text-sm" dir="ltr">
          {item}
        </span>
      ))}
    </div>
  );
}

/** Closing call to action: a dark showcase tile, centered, one clear action. */
export function CTA({ title, subtitle }: { title: Localized; subtitle: Localized }) {
  const { t } = useI18n();
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-2xl bg-tile text-on-tile px-6 py-16 md:px-16 md:py-24 text-center dark:shadow-[inset_0_0_0_1px_var(--hairline)]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_120%,color-mix(in_oklab,var(--primary)_45%,transparent),transparent_70%)]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-[2rem] md:text-[3rem] font-serif font-semibold mb-4">{t(title)}</h2>
            <p className="text-lg md:text-xl text-on-tile-muted mb-9">{t(subtitle)}</p>
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                {t(ui.bookWorkshop)} <ForwardArrow />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export const defaultCta = {
  title: { en: "Let's build your next system together", ar: "لنبنِ نظامك القادم معاً" },
  subtitle: {
    en: "Start with a short proof-of-concept workshop on your own data and infrastructure.",
    ar: "ابدأ بورشة قصيرة لإثبات المفهوم على بياناتك وبنيتك التحتية.",
  },
} satisfies { title: Localized; subtitle: Localized };
