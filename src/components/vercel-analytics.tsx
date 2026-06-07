import { Analytics } from "@vercel/analytics/react";
import { useRouterState } from "@tanstack/react-router";

/** Vercel Web Analytics with TanStack Router client navigations. */
export function VercelAnalytics() {
  const { pathname, routeId } = useRouterState({
    select: (state) => ({
      pathname: state.location.pathname,
      routeId: state.matches.at(-1)?.routeId ?? state.location.pathname,
    }),
  });

  return <Analytics route={routeId} path={pathname} />;
}
