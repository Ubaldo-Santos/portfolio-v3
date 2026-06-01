import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Printer } from "lucide-react";
import { cv, type WorkItem } from "@/data/cv";
import { currentLang, formatPeriod } from "@/lib/format";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Ubaldo Santos Patón" },
      { name: "description", content: "Printable, ATS-friendly résumé of Ubaldo Santos Patón." },
      { property: "og:title", content: "CV — Ubaldo Santos Patón" },
      { property: "og:description", content: "Hit print and save as PDF." },
      { property: "og:url", content: "https://ubaldo.is-a.dev/cv" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "https://ubaldo.is-a.dev/cv" }],
  }),
  component: CvPage,
});

function CvPage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);

  return (
    <div className="bg-background">
      {/* Screen-only toolbar — aligned with navbar height */}
      <div className="no-print sticky top-16 z-40 border-b border-hairline bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
          <div className="flex items-baseline gap-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {t("cv.title")}
            </div>
            <div className="hidden text-xs text-muted-foreground sm:block">· {t("cv.printHint")}</div>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-neon-cv inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider"
          >
            <Printer className="size-3.5" aria-hidden />
            <span>{t("actions.printCv")}</span>
          </button>
        </div>
      </div>

      <article id="cv-article" className="mx-auto max-w-4xl bg-background px-6 py-10 sm:px-12 sm:py-14 print:px-0 print:py-0">
        {/* Header */}
        <header className="cv-block">
          <h1 className="text-3xl font-semibold print:text-[22pt]">{cv.basics.name}</h1>
          <p className="mt-1 text-base text-muted-foreground print:text-[11pt] print:text-black">
            {cv.basics.label[lang]}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground print:text-[10pt] print:text-black">
            <span>{cv.basics.email}</span>
            <span aria-hidden>·</span>
            <span>{cv.basics.phone}</span>
            <span aria-hidden>·</span>
            <span>{cv.basics.location[lang]}</span>
            <span aria-hidden>·</span>
            <span>{cv.basics.url}</span>
            {cv.basics.profiles.map((p) => (
              <span key={p.network} className="inline-flex gap-1">
                <span aria-hidden>·</span>
                <span>{p.network}: {p.url.replace(/^https?:\/\//, "")}</span>
              </span>
            ))}
          </div>
        </header>

        <Section title={t("cv.profile")}>
          <p className="text-sm leading-relaxed print:text-[10.5pt]">{cv.basics.summary[lang]}</p>
        </Section>

        <Section title={t("cv.experience")}>
          {[...cv.work, ...cv.trainee].map((w) => (
            <Job key={w.name + w.startDate} w={w} lang={lang} />
          ))}
        </Section>

        <Section title={t("cv.education")}>
          {cv.education.map((ed) => (
            <div key={ed.institution + ed.startDate} className="cv-block mb-3 last:mb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold print:text-[11pt]">
                  {ed.studyType[lang]} — {ed.institution}
                </h3>
                <span className="font-mono text-xs text-muted-foreground print:text-[9.5pt] print:text-black">
                  {formatPeriod(ed.startDate, ed.endDate, lang)}
                </span>
              </div>
              <div className="text-sm text-muted-foreground print:text-[10pt] print:text-black">{ed.area[lang]}</div>
              <p className="mt-1 text-sm print:text-[10pt]">{ed.summary[lang]}</p>
            </div>
          ))}
        </Section>

        <Section title={t("cv.skills")}>
          <ul className="space-y-1 text-sm print:text-[10pt]">
            <li><strong>{t("skills.languages")}:</strong> {cv.skills.languages.join(", ")}</li>
            <li><strong>{t("skills.frameworks")}:</strong> {cv.skills.frameworks.join(", ")}</li>
            <li><strong>{t("skills.databases")}:</strong> {cv.skills.databases.join(", ")}</li>
            <li><strong>{t("skills.practices")}:</strong> {cv.skills.practices.join(", ")}</li>
            <li><strong>{t("skills.tooling")}:</strong> {cv.skills.tooling.join(", ")}</li>
            <li><strong>{t("skills.integrations")}:</strong> {cv.skills.integrations.join(", ")}</li>
          </ul>
        </Section>

        <Section title={t("cv.languages")}>
          <ul className="space-y-1 text-sm print:text-[10pt]">
            {cv.languages.map((l) => (
              <li key={l.name[lang]}>
                <strong>{l.name[lang]}:</strong> {l.level[lang]}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t("cv.projects")}>
          {cv.projects.map((p) => (
            <div key={p.name} className="cv-block mb-2 last:mb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold print:text-[11pt]">{p.name}</h3>
                <span className="font-mono text-xs text-muted-foreground print:text-[9.5pt] print:text-black">
                  {formatPeriod(p.startDate, p.endDate, lang)}
                </span>
              </div>
              <p className="text-sm print:text-[10pt]">{p.description[lang]}</p>
            </div>
          ))}
        </Section>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-block mt-8 border-t border-hairline pt-4 print:mt-5 print:border-t print:border-black/40 print:pt-2">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground print:text-[10pt] print:text-black">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Job({ w, lang }: { w: WorkItem; lang: ReturnType<typeof currentLang> }) {
  return (
    <div className="cv-block mb-5 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold print:text-[11pt]">
          {w.position[lang]} — {w.name}
        </h3>
        <span className="font-mono text-xs text-muted-foreground print:text-[9.5pt] print:text-black">
          {formatPeriod(w.startDate, w.endDate, lang)}
        </span>
      </div>
      <div className="text-sm text-muted-foreground print:text-[10pt] print:text-black">
        {w.location[lang]} · {w.modality[lang]}
      </div>
      <p className="mt-1 text-sm print:text-[10pt]">{w.summary[lang]}</p>
      <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm print:text-[10pt]">
        {w.highlights[lang].map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
      <div className="mt-1.5 text-xs text-muted-foreground print:text-[9.5pt] print:text-black">
        <strong>Stack:</strong> {w.technologies}
      </div>
    </div>
  );
}