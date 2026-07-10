#!/usr/bin/env node
/** Resize OG PNGs to exact variant dimensions (fixes 1.5x devicePixelRatio captures). */
import { rename, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { OG_VARIANTS, ogImageFilename } from "./config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../../public/og");

async function main() {
  for (const { size, theme, width, height } of OG_VARIANTS) {
    const filename = ogImageFilename(size, theme);
    const filePath = path.join(OUT_DIR, filename);
    const tempPath = `${filePath}.tmp`;

    const meta = await sharp(filePath).metadata();
    if (meta.width === width && meta.height === height) {
      console.log(`✓ ${filename} (${width}x${height})`);
      continue;
    }

    await sharp(filePath).resize(width, height, { fit: "fill" }).png().toFile(tempPath);
    await unlink(filePath);
    await rename(tempPath, filePath);
    console.log(`↺ ${filename}: ${meta.width}x${meta.height} → ${width}x${height}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
