import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { cv } from "@/data/cv";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/seo";
import { cvMetaDescription, cvMetaKeywords, cvKnowsAbout } from "@/lib/cv-copy";
import { detectLang } from "@/lib/detect-lang";
import { THEME_BACKGROUND_COLORS } from "@/lib/theme-colors";
import { I18nProvider } from "@/components/i18n-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { PageTransition } from "@/components/page-transition";
import { EasterEgg } from "@/components/easter-egg";
import { Toaster } from "@/components/ui/sonner";
import { VercelAnalytics } from "@/components/vercel-analytics";
import { BOOTSTRAP_SCRIPT } from "@/lib/bootstrap-script";

function NotFoundComponent() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-foreground">404</h1>
        <p className="mt-4 text-muted-foreground">{t("errors.notFound")}</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-foreground px-4 py-2 text-sm text-background"
        >
          {t("errors.goHome")}
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">{t("errors.generic")}</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-foreground px-4 py-2 text-sm text-background"
        >
          {t("errors.tryAgain")}
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const lang = detectLang();
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "robots",
          content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        {
          name: "googlebot",
          content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "author", content: cv.basics.name },
        { name: "keywords", content: cvMetaKeywords() },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", href: "/code-sandbox.svg", type: "image/svg+xml" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
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
            jobTitle: cv.basics.label[lang],
            description: cvMetaDescription("home", lang),
            email: cv.basics.email,
            telephone: cv.basics.phone,
            url: cv.basics.url,
            image: OG_IMAGE_URL,
            worksFor: { "@type": "Organization", name: cv.work[0].name, url: cv.work[0].url },
            address: {
              "@type": "PostalAddress",
              addressLocality: cv.basics.address.locality,
              addressCountry: cv.basics.address.countryCode,
            },
            knowsLanguage: cv.languages.map((language) => language.code),
            knowsAbout: [...cvKnowsAbout(lang)],
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
            name: cv.basics.name,
            description: cvMetaDescription("home", lang),
            inLanguage: ["es", "ca", "en"],
            publisher: { "@id": `${cv.basics.url}#person` },
          }),
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const lang = detectLang();

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP_SCRIPT }} />
        {/* Raw tags: TanStack dedupes head() meta by `name`, collapsing the two theme-color entries. */}
        <meta
          name="theme-color"
          content={THEME_BACKGROUND_COLORS.light}
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content={THEME_BACKGROUND_COLORS.dark}
          media="(prefers-color-scheme: dark)"
        />
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isOgPreview = pathname.startsWith("/og/");

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        {!isOgPreview ? <SkipLink /> : null}
        {!isOgPreview ? <CustomCursor /> : null}
        {!isOgPreview ? <EasterEgg /> : null}
        {!isOgPreview ? <Toaster position="bottom-right" /> : null}
        <VercelAnalytics />
        <div className={isOgPreview ? "min-h-dvh" : "flex min-h-dvh flex-col"}>
          {!isOgPreview ? <Header /> : null}
          <main id="main" className={isOgPreview ? undefined : "flex-1"}>
            <PageTransition />
          </main>
          {!isOgPreview ? <Footer /> : null}
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
