import { cv, type Lang } from "@/data/cv";
import { taglineLead } from "@/lib/format";

function linkedInProfile() {
  return cv.basics.profiles.find((profile) => profile.network === "LinkedIn");
}

function siteHost(): string {
  return cv.basics.url.replace(/^https?:\/\//, "");
}

export function ogPrimaryStack(): string {
  const { backend, frontend } = cv.skills.primaryStack;
  return [...backend, ...frontend, "AI"].join(" · ");
}

/** OG card copy — lead, pitch, stack and contact line. */
export function ogCopy(lang: Lang) {
  const linkedIn = linkedInProfile();

  return {
    lead: taglineLead(lang),
    detail: cv.basics.tagline.ogBriefing[lang],
    stack: ogPrimaryStack(),
    linkedIn: linkedIn ? `linkedin.com/in/${linkedIn.username}` : "",
    site: siteHost(),
  };
}

/** Home page og:description / twitter:description (social previews). */
export function homeOgDescription(lang: Lang = "en"): string {
  return cv.basics.tagline.ogBriefing[lang];
}
