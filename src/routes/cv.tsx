import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Printer } from "lucide-react";
import { cv, type WorkItem } from "@/data/cv";
import { currentLang, formatPeriod } from "@/lib/format";
import { routeHead } from "@/lib/seo";
import { Reveal } from "@/components/reveal";
import { PageHeader, PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/cv")({
  head: () => routeHead("cv", "/cv", { noIndex: true }),
  component: CvPage,
});

function CvPage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);
  const contactItems = [
    cv.basics.email,
    cv.basics.phone,
    cv.basics.location[lang],
    cv.basics.url,
    ...cv.basics.profiles.map((p) => `${p.network}: ${p.url.replace(/^https?:\/\//, "")}`),
  ];

  const handlePrint = () => {
    const originalTitle = document.title;
    const restoreTitle = () => {
      document.title = originalTitle;
    };

    document.title = `Ubaldo Santos - ${formatPrintDate(new Date())}`;
    window.addEventListener("afterprint", restoreTitle, { once: true });
    window.print();
  };

  return (
    <div className="bg-background py-8 print:bg-white print:py-0">
      <PageShell className="no-print">
        <PageHeader page="cv" subtitle={t("cv.subtitle")} />

        <Reveal delay={0.04} onMount>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-hairline bg-surface/40 p-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("cv.printHint")}
            </p>
            <button
              type="button"
              onClick={handlePrint}
              className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm text-background transition-all hover:gap-3 sm:w-auto"
            >
              <Printer className="size-4" aria-hidden />
              {t("actions.printCv")}
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </button>
          </div>
        </Reveal>
      </PageShell>

      <article id="cv-article" className="mx-auto">
        <header className="cv-block cv-header">
          <h1>{cv.basics.name}</h1>
          <p>{cv.basics.label[lang]}</p>
          <div className="cv-contact-line">
            {contactItems.map((item, index) => (
              <span key={item} className="cv-contact-item">
                {index > 0 ? <span aria-hidden>·</span> : null}
                <span>{item}</span>
              </span>
            ))}
          </div>
        </header>

        <Section title={t("cv.profile")}>
          <p className="leading-relaxed">{cv.basics.summary[lang]}</p>
        </Section>

        <Section title={t("cv.experience")}>
          {cv.work.map((w) => (
            <Job key={w.name + w.startDate} w={w} lang={lang} />
          ))}
        </Section>

        <Section title={t("cv.education")}>
          {cv.education.map((ed) => (
            <div key={ed.institution + ed.startDate} className="cv-block mb-3 last:mb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3>
                  {ed.studyType[lang]} — {ed.institution}
                </h3>
                <span className="font-mono text-xs">
                  {formatPeriod(ed.startDate, ed.endDate, lang)}
                </span>
              </div>
              <div className="cv-meta">{ed.area[lang]}</div>
              <p className="mt-1">{ed.summary[lang]}</p>
            </div>
          ))}
        </Section>

        <Section title={t("cv.skills")}>
          <ul className="space-y-1">
            <li>
              <strong>{t("skills.languages")}:</strong> {cv.skills.languages.join(", ")}
            </li>
            <li>
              <strong>{t("skills.frameworks")}:</strong> {cv.skills.frameworks.join(", ")}
            </li>
            <li>
              <strong>{t("skills.databases")}:</strong> {cv.skills.databases.join(", ")}
            </li>
            <li>
              <strong>{t("skills.practices")}:</strong> {cv.skills.practices.join(", ")}
            </li>
            <li>
              <strong>{t("skills.tooling")}:</strong> {cv.skills.tooling.join(", ")}
            </li>
            <li>
              <strong>{t("skills.integrations")}:</strong> {cv.skills.integrations.join(", ")}
            </li>
          </ul>
        </Section>

        <Section title={t("cv.languages")}>
          <p>{cv.languages.map((l) => `${l.name[lang]} (${l.level[lang]})`).join(" · ")}</p>
        </Section>

        <Section title={t("cv.projects")}>
          {cv.projects.map((p) => (
            <div key={p.name} className="cv-block mb-2 last:mb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noreferrer">
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                </h3>
                <span className="font-mono text-xs">
                  {formatPeriod(p.startDate, p.endDate, lang)}
                </span>
              </div>
              <p>{p.description[lang]}</p>
            </div>
          ))}
        </Section>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Job({ w, lang }: { w: WorkItem; lang: ReturnType<typeof currentLang> }) {
  const { t } = useTranslation();

  return (
    <div className="cv-block mb-5 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3>
          {w.position[lang]} — {w.name}
        </h3>
        <span className="font-mono text-xs">{formatPeriod(w.startDate, w.endDate, lang)}</span>
      </div>
      <div className="cv-meta">
        {w.location[lang]} · {w.modality[lang]}
      </div>
      <p className="mt-1">{w.summary[lang]}</p>
      <ul className="mt-2 list-disc space-y-0.5 pl-5">
        {w.highlights[lang].map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
      <div className="cv-stack mt-1.5">
        <strong>{t("experience.stack")}:</strong> {w.technologies}
      </div>
    </div>
  );
}

function formatPrintDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(date)
    .replaceAll("/", "-");
}
