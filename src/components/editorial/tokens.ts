/** Editorial design tokens — canonical Tailwind class strings for migration-safe reuse. */

export const kickerSm = "font-mono text-[10px] uppercase tracking-widest text-muted-foreground";

/** Canonical section / card kicker (tracking-[0.25em]). */
export const kickerMd = "font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground";

/** Page hero index kicker — preserves legacy `tracking-widest` used by SectionIndex. */
export const kickerPage = "font-mono text-[11px] uppercase tracking-widest text-muted-foreground";

/** Section h2 label. */
export const kickerLg = "font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground";

export const cardSurface = "rounded-2xl border border-hairline bg-surface/40";

export const cardFeature = "rounded-3xl border border-hairline bg-surface/40";

export const cardAccentFeature =
  "rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/10 via-background to-background";

export const cardPadding = {
  sm: "p-5",
  md: "p-6 sm:p-8",
  lg: "p-8 sm:p-12",
} as const;

export const chipBase =
  "inline-flex rounded-full border border-hairline bg-background px-2.5 py-1 text-xs";

export const chipAccent =
  "inline-flex rounded-full border border-accent/40 bg-background px-2.5 py-1 text-xs";

export const chipStatus =
  "rounded-full border border-accent bg-accent/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground";

export const sectionGap = {
  lead: "mt-12",
  md: "mt-16",
  lg: "mt-20",
} as const;

export const arrowNudge =
  "transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5";

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/15";
