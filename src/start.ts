import { createStart, createMiddleware } from "@tanstack/react-start";

import i18n from "@/i18n";
import { detectLang } from "@/lib/detect-lang";
import { renderErrorPage } from "./lib/error-page";

const i18nMiddleware = createMiddleware().server(async ({ next }) => {
  const lang = detectLang();
  await i18n.changeLanguage(lang);
  return next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(detectLang()), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [i18nMiddleware, errorMiddleware],
}));
