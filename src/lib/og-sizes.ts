import { SITE_URL } from "@/lib/site";

export const OG_THEMES = ["light", "dark"] as const;
export type OgTheme = (typeof OG_THEMES)[number];

/** Essential Open Graph / social preview dimensions. */
export const OG_SIZES = {
  "1200x630": { width: 1200, height: 630, primary: true },
  "1200x600": { width: 1200, height: 600 },
  "1200x1200": { width: 1200, height: 1200 },
  "800x418": { width: 800, height: 418 },
  "600x315": { width: 600, height: 315 },
} as const;

export type OgSizeKey = keyof typeof OG_SIZES;

export const OG_PRIMARY_SIZE: OgSizeKey = "1200x630";
export const OG_PRIMARY_THEME: OgTheme = "light";

export function parseOgSize(size: string): (typeof OG_SIZES)[OgSizeKey] | null {
  if (size in OG_SIZES) {
    return OG_SIZES[size as OgSizeKey];
  }
  return null;
}

export function ogImageFilename(size: OgSizeKey, theme: OgTheme): string {
  return `${size}-${theme}.png`;
}

export function ogImagePath(size: OgSizeKey, theme: OgTheme): string {
  return `/og/${ogImageFilename(size, theme)}`;
}

export function ogImageUrl(size: OgSizeKey, theme: OgTheme): string {
  return `${SITE_URL}${ogImagePath(size, theme)}`;
}

export function ogCardUrl(size: OgSizeKey, theme: OgTheme, base = SITE_URL): string {
  return `${base}/og/${size}?theme=${theme}`;
}

export const OG_IMAGE_VARIANTS = OG_THEMES.flatMap((theme) =>
  (Object.keys(OG_SIZES) as OgSizeKey[]).map((size) => ({ size, theme })),
);
