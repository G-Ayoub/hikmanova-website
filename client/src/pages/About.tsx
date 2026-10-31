import Layout from "@/components/Layout";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

const values = [
  {
    titleKey: "about.values.innovation.title",
    descriptionKey: "about.values.innovation.description",
  },
  {
    titleKey: "about.values.ethics.title",
    descriptionKey: "about.values.ethics.description",
  },
  {
    titleKey: "about.values.education.title",
    descriptionKey: "about.values.education.description",
  },
];

const team = [
  {
    nameKey: "about.team.Khalil.name",
    roleKey: "about.team.Khalil.role",
    bioKey: "about.team.Khalil.bio",
    avatar: "/images/abstract-2.jpg",
  },
  {
    nameKey: "about.team.hicham.name",
    roleKey: "about.team.hicham.role",
    bioKey: "about.team.hicham.bio",
    avatar: "/images/abstract-2.jpg",
  },
  {
    nameKey: "about.team.ayoub.name",
    roleKey: "about.team.ayoub.role",
    bioKey: "about.team.ayoub.bio",
    avatar: "/images/abstract-2.jpg",
  },
];

export default function About() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const missionPoints = [
    "about.mission.point1",
    "about.mission.point2",
    "about.mission.point3",
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{t('about.hero.title')}</h1>
            <p className="text-lg text-muted-foreground">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">{t('about.mission.title')}</h2>
              <p className="text-lg text-muted-foreground mb-4">
                {t('about.mission.description1')}
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                {t('about.mission.description2')}
              </p>
              <div className="space-y-3">
                {missionPoints.map((pointKey, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{t(pointKey)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                alt={t('about.mission.imageAlt')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('about.values.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="p-8 rounded-lg border border-border bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-serif font-bold text-lg">{idx + 1}</span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{t(value.titleKey)}</h3>
                <p className="text-muted-foreground">{t(value.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('about.team.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="mb-4 overflow-hidden rounded-lg h-48">
                  <img
                    src={member.avatar}
                    alt={t(member.nameKey)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif font-bold text-lg mb-1">{t(member.nameKey)}</h3>
                <p className="text-sm text-primary font-semibold mb-2">{t(member.roleKey)}</p>
                <p className="text-sm text-muted-foreground">{t(member.bioKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
