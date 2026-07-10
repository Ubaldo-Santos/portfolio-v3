/**
 * Copy aligned with cv.ts for external platforms (LinkedIn, InfoJobs).
 * Spanish only — paste into each platform manually or via browser assist.
 * Source of truth remains src/data/cv.ts.
 */

import { cv } from "@/data/cv";
import { cvSummary, withYears } from "@/lib/format";

function bullets(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function jobBlock(
  company: string,
  title: string,
  period: string,
  summary: string,
  highlights: string[],
  tech: string,
): string {
  return `${title}\n${company} · ${period}\n\n${summary}\n\n${bullets(highlights)}\n\nTecnologías: ${tech}`;
}

const lang = "es" as const;

export const linkedIn = {
  headline:
    "Ingeniero de Software Full-Stack · TypeScript · PHP · Laravel · Vue · SDK e integraciones | Wiris (Nubric + MathType) · +6 años en producto",
  about: cvSummary(lang),
  experience: [
    jobBlock(
      "WIRIS",
      "Ingeniero de Software · Assessment",
      "abr 2025 – Actualidad",
      cv.work[0].summary[lang],
      cv.work[0].highlights[lang],
      cv.work[0].technologies,
    ),
    jobBlock(
      "WIRIS",
      "Ingeniero de Software · MathType Integrations",
      "mar 2024 – abr 2025",
      cv.work[1].summary[lang],
      cv.work[1].highlights[lang],
      cv.work[1].technologies,
    ),
    jobBlock(
      "Rotrafu",
      "Desarrollador Full-Stack · Responsable IT",
      "jun 2020 – mar 2024",
      cv.work[2].summary[lang],
      cv.work[2].highlights[lang].slice(0, 5),
      cv.work[2].technologies,
    ),
    jobBlock(
      "Prime IT",
      cv.work[3].position[lang],
      "jun – dic 2023",
      cv.work[3].summary[lang],
      cv.work[3].highlights[lang],
      cv.work[3].technologies,
    ),
    ...cv.trainee.map((t) =>
      jobBlock(
        t.name,
        t.position[lang],
        `${t.startDate.slice(0, 7)} – ${t.endDate?.slice(0, 7) ?? "actualidad"}`,
        t.summary[lang],
        t.highlights[lang],
        t.technologies,
      ),
    ),
  ],
} as const;

export const infoJobs = {
  cvText: withYears(cv.basics.summaryPrint[lang]),
  skills: [
    "Fullstack",
    "TypeScript",
    "JavaScript",
    "PHP",
    "Laravel",
    "Vue.js",
    "Deno",
    "Docker",
    "Git",
    "MathType",
    "Moodle",
    "MySQL",
    "CI/CD",
    "TDD",
  ],
  education: [
    {
      title: "Grado en Ingeniería Informática del Software",
      school: "Universitat Oberta de Catalunya",
      period: "feb 2021 – ago 2025",
    },
    {
      title: "CFGS DAW (Dual) — Desarrollo de Aplicaciones Web",
      school: "IES La Pineda",
      period: "sep 2020 – jun 2021",
    },
    {
      title: "CFGS ASIR — Administración de Sistemas Informáticos en Red",
      school: "IES La Pineda",
      period: "sep 2018 – jun 2020",
    },
    {
      title: "CFGS SMR — Sistemas Microinformáticos y Redes",
      school: "IES La Pineda",
      period: "sep 2016 – jun 2018",
    },
  ],
  experience: linkedIn.experience,
  fixes: [
    "Dividir Wiris en Assessment (actual) + Integraciones (hasta abr 2025)",
    "Corregir estudios: ASIR 2018–2020 y DAW 2020–2021 (no solapados)",
    "Renombrar CFGS Superior erróneo: es ASIR, no SMR",
    "Eliminar texto duplicado en Wiris Integraciones",
    "Reemplazar bloque copiado de Prime IT en XMI por contenido real",
    "Corregir typo Automaticé → Automatizé en Rotrafu",
    "AMVARA: confirmar ago 2019 (portfolio) vs jul–ago 2020 (InfoJobs actual)",
  ],
} as const;
