# HikmaNova website

Marketing site for **HikmaNova** — AI & IoT solutions for North Africa and the Gulf.
Live at <https://g-ayoub.github.io/hikmanova-website/>.

The site is served from the `/hikmanova-website/` sub-path: `base` in `vite.config.ts` and `SITE_URL` in
`client/src/const.ts` must match the deployment URL. Reference files in `client/public` through
`asset("/images/…")` (`client/src/lib/asset.ts`) so they get the base prefix. To move to a custom domain,
set `base: "/"` and update `SITE_URL`.

Built with React 18, TypeScript, Vite, Tailwind CSS v4 and [wouter](https://github.com/molefrog/wouter) for routing.
Bilingual, with French planned: English pages live at `/…` and Arabic pages (right-to-left) at `/ar/…`.
Every page is pre-rendered in both languages at build time, with `hreflang` links between the two versions
and both listed in `sitemap.xml`. The language switch moves to the same page in the other language.

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm check      # type-check
pnpm test       # content integrity tests
pnpm build      # production build into dist/public: every page pre-rendered, plus sitemap.xml, robots.txt
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

Anything left empty in `company.ts` is hidden; fill it in and the section appears automatically. The
Clients page (and its nav/footer/sitemap entries) appears once there are client logos or testimonials;
until then `/clients` redirects to the case studies. Images go in `client/public/images/` (kebab-case names, ≤1600 px wide).

### Adding a solution, service or article

Add an entry to the relevant data file. The detail page, listing cards, sitemap page, `sitemap.xml` and
the page's own `<head>` (title, description, share tags, JSON-LD) are generated from it. Then run
`pnpm og` to render its share image into `client/public/og/` and commit it (needs Playwright locally). `pnpm test` checks that every entry has English and Arabic text, slugs are unique,
cross-references exist and images are local.

Articles have an English `content` and an Arabic `contentAr` body (`client/src/data/posts.ts`). An article
without `contentAr` still gets an Arabic page, but it shows the English body and is kept out of search
(`noindex`, canonical to the English article). `pnpm test` currently requires every article to have one.

### Adding French

1. Add `'fr'` to `Language` and `LANGUAGES` in `client/src/contexts/LanguageContext.tsx`.
2. Add a `/fr` prefix next to `AR_PREFIX` in `client/src/lib/langPath.ts` and handle it in `splitLangPath` /
   `withLang`, then add `"fr"` to `LANGS` in `scripts/gen-sitemap.ts`.
3. Fill the optional `fr` field on `Localized` values (missing ones fall back to English).

## Contact form

The Contact page form posts to [Formspree](https://formspree.io), which emails each message to the
address set on the form (the reply-to is the visitor's email). The form ID is `FORMSPREE_FORM_ID` in
`client/src/const.ts`; to move to another Formspree form, change that one line. A hidden `_gotcha`
field filters basic spam bots.

## Project layout

```
client/
  index.html            # meta tags, fonts
  public/               # static files (logo, images)
  src/
    App.tsx             # routes (each page code-split) + legacy redirects
    main.tsx            # browser entry: loads the current page, then mounts over the pre-rendered HTML
    entry-server.tsx    # build-time renderer used by scripts/gen-sitemap.ts
    components/         # Layout, shared blocks (site.tsx), LegalPage, shadcn/ui
    data/               # all site content + tests
    hooks/usePageMeta   # per-page title / description / canonical
    lib/i18n.ts         # Localized type, useI18n(), shared UI strings
    pages/              # one file per route
scripts/gen-sitemap.ts  # pre-renders every page (HTML + per-page head), writes sitemap.xml + robots.txt
server/index.ts         # optional Node server for non-GitHub hosting
```
