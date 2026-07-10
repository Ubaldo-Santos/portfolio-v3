# AI Context — Portfolio v3

> **Read this first** before making changes. Optimized for AI agents (Cursor, Codex, Claude Code).

## Quick facts

| Item                    | Value                                     |
| ----------------------- | ----------------------------------------- |
| URL                     | `https://ubaldo.is-a.dev`                 |
| Repo                    | `Ubaldo-Santos/portfolio-v3`              |
| Runtime                 | Bun 1.3.14+ only                          |
| Framework               | TanStack Start (SSR) + TanStack Router    |
| Content source of truth | `src/data/cv.ts`                          |
| UI strings              | `src/i18n/translations.ts` (ES / CA / EN) |
| Authoritative rules     | `.cursor/rules/project-context.mdc`       |

## Architecture (30-second mental model)

```
cv.ts (facts)          translations.ts (UI labels)
       \                      /
        v                    v
   routes/*.tsx  →  components/  →  lib/ (seo, format, detect-lang)
        |
   __root.tsx (shell, i18n, header, footer, analytics)
        |
   Vercel (Nitro preset, nodejs22.x runtime)
```

**No backend.** Contact is `mailto:` / external links. No database, no auth.

## File map — where to edit what

| Task                                | File(s)                                                  | Notes                                                                  |
| ----------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- |
| Add/edit job, project, skill        | `src/data/cv.ts`                                         | Use `LocalizedString` / `LocalizedList`; run through `pick(obj, lang)` |
| Change UI text (nav, buttons, meta) | `src/i18n/translations.ts`                               | Update **all three** locales: `es`, `ca`, `en`                         |
| New page/route                      | `src/routes/<name>.tsx`                                  | File-based routing; add `head()` with `routeHead()`                    |
| SEO (title, OG, canonical)          | `src/lib/seo.ts`                                         | `routeHead(page, path, opts)` localizes via `detectLang()` on SSR      |
| Breadcrumbs JSON-LD                 | `seoBreadcrumbs()` in `seo.ts`                           | Localized labels via `detectLang()` (or explicit `lang` arg)           |
| Date/period formatting              | `src/lib/format.ts`                                      | `formatPeriod()`, `currentLang()`, `workAnchorId()`                    |
| Theme (light/dark)                  | `src/hooks/use-theme.ts` + `src/lib/bootstrap-script.ts` | View Transitions API                                                   |
| Language detection                  | `src/lib/detect-lang.ts`                                 | SSR: cookie → Accept-Language; client: cookie → localStorage → navigator |
| Catastrophic SSR error HTML         | `src/lib/error-page.ts`                                  | `renderErrorPage(lang)` — same detection as SSR via request headers    |
| Print/PDF CV                        | `src/routes/cv.tsx` + `@media print` in `styles.css`     | Uses `window.print()`, **not** html2pdf                                |
| OG image preview                    | `src/routes/og.$size.tsx` + `src/lib/og-sizes.ts`        | `/og/1200x630?theme=light`                                             |
| Design tokens / fonts               | `src/styles.css`                                         | Tailwind v4 `@theme inline`, oklch colors                              |
| Navigation items                    | `src/lib/nav.ts`                                         | `NAV_ITEMS` constant                                                   |
| Site URL                            | `src/lib/site.ts`                                        | `SITE_URL` — single export                                             |
| Machine-readable summary            | `public/llms.txt`                                        | Keep in sync with `cv.ts`                                              |

## Route inventory

| Path          | File             | Indexed     | Purpose                          |
| ------------- | ---------------- | ----------- | -------------------------------- |
| `/`           | `index.tsx`      | yes         | Hero, featured work, tech ribbon |
| `/experience` | `experience.tsx` | yes         | Work + trainee timelines         |
| `/projects`   | `projects.tsx`   | yes         | Project cards                    |
| `/skills`     | `skills.tsx`     | yes         | Skills, education, languages     |
| `/contact`    | `contact.tsx`    | yes         | mailto, phone, social            |
| `/cv`         | `cv.tsx`         | **noindex** | Printable ATS CV                 |
| `/og/$size`   | `og.$size.tsx`   | **noindex** | Social preview renderer          |

## Page composition pattern

Every content route follows this stack:

```tsx
<MotionPage>
  <PageShell>
    <PageHeader page="experience" subtitle={t("experience.subtitle")} />
    <Reveal>…</Reveal>
  </PageShell>
</MotionPage>
```

**Do not invent new layout primitives** unless necessary. Reuse:

- `PageShell`, `PageHeader`, `pageLeadClass` — from `page-shell.tsx`
- `Reveal`, `RevealGroup`, `RevealItem` — scroll animations
- `font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground` — section labels
- `max-w-6xl` — content width
- `border-hairline`, `bg-surface/50` — editorial borders/surfaces

