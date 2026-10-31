import { Compass, Eye, MapPin, Target } from "lucide-react";
import Layout from "@/components/Layout";
import { CTA, defaultCta, PageHero, SectionHeading } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageDescriptions } from "@/data/routes";
import { company } from "@/data/company";
import { asset } from "@/lib/asset";

const l = (en: string, ar: string): Localized => ({ en, ar });

const copy = {
  title: l("About HikmaNova", "عن HikmaNova"),
  subtitle: pageDescriptions["/about"],
  storyTitle: l("Our story", "قصتنا"),
  story: [
    l(
      "HikmaNova — from the Arabic hikma, wisdom, and nova, new — is a UK-registered technology company headquartered in Bournemouth, with an engineering office in Algiers. A team of 20+ specialists across R&D, engineering, product and business helps organisations turn complex ideas into practical, scalable systems, from discovery and architecture to deployment and continuous improvement.",
      "HikmaNova — من كلمة «حكمة» العربية و«نوفا» أي الجديد — شركة تقنية مسجّلة في المملكة المتحدة ومقرها الرئيسي في بورنموث، ولها مكتب هندسي في الجزائر العاصمة. يساعد فريق يضم أكثر من 20 متخصصاً في البحث والتطوير والهندسة والمنتجات والأعمال المؤسساتِ على تحويل الأفكار المعقدة إلى أنظمة عملية قابلة للتوسع، من الاستكشاف وتصميم البنية إلى النشر والتحسين المستمر.",
    ),
    l(
      "Our work has taken us from tracking field teams at the FIFA World Cup Qatar 2022, to crowd intelligence for Hajj and Umrah, to an AI CRM agent tested in Arabsat's environment. Each project taught us the same lesson: build systems that are deployed in the real world, not demonstrated in a lab — and that fit local languages, regulations and infrastructure.",
      "قادتنا أعمالنا من تتبّع الفرق الميدانية في كأس العالم FIFA قطر 2022، إلى ذكاء الحشود في الحج والعمرة، إلى وكيل ذكاء اصطناعي لإدارة علاقات العملاء اختُبر في بيئة عربسات. وعلّمنا كل مشروع الدرس ذاته: أن نبني أنظمة تُنشر في الواقع لا تُعرض في المختبر — وتتلاءم مع اللغات والأنظمة والبنية التحتية المحلية.",
    ),
  ],
  pillars: [
    { icon: Target, title: l("Mission", "رسالتنا"), text: l("Turn the operational data of enterprises across the Gulf, Africa and Europe into trusted, real-time decisions — with AI and IoT systems deployed in the real world.", "تحويل البيانات التشغيلية للمؤسسات في الخليج وأفريقيا وأوروبا إلى قرارات موثوقة ولحظية — عبر أنظمة ذكاء اصطناعي وإنترنت أشياء تعمل في الواقع.") },
    { icon: Eye, title: l("Vision", "رؤيتنا"), text: l("A region where every critical operation — from data centres to crowds to customer revenue — runs on one intelligent layer, and where applied AI is engineered, not imported.", "منطقة تعمل فيها كل العمليات الحرجة — من مراكز البيانات إلى الحشود إلى إيرادات العملاء — على طبقة ذكية واحدة، ويُهندَس فيها الذكاء الاصطناعي التطبيقي محلياً بدل استيراده.") },
    { icon: Compass, title: l("Approach", "نهجنا"), text: l("Pragmatic and outcome-driven: understand the problem, define the right architecture, build efficiently, validate with users and improve through data.", "نهج عملي يركّز على النتائج: نفهم المشكلة، ونحدد البنية المناسبة، ونبني بكفاءة، ونتحقق مع المستخدمين، ونحسّن بالبيانات.") },
  ],
  regionsTitle: l("Where we work", "أين نعمل"),
  leadershipTitle: l("Founders", "المؤسسون"),
  leadershipSubtitle: l("A multidisciplinary team combining R&D, engineering and business expertise.", "فريق متعدد التخصصات يجمع بين البحث والتطوير والهندسة وخبرة الأعمال."),
  advisorsTitle: l("Board & advisory", "مجلس الإدارة والمستشارون"),
  advisorsSubtitle: l("Experts who guide our science, regulation and market adoption.", "خبراء يوجّهون عملنا في العلوم والتنظيم وتبنّي الأسواق."),
  headquarters: l("Headquarters", "المقر الرئيسي"),
  officesTitle: l("Offices", "المكاتب"),
};

