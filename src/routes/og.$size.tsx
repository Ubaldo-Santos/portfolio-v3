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
    style: [
      {
        children:
          "html,body{margin:0;padding:0;overflow:hidden;height:100%;background:transparent}",
      },
    ],
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
