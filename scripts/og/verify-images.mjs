#!/usr/bin/env node
/**
 * Verify every OG PNG exists and matches expected dimensions (100% pass required).
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { OG_VARIANTS, ogImageFilename } from "./config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../../public/og");

function readPngDimensions(buffer) {
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") {
    throw new Error("Not a PNG file");
  }
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

async function main() {
  let failed = 0;

  for (const { size, theme, width, height } of OG_VARIANTS) {
    const filename = ogImageFilename(size, theme);
    const filePath = path.join(OUT_DIR, filename);

    try {
      const buffer = await readFile(filePath);
      const dims = readPngDimensions(buffer);

      if (dims.width !== width || dims.height !== height) {
        console.error(
          `✗ ${filename}: expected ${width}x${height}, got ${dims.width}x${dims.height}`,
        );
        failed += 1;
        continue;
      }

      console.log(`✓ ${filename} (${dims.width}x${dims.height})`);
    } catch (error) {
      console.error(`✗ ${filename}: ${error instanceof Error ? error.message : String(error)}`);
      failed += 1;
    }
  }

  const total = OG_VARIANTS.length;
  const passed = total - failed;
  console.log(`\n${passed}/${total} OG images verified`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
