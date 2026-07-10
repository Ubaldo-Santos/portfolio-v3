import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

/** Self-hosted WOFF2 fallbacks — copied from @fontsource into public/fonts. */
const FONT_FILES = [
  ["@fontsource/lora/files/lora-latin-400-normal.woff2", "lora-latin-400-normal.woff2"],
  ["@fontsource/lora/files/lora-latin-400-italic.woff2", "lora-latin-400-italic.woff2"],
  ["@fontsource/lora/files/lora-latin-700-normal.woff2", "lora-latin-700-normal.woff2"],
  ["@fontsource/inter/files/inter-latin-400-normal.woff2", "inter-latin-400-normal.woff2"],
  ["@fontsource/inter/files/inter-latin-500-normal.woff2", "inter-latin-500-normal.woff2"],
  ["@fontsource/inter/files/inter-latin-600-normal.woff2", "inter-latin-600-normal.woff2"],
  [
    "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2",
    "jetbrains-mono-latin-400-normal.woff2",
  ],
  [
    "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2",
    "jetbrains-mono-latin-500-normal.woff2",
  ],
];

const root = process.cwd();
const outDir = path.join(root, "public/fonts");

await mkdir(outDir, { recursive: true });

for (const [from, filename] of FONT_FILES) {
  const src = path.join(root, "node_modules", from);
  const dest = path.join(outDir, filename);
  await copyFile(src, dest);
  console.log(`fonts: ${filename}`);
}
