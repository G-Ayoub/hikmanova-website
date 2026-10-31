import Layout from "@/components/Layout";
import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

const allProjects = [
  {
    id: 1,
    titleKey: "projects.teamMonitor.title",
    categoryKey: "projects.teamMonitor.category",
    descriptionKey: "projects.teamMonitor.description",
    image: "/images/qatar-world-cup.jpg",
    slug: "fifa-team-monitor",
    year: 2025,
  },
  {
    id: 2,
    titleKey: "projects.nusuk.title",
    categoryKey: "projects.nusuk.category",
    descriptionKey: "projects.nusuk.description",
    image: "/images/nusuk-card.jpg",
    slug: "nusuk-smart-card",
    year: 2025,
  },
  {
    id: 3,
    titleKey: "projects.cryptocurrency.title",
    categoryKey: "projects.cryptocurrency.category",
    descriptionKey: "projects.cryptocurrency.description",
    image: "/images/abstract-2.jpg",
    slug: "cryptocurrency-investment-platform",
    year: 2025,
  },
  {
    id: 4,
    titleKey: "projects.chatbot.title",
    categoryKey: "projects.chatbot.category",
    descriptionKey: "projects.chatbot.description",
    image: "/images/abstract-2.jpg",
    slug: "smart-chatbot-customer-service",
    year: 2025,
  },
  {
    id: 5,
    titleKey: "projects.erp.title",
    categoryKey: "projects.erp.category",
    descriptionKey: "projects.erp.description",
    image: "/images/abstract-2.jpg",
    slug: "intervention-vouchers-erp",
    year: 2025,
  },
  {
    id: 7,
    titleKey: "projects.technological.title",
    categoryKey: "projects.technological.category",
    descriptionKey: "projects.technological.description",
    image: "/images/abstract-2.jpg",
    slug: "technological-dependency-research",
    year: 2025,
  },
  {
    id: 8,
    titleKey: "projects.neural.title",
    categoryKey: "projects.neural.category",
    descriptionKey: "projects.neural.description",
    image: "/images/abstract-1.jpg",
    slug: "neural-vision-platform",
    year: 2025,
  },
  {
    id: 9,
    titleKey: "projects.dataPipeline.title",
    categoryKey: "projects.dataPipeline.category",
    descriptionKey: "projects.dataPipeline.description",
    image: "/images/abstract-2.jpg",
    slug: "data-pipeline-architecture",
    year: 2025,
  },

  {
    id: 14,
    titleKey: "projects.warehouse.title",
    categoryKey: "projects.warehouse.category",
    descriptionKey: "projects.warehouse.description",
    image: "/images/abstract-7.jpg",
    slug: "realtime-data-warehouse",
    year: 2025,
  },
  {
    id: 15,
    titleKey: "projects.kubernetes.title",
    categoryKey: "projects.kubernetes.category",
    descriptionKey: "projects.kubernetes.description",
    image: "/images/abstract-8.jpg",
    slug: "kubernetes-migration",
    year: 2025,
  },
  /*
  {
    id: 16,
    titleKey: "projects.autonomous.title",
    categoryKey: "projects.autonomous.category",
    descriptionKey: "projects.autonomous.description",
    image: "/images/abstract-9.jpg",
    slug: "autonomous-delivery-robot",
    year: 2025,
  },
  */
];
{/* Hero 
  {
    id: 6,
    titleKey: "projects.cybersecurity.title",
    categoryKey: "projects.cybersecurity.category",
    descriptionKey: "projects.cybersecurity.description",
    image: "/images/abstract-2.jpg",
    slug: "cybersecurity-consulting-audit",
    year: 2025,
  },
    {
    id: 10,
    titleKey: "projects.cloudOptimization.title",
    categoryKey: "projects.cloudOptimization.category",
    descriptionKey: "projects.cloudOptimization.description",
    image: "/images/abstract-3.jpg",
    slug: "cloud-infrastructure-optimization",
    year: 2025,
  },
  {
    id: 11,
    titleKey: "projects.robotics.title",
    categoryKey: "projects.robotics.category",
    descriptionKey: "projects.robotics.description",
    image: "/images/abstract-4.jpg",
    slug: "robotics-control-system",
    year: 2025,
  },
  {
    id: 12,
    titleKey: "projects.ecommerce.title",
    categoryKey: "projects.ecommerce.category",
    descriptionKey: "projects.ecommerce.description",
    image: "/images/abstract-5.jpg",
    slug: "ecommerce-platform",
    year: 2025,
  },
  {
    id: 13,
    titleKey: "projects.predictive.title",
    categoryKey: "projects.predictive.category",
    descriptionKey: "projects.predictive.description",
    image: "/images/abstract-6.jpg",
    slug: "predictive-analytics-engine",
    year: 2025,
  },
*/}

const categories = [
  { key: "all", labelKey: "projects.categories.all" },
  { key: "AI", labelKey: "projects.categories.ai" },
  { key: "Data", labelKey: "projects.categories.data" },
  { key: "Cloud", labelKey: "projects.categories.cloud" },
  { key: "Software Engineering", labelKey: "projects.categories.software" },
  { key: "IoT & IIoT", labelKey: "projects.categories.iot" },
];

export default function Projects() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? allProjects
    : allProjects.filter((p) => {
        const categoryKey = p.categoryKey;
        return t(categoryKey) === selectedCategory;
      });

  const stats = [
    { labelKey: "projects.stats.completed", value: "9+" },
    { labelKey: "projects.stats.team", value: "15+" },
    { labelKey: "projects.stats.expertise", value: "10 years" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{t('projects.hero.title')}</h1>
            <p className="text-lg text-muted-foreground">
              {t('projects.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-border">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === t(category.labelKey) ? "default" : "outline"}
                onClick={() => setSelectedCategory(t(category.labelKey))}
                className="rounded-full"
              >
                {t(category.labelKey)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <a className="group card-hover rounded-lg overflow-hidden bg-card border border-border h-full flex flex-col">
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
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {t(project.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {t(project.descriptionKey)}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('projects.noProjects')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground">{t(stat.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
