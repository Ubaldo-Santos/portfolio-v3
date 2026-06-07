import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { cv } from "@/data/cv";
import { BRAND_MARK_URL } from "@/lib/seo";
import { translations } from "@/i18n/translations";
import { I18nProvider } from "@/components/i18n-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { PageTransition } from "@/components/page-transition";
import { EasterEgg } from "@/components/easter-egg";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  const copy = translations.es.errors;

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-foreground">404</h1>
        <p className="mt-4 text-muted-foreground">{copy.notFound}</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-foreground px-4 py-2 text-sm text-background"
        >
          {copy.goHome}
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  const copy = translations.es.errors;
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">{copy.generic}</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-foreground px-4 py-2 text-sm text-background"
        >
          {copy.tryAgain}
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#000000" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "format-detection", content: "telephone=no" },
      { title: translations.es.meta.home.title },
      { name: "description", content: translations.es.meta.home.description },
      { name: "author", content: translations.es.meta.author },
      { name: "keywords", content: translations.es.meta.keywords },
      { property: "og:site_name", content: translations.es.meta.siteName },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_ES" },
      { property: "og:locale:alternate", content: "ca_ES" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:creator", content: "@ubaldosantos" },
      { name: "twitter:image", content: BRAND_MARK_URL },
      { property: "og:image", content: BRAND_MARK_URL },
      { property: "og:image:type", content: "image/svg+xml" },
      { property: "og:image:alt", content: translations.es.meta.siteName },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/code-sandbox.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/code-sandbox.svg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${cv.basics.url}#person`,
          name: cv.basics.name,
          givenName: cv.basics.givenName,
          familyName: cv.basics.familyName,
          jobTitle: cv.basics.label.en,
          description: translations.es.meta.home.description,
          email: cv.basics.email,
          telephone: cv.basics.phone,
          url: cv.basics.url,
          image: BRAND_MARK_URL,
          worksFor: { "@type": "Organization", name: cv.work[0].name, url: cv.work[0].url },
          address: {
            "@type": "PostalAddress",
            addressLocality: cv.basics.address.locality,
            addressCountry: cv.basics.address.countryCode,
          },
          knowsLanguage: cv.languages.map((language) => language.code),
          knowsAbout: [
            "TypeScript",
            "PHP",
            "Laravel",
            "Vue",
            "React",
            "Edtech",
            "MathType",
            "Nubric",
            "Arquitectura hexagonal",
            "DevOps",
            "IA aplicada",
          ],
          sameAs: cv.basics.profiles.map((profile) => profile.url),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${cv.basics.url}#website`,
          url: cv.basics.url,
          name: translations.es.meta.siteName,
          description: translations.es.meta.home.description,
          inLanguage: ["es", "ca", "en"],
          publisher: { "@id": `${cv.basics.url}#person` },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <SkipLink />
        <CustomCursor />
        <EasterEgg />
        <Toaster position="bottom-right" />
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main id="main" className="flex-1">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </main>
          <Footer />
        </div>
      </I18nProvider>
    </QueryClientProvider>
  );
}

function SkipLink() {
  const { t } = useTranslation();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
    >
      {t("a11y.skipToContent")}
    </a>
  );
}
