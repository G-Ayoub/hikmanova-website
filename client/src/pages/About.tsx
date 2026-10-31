import { Compass, Eye, MapPin, Target } from "lucide-react";
import Layout from "@/components/Layout";
import { ComingSoon, CTA, defaultCta, PageHero, SectionHeading } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { company } from "@/data/company";
import { asset } from "@/lib/asset";

const l = (en: string, ar: string): Localized => ({ en, ar });

const copy = {
  title: l("About HikmaNova", "عن HikmaNova"),
  subtitle: l(
    "An Algerian technology company building AI and IoT systems for North Africa and the Gulf.",
    "شركة تقنية جزائرية تبني أنظمة الذكاء الاصطناعي وإنترنت الأشياء لشمال أفريقيا والخليج.",
  ),
  storyTitle: l("Our story", "قصتنا"),
  story: [
    l(
      "HikmaNova — from the Arabic hikma, wisdom, and nova, new — was founded in Algiers by engineers who wanted to build intelligent systems for the region, in the region.",
      "تأسست HikmaNova — من كلمة «حكمة» العربية و«نوفا» أي الجديد — في الجزائر العاصمة على يد مهندسين أرادوا بناء أنظمة ذكية للمنطقة، من داخل المنطقة.",
    ),
    l(
      "Our work has taken us from tracking field teams at the FIFA World Cup Qatar 2022, to smart cards for Hajj and Umrah pilgrims, to AI agents for satellite operators. Each project taught us the same lesson: technology has to fit local realities — languages, regulations and infrastructure.",
      "قادتنا أعمالنا من تتبّع الفرق الميدانية في كأس العالم FIFA قطر 2022، إلى البطاقات الذكية لحجاج بيت الله والمعتمرين، إلى وكلاء الذكاء الاصطناعي لمشغلي الأقمار الصناعية. وعلّمنا كل مشروع الدرس ذاته: يجب أن تتلاءم التقنية مع الواقع المحلي — اللغات والأنظمة والبنية التحتية.",
    ),
  ],
  pillars: [
    { icon: Target, title: l("Mission", "رسالتنا"), text: l("Help organisations in North Africa and the Gulf adopt AI and IoT with systems they own, understand and host locally.", "مساعدة المؤسسات في شمال أفريقيا والخليج على تبنّي الذكاء الاصطناعي وإنترنت الأشياء عبر أنظمة تملكها وتفهمها وتستضيفها محلياً.") },
    { icon: Eye, title: l("Vision", "رؤيتنا"), text: l("A region that builds its own intelligent infrastructure — sovereign, secure and multilingual.", "منطقة تبني بنيتها التحتية الذكية بنفسها — سيادية وآمنة ومتعددة اللغات.") },
    { icon: Compass, title: l("Values", "قيمنا"), text: l("Innovation, integrity and knowledge sharing in every engagement.", "الابتكار والنزاهة ومشاركة المعرفة في كل تعاون.") },
  ],
  regionsTitle: l("Where we work", "أين نعمل"),
  leadershipTitle: l("Leadership", "القيادة"),
};

const initials = (name: string) => name.split(/[\s.]+/).filter(Boolean).map((p) => p[0]).join("").slice(0, 2).toUpperCase();

export default function About() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.about), t(copy.subtitle));

  return (
    <Layout>
      <PageHero title={t(copy.title)} subtitle={t(copy.subtitle)} />

      <section className="pb-16 md:pb-24">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">{t(copy.storyTitle)}</h2>
            {copy.story.map((p) => (
              <p key={p.en} className="text-lg text-muted-foreground leading-relaxed mb-4">{t(p)}</p>
            ))}
          </div>
          <img src={asset("/images/abstract-6.jpg")} alt="" loading="lazy" className="rounded-lg border border-border w-full aspect-video object-cover" />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
          {copy.pillars.map(({ icon: Icon, title, text }) => (
            <div key={title.en} className="p-8 rounded-lg border border-border bg-background">
              <Icon className="w-8 h-8 text-primary mb-4" aria-hidden />
              <h2 className="text-2xl font-serif font-bold mb-3">{t(title)}</h2>
              <p className="text-muted-foreground">{t(text)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading title={t(copy.regionsTitle)} />
          <div className="flex flex-wrap justify-center gap-3">
            {company.regions.map((r) => (
              <span key={r.en} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card">
                <MapPin className="w-4 h-4 text-primary" aria-hidden /> {t(r)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <SectionHeading title={t(copy.leadershipTitle)} />
          {company.leadership.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {company.leadership.map((p) => (
                <div key={p.name} className="p-6 rounded-lg border border-border bg-background text-center">
                  {p.photo ? (
                    <img src={asset(p.photo)} alt={p.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                  ) : (
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 hero-gradient flex items-center justify-center text-2xl font-bold text-white" aria-hidden>
                      {initials(p.name)}
                    </div>
                  )}
                  <h3 className="font-serif text-lg font-bold" dir="ltr">{p.name}</h3>
                  <p className="text-sm text-primary">{t(p.role)}</p>
                </div>
              ))}
            </div>
          ) : (
            <ComingSoon />
          )}
        </div>
      </section>

      <CTA {...defaultCta} />
    </Layout>
  );
}
