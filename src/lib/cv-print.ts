import { cv, pick, type Lang } from "@/data/cv";
import { selectFeatured } from "@/lib/selected-work";

/** Printable CV limits — keep output within ~2 A4 pages. */
export const CV_PRINT = {
  maxHighlightsPerJob: 3,
  maxProjects: 2,
} as const;

export function cvPrintWork() {
  return selectFeatured(cv.work);
}

export function cvPrintEducation() {
  return selectFeatured(cv.education, 2);
}

export function cvPrintProjects() {
  return selectFeatured(cv.projects).slice(0, CV_PRINT.maxProjects);
}

/** Condensed skills block for print (4 lines vs 7 on /skills). */
export function cvPrintSkillLines(lang: Lang): string[] {
  const practices = pick(cv.skills.practices, lang).join(", ");
  const edtech = cv.skills.edtech.slice(0, 5).join(", ");
  const devops = cv.skills.devops.join(", ");
  const extraBackend = cv.skills.backend
    .filter((s) => !cv.skills.primaryStack.backend.includes(s as "PHP" | "Laravel"))
    .slice(0, 3)
    .join(", ");
  const stack = [
    ...cv.skills.primaryStack.backend,
    ...cv.skills.primaryStack.frontend,
    extraBackend,
  ]
    .filter(Boolean)
    .join(" · ");

  return [cv.skills.languages.join(", "), stack, edtech, `${practices} · ${devops}`];
}
