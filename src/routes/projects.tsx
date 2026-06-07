import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { cv } from "@/data/cv";
import { currentLang, formatPeriod } from "@/lib/format";
import { routeHead } from "@/lib/seo";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { PageHeader, PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/projects")({
  head: () =>
    routeHead("projects", "/projects", {
      breadcrumbs: [
        { name: "Inicio", path: "/" },
        { name: "Proyectos", path: "/projects" },
      ],
    }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);

  const activeProjects = cv.projects.filter((p) => p.active);

  return (
    <PageShell>
      <PageHeader page="projects" subtitle={t("projects.subtitle")} />

      <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2" stagger={0.08}>
        {activeProjects.map((p) => {
          const Card = p.url ? "a" : "article";
          const cardProps = p.url
            ? { href: p.url, target: "_blank", rel: "noreferrer" }
            : {};

          return (
            <RevealItem key={p.name}>
              <Card
                {...cardProps}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-surface/40 p-6 transition-colors hover:bg-surface sm:p-8"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {formatPeriod(p.startDate, p.endDate, lang)}
                  </span>
                  <div className="mt-5 flex items-start justify-between gap-3">
                    <h2 className="font-display text-3xl sm:text-4xl">{p.name}</h2>
                    {p.url ? (
                      <span className="inline-flex shrink-0 text-muted-foreground transition-colors group-hover:text-foreground">
                        {p.url.startsWith("http") ? (
                          <ExternalLink className="size-5 sm:size-6" />
                        ) : (
                          <ArrowUpRight className="size-5 sm:size-6" />
                        )}
                      </span>
                    ) : null}
                  </div>
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
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </PageShell>
  );
}
