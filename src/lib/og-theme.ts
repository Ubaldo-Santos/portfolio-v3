import type { OgTheme } from "@/lib/og-sizes";

export const OG_PALETTE = {
  light: {
    background: "#FAFAF8",
    foreground: "#2D2A26",
    muted: "#6B6660",
    detailMuted: "#4F4B46",
    hairline: "#E0DDD8",
    accent: "#5A7210",
    glowA: "rgba(155, 197, 32, 0.22)",
    glowB: "rgba(155, 197, 32, 0.12)",
    glowC: "rgba(200, 240, 50, 0.08)",
    logoFilter: undefined as string | undefined,
  },
  dark: {
    background: "#1F1E1C",
    foreground: "#F5F4F2",
    muted: "#C4C0BA",
    detailMuted: "#8E8983",
    hairline: "#3A3835",
    accent: "#D4F530",
    glowA: "rgba(200, 240, 50, 0.16)",
    glowB: "rgba(200, 240, 50, 0.09)",
    glowC: "rgba(155, 197, 32, 0.06)",
    logoFilter: "invert(1)",
  },
} as const satisfies Record<
  OgTheme,
  {
    background: string;
    foreground: string;
    muted: string;
    detailMuted: string;
    hairline: string;
    accent: string;
    glowA: string;
    glowB: string;
    glowC: string;
    logoFilter: string | undefined;
  }
>;

/** Accent green washes — multiple radial lights so the card is not flat. */
export function ogGlowBackground(width: number, height: number, theme: OgTheme): string {
  const { glowA, glowB, glowC } = OG_PALETTE[theme];
  return [
    `radial-gradient(ellipse 58% 48% at 88% 12%, ${glowA} 0%, transparent 72%)`,
    `radial-gradient(ellipse 42% 36% at 12% 88%, ${glowB} 0%, transparent 70%)`,
    `radial-gradient(ellipse 36% 30% at 68% 72%, ${glowC} 0%, transparent 68%)`,
    `radial-gradient(ellipse 28% 24% at 24% 18%, ${glowC} 0%, transparent 64%)`,
  ].join(", ");
}

/** Base font sizes at 1200×630 — scaled per card dimensions. */
export const OG_TYPE = {
  name: 112,
  surname: 92,
  lead: 38,
  detail: 28,
  tech: 17,
  contact: 20,
  logo: 80,
} as const;

export function ogScale(width: number, height: number): number {
  const isSquare = height >= width * 0.95;
  const refHeight = isSquare ? 1200 : 630;
  return Math.min(width / 1200, height / refHeight);
}

/** Scale a base size to the card (purely proportional to canvas). */
export function ogPx(base: number, width: number, height: number): number {
  return Math.max(6, Math.round(base * ogScale(width, height)));
}

export function ogGap(base: number, width: number, height: number): number {
  return Math.max(4, Math.round(base * ogScale(width, height)));
}
