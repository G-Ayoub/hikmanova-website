import { Link } from "wouter";
import { Award, FlaskConical, Lightbulb } from "lucide-react";
import Layout from "@/components/Layout";
import { CTA, defaultCta, ForwardArrow, PageHero, SectionHeading } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageDescriptions } from "@/data/routes";
import { getSolution } from "@/data/solutions";
import { company } from "@/data/company";
import { asset } from "@/lib/asset";

const l = (en: string, ar: string): Localized => ({ en, ar });

const copy = {
  subtitle: pageDescriptions["/innovation"],
  ipTitle: l("Registered intellectual property", "ملكية فكرية مسجّلة"),
  nusukText: l(
    "Our Smart Hajj & Umrah crowd intelligence — low-energy-signal location intelligence combining movement prediction, congestion forecasting and smart routing — is registered as intellectual property in the Kingdom of Saudi Arabia.",
    "نظامنا الذكي لإدارة حشود الحج والعمرة — ذكاء مكاني قائم على إشارات منخفضة الطاقة يجمع بين التنبؤ بالحركة وتوقّع الازدحام والتوجيه الذكي — مسجّل ملكيةً فكرية في المملكة العربية السعودية.",
  ),
  registered: l("Registered in Saudi Arabia", "مسجّلة في المملكة العربية السعودية"),
  deposit: l("Deposit no.", "رقم الإيداع"),
  approachTitle: l("How we innovate", "كيف نبتكر"),
  approach: [
    { icon: Lightbulb, title: l("Start from the field", "ننطلق من الميدان"), text: l("Ideas come from real operations — stadiums, holy sites, hotels and warehouses.", "تنبع الأفكار من عمليات حقيقية — الملاعب والمشاعر المقدسة والفنادق والمستودعات.") },
    { icon: FlaskConical, title: l("Prototype quickly", "نبني النماذج بسرعة"), text: l("Hardware and software proofs of concept in weeks, tested with real users.", "نماذج أولية للعتاد والبرمجيات خلال أسابيع، تُختبر مع مستخدمين حقيقيين.") },
    { icon: Award, title: l("Protect and productise", "نحمي وننتج"), text: l("Register what is new, then harden it into a product others can adopt.", "نسجّل ما هو جديد، ثم نطوّره إلى منتج يمكن للآخرين تبنيه.") },
  ],
};

export default function Innovation() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.innovation), t(copy.subtitle));
  const nusuk = getSolution("nusuk-card")!;

  return (
    <Layout>
      <PageHero title={t(ui.nav.innovation)} subtitle={t(copy.subtitle)} />

      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading title={t(copy.ipTitle)} />
          <article className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden bg-card ring-1 ring-[var(--hairline)] max-w-5xl mx-auto">
            <img src={asset(nusuk.image)} alt="" className="w-full h-64 md:h-full object-cover" />
            <div className="p-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                <Award className="w-4 h-4" aria-hidden /> {t(copy.registered)}
              </span>
              <h3 className="text-2xl font-serif font-semibold mb-3">{nusuk.name}</h3>
              <p className="text-muted-foreground mb-3">{t(copy.nusukText)}</p>
              <p className="text-sm text-muted-foreground mb-6">{t(copy.deposit)}: <span dir="ltr" className="font-semibold text-foreground tabular-nums">{company.saudiIpDeposit}</span></p>
              <Link href={`/solutions/${nusuk.slug}`} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                {t(ui.learnMore)} <ForwardArrow />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <SectionHeading title={t(copy.approachTitle)} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.approach.map(({ icon: Icon, title, text }) => (
              <div key={title.en} className="p-6 rounded-xl bg-background ring-1 ring-[var(--hairline)]">
                <Icon className="w-8 h-8 text-primary mb-3" aria-hidden />
                <h3 className="font-serif font-semibold mb-2">{t(title)}</h3>
                <p className="text-sm text-muted-foreground">{t(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA {...defaultCta} />
    </Layout>
  );
}
