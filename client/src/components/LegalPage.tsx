import Layout from "@/components/Layout";
import { PageHero } from "@/components/site";
import { useI18n, type Localized } from "@/lib/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";

export interface LegalSection {
  heading: Localized;
  paragraphs?: Localized[];
  list?: Localized[];
}

const updatedLabel: Localized = { en: "Last updated", ar: "آخر تحديث" };

export default function LegalPage({ title, updated, sections }: { title: Localized; updated: Localized; sections: LegalSection[] }) {
  const { t } = useI18n();
  usePageMeta(t(title));

  return (
    <Layout>
      <PageHero title={t(title)} subtitle={`${t(updatedLabel)}: ${t(updated)}`} />
      <section className="pb-16 md:pb-24">
        <div className="container max-w-3xl space-y-10">
          {sections.map((s, i) => (
            <div key={s.heading.en}>
              <h2 className="text-2xl font-serif font-bold mb-4">
                {i + 1}. {t(s.heading)}
              </h2>
              {s.paragraphs?.map((p) => (
                <p key={p.en} className="text-muted-foreground leading-relaxed mb-4">{t(p)}</p>
              ))}
              {s.list && (
                <ul className="list-disc ps-6 space-y-2 text-muted-foreground">
                  {s.list.map((item) => (
                    <li key={item.en}>{t(item)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
