import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { cv, type WorkItem } from "@/data/cv";
import { currentLang, formatPeriod, workAnchorId } from "@/lib/format";
import { cvPageSubtitle } from "@/lib/cv-copy";
import { routeHead, seoBreadcrumbs } from "@/lib/seo";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { PageHeader, PageShell } from "@/components/page-shell";
import { MotionPage } from "@/components/page-transition";
import { MapPin } from "lucide-react";
import {
  ArrowLink,
  Chip,
  ChipList,
  MetaLabel,
  SectionHeader,
  sectionGap,
} from "@/components/editorial";

export const Route = createFileRoute("/experience")({
  head: () => routeHead("experience", "/experience", { breadcrumbs: seoBreadcrumbs("experience") }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);

  return (
    <MotionPage>
      <PageShell>
        <PageHeader page="experience" subtitle={cvPageSubtitle("experience", lang)} />

        <Section title={t("experience.work")} items={cv.work as readonly WorkItem[]} lang={lang} />
        <Section
          title={t("experience.trainee")}
          items={cv.trainee as readonly WorkItem[]}
          lang={lang}
        />
      </PageShell>
    </MotionPage>
  );
}

function groupByCompany(items: readonly WorkItem[]): WorkItem[][] {
  const groups: WorkItem[][] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last[0].name === item.name) last.push(item);
    else groups.push([item]);
  }
  return groups;
}

function Section({
  title,
  items,
  lang,
}: {
  title: string;
  items: readonly WorkItem[];
  lang: ReturnType<typeof currentLang>;
}) {
  const { t } = useTranslation();
  const groups = groupByCompany(items);
  return (
    <section className={sectionGap.lg}>
      <SectionHeader title={title} />
      <RevealGroup className="mt-8">
        <ol className="space-y-12">
          {groups.map((group) => {
            // Items are most-recent first; oldest start = last item, newest end = first item
            const newest = group[0];
            const oldest = group[group.length - 1];
            const isMulti = group.length > 1;
            const url = newest.url;
            const anyCurrent = group.some((g) => g.current);
            return (
              <RevealItem key={newest.name + newest.startDate}>
                <li
                  id={!isMulti ? workAnchorId(newest) : undefined}
                  className="scroll-mt-24 grid gap-6 border-t border-hairline pt-8 md:grid-cols-[200px_1fr]"
                >
                  <div>
                    <MetaLabel>{formatPeriod(oldest.startDate, newest.endDate, lang)}</MetaLabel>
                    <MetaLabel icon={MapPin} className="mt-2">
                      {newest.location[lang]}
                    </MetaLabel>
                    <MetaLabel className="mt-1">{newest.modality[lang]}</MetaLabel>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="font-display text-3xl">
                        {newest.name}
                        {url ? (
                          <ArrowLink
                            href={url}
                            aria-label={`${newest.name} website`}
                            className="ml-2 align-middle"
                          />
                        ) : null}
                      </h3>
                      {anyCurrent ? <Chip variant="status">{t("experience.present")}</Chip> : null}
                    </div>

                    {isMulti ? (
                      <ol className="relative mt-5 space-y-8 border-l border-hairline pl-6">
                        {group.map((w) => (
                          <li
                            key={w.startDate}
                            id={workAnchorId(w)}
                            className="relative scroll-mt-24"
                          >
                            <div className="relative">
                              <span
                                className={`absolute -left-6 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-background ${
                                  w.current ? "bg-accent" : "bg-muted-foreground/60"
                                }`}
                                aria-hidden
                              />
                              <MetaLabel size="sm">
                                {formatPeriod(w.startDate, w.endDate, lang)}
                              </MetaLabel>
                            </div>
                            <div className="mt-1 font-display-italic text-xl text-muted-foreground">
                              {w.position[lang]}
                            </div>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/90">
                              {w.summary[lang]}
                            </p>
                            <ul className="mt-3 space-y-1.5">
                              {w.highlights[lang].map((h, hidx) => (
                                <li key={hidx} className="flex gap-2 text-sm">
                                  <span
                                    className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                                    aria-hidden
                                  />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                            <ChipList
                              className="mt-3"
                              items={w.technologies.split(",").map((tech) => tech.trim())}
                              label={t("experience.stack")}
                            />
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <>
                        <div className="mt-1 font-display-italic text-xl text-muted-foreground">
                          {newest.position[lang]}
                        </div>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed">
                          {newest.summary[lang]}
                        </p>
                        <div className="mt-6">
                          <MetaLabel size="sm">{t("experience.highlights")}</MetaLabel>
                          <ul className="mt-2 space-y-1.5">
                            {newest.highlights[lang].map((h, idx) => (
                              <li key={idx} className="flex gap-2 text-sm">
                                <span
                                  className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                                  aria-hidden
                                />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-6">
                          <MetaLabel size="sm">{t("experience.stack")}</MetaLabel>
                          <ChipList
                            className="mt-2"
                            items={newest.technologies.split(",").map((tech) => tech.trim())}
                            label={t("experience.stack")}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </li>
              </RevealItem>
            );
          })}
        </ol>
      </RevealGroup>
    </section>
  );
}
