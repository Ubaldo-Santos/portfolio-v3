#!/usr/bin/env node
/** Print /og/* preview URLs for Cursor browser capture. */
import { OG_VARIANTS, ogCardPath, ogImageFilename } from "./config.mjs";

const PREVIEW_PORT = 4177;
const BASE_URL = (process.env.OG_BASE_URL ?? `http://127.0.0.1:${PREVIEW_PORT}`).replace(/\/$/, "");

console.log(`Dev server: bun run dev --port ${PREVIEW_PORT}\n`);
for (const { size, theme } of OG_VARIANTS) {
  const filename = ogImageFilename(size, theme);
  console.log(`${BASE_URL}${ogCardPath(size, theme)}  →  public/og/${filename}`);
}
