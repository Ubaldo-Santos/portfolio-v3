import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { cv } from "@/data/cv";
import { currentLang, formatPeriod } from "@/lib/format";
import { routeHead } from "@/lib/seo";
import { Reveal } from "@/components/reveal";
import { PageHeader, PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/projects")({
  head: () => routeHead("projects", "/projects"),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);

  return (
    <PageShell>
      <PageHeader page="projects" subtitle={t("projects.subtitle")} />

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {cv.projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.05}>
            <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-surface/40 p-6 transition-colors hover:bg-surface sm:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {formatPeriod(p.startDate, p.endDate, lang)}
                  </span>
                  <span
                    className={
                      p.active
                        ? "rounded-full border border-accent bg-accent/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest"
                        : "rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                    }
                  >
                    {p.active ? t("projects.active") : t("projects.archived")}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-3xl sm:text-4xl">{p.name}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {p.description[lang]}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.highlights[lang].map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-hairline bg-background px-2.5 py-0.5 text-xs"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
