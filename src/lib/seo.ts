import { translations, type TranslationPage } from "@/i18n/translations";
import { SITE_URL } from "@/lib/site";
import { OG_PRIMARY_SIZE, OG_PRIMARY_THEME, OG_SIZES, ogImageUrl } from "@/lib/og-sizes";

export { SITE_URL };
export const BRAND_MARK_URL = `${SITE_URL}/code-sandbox.svg`;
export const OG_IMAGE_URL = ogImageUrl(OG_PRIMARY_SIZE, OG_PRIMARY_THEME);
const OG_IMAGE = OG_SIZES[OG_PRIMARY_SIZE];
const DEFAULT_LANG = "es";
const LOCALES = ["es_ES", "ca_ES", "en_US"] as const;
const HREFLANGS: Array<{ hreflang: string }> = [
  { hreflang: "es" },
  { hreflang: "ca" },
  { hreflang: "en" },
  { hreflang: "x-default" },
];

type SeoPage = Exclude<TranslationPage, "siteName" | "author" | "keywords">;
type BreadcrumbPage = Exclude<SeoPage, "home" | "cv">;

/** SSR breadcrumb labels — uses default locale (es), matching routeHead meta. */
export function seoBreadcrumbs(page: BreadcrumbPage) {
  const nav = translations.es.nav;
  const paths: Record<BreadcrumbPage, string> = {
    experience: "/experience",
    projects: "/projects",
    skills: "/skills",
    contact: "/contact",
  };
  return [
    { name: nav.home, path: "/" },
    { name: nav[page], path: paths[page] },
  ];
}

export interface RouteHeadOptions {
  noIndex?: boolean;
  breadcrumbs?: Array<{ name: string; path: string }>;
}

export function routeHead(page: SeoPage, path: string, options?: RouteHeadOptions) {
  const meta = translations[DEFAULT_LANG].meta;
  const pageMeta = meta[page];
  const url = `${SITE_URL}${path}`;
  const robotsContent = options?.noIndex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const scripts =
    options?.breadcrumbs && options.breadcrumbs.length > 0
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: options.breadcrumbs.map((crumb, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                name: crumb.name,
                item: `${SITE_URL}${crumb.path}`,
              })),
            }),
          },
        ]
      : [];

  return {
    meta: [
      { title: pageMeta.title },
      { name: "description", content: pageMeta.description },
      { name: "author", content: meta.author },
      { name: "keywords", content: meta.keywords },
      { name: "robots", content: robotsContent },
      { name: "googlebot", content: robotsContent },
      { property: "og:site_name", content: meta.siteName },
      { property: "og:title", content: pageMeta.title },
      { property: "og:description", content: pageMeta.ogDescription },
      { property: "og:url", content: url },
      { property: "og:type", content: page === "home" ? "profile" : "website" },
      { property: "og:locale", content: LOCALES[0] },
      ...LOCALES.slice(1).map((locale) => ({
        property: "og:locale:alternate",
        content: locale,
      })),
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: String(OG_IMAGE.width) },
      { property: "og:image:height", content: String(OG_IMAGE.height) },
      { property: "og:image:alt", content: meta.siteName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageMeta.title },
      { name: "twitter:description", content: pageMeta.ogDescription },
      { name: "twitter:image", content: OG_IMAGE_URL },
      { name: "twitter:image:alt", content: meta.siteName },
    ],
    links: [
      { rel: "canonical", href: url },
      ...HREFLANGS.map((entry) => ({
        rel: "alternate",
        hrefLang: entry.hreflang,
        href: url,
      })),
    ],
    scripts,
  };
}
