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

function Section({ title, items, lang }: { title: string; items: readonly WorkItem[]; lang: ReturnType<typeof currentLang> }) {
  const { t } = useTranslation();
  return (
    <section className="mt-20">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">{title}</h2>
      <ol className="mt-8 space-y-12">
        {items.map((w, i) => (
          <Reveal key={w.name + w.startDate} delay={i * 0.04}>
            <li className="grid gap-6 border-t border-hairline pt-8 md:grid-cols-[200px_1fr]">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <div>{formatPeriod(w.startDate, w.endDate, lang)}</div>
                <div className="mt-2 flex items-center gap-1 normal-case">
                  <MapPin className="size-3" /> {w.location[lang]}
                </div>
                <div className="mt-1 normal-case">{w.modality[lang]}</div>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-3xl">
                    {w.name}
                    {w.url && (
                      <a href={w.url} target="_blank" rel="noreferrer" className="ml-2 inline-flex text-muted-foreground hover:text-foreground">
                        <ExternalLink className="size-4" />
                      </a>
                    )}
                  </h3>
                  {w.current && (
                    <span className="rounded-full border border-accent bg-accent/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground">
                      {t("experience.present")}
                    </span>
                  )}
                </div>
                <div className="mt-1 italic text-muted-foreground">{w.position[lang]}</div>
                <p className="mt-4 max-w-2xl text-base leading-relaxed">{w.summary[lang]}</p>

                <div className="mt-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t("experience.highlights")}
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {w.highlights[lang].map((h, idx) => (
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
                    {w.technologies.split(",").map((tech) => (
                      <span key={tech} className="rounded-full border border-hairline px-2.5 py-0.5 text-xs">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
