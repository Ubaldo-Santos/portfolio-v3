#!/usr/bin/env node
/**
 * Smoke test for ECC harness (Cursor) in this project.
 * Run: bun run ecc:smoke
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const results = [];

function run(name, cmd, opts = {}) {
  try {
    const out = execSync(cmd, {
      cwd: root,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
      ...opts,
    });
    results.push({ name, ok: true, detail: (out || "").trim().slice(0, 200) });
  } catch (e) {
    results.push({
      name,
      ok: false,
      detail: (e.stderr || e.stdout || e.message).trim().slice(0, 300),
    });
  }
}

function check(name, cond, detail = "") {
  results.push({ name, ok: !!cond, detail });
}

// Stack detection (project-init)
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const stacks = [];
if (fs.existsSync("tsconfig.json")) stacks.push("typescript");
if (pkg.dependencies?.react) stacks.push("react");
if (fs.existsSync("vite.config.ts")) stacks.push("vite");
if (fs.existsSync("bun.lock")) stacks.push("bun");
check(
  "project-init: stack detection",
  stacks.includes("typescript") && stacks.includes("react"),
  stacks.join(", "),
);

// Install state
check("ecc-install-state exists", fs.existsSync(".cursor/ecc-install-state.json"));
if (fs.existsSync(".cursor/ecc-install-state.json")) {
  const state = JSON.parse(fs.readFileSync(".cursor/ecc-install-state.json", "utf8"));
  check("ecc profile developer", state.request?.profile === "developer");
}

// Key harness files
for (const f of [
  "AGENTS.md",
  "ecc-install.json",
  ".cursor/hooks.json",
  ".cursor/package.json",
  ".cursor/ecc-agent-data.json",
  ".cursor/rules/ecc-harness.mdc",
]) {
  check(`file: ${f}`, fs.existsSync(f));
}

// Cursor-specific fixes
const adapter = fs.readFileSync(".cursor/hooks/adapter.js", "utf8");
check(
  "adapter.js plugin root fix",
  adapter.includes("path.resolve(__dirname, '..')") &&
    !adapter.includes("path.resolve(__dirname, '..', '..')"),
);

const hooks = JSON.parse(fs.readFileSync(".cursor/hooks.json", "utf8"));
check(
  "hooks: cursor-session-env",
  hooks.hooks.sessionStart?.[0]?.command?.includes("cursor-session-env"),
);

// Hook smoke tests
run(
  "hook: cursor-session-env",
  `echo '{}' | CURSOR_VERSION=1.0 node .cursor/scripts/hooks/cursor-session-env.js`,
);
run(
  "hook: session-start",
  `echo '{"hook_event_name":"sessionStart"}' | CURSOR_VERSION=1.0 node .cursor/hooks/session-start.js`,
);
run(
  "hook: before-submit-prompt (clean)",
  `echo '{"prompt":"hello world"}' | node .cursor/hooks/before-submit-prompt.js`,
);

// no-verify must block (exit 2 = success for this test)
try {
  execSync(
    `echo '{"command":"git commit --no-verify -m test"}' | node .cursor/hooks/before-shell-execution-block-no-verify.js`,
    { cwd: root, stdio: "pipe" },
  );
  results.push({
    name: "hook: before-shell no-verify block",
    ok: false,
    detail: "expected exit 2",
  });
} catch (e) {
  const blocked = e.status === 2;
  results.push({
    name: "hook: before-shell no-verify block",
    ok: blocked,
    detail: blocked ? "correctly blocked (exit 2)" : `unexpected exit ${e.status}`,
  });
}

// no-verify in commit message must allow
run(
  "hook: no-verify in message allowed",
  `echo '{"command":"git commit -m \\"fix no-verify docs\\""}' | node .cursor/hooks/before-shell-execution-block-no-verify.js`,
);

// project-detect
run(
  "project-detect",
  `node -e "const {detectProjectType}=require('./.cursor/scripts/lib/project-detect'); console.log(JSON.stringify(detectProjectType('${root.replace(/'/g, "\\'")}')))"`,
);

// Catalog counts
const agents = fs.readdirSync(".cursor/agents").filter((f) => f.endsWith(".md"));
const skills = fs
  .readdirSync(".cursor/skills")
  .filter((f) => fs.existsSync(path.join(".cursor/skills", f, "SKILL.md")));
const commands = fs.readdirSync(".cursor/commands").filter((f) => f.endsWith(".md"));
check("agents installed", agents.length >= 60, `${agents.length} agents`);
check("skills installed", skills.length >= 80, `${skills.length} skills`);
check("commands installed", commands.length >= 80, `${commands.length} commands`);

// Quality gates
run("bun run lint", "bun run lint");

// Report
const passed = results.filter((r) => r.ok).length;
const failed = results.filter((r) => !r.ok);
console.log("\n=== ECC SMOKE TEST ===");
for (const r of results) {
  console.log(`${r.ok ? "PASS" : "FAIL"} | ${r.name}${r.detail ? " — " + r.detail : ""}`);
}
console.log(`\nTotal: ${passed}/${results.length} passed`);
if (failed.length) process.exit(1);
