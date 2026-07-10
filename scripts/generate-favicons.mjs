#!/usr/bin/env node
/**
 * Generate PNG/ICO favicons from public/code-sandbox.svg (Google Search requires non-SVG).
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SVG = path.join(ROOT, "public/code-sandbox.svg");
const PUBLIC = path.join(ROOT, "public");

async function png(size, filename) {
  const out = path.join(PUBLIC, filename);
  await sharp(SVG).resize(size, size).png().toFile(out);
  return out;
}

/** Minimal ICO writer — single 32×32 PNG embedded. */
async function writeIco(pngPath, icoPath) {
  const { readFile } = await import("node:fs/promises");
  const png = await readFile(pngPath);
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry[0] = 32;
  entry[1] = 32;
  entry[2] = 0;
  entry[3] = 0;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(6 + 16, 12);

  await writeFile(icoPath, Buffer.concat([header, entry, png]));
}

async function main() {
  const favicon32 = await png(32, "favicon-32x32.png");
  await png(16, "favicon-16x16.png");
  await png(180, "apple-touch-icon.png");
  await writeIco(favicon32, path.join(PUBLIC, "favicon.ico"));
  console.log("Favicons generated in public/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
