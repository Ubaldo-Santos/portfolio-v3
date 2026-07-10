import { createFileRoute, notFound } from "@tanstack/react-router";
import { z } from "zod";

import { OgCard } from "@/components/og/og-card";
import { OG_THEMES, parseOgSize } from "@/lib/og-sizes";

const searchSchema = z.object({
  theme: z.enum(OG_THEMES).default("light"),
});

export const Route = createFileRoute("/og/$size")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: OgCardPage,
});

function OgCardPage() {
  const { size } = Route.useParams();
  const { theme } = Route.useSearch();
  const dimensions = parseOgSize(size);

  if (!dimensions) {
    throw notFound();
  }

  return <OgCard width={dimensions.width} height={dimensions.height} theme={theme} />;
}
