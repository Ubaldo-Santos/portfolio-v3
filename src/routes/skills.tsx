import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";
import { cv, pick } from "@/data/cv";
import { currentLang, formatPeriod } from "@/lib/format";
import { cvAiCopy, cvAiTags, cvPageSubtitle } from "@/lib/cv-copy";
import { routeHead, seoBreadcrumbs } from "@/lib/seo";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { PrimaryStack } from "@/components/primary-stack";
import { PageHeader, PageShell, pageLeadClass } from "@/components/page-shell";
import { MotionPage } from "@/components/page-transition";
import {
  ChipList,
  MetaLabel,
  SectionHeader,
  SurfaceCard,
  kickerMd,
  sectionGap,
} from "@/components/editorial";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/skills")({
  head: () => routeHead("skills", "/skills", { breadcrumbs: seoBreadcrumbs("skills") }),
  component: SkillsPage,
});

function SkillsPage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);
  const aiTags = cvAiTags();

  const groups = [
    { key: "languages", items: cv.skills.languages },
    { key: "backend", items: cv.skills.backend },
    { key: "frontend", items: cv.skills.frontend },
    { key: "edtech", items: cv.skills.edtech },
    { key: "practices", items: pick(cv.skills.practices, lang) },
    { key: "devops", items: cv.skills.devops },
    { key: "other", items: cv.skills.other },
  ] as const;

  return (
    <MotionPage>
      <PageShell>
        <PageHeader page="skills" subtitle={cvPageSubtitle("skills", lang)} />

        {/* Primary stack callout */}
        <Reveal delay={0.04}>
          <SurfaceCard
            variant="feature"
            padding="md"
            className={cn("grid gap-4 md:grid-cols-[auto_1fr] md:items-center", pageLeadClass)}
          >
            <div className={kickerMd}>{t("skills.primaryStack")}</div>
            <PrimaryStack />
          </SurfaceCard>
        </Reveal>

        {/* Categorized chips — uniform cards */}
        <RevealGroup
          className={cn(sectionGap.lead, "grid gap-4 sm:grid-cols-2 lg:grid-cols-3")}
          stagger={0.05}
        >
          {groups.map((g) => (
            <RevealItem key={g.key}>
              <SurfaceCard as="article" variant="surface" padding="sm" className="h-full">
                <SectionHeader as="h3" title={t(`skills.${g.key}`)} />
                <ChipList className="mt-3" items={g.items} label={t(`skills.${g.key}`)} />
              </SurfaceCard>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* AI — single editorial block, no card grid */}
        <Reveal delay={0.05}>
          <SurfaceCard
            variant="accentFeature"
            padding="lg"
            className={cn(sectionGap.lg, "grid gap-10 md:grid-cols-[1fr_1.4fr]")}
          >
            <header>
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="size-4" aria-hidden />
                <span className={kickerMd}>{cvAiCopy("kicker", lang)}</span>
              </div>
              <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">
                {cvAiCopy("title", lang)}
              </h2>
            </header>
            <div>
              <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                {cvAiCopy("body", lang)}
              </p>
              <ChipList
                className="mt-5"
                items={aiTags}
                variant="accent"
                label={cvAiCopy("kicker", lang)}
              />
            </div>
          </SurfaceCard>
        </Reveal>

        {/* Education */}
        <section className={sectionGap.lg}>
          <Reveal>
            <SectionHeader title={t("skills.education")} />
          </Reveal>
          <ol className="mt-6 space-y-4">
            {cv.education.map((ed, i) => (
              <Reveal key={ed.institution + ed.startDate} delay={i * 0.03}>
                <li>
                  <SurfaceCard
                    variant="surface"
                    padding="sm"
                    className="grid gap-4 md:grid-cols-[200px_1fr] md:items-start"
                  >
                    <MetaLabel>{formatPeriod(ed.startDate, ed.endDate, lang)}</MetaLabel>
                    <div>
                      <h3 className="font-display text-2xl">{ed.institution}</h3>
                      <div className="mt-1 italic text-muted-foreground">
                        {ed.studyType[lang]} · {ed.area[lang]}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{ed.summary[lang]}</p>
                    </div>
                  </SurfaceCard>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Spoken languages */}
        <section className={sectionGap.md}>
          <Reveal>
            <SectionHeader title={t("skills.spokenLanguages")} />
          </Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {cv.languages.map((l) => (
              <li key={l.name[lang]}>
                <SurfaceCard
                  variant="surface"
                  padding="sm"
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="font-display text-xl">{l.name[lang]}</span>
                  <MetaLabel size="sm">{l.level[lang]}</MetaLabel>
                </SurfaceCard>
              </li>
            ))}
          </ul>
        </section>
      </PageShell>
    </MotionPage>
  );
}
