import type { Lang } from "@/i18n";

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
