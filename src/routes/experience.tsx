import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { cv, type WorkItem } from "@/data/cv";
import { currentLang, formatPeriod } from "@/lib/format";
import { Reveal } from "@/components/reveal";
import { MapPin, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Ubaldo Santos Patón" },
      { name: "description", content: "Professional experience of Ubaldo Santos Patón: Wiris (Nubric, MathType SDK), Rotrafu, Prime IT." },
      { property: "og:title", content: "Experience — Ubaldo Santos Patón" },
      { property: "og:description", content: "Trajectory in product and engineering." },
      { property: "og:url", content: "https://ubaldo.is-a.dev/experience" },
    ],
    links: [{ rel: "canonical", href: "https://ubaldo.is-a.dev/experience" }],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">01</div>
        <h1 className="mt-2 font-display text-6xl sm:text-7xl">{t("experience.title")}</h1>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">{t("experience.subtitle")}</p>
      </Reveal>

      <Section title={t("experience.work")} items={cv.work as readonly WorkItem[]} lang={lang} />
      <Section title={t("experience.trainee")} items={cv.trainee as readonly WorkItem[]} lang={lang} />
    </div>
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

function Section({ title, items, lang }: { title: string; items: readonly WorkItem[]; lang: ReturnType<typeof currentLang> }) {
  const { t } = useTranslation();
  const groups = groupByCompany(items);
  return (
    <section className="mt-20">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">{title}</h2>
      <ol className="mt-8 space-y-12">
        {groups.map((group, gi) => {
          // Items are most-recent first; oldest start = last item, newest end = first item
          const newest = group[0];
          const oldest = group[group.length - 1];
          const isMulti = group.length > 1;
          const url = newest.url;
          const anyCurrent = group.some((g) => g.current);
          return (
            <Reveal key={newest.name + newest.startDate} delay={gi * 0.04}>
              <li className="grid gap-6 border-t border-hairline pt-8 md:grid-cols-[200px_1fr]">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <div>{formatPeriod(oldest.startDate, newest.endDate, lang)}</div>
                  <div className="mt-2 flex items-center gap-1 normal-case">
                    <MapPin className="size-3" /> {newest.location[lang]}
                  </div>
                  <div className="mt-1 normal-case">{newest.modality[lang]}</div>
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-3xl">
                      {newest.name}
                      {url && (
                        <a href={url} target="_blank" rel="noreferrer" className="ml-2 inline-flex text-muted-foreground hover:text-foreground">
                          <ExternalLink className="size-4" />
                        </a>
                      )}
                    </h3>
                    {anyCurrent && (
                      <span className="rounded-full border border-accent bg-accent/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground">
                        {t("experience.present")}
                      </span>
                    )}
                  </div>

                  {isMulti ? (
                    <ol className="relative mt-5 space-y-8 border-l border-hairline pl-6">
                      {group.map((w, idx) => (
                        <li key={w.startDate} className="relative">
                          <span
                            className={`absolute -left-[27px] top-2 size-2.5 rounded-full ring-4 ring-background ${
                              w.current ? "bg-accent" : "bg-muted-foreground/60"
                            }`}
                            aria-hidden
                          />
                          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            {formatPeriod(w.startDate, w.endDate, lang)}
                          </div>
                          <div className="mt-1 font-display text-xl">{w.position[lang]}</div>
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/90">{w.summary[lang]}</p>
                          <ul className="mt-3 space-y-1.5">
                            {w.highlights[lang].map((h, hidx) => (
                              <li key={hidx} className="flex gap-2 text-sm">
                                <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {w.technologies.split(",").map((tech) => (
                              <span key={tech} className="rounded-full border border-hairline px-2 py-0.5 text-[11px]">
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <>
                      <div className="mt-1 italic text-muted-foreground">{newest.position[lang]}</div>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed">{newest.summary[lang]}</p>
                      <div className="mt-6">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {t("experience.highlights")}
                        </div>
                        <ul className="mt-2 space-y-1.5">
                          {newest.highlights[lang].map((h, idx) => (
                            <li key={idx} className="flex gap-2 text-sm">
                              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t("experience.stack")}</div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {newest.technologies.split(",").map((tech) => (
                            <span key={tech} className="rounded-full border border-hairline px-2.5 py-0.5 text-xs">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
