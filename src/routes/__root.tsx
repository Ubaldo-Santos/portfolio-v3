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

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "@/components/i18n-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { PageTransition } from "@/components/page-transition";
import { EasterEgg } from "@/components/easter-egg";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-foreground">404</h1>
        <p className="mt-4 text-muted-foreground">Page not found.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-foreground px-4 py-2 text-sm text-background">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-foreground px-4 py-2 text-sm text-background"
        >
          Try again
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
      { name: "theme-color", content: "#0f0f0f" },
      { title: "Ubaldo Santos Patón — Full-Stack Software Engineer" },
      { name: "description", content: "Portfolio of Ubaldo Santos Patón, full-stack software engineer based in Barcelona. TypeScript, PHP/Laravel, Vue. AI tooling: Copilot, Cursor, OpenRouter, MCP." },
      { name: "author", content: "Ubaldo Santos Patón" },
      { name: "keywords", content: "Ubaldo Santos, Ubaldo Santos Patón, full-stack engineer, TypeScript, PHP, Laravel, Vue, Wiris, Nubric, Barcelona, MathType, AI, Copilot, Cursor, OpenRouter, MCP" },
      { property: "og:site_name", content: "Ubaldo Santos Patón" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_ES" },
      { property: "og:locale:alternate", content: "ca_ES" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:creator", content: "@ubaldosantos" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ubaldo Santos Patón",
          givenName: "Ubaldo",
          familyName: "Santos Patón",
          jobTitle: "Full-Stack Software Engineer",
          email: "u.santospaton@gmail.com",
          telephone: "+34 654 455 339",
          url: "https://ubaldo.is-a.dev",
          worksFor: { "@type": "Organization", name: "Wiris", url: "https://wiris.net" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Barcelona",
            addressCountry: "ES",
          },
          knowsLanguage: ["es", "ca", "en"],
          sameAs: ["https://linkedin.com/in/ubaldo-santos", "https://github.com/usantos-at-wiris"],
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
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
