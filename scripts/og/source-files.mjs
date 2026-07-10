/** OG preview source files — used to detect stale Cursor screenshots. */
import { stat } from "node:fs/promises";
import path from "node:path";

export const OG_SOURCE_FILES = [
  "src/components/og/og-card.tsx",
  "src/lib/og-copy.ts",
  "src/lib/og-theme.ts",
  "src/lib/og-sizes.ts",
  "src/styles.css",
  "src/styles/fonts.css",
  "src/data/cv.ts",
];

export async function getOgSourceMtimeMs(root) {
  let newest = 0;
  for (const relativePath of OG_SOURCE_FILES) {
    const filePath = path.join(root, relativePath);
    try {
      const { mtimeMs } = await stat(filePath);
      if (mtimeMs > newest) newest = mtimeMs;
    } catch {
      // optional file
    }
  }
  return newest;
}
