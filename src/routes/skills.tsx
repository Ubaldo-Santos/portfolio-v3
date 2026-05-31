import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Bot, Terminal, Workflow, Plug, BookOpen, Sparkles } from "lucide-react";
import { cv } from "@/data/cv";
import { currentLang, formatPeriod } from "@/lib/format";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills & AI — Ubaldo Santos Patón" },
      { name: "description", content: "Stack principal (PHP/Laravel, TypeScript/Vue), prácticas, educación, idiomas y cómo integro IA en mi día a día y en producto." },
      { property: "og:title", content: "Skills & AI — Ubaldo Santos Patón" },
      { property: "og:description", content: "Stack, prácticas e IA aplicada en producto." },
      { property: "og:url", content: "https://ubaldo.is-a.dev/skills" },
    ],
    links: [{ rel: "canonical", href: "https://ubaldo.is-a.dev/skills" }],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);

  const groups = [
    { key: "languages", items: cv.skills.languages },
    { key: "frameworks", items: cv.skills.frameworks },
    { key: "databases", items: cv.skills.databases },
    { key: "practices", items: cv.skills.practices },
    { key: "tooling", items: cv.skills.tooling },
    { key: "integrations", items: cv.skills.integrations },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">03</div>
        <h1 className="mt-2 font-display text-6xl sm:text-7xl">{t("skills.title")}</h1>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">{t("skills.subtitle")}</p>
      </Reveal>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        {groups.map((g, i) => (
          <Reveal key={g.key} delay={i * 0.03}>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">{t(`skills.${g.key}`)}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="rounded-full border border-hairline bg-surface/60 px-3 py-1.5 text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Education */}
      <section className="mt-24">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">{t("skills.education")}</h2>
        </Reveal>
        <ol className="mt-8 space-y-10">
          {cv.education.map((ed, i) => (
            <Reveal key={ed.institution + ed.startDate} delay={i * 0.04}>
              <li className="grid gap-4 border-t border-hairline pt-6 md:grid-cols-[200px_1fr]">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {formatPeriod(ed.startDate, ed.endDate, lang)}
                </div>
                <div>
                  <h3 className="font-display text-2xl">{ed.institution}</h3>
                  <div className="mt-1 italic text-muted-foreground">
                    {ed.studyType[lang]} · {ed.area[lang]}
                  </div>
                  <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{ed.summary[lang]}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Spoken languages */}
      <section className="mt-24">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">{t("skills.spokenLanguages")}</h2>
        </Reveal>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {cv.languages.map((l) => (
            <li key={l.name[lang]} className="flex items-baseline justify-between rounded-xl border border-hairline bg-surface/40 px-4 py-3">
              <span className="font-display text-xl">{l.name[lang]}</span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{l.level[lang]}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* AI in my workflow — integrated into skills */}
      <AiSection />
    </div>
  );
}

function AiSection() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);

  const copy = {
    es: {
      kicker: "Skills + IA",
      title: "IA en mi flujo y en producto",
      lead: "Uso IA como copiloto en mi día a día y la he integrado en producto: features de assessment matemático que aprovechan modelos para asistir corrección y generación de ejercicios.",
      productNote: "También he integrado IA en soluciones y productos reales — no solo en mi editor.",
      items: [
        { icon: <Bot className="size-4" />, title: "GitHub Copilot", desc: "Configurado a nivel organización: modelos permitidos, exclusión de secretos y bloqueo de public-code match." },
        { icon: <Terminal className="size-4" />, title: "Cursor CLI", desc: "Reglas y agentes versionados en el repo. Comandos slash reutilizables por todo el equipo." },
        { icon: <Workflow className="size-4" />, title: "OpenRouter", desc: "Una API key para enrutar a Claude, GPT, Gemini o DeepSeek con fallback y observabilidad." },
        { icon: <Plug className="size-4" />, title: "MCP", desc: "Conectores estandarizados entre el modelo y datos reales: GitHub, Linear, Postgres." },
        { icon: <BookOpen className="size-4" />, title: "Skills", desc: "Procedimientos reusables guardados en el repo (cómo abrir PR, migraciones, revisión a11y)." },
      ],
    },
    ca: {
      kicker: "Skills + IA",
      title: "IA al meu flux i al producte",
      lead: "Faig servir IA com a copilot al meu dia a dia i l'he integrada en producte: funcionalitats d'assessment matemàtic que aprofiten models per assistir correcció i generació d'exercicis.",
      productNote: "També he integrat IA en solucions i productes reals — no només al meu editor.",
      items: [
        { icon: <Bot className="size-4" />, title: "GitHub Copilot", desc: "Configurat a nivell d'organització: models permesos, exclusió de secrets i bloqueig de public-code match." },
        { icon: <Terminal className="size-4" />, title: "Cursor CLI", desc: "Regles i agents versionats al repo. Comandes slash reutilitzables per tot l'equip." },
        { icon: <Workflow className="size-4" />, title: "OpenRouter", desc: "Una API key per enrutar a Claude, GPT, Gemini o DeepSeek amb fallback i observabilitat." },
        { icon: <Plug className="size-4" />, title: "MCP", desc: "Connectors estandarditzats entre el model i dades reals: GitHub, Linear, Postgres." },
        { icon: <BookOpen className="size-4" />, title: "Skills", desc: "Procediments reusables al repo (obrir PR, migracions, revisió a11y)." },
      ],
    },
    en: {
      kicker: "Skills + AI",
      title: "AI in my workflow and in product",
      lead: "I use AI as a copilot day-to-day, and I've shipped AI into product: math assessment features that leverage models to assist grading and exercise generation.",
      productNote: "I've also integrated AI into real products and solutions — not just my editor.",
      items: [
        { icon: <Bot className="size-4" />, title: "GitHub Copilot", desc: "Org-level policy: allowed models, secrets exclusion, public-code match blocked." },
        { icon: <Terminal className="size-4" />, title: "Cursor CLI", desc: "Rules and agents versioned in the repo. Reusable slash commands across the team." },
        { icon: <Workflow className="size-4" />, title: "OpenRouter", desc: "One API key to route to Claude, GPT, Gemini or DeepSeek with fallback and observability." },
        { icon: <Plug className="size-4" />, title: "MCP", desc: "Standard connectors between the model and real data: GitHub, Linear, Postgres." },
        { icon: <BookOpen className="size-4" />, title: "Skills", desc: "Reusable procedures versioned in the repo (open PR, migrations, a11y review)." },
      ],
    },
  } as const;

  const c = copy[lang];
  // suppress unused warning
  void t;

  return (
    <section className="mt-24 border-t border-hairline pt-12">
      <Reveal>
        <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{c.kicker}</div>
        <h2 className="mt-2 font-display text-4xl sm:text-5xl">{c.title}</h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">{c.lead}</p>
      </Reveal>

      <Reveal delay={0.04}>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent bg-accent/15 px-3 py-1.5 text-sm">
          <Sparkles className="size-4 text-accent" aria-hidden />
          <span>{c.productNote}</span>
        </div>
      </Reveal>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {c.items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.03}>
            <li className="h-full rounded-2xl border border-hairline bg-surface/50 p-5 transition-colors hover:bg-surface">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="rounded-full border border-hairline bg-background p-1.5">{it.icon}</span>
                <span className="font-display text-lg text-foreground">{it.title}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
