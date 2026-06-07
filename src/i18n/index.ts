import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { translations } from "./translations";

export const SUPPORTED_LANGS = ["es", "ca", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

// Always init with "es" so SSR and the first client paint match.
// The real language is resolved AFTER mount in I18nProvider (avoids hydration mismatch).
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      es: { translation: translations.es },
      ca: { translation: translations.ca },
      en: { translation: translations.en },
    },
    lng: "es",
    fallbackLng: "es",
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
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
