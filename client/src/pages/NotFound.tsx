import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ui, useI18n } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";

const suggestions = [
  { href: "/solutions", label: ui.nav.solutions },
  { href: "/services", label: ui.nav.services },
  { href: "/case-studies", label: ui.nav.caseStudies },
  { href: "/contact", label: ui.nav.contact },
];

export default function NotFound() {
  const { t } = useI18n();
  usePageMeta(t(ui.notFound.title));

  return (
    <Layout>
      <section className="py-24 md:py-32">
        <div className="container max-w-2xl text-center">
          <p className="text-7xl font-serif font-bold text-primary mb-4">404</p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t(ui.notFound.title)}</h1>
          <p className="text-lg text-muted-foreground mb-8">{t(ui.notFound.subtitle)}</p>
          <Button asChild size="lg">
            <Link href="/">{t(ui.notFound.backHome)}</Link>
          </Button>
          <div className="mt-12">
            <h2 className="font-serif font-bold mb-4">{t(ui.notFound.suggestions)}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {suggestions.map((s) => (
                <Link key={s.href} href={s.href} className="px-4 py-2 rounded-full border border-border hover:border-primary hover:text-primary">
                  {t(s.label)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
