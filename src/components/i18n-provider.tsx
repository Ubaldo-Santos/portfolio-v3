import { useEffect, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "@/i18n";

function HtmlLangSync() {
  const { i18n: i } = useTranslation();
  useEffect(() => {
    document.documentElement.lang = i.language?.slice(0, 2) || "es";
  }, [i.language]);
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
