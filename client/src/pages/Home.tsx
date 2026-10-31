import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain, Code, Rocket } from "lucide-react";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

const featuredProjects = [
  {
    id: 1,
    titleKey: "home.projects.neuralVision.title",
    categoryKey: "home.projects.neuralVision.category",
    descriptionKey: "home.projects.neuralVision.description",
    image: "/images/abstract-1.jpg",
    slug: "neural-vision-platform",
  },
  {
    id: 2,
    titleKey: "home.projects.dataPipeline.title",
    categoryKey: "home.projects.dataPipeline.category",
    descriptionKey: "home.projects.dataPipeline.description",
    image: "/images/abstract-2.jpg",
    slug: "data-pipeline-architecture",
  },
  {
    id: 3,
    titleKey: "home.projects.cloudOptimization.title",
    categoryKey: "home.projects.cloudOptimization.category",
    descriptionKey: "home.projects.cloudOptimization.description",
    image: "/images/abstract-3.jpg",
    slug: "cloud-infrastructure-optimization",
  },
];

const testimonials = [
  {
    id: 1,
    nameKey: "home.testimonials.sarah.name",
    roleKey: "home.testimonials.sarah.role",
    contentKey: "home.testimonials.sarah.content",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    nameKey: "home.testimonials.marcus.name",
    roleKey: "home.testimonials.marcus.role",
    contentKey: "home.testimonials.marcus.content",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    nameKey: "home.testimonials.elena.name",
    roleKey: "home.testimonials.elena.role",
    contentKey: "home.testimonials.elena.content",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

const services = [
  {
    icon: Brain,
    titleKey: "home.services.softwareDevelopment.title",
    descriptionKey: "home.services.softwareDevelopment.description",
  },
  {
    icon: Code,
    titleKey: "home.services.aiStrategy.title",
    descriptionKey: "home.services.aiStrategy.description",
  },
  {
    icon: Zap,
    titleKey: "home.services.productPrototyping.title",
    descriptionKey: "home.services.productPrototyping.description",
  },
  {
    icon: Rocket,
    titleKey: "home.services.iotSolutions.title",
    descriptionKey: "home.services.iotSolutions.description",
  },
];

export default function Home() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const workSteps = [
    { step: "01", titleKey: "home.howWeWork.discovery.title", descKey: "home.howWeWork.discovery.desc" },
    { step: "02", titleKey: "home.howWeWork.strategy.title", descKey: "home.howWeWork.strategy.desc" },
    { step: "03", titleKey: "home.howWeWork.development.title", descKey: "home.howWeWork.development.desc" },
    { step: "04", titleKey: "home.howWeWork.deploy.title", descKey: "home.howWeWork.deploy.desc" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 hero-gradient opacity-10 -z-10" />
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects">
                <Button size="lg" className="gap-2">
                  {t('home.hero.cta')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  {t('home.hero.ctaSecondary')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('home.featuredProjects.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('home.featuredProjects.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <a className="group card-hover rounded-lg overflow-hidden bg-background border border-border">
                  <div className="relative overflow-hidden h-48 bg-muted">
                    <img
                      src={project.image}
                      alt={t(project.titleKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        {t(project.categoryKey)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {t(project.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(project.descriptionKey)}
                    </p>
                  </div>
                </a>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="gap-2">
                {t('home.featuredProjects.viewAll')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('home.howWeWork.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('home.howWeWork.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {workSteps.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-serif font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{t(item.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('home.services.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('home.services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="p-6 rounded-lg border border-border bg-background hover:border-primary transition-colors">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-serif font-bold mb-2">{t(service.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(service.descriptionKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">{t('home.cta.title')}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {t('home.cta.subtitle')}
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="gap-2">
              {t('home.cta.button')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
