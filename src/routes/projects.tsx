import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { cv } from "@/data/cv";
import { currentLang, formatPeriod } from "@/lib/format";
import { cvPageSubtitle } from "@/lib/cv-copy";
import { routeHead, seoBreadcrumbs } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { PageHeader, PageShell, pageLeadClass } from "@/components/page-shell";
import { MotionPage } from "@/components/page-transition";
import { ChipList, MetaLabel, SurfaceCard, focusRing } from "@/components/editorial";

export const Route = createFileRoute("/projects")({
  head: () => routeHead("projects", "/projects", { breadcrumbs: seoBreadcrumbs("projects") }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { i18n } = useTranslation();
  const lang = currentLang(i18n.language);

  const activeProjects = cv.projects.filter((p) => p.active);

  return (
    <MotionPage>
      <PageShell>
        <PageHeader page="projects" subtitle={cvPageSubtitle("projects", lang)} />

        <RevealGroup className={`${pageLeadClass} grid gap-6 sm:grid-cols-2`} stagger={0.08}>
          {activeProjects.map((p) => (
            <RevealItem key={p.name}>
              <SurfaceCard
                as="article"
                variant="surface"
                padding="md"
                className="flex h-full flex-col justify-between"
              >
                <div>
                  <MetaLabel size="sm">{formatPeriod(p.startDate, p.endDate, lang)}</MetaLabel>
                  <h2 className="mt-5 font-display text-3xl sm:text-4xl">
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "inline-flex items-center gap-2 transition-colors hover:text-foreground",
                          focusRing,
                        )}
                        aria-label={`${p.name} (opens in new tab)`}
                      >
                        {p.name}
                        <ExternalLink className="size-5 shrink-0 sm:size-6" aria-hidden />
                      </a>
                    ) : (
                      p.name
                    )}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {p.description[lang]}
                  </p>
                </div>
                <ChipList className="mt-6" items={p.highlights[lang]} />
              </SurfaceCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </PageShell>
    </MotionPage>
  );
}
