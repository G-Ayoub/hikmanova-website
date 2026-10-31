# HikmaNova website

Marketing site for **HikmaNova** — AI & IoT solutions for North Africa and the Gulf.
Live at <https://elbaraediscord.github.io>.

Built with React 18, TypeScript, Vite, Tailwind CSS v4 and [wouter](https://github.com/molefrog/wouter) for routing.
Bilingual (English / Arabic with RTL), with French planned.

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm check      # type-check
pnpm test       # content integrity tests
pnpm build      # production build into dist/public (+ sitemap.xml, robots.txt)
pnpm preview    # serve the production build
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`: install → type-check → test → build → publish
`dist/public` to GitHub Pages. `404.html` is a copy of `index.html` so deep links work on refresh.

## Where the content lives

All copy is in typed data files; each text is a `{ en, ar }` object (`Localized`, see `client/src/lib/i18n.ts`).

| What | File |
|---|---|
| Solutions / products and their case studies | `client/src/data/solutions.ts` |
| Services | `client/src/data/services.ts` |
| Industries | `client/src/data/industries.ts` |
| Insights (blog) articles | `client/src/data/posts.ts` |
| Company facts: key numbers, leadership, offices, WhatsApp / LinkedIn, client logos, testimonials, open roles, profile PDF | `client/src/data/company.ts` |
| Navigation, buttons and shared labels | `ui` in `client/src/lib/i18n.ts` |
| Page-specific copy | the `copy` object at the top of each page in `client/src/pages/` |

Anything left empty in `company.ts` shows a visible **"Coming soon"** placeholder; fill it in and the
section appears automatically. Images go in `client/public/images/` (kebab-case names, ≤1600 px wide).

### Adding a solution, service or article

Add an entry to the relevant data file. The detail page, listing cards, sitemap page and `sitemap.xml`
are generated from it. `pnpm test` checks that every entry has English and Arabic text, slugs are unique,
cross-references exist and images are local.

### Adding French

1. Add `'fr'` to `Language` and `LANGUAGES` in `client/src/contexts/LanguageContext.tsx`.
2. Fill the optional `fr` field on `Localized` values (missing ones fall back to English).

## Project layout

```
client/
  index.html            # meta tags, fonts
  public/               # static files (logo, images)
  src/
    App.tsx             # routes + legacy redirects
    components/         # Layout, shared blocks (site.tsx), LegalPage, shadcn/ui
    data/               # all site content + tests
    hooks/usePageMeta   # per-page title / description / canonical
    lib/i18n.ts         # Localized type, useI18n(), shared UI strings
    pages/              # one file per route
scripts/gen-sitemap.ts  # writes sitemap.xml + robots.txt after build
server/index.ts         # optional Node server for non-GitHub hosting
```
