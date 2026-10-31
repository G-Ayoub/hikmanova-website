import { Link } from "wouter";
import { Award, FlaskConical, Lightbulb } from "lucide-react";
import Layout from "@/components/Layout";
import { CTA, defaultCta, ForwardArrow, PageHero, SectionHeading } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getSolution } from "@/data/solutions";
import { asset } from "@/lib/asset";

const l = (en: string, ar: string): Localized => ({ en, ar });

const copy = {
  subtitle: l(
    "We turn field problems into original products — and protect the ideas behind them.",
    "نحوّل التحديات الميدانية إلى منتجات أصيلة — ونحمي الأفكار التي تقف خلفها.",
  ),
  ipTitle: l("Registered intellectual property", "ملكية فكرية مسجّلة"),
  nusukText: l(
    "Our Smart BLE Nusuk Card for Hajj and Umrah crowd management is registered as intellectual property in the Kingdom of Saudi Arabia.",
    "بطاقة نسك الذكية بتقنية BLE لإدارة حشود الحج والعمرة مسجّلة ملكيةً فكرية في المملكة العربية السعودية.",
  ),
  registered: l("Registered in Saudi Arabia", "مسجّلة في المملكة العربية السعودية"),
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
          <article className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-lg overflow-hidden border border-border bg-card max-w-5xl mx-auto">
            <img src={asset(nusuk.image)} alt="" className="w-full h-64 md:h-full object-cover" />
            <div className="p-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                <Award className="w-4 h-4" aria-hidden /> {t(copy.registered)}
              </span>
              <h3 className="text-2xl font-serif font-bold mb-3">{nusuk.name}</h3>
              <p className="text-muted-foreground mb-6">{t(copy.nusukText)}</p>
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
              <div key={title.en} className="p-6 rounded-lg border border-border bg-background">
                <Icon className="w-8 h-8 text-primary mb-3" aria-hidden />
                <h3 className="font-serif font-bold mb-2">{t(title)}</h3>
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
