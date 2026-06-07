import type { Lang } from "@/i18n";
import type { LocalizedString } from "@/data/cv";
import { cn } from "@/lib/utils";

type WorkTitleSize = "hero" | "list" | "md";

const sizeClasses: Record<WorkTitleSize, string> = {
  hero: "text-xl leading-snug sm:text-2xl lg:text-3xl",
  list: "text-3xl leading-snug sm:text-4xl",
  md: "text-xl leading-snug",
};

export function WorkTitle({
  name,
  position,
  lang,
  size = "list",
  className,
}: {
  name: string;
  position: LocalizedString;
  lang: Lang;
  size?: WorkTitleSize;
  className?: string;
}) {
  return (
    <span className={cn("text-balance", sizeClasses[size], className)}>
      <span className="font-display">{name}</span>
      <span className="font-display-italic text-muted-foreground"> — {position[lang]}</span>
    </span>
  );
}
