import Layout from "@/components/Layout";
import { Link } from "wouter";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

const blogPosts = [
  {
    id: 1,
    titleKey: "blog.posts.aiEnterprise.title",
    slugKey: "future-of-ai-in-enterprise",
    excerptKey: "blog.posts.aiEnterprise.excerpt",
    contentKey: "blog.posts.aiEnterprise.content",
    author: "HikmaNova",
    date: "2025-10-20",
    categoryKey: "blog.posts.aiEnterprise.category",
    image: "/images/abstract-1.jpg",
    readTimeKey: "blog.readTime.8min",
  },
  {
    id: 2,
    titleKey: "blog.posts.dataPipelines.title",
    slugKey: "building-scalable-data-pipelines",
    excerptKey: "blog.posts.dataPipelines.excerpt",
    contentKey: "blog.posts.dataPipelines.content",
    author: "HikmaNova",
    date: "2025-10-15",
    categoryKey: "blog.posts.dataPipelines.category",
    image: "/images/abstract-2.jpg",
    readTimeKey: "blog.readTime.10min",
  },
  {
    id: 3,
    titleKey: "blog.posts.cloudCost.title",
    slugKey: "cloud-cost-optimization-strategies",
    excerptKey: "blog.posts.cloudCost.excerpt",
    contentKey: "blog.posts.cloudCost.content",
    author: "HikmaNova",
    date: "2025-10-10",
    categoryKey: "blog.posts.cloudCost.category",
    image: "/images/abstract-3.jpg",
    readTimeKey: "blog.readTime.7min",
  },
  {
    id: 4,
    titleKey: "blog.posts.mlProduction.title",
    slugKey: "machine-learning-in-production",
    excerptKey: "blog.posts.mlProduction.excerpt",
    contentKey: "blog.posts.mlProduction.content",
    author: "HikmaNova",
    date: "2025-10-05",
    categoryKey: "blog.posts.mlProduction.category",
    image: "/images/abstract-4.jpg",
    readTimeKey: "blog.readTime.12min",
  },
  {
    id: 5,
    titleKey: "blog.posts.realtimeAnalytics.title",
    slugKey: "realtime-analytics-streaming-data",
    excerptKey: "blog.posts.realtimeAnalytics.excerpt",
    contentKey: "blog.posts.realtimeAnalytics.content",
    author: "HikmaNova",
    date: "2025-09-30",
    categoryKey: "blog.posts.realtimeAnalytics.category",
    image: "/images/abstract-5.jpg",
    readTimeKey: "blog.readTime.9min",
  },
  {
    id: 6,
    titleKey: "blog.posts.kubernetes.title",
    slugKey: "kubernetes-best-practices",
    excerptKey: "blog.posts.kubernetes.excerpt",
    contentKey: "blog.posts.kubernetes.content",
    author: "HikmaNova",
    date: "2025-09-25",
    categoryKey: "blog.posts.kubernetes.category",
    image: "/images/abstract-6.jpg",
    readTimeKey: "blog.readTime.11min",
  },
];

export default function Blog() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{t('blog.hero.title')}</h1>
            <p className="text-lg text-muted-foreground">
              {t('blog.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts.length > 0 && (
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container">
            <Link href={`/blog/${blogPosts[0].slugKey}`}>
              <a className="group block">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="rounded-lg overflow-hidden h-96">
                    <img
                      src={blogPosts[0].image}
                      alt={t(blogPosts[0].titleKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-4">
                      {t('blog.featured')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
                      {t(blogPosts[0].titleKey)}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {t(blogPosts[0].excerptKey)}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {blogPosts[0].author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(blogPosts[0].date)}
                      </div>
                      <span>{t(blogPosts[0].readTimeKey)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      {t('blog.readArticle')}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <Link key={post.id} href={`/blog/${post.slugKey}`}>
                <a className="group card-hover rounded-lg overflow-hidden bg-card border border-border flex flex-col h-full">
                  <div className="relative overflow-hidden h-48 bg-muted">
                    <img
                      src={post.image}
                      alt={t(post.titleKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        {t(post.categoryKey)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {t(post.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {t(post.excerptKey)}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDateShort(post.date)}
                      </div>
                      <span>{t(post.readTimeKey)}</span>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold mb-4">{t('blog.newsletter.title')}</h2>
            <p className="text-muted-foreground">
              {t('blog.newsletter.subtitle')}
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder={t('blog.newsletter.placeholder')}
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {t('blog.newsletter.subscribe')}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