## i18n rules (critical)

1. **SSR resolves language before render** — `start.ts` middleware runs `detectLang()` then `i18n.changeLanguage()` so `t()`, `pick()`, and `routeHead()` match the request.
2. **Detection order (SSR):** `lang` cookie → `Accept-Language` → fallback `es`. **`detectLangFromRequest(request)`** for handlers outside middleware (e.g. `server.ts` error fallback).
3. **Detection order (client):** cookie → `localStorage` → `navigator` (`detectClientLang()`). `BOOTSTRAP_SCRIPT` syncs `localStorage` → cookie and sets `<html lang>` before paint.
4. **Hydration edge case:** if cookie is missing but `localStorage` has a lang, first SSR may differ until cookie sync; `I18nProvider` aligns in `useEffect` after hydrate.
5. CV facts: `pick(cv.work[0].summary, lang)` — never hardcode one language in JSX.
6. UI strings: `t("nav.experience")` — keys mirror `translations.ts` structure.
7. Route `head()` meta: localized via `routeHead()` + `detectLang()`; OG **text** per lang, OG **PNG** stays English (`OG_LANG` in `og-sizes.ts`).
8. `hreflang` alternates share one canonical URL (cookie-based i18n, no `/en/` prefixes).

## Content change recipes

### Add a new job to experience

1. Edit `cv.work` array in `src/data/cv.ts` (most recent first).
2. Required fields: `name`, `position`, `summary`, `highlights`, `location`, `modality` — each as `LocalizedString` or `LocalizedList`.
3. No route changes needed unless adding anchor links.

### Add a new project

1. Edit `cv.projects` in `cv.ts`.
2. Set `featured: true` to show on homepage.

### Change contact email

1. `cv.basics.email` in `cv.ts`
2. `public/llms.txt` (machine-readable)
3. Verify `contact.tsx` reads from `cv.basics`

### Add UI string

1. Add key under `es`, `ca`, `en` in `translations.ts`.
2. Use `t("your.key")` in component.

### Add a new route

1. Create `src/routes/foo.tsx` with `createFileRoute("/foo")`.
2. Add `head: () => routeHead("foo", "/foo", { breadcrumbs: seoBreadcrumbs("foo") })` if indexed.
3. Add meta block in `translations.ts` under `meta.foo` (all langs).
4. Add nav entry in `src/lib/nav.ts` + `translations.nav`.
5. Update `public/sitemap.xml` and `public/llms.txt`.

## Stack constraints (non-negotiable)

- **Bun only** — `bun run dev|build|lint|format`
- **No manual Vite plugins** — config via `@lovable.dev/vite-tanstack-config`
- **No `node:*` imports** — ESLint enforced; use `Bun.env` in `*.server.ts`
- **Minimal diffs** — match existing patterns
- **Immutability** — never mutate CV data or state in place

## shadcn/ui scaffold

44 files in `src/components/ui/` from Lovable template. **Only `sonner` (Toaster) is used** in app code. Do not add new shadcn components unless the feature requires them. Do not delete the scaffold without explicit request (Lovable sync may restore).

## Dead code (known, safe to ignore)

| File                               | Status                                                        |
| ---------------------------------- | ------------------------------------------------------------- |
| `src/data/site.ts`                 | `siteStack` unused — intended for future "built with" section |
| `src/lib/api/example.functions.ts` | Lovable scaffold — example `createServerFn`                   |
| `src/hooks/use-mobile.tsx`         | Only used by unused `ui/sidebar.tsx`                          |

## Verification checklist

After any change, run:

```bash
bun run lint
bun run build
```

Manual smoke (if UI changed):

1. `/` — hero, theme toggle, lang switch
2. `/experience` — timeline renders in all 3 langs
3. `/cv` — print preview hides chrome (`.no-print`)
4. Dark mode — no flash on reload

## Common mistakes to avoid

| Mistake                               | Correct approach         |
| ------------------------------------- | ------------------------ |
| Edit content in route files           | Edit `cv.ts` only        |
| Add JSON locale files                 | Use `translations.ts`    |
| Hardcode Spanish in components        | Use `t()` or `pick()`    |
| Add Vite plugins manually             | Use Lovable config       |
| Use `npm`/`pnpm`/`yarn`               | Use `bun`                |
| Import from `node:fs` etc.            | Use Bun APIs or avoid    |
| Duplicate `SITE_URL`                  | Import from `@/lib/site` |
| Create `download-cv.ts` with html2pdf | CV uses `window.print()` |

## Related docs

- `docs/AUDIT.md` — production readiness audit
- `AGENTS.md` — cross-harness entry point
- `.cursor/rules/project-context.mdc` — Cursor always-on rules
- `public/llms.txt` — external AI/SEO summary
