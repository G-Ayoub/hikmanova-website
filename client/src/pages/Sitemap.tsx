import { Link } from "wouter";
import Layout from "@/components/Layout";
import { PageHero } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { staticRoutes } from "@/data/routes";
import { solutions } from "@/data/solutions";
import { services } from "@/data/services";
import { posts } from "@/data/posts";

export default function Sitemap() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.sitemap));

  const groups: { title: Localized; links: { href: string; label: string }[] }[] = [
    { title: { en: "Pages", ar: "الصفحات" }, links: staticRoutes.map((r) => ({ href: r.path, label: t(r.label) })) },
    { title: ui.nav.solutions, links: solutions.map((s) => ({ href: `/solutions/${s.slug}`, label: s.name })) },
    { title: ui.nav.services, links: services.map((s) => ({ href: `/services/${s.slug}`, label: t(s.name) })) },
    { title: ui.nav.insights, links: posts.map((p) => ({ href: `/blog/${p.slug}`, label: t(p.title) })) },
  ];

  return (
    <Layout>
      <PageHero title={t(ui.nav.sitemap)} />
      <section className="py-16 md:py-24">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {groups.map((g) => (
            <div key={g.title.en}>
              <h2 className="text-xl font-serif font-bold mb-4">{t(g.title)}</h2>
              <ul className="space-y-2">
                {g.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
