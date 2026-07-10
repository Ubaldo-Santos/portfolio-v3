#!/usr/bin/env node
/** Copy OG PNGs from Cursor browser screenshots into public/og/ (manual fallback). */
import { cp, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { OG_VARIANTS, ogImageFilename } from "./config.mjs";
import { getOgSourceMtimeMs } from "./source-files.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const OUT_DIR = path.join(ROOT, "public/og");

const DEFAULT_CURSOR_DIR =
  "/mnt/c/Users/ADMINI~1/AppData/Local/Temp/cursor/screenshots/home/ubaldo-lnx/ubaldo-s-digital-craft/public/og";

async function main() {
  const sourceDir = process.env.CURSOR_OG_SCREENSHOTS ?? DEFAULT_CURSOR_DIR;
  const sourceMtimeMs = await getOgSourceMtimeMs(ROOT);
  const force = process.env.OG_FORCE_SYNC === "1";

  await mkdir(OUT_DIR, { recursive: true });

  let copied = 0;
  let skipped = 0;
  const stale = [];

  for (const { size, theme } of OG_VARIANTS) {
    const filename = ogImageFilename(size, theme);
    const from = path.join(sourceDir, filename);
    const to = path.join(OUT_DIR, filename);

    try {
      const sourceStat = await stat(from);
      const destStat = await stat(to).catch(() => null);

      if (sourceMtimeMs > sourceStat.mtimeMs) {
        stale.push(`${filename} (screenshot ${new Date(sourceStat.mtimeMs).toISOString()})`);
        continue;
      }

      if (destStat && destStat.mtimeMs > sourceStat.mtimeMs && !force) {
        console.log(`↷ ${filename}: public/og is newer — skipped (use OG_FORCE_SYNC=1 to overwrite)`);
        skipped += 1;
        continue;
      }

      await cp(from, to);
      console.log(`✓ ${filename}`);
      copied += 1;
    } catch {
      console.error(`✗ ${filename}: not found in ${sourceDir}`);
    }
  }

  if (stale.length > 0 && !force) {
    console.error(
      `\nCursor screenshots are older than OG source code. Recapture in browser first:\n` +
        `  bun run og:urls\n\nStale:\n` +
        stale.map((entry) => `  - ${entry}`).join("\n") +
        `\n\nTo copy anyway: OG_FORCE_SYNC=1 bun run og:sync-cursor\n`,
    );
    process.exit(1);
  }

  if (copied === 0 && skipped === 0) {
    console.error(
      `\nNo files copied. Capture each /og/{size}?theme={theme} in Cursor browser first,\n` +
        `or set CURSOR_OG_SCREENSHOTS to your screenshots folder.\n`,
    );
    process.exit(1);
  }

  console.log(`\nCopied ${copied}/${OG_VARIANTS.length} → public/og/ (${skipped} skipped as newer)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
