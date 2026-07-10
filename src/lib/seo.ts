import { type Lang } from "@/data/cv";
import { cv } from "@/data/cv";
import { translations } from "@/i18n/translations";
import {
  cvMetaDescription,
  cvMetaKeywords,
  cvMetaOgDescription,
  cvMetaTitle,
  type CvMetaPage,
} from "@/lib/cv-copy";
import { detectLang } from "@/lib/detect-lang";
import { homeOgDescription } from "@/lib/og-copy";
import { SITE_URL } from "@/lib/site";
import { OG_PRIMARY_SIZE, OG_PRIMARY_THEME, OG_SIZES, ogImageUrl } from "@/lib/og-sizes";

export { SITE_URL };
export type { CvMetaPage as SeoPage };
export const BRAND_MARK_URL = `${SITE_URL}/code-sandbox.svg`;
export const OG_IMAGE_URL = ogImageUrl(OG_PRIMARY_SIZE, OG_PRIMARY_THEME);
const OG_IMAGE = OG_SIZES[OG_PRIMARY_SIZE];

const OG_LOCALE_BY_LANG: Record<Lang, string> = {
  es: "es_ES",
  ca: "ca_ES",
  en: "en_US",
};

const HREFLANGS: Array<{ hreflang: string }> = [
  { hreflang: "es" },
  { hreflang: "ca" },
  { hreflang: "en" },
  { hreflang: "x-default" },
];

type BreadcrumbPage = Exclude<CvMetaPage, "home" | "cv">;

function socialPageCopy(page: CvMetaPage, lang: Lang) {
  const description = page === "home" ? homeOgDescription(lang) : cvMetaOgDescription(page, lang);
  const title = cvMetaTitle(page, lang);

  return {
    title,
    description,
    siteName: cv.basics.name,
    imageAlt: `${title} — portfolio preview`,
  };
}

/** Shared og:* / twitter:* tags — localized text; OG image URLs stay English pre-rendered PNGs. */
export function socialMetaTags(page: CvMetaPage, url: string, lang: Lang) {
  const social = socialPageCopy(page, lang);
  const primaryLocale = OG_LOCALE_BY_LANG[lang];
  const alternateLocales = (Object.values(OG_LOCALE_BY_LANG) as string[]).filter(
    (locale) => locale !== primaryLocale,
  );

  return [
    { property: "og:site_name", content: social.siteName },
    { property: "og:title", content: social.title },
    { property: "og:description", content: social.description },
    { property: "og:url", content: url },
    { property: "og:type", content: page === "home" ? "profile" : "website" },
    { property: "og:locale", content: primaryLocale },
    ...alternateLocales.map((locale) => ({
      property: "og:locale:alternate",
      content: locale,
    })),
    { property: "og:image", content: OG_IMAGE_URL },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: String(OG_IMAGE.width) },
    { property: "og:image:height", content: String(OG_IMAGE.height) },
    { property: "og:image:alt", content: social.imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: social.title },
    { name: "twitter:description", content: social.description },
    { name: "twitter:image", content: OG_IMAGE_URL },
    { name: "twitter:image:alt", content: social.imageAlt },
  ];
}

export function seoBreadcrumbs(page: BreadcrumbPage, lang?: Lang) {
  const resolvedLang = lang ?? detectLang();
  const nav = translations[resolvedLang].nav;
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
  lang?: Lang;
  noIndex?: boolean;
  breadcrumbs?: Array<{ name: string; path: string }>;
}

export function routeHead(page: CvMetaPage, path: string, options?: RouteHeadOptions) {
  const lang = options?.lang ?? detectLang();
  const url = `${SITE_URL}${path}`;

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

  const robotsContent = options?.noIndex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return {
    meta: [
      { title: cvMetaTitle(page, lang) },
      { name: "description", content: cvMetaDescription(page, lang) },
      { name: "author", content: cv.basics.name },
      { name: "keywords", content: cvMetaKeywords() },
      { name: "robots", content: robotsContent },
      { name: "googlebot", content: robotsContent },
      ...socialMetaTags(page, url, lang),
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
