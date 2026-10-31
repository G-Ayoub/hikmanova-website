import { Link } from "wouter";
import {
  ArrowLeft, ArrowRight, Brain, Building2, Clock, Hotel, Landmark, Presentation, Radio,
  Satellite, Server, ShieldCheck, Smartphone, Trophy, Truck, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import type { Solution } from "@/data/solutions";
import type { ServiceIcon } from "@/data/services";
import type { IndustryIcon } from "@/data/industries";
import { asset } from "@/lib/asset";

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
    <section className="signal-hero">
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1.05]">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl leading-relaxed text-[var(--on-navy-muted)]">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}

/** Pill with a teal dot, used above headings on navy sections. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-2 text-sm font-medium text-[var(--on-navy-muted)]">
      <span className="h-2 w-2 rounded-full bg-[var(--teal)]" aria-hidden />
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
  return <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export function SectionHeading({ title, subtitle, eyebrow, center = false }: { title: string; subtitle?: string; eyebrow?: string; center?: boolean }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className={`text-3xl md:text-[2.75rem] md:leading-[1.1] font-serif font-bold ${subtitle ? "mb-4" : ""} ${center ? "" : "max-w-[18em]"}`}>{title}</h2>
      {subtitle && <p className={`text-lg text-muted-foreground max-w-2xl ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
    </div>
  );
}

/** Visible placeholder for content that is not available yet. */
export function ComingSoon({ title, note }: { title?: string; note?: string }) {
  const { t } = useI18n();
  return (
    <div className="rounded-lg border-2 border-dashed border-border bg-card/60 p-8 text-center">
      <Clock className="w-8 h-8 mx-auto mb-3 text-muted-foreground" aria-hidden />
      <p className="font-semibold mb-1">{title ?? t(ui.comingSoon)}</p>
      <p className="text-sm text-muted-foreground">{note ?? t(ui.comingSoonNote)}</p>
    </div>
  );
}

export function SolutionCard({ solution }: { solution: Solution }) {
  const { t } = useI18n();
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="group card-hover rounded-lg overflow-hidden bg-card border border-border h-full flex flex-col"
    >
      <div className="overflow-hidden aspect-video bg-[#F4F7FF]">
        <img
          src={asset(solution.image)}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col gap-2.5">
        <div className="flex flex-wrap gap-2">
          <Chip>{t(ui.categories[solution.category])}</Chip>
          {solution.caseStudy && (
            <Chip tone="teal">
              {t(ui.solution.caseStudyBadge)}
              {solution.client && <> · {t(solution.client)}</>}
            </Chip>
          )}
        </div>
        <h3 className="mt-1 font-serif text-2xl font-bold group-hover:text-primary transition-colors">{solution.name}</h3>
        <p className="text-muted-foreground flex-1">{t(solution.tagline)}</p>
        <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          {t(ui.learnMore)} <ForwardArrow />
        </span>
      </div>
    </Link>
  );
}

export function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm" dir="ltr">
          {item}
        </span>
      ))}
    </div>
  );
}

export function CTA({ title, subtitle }: { title: Localized; subtitle: Localized }) {
  const { t } = useI18n();
  return (
    <section className="signal-hero">
      <div className="container py-16 md:py-24 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-[2.75rem] md:leading-[1.1] font-serif font-bold mb-4">{t(title)}</h2>
          <p className="text-lg leading-relaxed text-[var(--on-navy-muted)]">{t(subtitle)}</p>
        </div>
        <Button asChild size="lg" className="h-14 px-7 gap-2.5 bg-white text-[var(--navy)] hover:bg-white/90 font-bold text-base shrink-0">
          <Link href="/contact">
            {t(ui.bookWorkshop)} <ForwardArrow />
          </Link>
        </Button>
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
