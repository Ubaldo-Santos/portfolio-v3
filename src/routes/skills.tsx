import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";
import { cv } from "@/data/cv";
import { currentLang, formatPeriod } from "@/lib/format";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills & AI — Ubaldo Santos Patón" },
      { name: "description", content: "Stack principal (PHP/Laravel y TypeScript/Vue), prácticas, educación, idiomas e IA aplicada en producto." },
      { property: "og:title", content: "Skills & AI — Ubaldo Santos Patón" },
      { property: "og:description", content: "Stack, prácticas e IA aplicada en producto." },
      { property: "og:url", content: "https://ubaldo.is-a.dev/skills" },
    ],
    links: [{ rel: "canonical", href: "https://ubaldo.is-a.dev/skills" }],
  }),
  component: SkillsPage,
});

const AI_COPY = {
  es: {
    kicker: "IA en mi día a día y en producto",
    title: "Skills + IA",
    body: "Uso IA como copiloto a diario (GitHub Copilot a nivel organización, Cursor CLI con reglas en el repo, OpenRouter para enrutar a varios modelos con fallback, MCP para conectar el modelo a datos reales). También la he integrado en producto, no solo en mi editor.",
    tags: ["GitHub Copilot (org)", "Cursor CLI", "OpenRouter", "MCP", "Agent Skills"],
  },
  ca: {
    kicker: "IA al meu dia a dia i al producte",
    title: "Skills + IA",
    body: "Faig servir IA com a copilot a diari (GitHub Copilot a nivell d'organització, Cursor CLI amb regles al repo, OpenRouter per enrutar a diversos models amb fallback, MCP per connectar el model a dades reals). També l'he integrada en producte, no només al meu editor.",
    tags: ["GitHub Copilot (org)", "Cursor CLI", "OpenRouter", "MCP", "Agent Skills"],
  },
  en: {
    kicker: "AI in my workflow and in product",
    title: "Skills + AI",
    body: "I use AI as a copilot daily (GitHub Copilot at the org level, Cursor CLI with rules versioned in the repo, OpenRouter to route between models with fallback, MCP to connect the model to real data). I've also shipped AI into product, not just my editor.",
    tags: ["GitHub Copilot (org)", "Cursor CLI", "OpenRouter", "MCP", "Agent Skills"],
  },
} as const;

function SkillsPage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);
  const aiCopy = AI_COPY[lang];

  const groups = [
    { key: "languages", items: cv.skills.languages },
    { key: "frameworks", items: cv.skills.frameworks },
    { key: "practices", items: cv.skills.practices },
    { key: "tooling", items: cv.skills.tooling },
    { key: "databases", items: cv.skills.databases },
    { key: "integrations", items: cv.skills.integrations },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      {/* Hero */}
      <Reveal>
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">03 / Skills</div>
        <h1 className="mt-2 font-display text-6xl sm:text-7xl">{t("skills.title")}</h1>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">{t("skills.subtitle")}</p>
      </Reveal>

      {/* Primary stack callout */}
      <Reveal delay={0.04}>
        <div className="mt-12 grid gap-4 rounded-3xl border border-hairline bg-surface/40 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {lang === "en" ? "Primary stack" : lang === "ca" ? "Stack principal" : "Stack principal"}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-2xl sm:text-3xl">
            <span>PHP</span>
            <span className="text-muted-foreground/50">·</span>
            <span>Laravel</span>
            <span className="text-muted-foreground/30">/</span>
            <span>TypeScript</span>
            <span className="text-muted-foreground/50">·</span>
            <span>Vue</span>
          </div>
        </div>
      </Reveal>

      {/* Categorized chips — uniform cards */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <Reveal key={g.key} delay={i * 0.03}>
            <article className="h-full rounded-2xl border border-hairline bg-surface/30 p-5">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {t(`skills.${g.key}`)}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <li key={s}>
                    <span className="inline-flex rounded-full border border-hairline bg-background px-2.5 py-1 text-xs">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      {/* AI — single editorial block, no card grid */}
      <Reveal delay={0.05}>
        <section className="mt-20 grid gap-10 rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/10 via-background to-background p-8 sm:p-12 md:grid-cols-[1fr_1.4fr]">
          <header>
            <div className="flex items-center gap-2 text-accent">
              <Sparkles className="size-4" aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em]">{aiCopy.kicker}</span>
            </div>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">{aiCopy.title}</h2>
          </header>
          <div>
            <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">{aiCopy.body}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {aiCopy.tags.map((tag) => (
                <li key={tag}>
                  <span className="inline-flex rounded-full border border-accent/40 bg-background px-2.5 py-1 text-xs">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      {/* Education */}
      <section className="mt-20">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">{t("skills.education")}</h2>
        </Reveal>
        <ol className="mt-6 space-y-4">
          {cv.education.map((ed, i) => (
            <Reveal key={ed.institution + ed.startDate} delay={i * 0.03}>
              <li className="grid gap-4 rounded-2xl border border-hairline bg-surface/30 p-5 md:grid-cols-[200px_1fr] md:items-start">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {formatPeriod(ed.startDate, ed.endDate, lang)}
                </div>
                <div>
                  <h3 className="font-display text-2xl">{ed.institution}</h3>
                  <div className="mt-1 italic text-muted-foreground">
                    {ed.studyType[lang]} · {ed.area[lang]}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{ed.summary[lang]}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Spoken languages */}
      <section className="mt-16">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">{t("skills.spokenLanguages")}</h2>
        </Reveal>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {cv.languages.map((l) => (
            <li
              key={l.name[lang]}
              className="flex items-center justify-between rounded-2xl border border-hairline bg-surface/30 px-4 py-3"
            >
              <span className="font-display text-xl">{l.name[lang]}</span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{l.level[lang]}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
