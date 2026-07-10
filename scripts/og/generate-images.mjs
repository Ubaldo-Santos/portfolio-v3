#!/usr/bin/env node
/**
 * OG pipeline — Cursor browser only.
 * bun run og → dev (if needed) → URLs → sync → resize → verify
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { OG_VARIANTS, ogCardPath, ogImageFilename } from "./config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const OUT_DIR = path.join(ROOT, "public/og");
const PREVIEW_PORT = 4177;
const BASE_URL = (process.env.OG_BASE_URL ?? `http://127.0.0.1:${PREVIEW_PORT}`).replace(/\/$/, "");

function runNode(script, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script, ...args], {
      cwd: ROOT,
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${script} exited with code ${code ?? "unknown"}`));
    });
  });
}

async function waitForServer(baseUrl, timeoutMs = 60_000) {
  const probe = `${baseUrl}/og/1200x630?theme=light`;
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(probe);
      if (response.ok) return;
    } catch {
      // server still starting
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Dev server not reachable at ${baseUrl}`);
}

function startDevServer() {
  return spawn("bun", ["run", "dev", "--port", String(PREVIEW_PORT), "--host", "127.0.0.1"], {
    cwd: ROOT,
    stdio: "pipe",
  });
}

async function ensureDevServer() {
  try {
    await waitForServer(BASE_URL, 3_000);
    console.log(`Dev server already running at ${BASE_URL}`);
    return null;
  } catch {
    console.log(`Starting dev server at ${BASE_URL}…`);
    const server = startDevServer();
    await waitForServer(BASE_URL);
    console.log(`Dev server ready at ${BASE_URL}`);
    return server;
  }
}

function printCaptureInstructions() {
  console.log(
    `\nCapture each preview in Cursor browser — screenshot [data-og-card] → public/og/{filename}:\n`,
  );
  for (const { size, theme } of OG_VARIANTS) {
    const filename = ogImageFilename(size, theme);
    console.log(`  ${BASE_URL}${ogCardPath(size, theme)}  →  public/og/${filename}`);
  }
  console.log("");
}

async function writeManifest() {
  const manifest = {
    generatedAt: new Date().toISOString(),
    method: "cursor-browser-screenshot",
    baseUrl: BASE_URL,
    variants: OG_VARIANTS.map(({ size, theme, width, height }) => ({
      size,
      theme,
      width,
      height,
      filename: ogImageFilename(size, theme),
    })),
  };
  await writeFile(path.join(OUT_DIR, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const server = await ensureDevServer();
  printCaptureInstructions();

  try {
    await runNode("scripts/og/sync-cursor-screenshots.mjs");
    await runNode("scripts/og/resize-images.mjs");
    await writeManifest();
    await runNode("scripts/og/verify-images.mjs");
    console.log(`\nOG images ready in public/og/ (${OG_VARIANTS.length} variants)`);
  } catch {
    console.error(
      "\nCapture the URLs above in Cursor browser, then run:\n  bun run og\n",
    );
    process.exit(1);
  } finally {
    if (server && process.env.OG_STOP_DEV === "1") {
      server.kill("SIGTERM");
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
