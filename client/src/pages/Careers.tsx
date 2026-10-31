import { Link } from "wouter";
import { Globe2, Rocket, Users } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageDescriptions } from "@/data/routes";
import { company } from "@/data/company";

const l = (en: string, ar: string): Localized => ({ en, ar });

const copy = {
  subtitle: pageDescriptions["/careers"],
  cultureTitle: l("How we work", "كيف نعمل"),
  culture: [
    { icon: Rocket, title: l("Real impact", "أثر حقيقي"), text: l("Your work goes into production for large events and enterprises.", "يصل عملك إلى بيئات تشغيل فعلية لفعاليات ومؤسسات كبرى.") },
    { icon: Users, title: l("Small, senior team", "فريق صغير وخبير"), text: l("Ownership end to end, from workshop to deployment.", "مسؤولية كاملة من ورشة العمل إلى النشر.") },
    { icon: Globe2, title: l("Regional reach", "حضور إقليمي"), text: l("Projects across Algeria, the Gulf and Europe.", "مشاريع في الجزائر والخليج وأوروبا.") },
  ],
  rolesTitle: l("Open positions", "الوظائف المتاحة"),
  spontaneous: l(
    "No open role that fits? Send us your CV and tell us what you would like to build.",
    "لم تجد وظيفة مناسبة؟ أرسل لنا سيرتك الذاتية وأخبرنا بما تودّ بناءه.",
  ),
  apply: l("Apply", "تقدّم الآن"),
  noRoles: l(
    "We have no open positions right now, but we always like to meet engineers who want to build systems that run in the field.",
    "لا توجد وظائف شاغرة حالياً، لكننا نرحب دائماً بالتعرّف على مهندسين يرغبون في بناء أنظمة تعمل في الميدان.",
  ),
};

export default function Careers() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.careers), t(copy.subtitle));

  return (
    <Layout>
      <PageHero title={t(ui.nav.careers)} subtitle={t(copy.subtitle)} />

      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading title={t(copy.cultureTitle)} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.culture.map(({ icon: Icon, title, text }) => (
              <div key={title.en} className="p-6 rounded-xl bg-card ring-1 ring-[var(--hairline)]">
                <Icon className="w-8 h-8 text-primary mb-3" aria-hidden />
                <h3 className="font-serif font-semibold mb-2">{t(title)}</h3>
                <p className="text-sm text-muted-foreground">{t(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-3xl">
          <SectionHeading title={t(copy.rolesTitle)} />
          {company.openRoles.length > 0 ? (
            <ul className="space-y-4">
              {company.openRoles.map((role) => (
                <li key={role.title.en} className="p-6 rounded-xl bg-background ring-1 ring-[var(--hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-semibold">{t(role.title)}</h3>
                    <p className="text-sm text-muted-foreground">{t(role.location)} · {t(role.type)}</p>
                  </div>
                  <Button asChild>
                    <a href={role.applyUrl ?? `mailto:${company.email}?subject=${encodeURIComponent(role.title.en)}`}>{t(copy.apply)}</a>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-muted-foreground">{t(copy.noRoles)}</p>
          )}
          {company.openRoles.length > 0 && <p className="text-center text-muted-foreground mt-8">{t(copy.spontaneous)}</p>}
          <div className="text-center mt-6">
            <Button asChild variant="outline">
              <Link href="/contact">{t(ui.contactUs)}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
