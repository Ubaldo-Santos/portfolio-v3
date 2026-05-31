import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Bot, Terminal, Plug, Sparkles, BookOpen, Workflow, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "AI — Ubaldo Santos" },
      { name: "description", content: "How I configure and use AI in product: GitHub Copilot org-level policy, Cursor CLI, OpenRouter, MCP and Skills." },
      { property: "og:title", content: "AI — Ubaldo Santos" },
      { property: "og:description", content: "Copilot, Cursor, OpenRouter, MCP and Skills — the AI stack I use in production." },
      { property: "og:url", content: "https://ubaldo.is-a.dev/ai" },
    ],
    links: [{ rel: "canonical", href: "https://ubaldo.is-a.dev/ai" }],
  }),
  component: AiPage,
});

function AiPage() {
  const { t } = useTranslation();

  const items = [
    {
      key: "copilot",
      icon: <Bot className="size-5" />,
      title: t("ai.copilotTitle"),
      desc: t("ai.copilotDesc"),
      code: `# .github/copilot/policy.yml (org level)
suggestions: enabled
public_code_match: blocked      # don't surface public code matches
allowed_models: [gpt-5, claude-sonnet-4]
chat:
  enabled: true
  network_access: limited
data:
  exclude_paths:
    - "**/.env*"
    - "secrets/**"
    - "**/*.pem"`,
    },
    {
      key: "cursor",
      icon: <Terminal className="size-5" />,
      title: t("ai.cursorTitle"),
      desc: t("ai.cursorDesc"),
      code: `# .cursor/rules/00-base.mdc
---
description: Project conventions for the AI agent
alwaysApply: true
---
- TypeScript strict, no \`any\`.
- Use Tailwind tokens (text-foreground, bg-surface).
- Prefer server functions over edge functions.
- Run: cursor-agent run "refactor: extract <X>"`,
    },
    {
      key: "openrouter",
      icon: <Workflow className="size-5" />,
      title: t("ai.openrouterTitle"),
      desc: t("ai.openrouterDesc"),
      code: `// One key, many models
const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.OPENROUTER_API_KEY}\`,
    "HTTP-Referer": "https://ubaldo.is-a.dev",
  },
  body: JSON.stringify({
    model: "anthropic/claude-sonnet-4",
    messages,
    route: "fallback",            // auto-retry on a cheaper model
  }),
});`,
    },
    {
      key: "mcp",
      icon: <Plug className="size-5" />,
      title: t("ai.mcpTitle"),
      desc: t("ai.mcpDesc"),
      code: `// ~/.config/mcp/servers.json
{
  "linear":   { "command": "npx", "args": ["-y", "@linear/mcp"] },
  "github":   { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"] },
  "postgres": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres", "$DATABASE_URL"] }
}`,
    },
    {
      key: "skills",
      icon: <BookOpen className="size-5" />,
      title: t("ai.skillsTitle"),
      desc: t("ai.skillsDesc"),
      code: `# .agents/skills/open-pr/SKILL.md
---
name: open-pr
description: Open a PR with checks + reviewers from CODEOWNERS
---
1. \`git switch -c feat/<slug>\`
2. Commit using Conventional Commits.
3. \`gh pr create --fill --reviewer @team\`
4. Wait for CI, then re-request review.`,
    },
  ];

  const providers = [
    "Anthropic Claude", "OpenAI GPT", "Google Gemini", "DeepSeek",
    "Mistral", "OpenRouter", "GitHub Copilot", "Cursor",
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">05</div>
        <h1 className="mt-2 font-display text-6xl leading-[0.95] sm:text-8xl">
          {t("ai.title")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t("ai.subtitle")}</p>
      </Reveal>

      <Reveal delay={0.05}>
        <aside className="mt-12 grid gap-6 rounded-3xl border border-hairline bg-surface/40 p-6 sm:p-10 md:grid-cols-[auto_1fr]">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-1 size-5 text-accent" aria-hidden />
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {t("ai.philosophyTitle")}
            </div>
          </div>
          <p className="text-balance text-lg leading-relaxed sm:text-xl">{t("ai.philosophy")}</p>
        </aside>
      </Reveal>

      <section className="mt-20 grid gap-10">
        {items.map((it, i) => (
          <Reveal key={it.key} delay={i * 0.04}>
            <article className="grid gap-6 border-t border-hairline pt-10 md:grid-cols-[1fr_1.2fr]">
              <header>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="rounded-full border border-hairline bg-background p-2">{it.icon}</span>
                  <span className="font-mono text-[11px] uppercase tracking-widest">
                    0{i + 1}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl">{it.title}</h2>
                <p className="mt-3 max-w-md text-muted-foreground">{it.desc}</p>
              </header>
              <pre className="overflow-x-auto rounded-2xl border border-hairline bg-background p-5 font-mono text-[12.5px] leading-relaxed text-foreground/90 shadow-sm">
                <code>{it.code}</code>
              </pre>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="mt-24 grid gap-10 border-t border-hairline pt-10 md:grid-cols-2">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {t("ai.providersTitle")}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {providers.map((p) => (
              <span key={p} className="rounded-full border border-hairline bg-surface/60 px-3 py-1.5 text-sm">
                {p}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {t("ai.tipTitle")}
          </h2>
          <ul className="mt-4 space-y-2 text-base text-muted-foreground">
            <li>— Versionar prompts y reglas en el repo, como cualquier código.</li>
            <li>— Excluir secretos, datos personales y rutas sensibles del contexto.</li>
            <li>— Pedir tests + diff acotado; nunca permitir cambios masivos sin revisión.</li>
            <li>— Medir: latencia, coste por feature y tasa de aceptación de sugerencias.</li>
          </ul>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm hover:bg-surface">
            ¿Hablamos de tu stack? <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
