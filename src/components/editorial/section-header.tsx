import type { ElementType, ReactNode } from "react";
import { SectionIndex } from "@/components/page-shell";
import { kickerLg } from "./tokens";

type HeadingLevel = "h2" | "h3" | "h4";

const headingTags: Record<HeadingLevel, ElementType> = {
  h2: "h2",
  h3: "h3",
  h4: "h4",
};

type SectionHeaderProps = {
  /** Optional kicker above the title (or passed to SectionIndex when `index` is set). */
  label?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  as?: HeadingLevel;
  /** Editorial index — renders `NN //` via SectionIndex (home parity). */
  index?: string;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  as = "h2",
  index,
  className,
}: SectionHeaderProps) {
  const Heading = headingTags[as];

  return (
    <header className={className}>
      {index != null ? (
        <SectionIndex index={index} label={label} />
      ) : label != null ? (
        <div className={kickerLg}>{label}</div>
      ) : null}
      <Heading
        className={
          index != null || label != null ? "mt-3 font-display text-5xl sm:text-6xl" : kickerLg
        }
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
}
