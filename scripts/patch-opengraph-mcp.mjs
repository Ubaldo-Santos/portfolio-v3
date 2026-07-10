#!/usr/bin/env node
/**
 * opengraph-mcp@1.0.0 crashes on Node 24 without a createRequire shim (esbuild ESM bundle).
 * Upstream: https://github.com/midudev/opengraph.to — remove when fixed.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

let entry;
try {
  entry = require.resolve("opengraph-mcp/dist/server.mjs");
} catch {
  process.exit(0);
}

const marker = 'import { createRequire } from "node:module";';
const src = readFileSync(entry, "utf8");

if (src.includes(marker)) {
  process.exit(0);
}

const patched = src.replace(
  "#!/usr/bin/env node\n",
  `#!/usr/bin/env node\n${marker}\nconst require = createRequire(import.meta.url);\n`,
);

writeFileSync(entry, patched);
console.log("patch-opengraph-mcp: applied Node 24 shim");
