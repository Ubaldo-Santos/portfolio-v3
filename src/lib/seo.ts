import { cv } from "@/data/cv";
import { translations } from "@/i18n/translations";
import {
  cvMetaDescription,
  cvMetaKeywords,
  cvMetaOgDescription,
  cvMetaTitle,
  type CvMetaPage,
} from "@/lib/cv-copy";
import { homeOgDescription } from "@/lib/og-copy";
import { OG_LANG } from "@/lib/og-sizes";
import { SITE_URL } from "@/lib/site";
import { OG_PRIMARY_SIZE, OG_PRIMARY_THEME, OG_SIZES, ogImageUrl } from "@/lib/og-sizes";

export { SITE_URL };
export type { CvMetaPage as SeoPage };
export const BRAND_MARK_URL = `${SITE_URL}/code-sandbox.svg`;
export const OG_IMAGE_URL = ogImageUrl(OG_PRIMARY_SIZE, OG_PRIMARY_THEME);
const OG_IMAGE = OG_SIZES[OG_PRIMARY_SIZE];

/** SSR document meta — Spanish default for local SEO. */
const DEFAULT_LANG = "es";
/** Open Graph / Twitter copy — English, matches OG banner PNGs. */
const SOCIAL_LANG = OG_LANG;

const SOCIAL_LOCALES = ["en_US", "es_ES", "ca_ES"] as const;
const HREFLANGS: Array<{ hreflang: string }> = [
  { hreflang: "es" },
  { hreflang: "ca" },
  { hreflang: "en" },
  { hreflang: "x-default" },
];

type BreadcrumbPage = Exclude<CvMetaPage, "home" | "cv">;

function socialPageCopy(page: CvMetaPage) {
  const description =
    page === "home" ? homeOgDescription(SOCIAL_LANG) : cvMetaOgDescription(page, SOCIAL_LANG);
  const title = cvMetaTitle(page, SOCIAL_LANG);

  return {
    title,
    description,
    siteName: cv.basics.name,
    imageAlt: `${title} — portfolio preview`,
  };
}

/** Shared og:* / twitter:* tags — always English, aligned with /og/*.png banners. */
export function socialMetaTags(page: CvMetaPage, url: string) {
  const social = socialPageCopy(page);

  return [
    { property: "og:site_name", content: social.siteName },
    { property: "og:title", content: social.title },
    { property: "og:description", content: social.description },
    { property: "og:url", content: url },
    { property: "og:type", content: page === "home" ? "profile" : "website" },
    { property: "og:locale", content: SOCIAL_LOCALES[0] },
    ...SOCIAL_LOCALES.slice(1).map((locale) => ({
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

export function routeHead(page: CvMetaPage, path: string, options?: RouteHeadOptions) {
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
      { title: cvMetaTitle(page, DEFAULT_LANG) },
      { name: "description", content: cvMetaDescription(page, DEFAULT_LANG) },
      { name: "author", content: cv.basics.name },
      { name: "keywords", content: cvMetaKeywords() },
      { name: "robots", content: robotsContent },
      { name: "googlebot", content: robotsContent },
      ...socialMetaTags(page, url),
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
