import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { cv } from "@/data/cv";
import { currentLang, formatPeriod } from "@/lib/format";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills & Education — Ubaldo Santos Patón" },
      { name: "description", content: "Languages, frameworks, practices, education and spoken languages." },
      { property: "og:title", content: "Skills & Education — Ubaldo Santos Patón" },
      { property: "og:description", content: "Tools, practices and languages I work with." },
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
    </div>
  );
}
