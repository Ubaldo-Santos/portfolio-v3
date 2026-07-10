# Production Audit — Portfolio v3

**Date:** 2026-07-10  
**Score:** 82/100 — launchable with caveats  
**Verdict:** Safe to ship as a static portfolio. No auth/data/payment surface. Main gaps: no automated tests, large client bundle, stale docs (now fixed).

---

## Executive summary

Portfolio v3 is a well-structured static SSR site with clear separation of content (`cv.ts`) and UI (`translations.ts`). Build passes, SSR error handling exists, SEO/i18n/print patterns are solid. No secrets in repo, no backend attack surface.

---

## Blockers

None for a public portfolio launch.

---

## High-value fixes

| Priority | Issue | Status | Notes |
|----------|-------|--------|-------|
| P1 | ESLint error in `seo.ts` | **Fixed** | Prettier import formatting |
| P1 | Error/404 pages hardcoded to Spanish | **Fixed** | Now use `useTranslation()` |
| P1 | `llms.txt` email mismatch vs `cv.ts` | **Fixed** | Aligned to `u.santospaton@gmail.com` |
| P1 | Stale `project-context.mdc` | **Fixed** | Updated translations path, CV print, analytics |
| P2 | CSS `@import` order warning | **Fixed** | Google Fonts moved before `tw-animate-css` |
| P2 | Hardcoded breadcrumb labels in routes | **Fixed** | Centralized `seoBreadcrumbs()` |
| P2 | No automated tests | Open | No Vitest/Playwright configured |
| P2 | Client bundle ~723 kB (gzip 225 kB) | Open | Motion + i18next + router in main chunk |
| P3 | 44 unused shadcn components | Open | Lovable scaffold — document, don't delete casually |
| P3 | `data/site.ts` unused | Open | Reserved for future use |
| P3 | Duplicate `Lang` type (`cv.ts` vs `i18n/index.ts`) | Open | Low risk, consolidate when touching types |
| P3 | SEO meta always ES regardless of user lang | By design | Documented in AI-CONTEXT |

---

## Security & auth

| Check | Result |
|-------|--------|
| Secrets in repo | Pass — none found |
| Auth surface | N/A — static site |
| User input | N/A — no forms/backend |
| XSS vectors | Low — React escaping; no `dangerouslySetInnerHTML` except bootstrap script + JSON-LD |
| External links | Pass — `rel="noreferrer"` on `_blank` links |
| SSRF / API abuse | N/A |
| Dependencies | Radix/shadcn stack — keep `bun update` periodic |

---

## Data integrity

| Check | Result |
|-------|--------|
| Single source of truth | Pass — `cv.ts` |
| Email consistency | Pass (after fix) |
| i18n completeness | Pass — es/ca/en parity in `translations.ts` |
| Print CV accuracy | Pass — reads live from `cv.ts` |

---

## Operations

| Check | Result |
|-------|--------|
| Build from clean checkout | Pass — `bun install && bun run build` |
| Lint | Pass (after fix) — 7 warnings in shadcn scaffold only |
| Deploy target | Vercel via Nitro preset, `nodejs22.x` |
| Env vars required | None for runtime (static content) |
| Error reporting | `reportLovableError()` in root error boundary |
| Analytics | `@vercel/analytics` wired to router navigations |
| Rollback | Git revert + Vercel redeploy |

---

## User experience

| Check | Result |
|-------|--------|
| Mobile layout | Pass — responsive Tailwind, mobile nav |
| Dark mode | Pass — no flash via bootstrap script |
| i18n switching | Pass — ES/CA/EN |
| Accessibility | Good — skip link, aria labels on ribbon/nav, semantic HTML |
| Print CV | Pass — `@media print` + `.no-print` chrome hiding |
| Error states | Pass (after fix) — localized 404/error |
| Custom cursor | Fine-pointer only — doesn't affect touch users |

---

## Performance notes

- Main JS chunk ~723 kB minified — acceptable for portfolio but above ideal.
- Mitigation options (future): lazy-load Easter egg, code-split Motion on non-home routes.
- Fonts loaded via Google Fonts `@import` — consider `link rel="preload"` in head for LCP.
- SSR bundle lean (~90 kB router) — good.

---

## Test coverage

| Type | Status |
|------|--------|
| Unit tests | None |
| Integration tests | None |
| E2E tests | None |
| ECC smoke test | `bun run ecc:smoke` — harness only |

**Recommendation:** Add Vitest for `pick()`, `formatPeriod()`, `detectLang()` if test infra is desired. E2E optional for critical paths (lang switch, print CV).

---

## Evidence checked

- `bun run lint` — 1 error (fixed), 7 warnings (shadcn scaffold)
- `bun run build` — success, CSS import warning (fixed)
- Full `src/` exploration (~101 files)
- `AGENTS.md`, `project-context.mdc`, `public/llms.txt`
- Route files, `__root.tsx`, `seo.ts`, `cv.ts`, `translations.ts`

---

## Evidence missing

- Live production URL browser audit (not run this session)
- Lighthouse / Core Web Vitals scores
- Vercel deployment logs

---

## Next actions (prioritized)

1. **Done:** Fix lint, i18n errors, breadcrumbs, CSS, llms.txt, docs
2. **Optional:** Add Vitest for `lib/format.ts` and `lib/detect-lang.ts`
3. **Optional:** Code-split Motion/Easter egg to reduce main bundle
4. **Optional:** Root `README.md` for human contributors
5. **Periodic:** `bun update` + redeploy

---

## Score breakdown

| Lens | Score | Weight |
|------|-------|--------|
| Security | 95 | Static, no secrets |
| Data integrity | 90 | Single source, i18n parity |
| Operations | 85 | Build/lint/deploy clear |
| UX/a11y | 85 | Strong patterns, minor gaps |
| Performance | 70 | Large client bundle |
| Testing | 40 | No app tests |

**Weighted average ≈ 82/100**
