/** Shared OG generation config (mirrors src/lib/og-sizes.ts). */
export const SITE_URL = "https://ubaldo.is-a.dev";

export const OG_THEMES = ["light", "dark"];

export const OG_SIZES = {
  "1200x630": { width: 1200, height: 630, primary: true },
  "1200x600": { width: 1200, height: 600 },
  "1200x1200": { width: 1200, height: 1200 },
  "800x418": { width: 800, height: 418 },
  "600x315": { width: 600, height: 315 },
};

export const OG_VARIANTS = OG_THEMES.flatMap((theme) =>
  Object.entries(OG_SIZES).map(([size, dims]) => ({ size, theme, ...dims })),
);

export function ogImageFilename(size, theme) {
  return `${size}-${theme}.png`;
}

export function ogCardPath(size, theme) {
  return `/og/${size}?theme=${theme}`;
}
