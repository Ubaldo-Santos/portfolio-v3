import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Printer } from "lucide-react";
import { motion } from "motion/react";
import { cv } from "@/data/cv";
import mePhoto from "@/assets/me.webp";
import { currentLang, formatPeriod } from "@/lib/format";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ubaldo Santos — Full-Stack Software Engineer" },
      { name: "description", content: "Full-stack software engineer (TypeScript, PHP/Laravel, Vue). Currently at Wiris building Nubric, a math assessment platform." },
      { property: "og:title", content: "Ubaldo Santos — Full-Stack Software Engineer" },
      { property: "og:description", content: "Portfolio, projects and résumé." },
      { property: "og:url", content: "/" },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-8 sm:pt-28 lg:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {t("home.available")}
          </motion.div>

          <h1 className="mt-8 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-tight">
            <span className="block">Ubaldo</span>
            <span className="block italic text-muted-foreground">Santos</span>
          </h1>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <p className="max-w-2xl text-balance text-xl leading-relaxed sm:text-2xl">
              {cv.basics.tagline[lang]}{" "}
              <span className="text-muted-foreground">{cv.basics.summary[lang].split("\n")[0]}</span>
            </p>
            <div className="space-y-6 border-l border-hairline pl-6">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {t("home.currentRole")}
                </div>
                <div className="mt-2 text-base">{t("home.atWiris")}</div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Link to="/cv" className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-90">
                  <Printer className="size-4" /> {t("actions.printCv")}
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm transition-colors hover:bg-surface">
                  {t("actions.contactMe")} <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee-style ticker */}
        <div className="border-y border-hairline bg-surface/50 py-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 sm:px-8">
            <span>TypeScript</span>
            <span>·</span>
            <span>PHP / Laravel</span>
            <span>·</span>
            <span>Vue · Deno · Node</span>
            <span>·</span>
            <span>Edtech · SDK · Integrations</span>
            <span>·</span>
            <span>{t("home.based")}</span>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                01 / {t("home.selectedWork")}
              </div>
              <h2 className="mt-3 font-display text-5xl sm:text-6xl">{t("home.selectedWork")}</h2>
              <p className="mt-2 max-w-md text-muted-foreground">{t("home.selectedWorkSub")}</p>
            </div>
            <Link to="/projects" className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:inline-flex">
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
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              02 / {t("home.stack")}
            </div>
            <h2 className="mt-3 font-display text-5xl">{t("home.stack")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {[...cv.skills.languages, ...cv.skills.frameworks, ...cv.skills.databases].map((s) => (
                <span key={s} className="rounded-full border border-hairline bg-background px-3 py-1.5 text-sm">
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
