import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cv } from "@/data/cv";
import { currentLang, formatPeriod } from "@/lib/format";
import { routeHead } from "@/lib/seo";
import { Reveal } from "@/components/reveal";
import { PageHeaderBlock, SectionIndex } from "@/components/page-shell";
import { TechRibbon } from "@/components/tech-ribbon";

export const Route = createFileRoute("/")({
  head: () => routeHead("home", "/"),
  component: Home,
});

function Home() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
        {/* Soft accent wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] size-[680px] rounded-full bg-accent/20 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[-10%] size-[420px] rounded-full bg-accent/10 blur-[120px]"
        />

        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-5 pb-6 pt-6 sm:px-8 sm:pb-10 sm:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
              <div className="sm:col-span-4">
                <SectionIndex index="01" label={t("home.currentRole")} />
                <p className="mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base">
                  {t("home.atWiris")}
                </p>
              </div>

              <div className="sm:col-span-5">
                <SectionIndex index="02" label={t("home.whatIDo")} />
                <p className="font-display mt-3 text-xl leading-snug text-balance sm:mt-4 sm:text-2xl lg:text-3xl">
                  {cv.basics.tagline[lang]}
                </p>
              </div>

              <div className="sm:col-span-3">
                <SectionIndex index="03" label={t("home.reachOut")} />
                <div className="mt-3 flex flex-col items-start gap-3 sm:mt-4">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center justify-between gap-2 rounded-full bg-foreground px-5 py-3 text-sm text-background transition-all hover:gap-3"
                  >
                    {t("actions.contactMe")}
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    to="/cv"
                    className="group inline-flex items-center gap-1.5 px-1 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {t("actions.viewCv")}
                    <ArrowUpRight className="size-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
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

        <div className="mt-12 divide-y divide-hairline border-y border-hairline">
          {cv.work.slice(0, 3).map((w, i) => (
            <Reveal key={w.name + i} delay={i * 0.05}>
              <Link
                to="/experience"
                className="group flex flex-col gap-3 py-6 transition-colors hover:bg-surface/50 sm:flex-row sm:items-center sm:justify-between sm:py-8"
              >
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {formatPeriod(w.startDate, w.endDate, lang)}
                  </div>
                  <div className="mt-2 font-display text-3xl sm:text-4xl">
                    {w.name}{" "}
                    <span className="italic text-muted-foreground">— {w.position[lang]}</span>
                  </div>
                </div>
                <ArrowUpRight className="size-6 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-hairline bg-surface/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <SectionIndex index="05" />
            <h2 className="mt-3 font-display text-5xl">{t("home.stack")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {[
                "PHP",
                "Laravel",
                "TypeScript",
                "Vue.js",
                ...cv.skills.languages.filter((s) => !["PHP", "TypeScript"].includes(s)),
                ...cv.skills.frameworks.filter((s) => !["Laravel", "Vue.js"].includes(s)),
                ...cv.skills.databases,
              ].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-hairline bg-background px-3 py-1.5 text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
