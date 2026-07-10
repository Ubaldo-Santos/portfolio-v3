import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { cv } from "@/data/cv";
import { currentLang, formatPeriod, taglineLead, workAnchorId } from "@/lib/format";
import { cvHomeSelectedWorkSub } from "@/lib/cv-copy";
import { routeHead } from "@/lib/seo";
import { selectFeaturedWork } from "@/lib/selected-work";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { PrimaryStack } from "@/components/primary-stack";
import { WorkTitle } from "@/components/work-title";
import { PageHeaderBlock, SectionIndex } from "@/components/page-shell";
import { MotionPage } from "@/components/page-transition";
import { TechRibbon } from "@/components/tech-ribbon";
import {
  ArrowLink,
  CtaButton,
  MetaLabel,
  SectionHeader,
  SurfaceCard,
  sectionGap,
} from "@/components/editorial";

export const Route = createFileRoute("/")({
  head: () => routeHead("home", "/"),
  component: Home,
});

function Home() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);
  const currentWork = cv.work.find((w) => w.current);
  const selectedWork = selectFeaturedWork(cv.work);

  return (
    <MotionPage>
      <div>
        {/* Hero */}
        <section className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
          {/* Soft accent wash — lighter on mobile so the hero does not read too green */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 right-[-20%] size-[320px] rounded-full bg-accent/[0.07] blur-[80px] sm:-top-40 sm:right-[-10%] sm:size-[680px] sm:bg-accent/20 sm:blur-[140px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-[-20%] size-[240px] rounded-full bg-accent/[0.04] blur-[70px] sm:left-[-10%] sm:size-[420px] sm:bg-accent/10 sm:blur-[120px]"
          />

          <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-5 pb-6 pt-6 sm:px-8 sm:pb-10 sm:pt-10">
            <PageHeaderBlock page="home" />

            {/* Name block — centered vertically */}
            <div className="flex min-h-0 flex-1 flex-col justify-center py-6 sm:py-8">
              <p className="font-display text-[clamp(2.75rem,12vw,10rem)] leading-[0.86] tracking-tight">
                <span className="block">{cv.basics.givenName}</span>
                <span className="font-display-italic block text-muted-foreground">
                  {cv.basics.familyName}
                </span>
              </p>

              {/* Divider */}
              <div className="mt-10 h-px w-full bg-hairline sm:mt-14" />

              {/* Fractioned info grid */}
              <div className="grid gap-x-10 gap-y-10 pt-8 sm:grid-cols-12 sm:gap-y-12 sm:pt-10">
                <div className="sm:col-span-5">
                  <SectionIndex index="01" label={t("home.whatIDo")} />
                  <p className="font-display mt-3 text-sm leading-relaxed text-balance sm:mt-4 sm:text-base">
                    <span className="text-foreground">{taglineLead(lang)}</span>{" "}
                    <span className="text-muted-foreground">{cv.basics.tagline.detail[lang]}</span>
                  </p>
                </div>

                <div className="sm:col-span-4">
                  <SectionIndex index="02" label={t("home.currentRole")} />
                  {currentWork ? (
                    <ArrowLink
                      to="/experience"
                      hash={workAnchorId(currentWork)}
                      size="md"
                      className="mt-3 items-start gap-2 sm:mt-4"
                    >
                      <WorkTitle
                        name={currentWork.name}
                        position={currentWork.position}
                        lang={lang}
                        size="hero"
                      />
                    </ArrowLink>
                  ) : null}
                </div>

                <div className="sm:col-span-3">
                  <SectionIndex index="03" label={t("home.reachOut")} />
                  <div className="mt-3 flex flex-col items-start gap-3 sm:mt-4">
                    <CtaButton as={Link} to="/contact" variant="primary" withArrow>
                      {t("actions.contactMe")}
                    </CtaButton>
                    <CtaButton as={Link} to="/cv" variant="ghost" withArrow>
                      {t("actions.viewCv")}
                    </CtaButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TechRibbon
            items={cv.skills.ribbon}
            location={t("home.based")}
            label={t("home.techRibbon")}
          />
        </section>

        {/* Selected work */}
        <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <SectionHeader
                index="04"
                title={t("home.selectedWork")}
                description={cvHomeSelectedWorkSub(lang)}
              />
              <ArrowLink to="/experience" className="hidden sm:inline-flex">
                {t("actions.viewProject")}
              </ArrowLink>
            </div>
          </Reveal>

          <RevealGroup className="mt-12 divide-y divide-hairline border-y border-hairline">
            {selectedWork.map((w) => (
              <RevealItem key={workAnchorId(w)}>
                <Link
                  to="/experience"
                  hash={workAnchorId(w)}
                  className="group flex flex-col gap-3 py-6 transition-colors hover:bg-surface/50 sm:flex-row sm:items-center sm:justify-between sm:py-8"
                >
                  <div>
                    <MetaLabel size="sm">{formatPeriod(w.startDate, w.endDate, lang)}</MetaLabel>
                    <div className="mt-2">
                      <WorkTitle name={w.name} position={w.position} lang={lang} size="list" />
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {w.summary[lang]}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="size-6 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden
                  />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Stack */}
        <section className="border-t border-hairline bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <SectionHeader index="05" title={t("home.stack")} />
                <ArrowLink to="/skills" className="hidden shrink-0 sm:inline-flex">
                  {t("actions.viewSkills")}
                </ArrowLink>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <SurfaceCard
                as={Link}
                to="/skills"
                variant="feature"
                padding="md"
                className={`flex items-center justify-between gap-6 bg-background/60 hover:bg-background ${sectionGap.lead}`}
              >
                <PrimaryStack />
                <ArrowUpRight
                  className="size-6 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden
                />
              </SurfaceCard>
            </Reveal>
          </div>
        </section>
      </div>
    </MotionPage>
  );
}
