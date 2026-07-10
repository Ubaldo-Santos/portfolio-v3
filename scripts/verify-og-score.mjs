#!/usr/bin/env node
/**
 * Verify OG score via opengraph.to API (same backend as MCP proxy).
 * Usage: node scripts/verify-og-score.mjs [url]
 */
const url = process.argv[2] ?? "https://ubaldo.is-a.dev";
const api = `https://www.opengraph.to/api/v1/og?url=${encodeURIComponent(url)}`;

const data = await fetch(api).then((r) => {
  if (!r.ok) throw new Error(`API ${r.status}`);
  return r.json();
});

const score = data.analysis?.score ?? 0;
const issues = data.analysis?.issues ?? [];

console.log(`OG score for ${url}: ${score}/100`);
if (issues.length) {
  for (const issue of issues) {
    console.log(`  [${issue.severity}] ${issue.title}`);
  }
}

if (score < 100) {
  process.exit(1);
}
