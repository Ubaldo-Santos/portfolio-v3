import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { translations } from "./translations";
import { yearsOfExperienceLabel } from "@/lib/format";
import { parseLangCookie } from "@/lib/detect-lang";

export const SUPPORTED_LANGS = ["es", "ca", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

const yearsLabel = yearsOfExperienceLabel();

function initialI18nLang(): Lang {
  if (typeof window === "undefined") {
    // Per-request SSR language is set in start.ts middleware before render.
    return "es";
  }
  return detectClientLang();
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      es: { translation: translations.es },
      ca: { translation: translations.ca },
      en: { translation: translations.en },
    },
    lng: initialI18nLang(),
    fallbackLng: "es",
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
      defaultVariables: { years: yearsLabel },
    },
  });
}

export function detectClientLang(): Lang {
  if (typeof window === "undefined") return "es";
  const fromCookie = parseLangCookie(document.cookie);
  if (fromCookie) return fromCookie;
  try {
    const stored = window.localStorage.getItem("lang");
    if (stored && (SUPPORTED_LANGS as readonly string[]).includes(stored)) return stored as Lang;
  } catch {
    /* ignore */
  }
  const nav = (navigator.language || "es").slice(0, 2).toLowerCase();
  if ((SUPPORTED_LANGS as readonly string[]).includes(nav)) return nav as Lang;
  return "es";
}

export default i18n;
