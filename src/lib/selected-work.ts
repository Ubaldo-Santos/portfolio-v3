/** Curated home “selected work” list — featured first, else first N roles. */
export function selectFeaturedWork<T extends { featured?: boolean }>(
  items: readonly T[],
  fallbackCount = 3,
): T[] {
  const featured = items.filter((item) => item.featured);
  return featured.length > 0 ? featured : items.slice(0, fallbackCount);
}
