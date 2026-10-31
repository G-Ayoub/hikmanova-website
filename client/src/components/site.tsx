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
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 hero-gradient opacity-10 -z-10" />
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">{eyebrow}</p>}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">{title}</h1>
          {subtitle && <p className="text-lg text-muted-foreground leading-relaxed">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ title, subtitle, center = true }: { title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{title}</h2>
      {subtitle && <p className={`text-muted-foreground max-w-2xl ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
    </div>
  );
}

/** Visible placeholder for content that is not available yet. */
export function ComingSoon({ title, note }: { title?: string; note?: string }) {
  const { t } = useI18n();
  return (
    <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center">
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
      className="group card-hover rounded-lg overflow-hidden bg-background border border-border h-full flex flex-col"
    >
      <div className="relative overflow-hidden aspect-video bg-[#F4F7FF]">
        <img
          src={asset(solution.image)}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-4 start-4 inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
          {t(ui.categories[solution.category])}
        </span>
        {solution.caseStudy && (
          <span className="absolute top-4 end-4 inline-block px-3 py-1 bg-background/90 text-foreground text-xs font-semibold rounded-full">
            {t(ui.solution.caseStudyBadge)}
          </span>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">{solution.name}</h3>
        <p className="text-sm text-muted-foreground flex-1">{t(solution.tagline)}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
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
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">{t(title)}</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">{t(subtitle)}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link href="/contact">
              {t(ui.bookWorkshop)} <ForwardArrow />
            </Link>
          </Button>
        </div>
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
