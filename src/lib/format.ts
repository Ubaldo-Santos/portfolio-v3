import { cv, type Lang } from "@/data/cv";

export function yearsOfExperience(
  startDate: string = cv.basics.careerStartDate,
  asOf: Date = new Date(),
): number {
  const start = new Date(startDate);
  let years = asOf.getFullYear() - start.getFullYear();
  const monthDiff = asOf.getMonth() - start.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && asOf.getDate() < start.getDate())) {
    years--;
  }
  return Math.max(years, 0);
}

export function yearsOfExperienceLabel(
  startDate: string = cv.basics.careerStartDate,
  asOf: Date = new Date(),
): string {
  return `${yearsOfExperience(startDate, asOf)}+`;
}

export function withYears(text: string, asOf: Date = new Date()): string {
  return text.replace(/\{\{years\}\}/g, yearsOfExperienceLabel(cv.basics.careerStartDate, asOf));
}

export function taglineLead(lang: Lang, asOf: Date = new Date()): string {
  return withYears(cv.basics.tagline.lead[lang], asOf);
}

export function cvSummary(lang: Lang, asOf: Date = new Date()): string {
  return withYears(cv.basics.summary[lang], asOf);
}

export function workAnchorId(item: { name: string; startDate: string }): string {
  const slug = item.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${slug}-${item.startDate}`;
}

const LABELS: Record<Lang, { present: string }> = {
  es: { present: "Actualidad" },
  ca: { present: "Actualitat" },
  en: { present: "Present" },
};

export function formatPeriod(start: string, end: string | null, lang: Lang): string {
  const s = formatYM(start, lang);
  const e = end ? formatYM(end, lang) : LABELS[lang].present;
  return `${s} — ${e}`;
}

export function formatYM(iso: string, lang: Lang): string {
  const d = new Date(iso);
  const locale = lang === "en" ? "en-US" : lang === "ca" ? "ca-ES" : "es-ES";
  return d.toLocaleDateString(locale, { month: "short", year: "numeric" }).replace(".", "");
}

export function currentLang(rawLang?: string): Lang {
  const l = (rawLang || "es").slice(0, 2);
  return l === "en" || l === "ca" ? l : "es";
}
