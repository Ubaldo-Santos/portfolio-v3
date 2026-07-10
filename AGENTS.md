# AGENTS.md — Portfolio v3 (Ubaldo Santos)

Cross-harness context file. Read by Cursor, Codex, and compatible agents.

## Project

Personal portfolio at `https://ubaldo.is-a.dev`. Static SSR site with TanStack Start, React 19, TypeScript, Bun, Tailwind v4, i18n (ES/CA/EN).

**Authoritative project rules:** `.cursor/rules/project-context.mdc`

**Single source of truth for content:** `src/data/cv.ts`

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

## Out of scope

Blog/MDX, contact form backend, analytics beyond Vercel, README (not yet written).
