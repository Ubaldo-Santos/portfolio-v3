import { useEffect, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n, { detectClientLang } from "@/i18n";

function HtmlLangSync() {
  const { i18n: i } = useTranslation();
  // After hydration, switch to the user's preferred language (localStorage / navigator).
  useEffect(() => {
    const target = detectClientLang();
    if (target !== i.language) {
      i.changeLanguage(target);
    }
  }, [i]);
  // Persist + sync <html lang>
  useEffect(() => {
    const onChange = (lng: string) => {
      try {
        window.localStorage.setItem("lang", lng.slice(0, 2));
      } catch {
        /* ignore */
      }
      document.documentElement.lang = lng.slice(0, 2);
    };
    onChange(i.language);
    i.on("languageChanged", onChange);
    return () => {
      i.off("languageChanged", onChange);
    };
  }, [i]);
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <HtmlLangSync />
      {children}
    </I18nextProvider>
  );
}
