/** Curated lists — featured items first, else first N. Used on home and printable CV. */
export function selectFeatured<T extends { featured?: boolean }>(
  items: readonly T[],
  fallbackCount = 3,
): T[] {
  const featured = items.filter((item) => item.featured);
  return featured.length > 0 ? featured : items.slice(0, fallbackCount);
}

/** @deprecated Use selectFeatured — kept for existing imports. */
export const selectFeaturedWork = selectFeatured;
