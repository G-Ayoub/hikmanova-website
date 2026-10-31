import { Link } from "wouter";
import { Calendar, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { ForwardArrow, PageHero } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { posts } from "@/data/posts";

const copy = {
  subtitle: {
    en: "Notes from the field on AI agents, IoT and sovereign cloud.",
    ar: "ملاحظات من الميدان حول وكلاء الذكاء الاصطناعي وإنترنت الأشياء والسحابة السيادية.",
  } satisfies Localized,
};

export function formatDate(date: string, language: string) {
  return new Date(date).toLocaleDateString(language === "ar" ? "ar-DZ" : "en-GB", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const { t, language } = useI18n();
  usePageMeta(t(ui.nav.insights), t(copy.subtitle));
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Layout>
      <PageHero title={t(ui.nav.insights)} subtitle={t(copy.subtitle)} />
      <section className="pb-16 md:pb-24">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group card-hover rounded-lg overflow-hidden bg-card border border-border flex flex-col">
              <div className="relative h-48 overflow-hidden bg-muted">
                <img src={post.image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-4 start-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  {t(post.category)}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">{t(post.title)}</h2>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{t(post.excerpt)}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" aria-hidden /> {formatDate(post.date, language)}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" aria-hidden /> {post.readMinutes} {t(ui.blog.minRead)}</span>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {t(ui.blog.readArticle)} <ForwardArrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
