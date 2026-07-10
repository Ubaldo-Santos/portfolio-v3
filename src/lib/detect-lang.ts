import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { type Lang, SUPPORTED_LANGS, detectClientLang } from "@/i18n";

export function parseLangCookie(cookie: string): Lang | null {
  const match = cookie.match(/(?:^|;\s*)lang=(es|ca|en)(?:;|$)/);
  if (match && (SUPPORTED_LANGS as readonly string[]).includes(match[1])) {
    return match[1] as Lang;
  }
  return null;
}

function detectFromAcceptLanguage(header: string): Lang {
  for (const part of header.split(",")) {
    const code = part.trim().split(";")[0].slice(0, 2).toLowerCase();
    if ((SUPPORTED_LANGS as readonly string[]).includes(code)) return code as Lang;
  }
  return "es";
}

export function detectLangFromRequest(request: Request): Lang {
  const fromCookie = parseLangCookie(request.headers.get("cookie") ?? "");
  if (fromCookie) return fromCookie;
  return detectFromAcceptLanguage(request.headers.get("accept-language") ?? "");
}

export const detectLang = createIsomorphicFn()
  .server(() => {
    try {
      return detectLangFromRequest(getRequest());
    } catch {
      return "es";
    }
  })
  .client(() => detectClientLang());
