import { Link, useParams } from "wouter";
import { Calendar, Clock, User } from "lucide-react";
import Layout from "@/components/Layout";
import { BackArrow } from "@/components/site";
import { ui, useI18n } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getPost, posts } from "@/data/posts";
import { formatDate } from "./Blog";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = getPost(slug);
  const { t, language } = useI18n();
  usePageMeta(post ? t(post.title) : t(ui.blog.notFound), post && t(post.excerpt));

  if (!post) return <NotFound />;

  const body = language === "ar" && post.contentAr ? post.contentAr : post.content;
  const showsEnglishFallback = language !== "en" && body === post.content;
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <Layout>
      <article>
        <header className="container max-w-3xl pt-12 pb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <BackArrow /> {t(ui.blog.backToInsights)}
          </Link>
          <p className="text-sm font-semibold text-primary mb-3">{t(post.category)}</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">{t(post.title)}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><User className="w-4 h-4" aria-hidden /> {post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" aria-hidden /> {formatDate(post.date, language)}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" aria-hidden /> {post.readMinutes} {t(ui.blog.minRead)}</span>
          </div>
        </header>

        <div className="container max-w-4xl mb-10">
          <img src={post.image} alt="" className="w-full rounded-lg border border-border aspect-[2/1] object-cover" />
        </div>

        <div className="container max-w-3xl pb-16">
          {showsEnglishFallback && (
            <p className="mb-6 p-4 rounded-lg bg-muted text-sm">{t(ui.englishOnly)}</p>
          )}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dir={showsEnglishFallback ? "ltr" : undefined}
            lang={showsEnglishFallback ? "en" : undefined}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </article>

      <section className="py-12 bg-card">
        <div className="container">
          <h2 className="text-2xl font-serif font-bold mb-6">{t(ui.blog.more)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {more.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group p-6 rounded-lg border border-border bg-background hover:border-primary">
                <p className="text-xs font-semibold text-primary mb-2">{t(p.category)}</p>
                <h3 className="font-serif font-bold group-hover:text-primary">{t(p.title)}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
