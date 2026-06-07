import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cv } from "@/data/cv";
import { currentLang, formatPeriod, workAnchorId } from "@/lib/format";
import { routeHead } from "@/lib/seo";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { PrimaryStack } from "@/components/primary-stack";
import { WorkTitle } from "@/components/work-title";
import { PageHeaderBlock, SectionIndex } from "@/components/page-shell";
import { TechRibbon } from "@/components/tech-ribbon";
import { Cta } from "@/components/ui/cta";

export const Route = createFileRoute("/")({
  head: () => routeHead("home", "/"),
  component: Home,
});

function Home() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);
  const currentWork = cv.work.find((w) => w.current);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
        {/* Single, restrained accent wash — punto, no lavado */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-12%] size-[420px] rounded-full bg-accent/[0.06] blur-[120px] sm:size-[560px] sm:bg-accent/[0.10]"
        />

        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-5 pb-6 pt-6 sm:px-8 sm:pb-10 sm:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <PageHeaderBlock page="home" />
          </motion.div>

          {/* Name block — centered vertically */}
          <div className="flex min-h-0 flex-1 flex-col justify-center py-6 sm:py-8">
            <p className="font-display text-[clamp(2.75rem,12vw,10rem)] leading-[0.86] tracking-tight">
              <span className="block">Ubaldo</span>
              <span className="font-display-italic block text-muted-foreground">Santos Patón</span>
            </p>

            {/* Divider */}
            <div className="mt-10 h-px w-full bg-hairline sm:mt-14" />

            {/* Fractioned info grid */}
            <div className="grid gap-x-10 gap-y-10 pt-8 sm:grid-cols-12 sm:gap-y-12 sm:pt-10">
              <div className="sm:col-span-5">
                <SectionIndex index="01" label={t("home.whatIDo")} />
                <p className="mt-3 text-sm leading-relaxed text-balance sm:mt-4 sm:text-base">
                  {cv.basics.tagline[lang]}
                </p>
              </div>

              <div className="sm:col-span-4">
                <SectionIndex index="02" label={t("home.currentRole")} />
                {currentWork ? (
                  <Link
                    to="/experience"
                    hash={workAnchorId(currentWork)}
                    className="group mt-3 inline-flex items-start gap-2 transition-colors hover:text-foreground sm:mt-4"
                  >
                    <WorkTitle
                      name={currentWork.name}
                      position={currentWork.position}
                      lang={lang}
                      size="hero"
                    />
                    <ArrowUpRight className="mt-1.5 size-5 shrink-0 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:mt-2 sm:size-6" />
                  </Link>
                ) : null}
              </div>

              <div className="sm:col-span-3">
                <SectionIndex index="03" label={t("home.reachOut")} />
                <div className="mt-3 flex flex-col items-start gap-3 sm:mt-4">
                  <Cta asChild variant="primary" size="md">
                    <Link to="/contact">
                      {t("actions.contactMe")}
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </Cta>
                  <Cta asChild variant="ghost" size="sm">
                    <Link to="/cv">
                      {t("actions.viewCv")}
                      <ArrowUpRight className="size-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </Cta>
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
            <div>
              <SectionIndex index="04" />
              <h2 className="mt-3 font-display text-5xl sm:text-6xl">{t("home.selectedWork")}</h2>
              <p className="mt-2 max-w-md text-muted-foreground">{t("home.selectedWorkSub")}</p>
            </div>
            <Link
              to="/projects"
              className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              {t("actions.viewProject")} <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <RevealGroup className="mt-12 divide-y divide-hairline border-y border-hairline">
          {cv.work.map((w) => (
            <RevealItem key={workAnchorId(w)}>
              <Link
                to="/experience"
                hash={workAnchorId(w)}
                className="group flex flex-col gap-3 py-6 transition-colors hover:bg-surface/50 sm:flex-row sm:items-center sm:justify-between sm:py-8"
              >
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {formatPeriod(w.startDate, w.endDate, lang)}
                  </div>
                  <div className="mt-2">
                    <WorkTitle name={w.name} position={w.position} lang={lang} size="list" />
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {w.summary[lang]}
                  </p>
                </div>
                <ArrowUpRight className="size-6 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
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
              <div>
                <SectionIndex index="05" />
                <h2 className="mt-3 font-display text-5xl">{t("home.stack")}</h2>
              </div>
              <Link
                to="/skills"
                className="hidden shrink-0 items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:inline-flex"
              >
                {t("actions.viewSkills")} <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/skills"
              className="group mt-12 flex items-center justify-between gap-6 rounded-2xl border border-hairline bg-background/60 p-6 transition-colors hover:bg-background sm:p-8"
            >
              <PrimaryStack />
              <ArrowUpRight className="size-6 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