const initials = (name: string) => name.split(/[\s.]+/).filter(Boolean).map((p) => p[0]).join("").slice(0, 2).toUpperCase();

export default function About() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.about), t(copy.subtitle));

  return (
    <Layout>
      <PageHero title={t(copy.title)} subtitle={t(copy.subtitle)} />

      <section className="py-16 md:py-24">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">{t(copy.storyTitle)}</h2>
            {copy.story.map((p) => (
              <p key={p.en} className="text-lg text-muted-foreground leading-relaxed mb-4">{t(p)}</p>
            ))}
          </div>
          <img src={asset("/images/abstract-6.jpg")} alt="" loading="lazy" className="rounded-xl ring-1 ring-[var(--hairline)] w-full aspect-video object-cover" />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
          {copy.pillars.map(({ icon: Icon, title, text }) => (
            <div key={title.en} className="p-8 rounded-xl bg-background ring-1 ring-[var(--hairline)]">
              <Icon className="w-8 h-8 text-primary mb-4" aria-hidden />
              <h2 className="text-2xl font-serif font-semibold mb-3">{t(title)}</h2>
              <p className="text-muted-foreground">{t(text)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading title={t(copy.regionsTitle)} />
          <div className="flex flex-wrap gap-3 mb-10">
            {company.offices.map((o) => (
              <div key={o.city.en} className="flex items-center gap-3 rounded-xl bg-card ring-1 ring-[var(--hairline)] px-5 py-4">
                <MapPin className="w-5 h-5 text-primary" aria-hidden />
                <div>
                  <p className="font-semibold">{t(o.city)}, {t(o.country)}</p>
                  {o.headquarters && <p className="text-sm text-muted-foreground">{t(copy.headquarters)}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {company.regions.map((r) => (
              <span key={r.en} className="inline-flex items-center px-4 py-2 rounded-full bg-muted text-sm">
                {t(r)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {company.leadership.length > 0 && (
        <section className="py-16 md:py-24 bg-card">
          <div className="container">
            <SectionHeading title={t(copy.leadershipTitle)} subtitle={t(copy.leadershipSubtitle)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {company.leadership.map((p) => (
                <article key={p.name} className="p-6 rounded-xl bg-background ring-1 ring-[var(--hairline)]">
                  {p.photo ? (
                    <img src={asset(p.photo)} alt={p.name} className="w-16 h-16 rounded-full mb-4 object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full mb-4 bg-secondary flex items-center justify-center text-xl font-serif font-semibold text-secondary-foreground" aria-hidden>
                      {initials(p.name)}
                    </div>
                  )}
                  <h3 className="font-serif text-lg font-semibold" dir="ltr">{p.name}</h3>
                  <p className="text-sm font-medium text-primary mb-3">{t(p.role)}</p>
                  {p.bio && <p className="text-sm text-muted-foreground leading-relaxed">{t(p.bio)}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {company.advisors.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <SectionHeading title={t(copy.advisorsTitle)} subtitle={t(copy.advisorsSubtitle)} />
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {company.advisors.map((a) => (
                <li key={a.name} className="flex items-start gap-4 py-5 border-t border-[var(--hairline)]">
                  <span className="w-11 h-11 shrink-0 rounded-full bg-muted flex items-center justify-center text-sm font-semibold" aria-hidden>
                    {initials(a.name)}
                  </span>
                  <span>
                    <span className="block font-semibold" dir="ltr">{a.name}</span>
                    <span className="block text-muted-foreground">{t(a.focus)}</span>
                    <span className="block text-sm text-muted-foreground/80">{t(a.country)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTA {...defaultCta} />
    </Layout>
  );
}
