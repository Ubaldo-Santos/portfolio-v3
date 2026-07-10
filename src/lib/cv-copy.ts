import { cv, pick, type CvMetaPage, type Lang, type LocalizedString } from "@/data/cv";
import { withYears } from "@/lib/format";

export type { CvMetaPage };

export function cvLocalized(field: LocalizedString, lang: Lang, asOf: Date = new Date()): string {
  return withYears(field[lang], asOf);
}

export function cvMetaTitle(page: CvMetaPage, lang: Lang): string {
  return cv.copy.meta.pages[page].title[lang];
}

export function cvMetaDescription(page: CvMetaPage, lang: Lang, asOf: Date = new Date()): string {
  return cvLocalized(cv.copy.meta.pages[page].description, lang, asOf);
}

/** Home OG/social uses the short Wiris arc from tagline. */
export function cvMetaOgDescription(page: CvMetaPage, lang: Lang, asOf: Date = new Date()): string {
  if (page === "home") {
    return cv.basics.tagline.ogBriefing[lang];
  }
  return cvLocalized(cv.copy.meta.pages[page].ogDescription, lang, asOf);
}

export type CvContentPage = Exclude<keyof typeof cv.copy.pages, "home">;

export function cvPageSubtitle(page: CvContentPage, lang: Lang, asOf: Date = new Date()): string {
  return cvLocalized(cv.copy.pages[page].subtitle, lang, asOf);
}

export function cvHomeSelectedWorkSub(lang: Lang): string {
  return pick(cv.copy.pages.home.selectedWorkSub, lang);
}

export function cvContactCopy(field: "availability" | "preferred", lang: Lang): string {
  return pick(cv.copy.pages.contact[field], lang);
}

export function cvPrintHint(lang: Lang): string {
  return pick(cv.copy.pages.cv.printHint, lang);
}

export function cvAiCopy(field: "kicker" | "title" | "body", lang: Lang): string {
  return pick(cv.copy.ai[field], lang);
}

export function cvAiTags(): readonly string[] {
  return cv.copy.ai.tags;
}

export function cvMetaKeywords(): string {
  return cv.copy.meta.keywords;
}

export function cvKnowsAbout(): readonly string[] {
  return cv.seo.knowsAbout;
}
