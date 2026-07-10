# Editorial Design System

Foundation layer for the portfolio’s editorial-técnico visual language. Tokens and primitives live in `src/components/editorial/`; routes migrate incrementally — do not duplicate Tailwind strings inline once a token or primitive exists.

## Purpose

- **One source of truth** for repeated class strings (kickers, cards, chips, gaps, focus rings).
- **Small, typed primitives** that match existing pages visually (no shadcn defaults, no generic Heading).
- **SSR-safe, accessible** components using `cn`, TanStack `Link`, and `lucide-react` icons.

## Rule: design in one place, reuse everywhere

When a pattern appears twice (or matches a token), import from `@/components/editorial` instead of copying Tailwind. Page layout shells (`PageShell`, `PageHeader`) stay in `page-shell.tsx`; editorial atoms live under `editorial/`.

---

## Token constants (`tokens.ts`)

| Name                | Value / shape                                                             | Use                                   |
| ------------------- | ------------------------------------------------------------------------- | ------------------------------------- |
| `kickerSm`          | `font-mono text-[10px] uppercase tracking-widest text-muted-foreground`   | Fine metadata, period lines           |
| `kickerMd`          | `font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground` | Canonical card/section kicker         |
| `kickerPage`        | `font-mono text-[11px] uppercase tracking-widest text-muted-foreground`   | Page index labels (`pageKickerClass`) |
| `kickerLg`          | `font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground`     | Section h2 labels                     |
| `cardSurface`       | `rounded-2xl border border-hairline bg-surface/40`                        | Default cards                         |
| `cardFeature`       | `rounded-3xl border border-hairline bg-surface/40`                        | Hero/feature cards                    |
| `cardAccentFeature` | `rounded-3xl border border-accent/40 bg-gradient-to-br …`                 | Accent callouts (e.g. AI block)       |
| `cardPadding`       | `{ sm, md, lg }`                                                          | `p-5`, `p-6 sm:p-8`, `p-8 sm:p-12`    |
| `chipBase`          | rounded-full hairline chip                                                | Skill/tag default                     |
| `chipAccent`        | `border-accent/40` variant                                                | Highlighted tags                      |
| `chipStatus`        | accent fill, mono 10px                                                    | “Present” / status pills              |
| `sectionGap`        | `{ lead: mt-12, md: mt-16, lg: mt-20 }`                                   | Section vertical rhythm               |
| `arrowNudge`        | group-hover translate                                                     | Arrow affordance                      |
| `focusRing`         | `focus-visible:ring-2 ring-foreground/15`                                 | Interactive focus                     |

**Backward compat:** `page-shell.tsx` re-exports `pageLeadClass` → `sectionGap.lead`, `pageKickerClass` → `kickerPage`.

---

## Primitives

### `CtaButton`

Primary actions and text CTAs. Polymorphic: `button` (default), `a`, or `Link`.

| Prop          | Type                                  | Default                   |
| ------------- | ------------------------------------- | ------------------------- |
| `variant`     | `"primary" \| "secondary" \| "ghost"` | `"primary"`               |
| `as`          | `"button" \| "a" \| Link`             | `"button"`                |
| `withArrow`   | `boolean`                             | `false`                   |
| `href` / `to` | string                                | when `as` is `a` / `Link` |

```tsx
import { CtaButton } from "@/components/editorial";
import { Link } from "@tanstack/react-router";

<CtaButton variant="primary" as={Link} to="/contact" withArrow>
  Contact me
</CtaButton>;
```

### `ArrowLink`

Muted → foreground text link with trailing `ArrowUpRight`. Internal (`to`) or external (`href`; auto `target`/`rel` for `http`).

| Prop         | Type           | Default                                    |
| ------------ | -------------- | ------------------------------------------ |
| `size`       | `"sm" \| "md"` | `"sm"`                                     |
| `aria-label` | `string`       | required when children are empty/icon-only |

```tsx
<ArrowLink href="https://github.com/..." size="md">GitHub</ArrowLink>
<ArrowLink to="/projects">All projects</ArrowLink>
```

### `Chip` / `ChipList`

| `Chip` prop | Type                                | Default     |
| ----------- | ----------------------------------- | ----------- |
| `variant`   | `"default" \| "accent" \| "status"` | `"default"` |
| `as`        | `"span" \| "li"`                    | `"span"`    |

`ChipList` renders `items: string[]` as a flex-wrap `ul` with optional `label` for `aria-label`.

```tsx
<ChipList items={skills} variant="default" label="Backend skills" />
<Chip variant="status">Present</Chip>
```

### `SurfaceCard`

Card surfaces with optional accent wash (contact/CV blob). Interactive when `as="a"` or `as={Link}`.

| Prop      | Type                                        | Default     |
| --------- | ------------------------------------------- | ----------- |
| `variant` | `"surface" \| "feature" \| "accentFeature"` | `"surface"` |
| `padding` | `"sm" \| "md" \| "lg"`                      | `"md"`      |
| `wash`    | `boolean`                                   | `false`     |
| `as`      | `"div" \| "article" \| "a" \| Link`         | `"div"`     |

```tsx
<SurfaceCard variant="feature" padding="lg" wash className={sectionGap.lead}>
  …
</SurfaceCard>
```

### `SectionHeader`

Section titles with optional kicker, description, or editorial `index` (`SectionIndex` from `page-shell`).

| Prop          | Type                   | Default  |
| ------------- | ---------------------- | -------- |
| `label`       | `ReactNode`            | —        |
| `title`       | `ReactNode`            | required |
| `description` | `ReactNode`            | —        |
| `as`          | `"h2" \| "h3" \| "h4"` | `"h2"`   |
| `index`       | `string`               | —        |

```tsx
<SectionHeader index="04" title={t("home.selectedWork")} description={sub} />
<SectionHeader title={t("experience.work")} />
```

### `MetaLabel`

Mono metadata line (period, location, modality) with optional Lucide icon.

| Prop   | Type           | Default |
| ------ | -------------- | ------- |
| `size` | `"sm" \| "md"` | `"md"`  |
| `icon` | `LucideIcon`   | —       |

```tsx
<MetaLabel icon={MapPin}>{location}</MetaLabel>
```

---

## What NOT to build here

- **No generic `Heading`** — use `SectionHeader` or page-shell titles.
- **No shadcn button variants** — `src/components/ui/` stays unused (except Sonner).
- **No route migrations in this layer** — consume primitives from routes in a follow-up step.
- **Keep `#cv-article` print CSS isolated** in `styles.css` — do not fold CV print rules into editorial tokens.

---

## Route migration checklist (later)

Import from `@/components/editorial`:

- `CtaButton`, `ArrowLink` — hero and footer-style links
- `SurfaceCard`, `sectionGap`, `cardPadding` — contact, CV hint, projects grid
- `Chip`, `ChipList` — skills, experience stack tags
- `SectionHeader`, `kickerLg`, `sectionGap` — page sections
- `MetaLabel` — experience timeline metadata

Run `bun run lint && bun run build` after each route batch.
