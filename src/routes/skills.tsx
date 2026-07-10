import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";
import { cv } from "@/data/cv";
import { currentLang, formatPeriod } from "@/lib/format";
import { routeHead, seoBreadcrumbs } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { PrimaryStack } from "@/components/primary-stack";
import { PageHeader, PageShell, pageLeadClass } from "@/components/page-shell";
import { MotionPage } from "@/components/page-transition";

export const Route = createFileRoute("/skills")({
  head: () => routeHead("skills", "/skills", { breadcrumbs: seoBreadcrumbs("skills") }),
  component: SkillsPage,
});

function SkillsPage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);
  const aiTags = t("skills.aiCallout.tags", { returnObjects: true }) as string[];

  const groups = [
    { key: "languages", items: cv.skills.languages },
    { key: "backend", items: cv.skills.backend },
    { key: "frontend", items: cv.skills.frontend },
    { key: "edtech", items: cv.skills.edtech },
    { key: "practices", items: cv.skills.practices },
    { key: "devops", items: cv.skills.devops },
    { key: "other", items: cv.skills.other },
  ] as const;

  return (
    <MotionPage>
      <PageShell>
        <PageHeader page="skills" subtitle={t("skills.subtitle")} />

        {/* Primary stack callout */}
        <Reveal delay={0.04}>
          <div
            className={cn(
              "grid gap-4 rounded-3xl border border-hairline bg-surface/40 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center",
              pageLeadClass,
            )}
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {t("skills.primaryStack")}
            </div>
            <PrimaryStack />
          </div>
        </Reveal>

        {/* Categorized chips — uniform cards */}
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {groups.map((g) => (
            <RevealItem key={g.key}>
              <article className="h-full rounded-2xl border border-hairline bg-surface/40 p-5">
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
            </RevealItem>
          ))}
        </RevealGroup>

        {/* AI — single editorial block, no card grid */}
        <Reveal delay={0.05}>
          <section className="mt-20 grid gap-10 rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/10 via-background to-background p-8 sm:p-12 md:grid-cols-[1fr_1.4fr]">
            <header>
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="size-4" aria-hidden />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em]">
                  {t("skills.aiCallout.kicker")}
                </span>
              </div>
              <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">
                {t("skills.aiCallout.title")}
              </h2>
            </header>
            <div>
              <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                {t("skills.aiCallout.body")}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {aiTags.map((tag) => (
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
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {t("skills.education")}
            </h2>
          </Reveal>
          <ol className="mt-6 space-y-4">
            {cv.education.map((ed, i) => (
              <Reveal key={ed.institution + ed.startDate} delay={i * 0.03}>
                <li className="grid gap-4 rounded-2xl border border-hairline bg-surface/40 p-5 md:grid-cols-[200px_1fr] md:items-start">
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
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {t("skills.spokenLanguages")}
            </h2>
          </Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {cv.languages.map((l) => (
              <li
                key={l.name[lang]}
                className="flex items-center justify-between rounded-2xl border border-hairline bg-surface/40 px-4 py-3"
              >
                <span className="font-display text-xl">{l.name[lang]}</span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {l.level[lang]}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </PageShell>
    </MotionPage>
  );
}
