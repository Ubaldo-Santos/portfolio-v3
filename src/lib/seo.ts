import { translations, type TranslationPage } from "@/i18n/translations";

export const SITE_URL = "https://ubaldo.is-a.dev";
export const BRAND_MARK_URL = `${SITE_URL}/code-sandbox.svg`;
const DEFAULT_LANG = "es";

type SeoPage = Exclude<TranslationPage, "siteName" | "author" | "keywords">;

export function routeHead(page: SeoPage, path: string, options?: { noIndex?: boolean }) {
  const meta = translations[DEFAULT_LANG].meta;
  const pageMeta = meta[page];
  const url = `${SITE_URL}${path}`;

  return {
    meta: [
      { title: pageMeta.title },
      { name: "description", content: pageMeta.description },
      { name: "author", content: meta.author },
      { name: "keywords", content: meta.keywords },
      { property: "og:site_name", content: meta.siteName },
      { property: "og:title", content: pageMeta.title },
      { property: "og:description", content: pageMeta.ogDescription },
      { property: "og:url", content: url },
      { property: "og:image", content: BRAND_MARK_URL },
      { property: "og:image:type", content: "image/svg+xml" },
      { property: "og:image:alt", content: meta.siteName },
      ...(options?.noIndex ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
