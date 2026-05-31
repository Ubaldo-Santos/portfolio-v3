import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import es from "./locales/es.json";
import ca from "./locales/ca.json";
import en from "./locales/en.json";

export const SUPPORTED_LANGS = ["es", "ca", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        es: { translation: es },
        ca: { translation: ca },
        en: { translation: en },
      },
      fallbackLng: "es",
      supportedLngs: SUPPORTED_LANGS as unknown as string[],
      nonExplicitSupportedLngs: true,
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "lang",
      },
    });
}

export default i18n;
