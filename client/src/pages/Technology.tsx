import { Database, Fingerprint, KeyRound, Lock, MapPinned, Server, ShieldCheck, Smartphone } from "lucide-react";
import Layout from "@/components/Layout";
import { CTA, defaultCta, PageHero, SectionHeading, TagList } from "@/components/site";
import { ui, useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";

const l = (en: string, ar: string): Localized => ({ en, ar });

const copy = {
  subtitle: l(
    "A proven, open stack — deployed on-premises or in national data centres, with security built in from the first line of code.",
    "تقنيات مفتوحة ومجرّبة — تُنشر داخل المؤسسة أو في مراكز البيانات الوطنية، مع أمان مدمج منذ السطر الأول من الشيفرة.",
  ),
  stackTitle: l("Our stack", "التقنيات التي نعتمدها"),
  sovereignTitle: l("Data sovereignty & localisation", "سيادة البيانات وتوطينها"),
  sovereignSubtitle: l(
    "In Algeria, Saudi Arabia and across the Gulf, regulations increasingly require sensitive data to stay in the country. Our systems are designed for that from day one.",
    "في الجزائر والمملكة العربية السعودية ودول الخليج، تفرض الأنظمة بشكل متزايد بقاء البيانات الحساسة داخل البلد. وأنظمتنا مصممة لذلك منذ اليوم الأول.",
  ),
  securityTitle: l("Security practices", "ممارسات الأمان"),
};

const stack: { title: Localized; items: string[] }[] = [
  { title: l("AI & data", "الذكاء الاصطناعي والبيانات"), items: ["Python", "LLMs", "Text-to-SQL", "RAG", "PostgreSQL", "SQL Server"] },
  { title: l("Backend", "الأنظمة الخلفية"), items: ["Django", "REST APIs", "Redis", "Celery"] },
  { title: l("Mobile & IoT", "الهاتف وإنترنت الأشياء"), items: ["Flutter", "Android", "iOS", "BLE", "NFC", "iBeacon", "MQTT"] },
  { title: l("Infrastructure", "البنية التحتية"), items: ["Docker", "Kubernetes", "Private registries", "API gateways", "CI/CD"] },
  { title: l("Identity & security", "الهوية والأمان"), items: ["Keycloak", "OAuth 2.0 / OIDC", "JWT", "App attestation"] },
];

const sovereign = [
  { icon: MapPinned, title: l("Data stays in-country", "البيانات تبقى داخل البلد"), text: l("Databases, backups and logs hosted in the client's country, in line with data-localisation rules.", "قواعد البيانات والنسخ الاحتياطية والسجلات مستضافة في بلد العميل وفق متطلبات توطين البيانات.") },
  { icon: Server, title: l("On-premises option", "خيار الاستضافة الداخلية"), text: l("Every product can run on your own servers or a national cloud — no dependency on foreign hyperscalers.", "يمكن تشغيل كل منتج على خوادمك أو على سحابة وطنية — دون الاعتماد على مزودي السحابة الأجانب.") },
  { icon: Database, title: l("Self-hosted AI models", "نماذج ذكاء اصطناعي مستضافة ذاتياً"), text: l("Open LLMs can be deployed locally so prompts and data never leave your network.", "يمكن نشر النماذج اللغوية المفتوحة محلياً لكي لا تغادر البيانات والأسئلة شبكتك.") },
];

const security = [
  { icon: KeyRound, title: l("Centralised identity", "هوية مركزية"), text: l("Single sign-on and role-based access with Keycloak, OAuth 2.0 / OpenID Connect and signed JWTs.", "دخول موحّد وصلاحيات حسب الدور عبر Keycloak وOAuth 2.0 / OpenID Connect ورموز JWT موقّعة.") },
  { icon: Smartphone, title: l("App attestation", "التحقق من سلامة التطبيقات"), text: l("Mobile apps prove they are genuine and unmodified before the API accepts their requests.", "تُثبت تطبيقات الهاتف أنها أصلية وغير معدّلة قبل أن تقبل الواجهات البرمجية طلباتها.") },
  { icon: Lock, title: l("Encryption everywhere", "تشفير شامل"), text: l("TLS in transit and encryption at rest for databases and backups.", "تشفير TLS أثناء النقل وتشفير البيانات المخزنة في قواعد البيانات والنسخ الاحتياطية.") },
  { icon: ShieldCheck, title: l("Secure delivery pipeline", "مسار تسليم آمن"), text: l("Private container registries, image scanning and API gateways with rate limiting.", "سجلات حاويات خاصة، وفحص الصور، وبوابات واجهات برمجية مع تحديد معدل الطلبات.") },
  { icon: Fingerprint, title: l("Least privilege & audit", "أقل صلاحية والتدقيق"), text: l("Fine-grained permissions and audit logs on sensitive operations.", "صلاحيات دقيقة وسجلات تدقيق للعمليات الحساسة.") },
];

export default function Technology() {
  const { t } = useI18n();
  usePageMeta(t(ui.nav.technology), t(copy.subtitle));

  return (
    <Layout>
      <PageHero title={t(ui.nav.technology)} subtitle={t(copy.subtitle)} />

      <section className="pb-16 md:pb-24">
        <div className="container">
          <SectionHeading title={t(copy.stackTitle)} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stack.map((group) => (
              <div key={group.title.en} className="p-6 rounded-lg border border-border bg-card">
                <h3 className="font-serif font-bold mb-4">{t(group.title)}</h3>
                <TagList items={group.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <SectionHeading title={t(copy.sovereignTitle)} subtitle={t(copy.sovereignSubtitle)} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sovereign.map(({ icon: Icon, title, text }) => (
              <div key={title.en} className="p-6 rounded-lg border border-border bg-background">
                <Icon className="w-8 h-8 text-primary mb-3" aria-hidden />
                <h3 className="font-serif font-bold mb-2">{t(title)}</h3>
                <p className="text-sm text-muted-foreground">{t(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading title={t(copy.securityTitle)} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {security.map(({ icon: Icon, title, text }) => (
              <div key={title.en} className="p-6 rounded-lg border border-border bg-card">
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
