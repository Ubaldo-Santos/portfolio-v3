# AGENTS.md — Portfolio v3 (Ubaldo Santos)

Cross-harness context file. Read by Cursor, Codex, and compatible agents.

## Start here

1. **`docs/AI-CONTEXT.md`** — codemap, change recipes, anti-patterns (read before editing)
2. **`.cursor/rules/project-context.mdc`** — always-on project rules
3. **`src/data/cv.ts`** — single source of truth for all CV content

## Project

Personal portfolio at `https://ubaldo.is-a.dev`. Static SSR site with TanStack Start, React 19, TypeScript, Bun, Tailwind v4, i18n (ES/CA/EN).

## Agent harness: ECC

This repo runs **[Everything Claude Code (ECC)](https://github.com/affaan-m/ECC)** adapted for Cursor (`profile: developer`).

| Path | Purpose |
|------|---------|
| `.cursor/hooks.json` | Lifecycle hooks (memory, format, secrets, git guards) |
| `.cursor/skills/` | Workflow skills — read `SKILL.md` when task matches |
| `.cursor/agents/` | Specialized subagents (`ecc-*`) |
| `.cursor/commands/` | Slash command definitions |
| `.cursor/rules/` | File-scoped coding standards |
| `ecc-install.json` | Reproducible ECC install manifest |
| `.cursor/ecc-agent-data.json` | Memory root: `~/.cursor/ecc` |

**Harness awareness rule:** `.cursor/rules/ecc-harness.mdc`

When unsure which ECC component to use, read `.cursor/skills/ecc-guide/SKILL.md` first.

## Stack constraints (non-negotiable)

- **Bun only** — `bun run dev`, `bun run build`, `bun run lint`
- **No manual Vite plugins** — use `@lovable.dev/vite-tanstack-config`
- **Server env** — `Bun.env` in `*.server.ts`, no `node:*` imports
- **Minimal diffs** — match existing patterns (Reveal, font-mono labels, max-w-6xl)

## Key commands

```bash
bun run dev          # local dev
bun run build        # production build
bun run lint         # ESLint
bun run format       # Prettier
```

## Verification

After changes: `bun run lint && bun run build`

## Documentation

| File | Purpose |
|------|---------|
| `docs/AI-CONTEXT.md` | AI codemap and change recipes |
| `docs/AUDIT.md` | Production audit (2026-07-10) |
| `public/llms.txt` | Machine-readable site summary |

## Out of scope

Blog/MDX, contact form backend, root README (not yet written).
