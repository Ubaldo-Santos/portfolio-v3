import { useEffect, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { detectLang } from "@/lib/detect-lang";

function HtmlLangSync() {
  const { i18n: i } = useTranslation();
  useEffect(() => {
    const onChange = (lng: string) => {
      const code = lng.slice(0, 2);
      try {
        window.localStorage.setItem("lang", code);
      } catch {
        /* ignore */
      }
      document.documentElement.lang = code;
      document.cookie = `lang=${code};path=/;max-age=31536000;samesite=lax`;
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
  const lang = detectLang();

  useEffect(() => {
    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <I18nextProvider i18n={i18n}>
      <HtmlLangSync />
      {children}
    </I18nextProvider>
  );
}
