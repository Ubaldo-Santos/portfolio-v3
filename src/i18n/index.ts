import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { translations } from "./translations";
import { yearsOfExperienceLabel } from "@/lib/format";

export const SUPPORTED_LANGS = ["es", "ca", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

const yearsLabel = yearsOfExperienceLabel();

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      es: { translation: translations.es },
      ca: { translation: translations.ca },
      en: { translation: translations.en },
    },
    lng: typeof window === "undefined" ? "es" : detectClientLang(),
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
