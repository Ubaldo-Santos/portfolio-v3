import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { chipAccent, chipBase, chipStatus } from "./tokens";

const chipVariants = {
  default: chipBase,
  accent: chipAccent,
  status: chipStatus,
} as const;

type ChipVariant = keyof typeof chipVariants;

type ChipProps = {
  children: ReactNode;
  variant?: ChipVariant;
  as?: "span" | "li";
  className?: string;
};

export function Chip({ children, variant = "default", as: Tag = "span", className }: ChipProps) {
  return <Tag className={cn(chipVariants[variant], className)}>{children}</Tag>;
}

type ChipListProps = {
  items: readonly string[];
  variant?: ChipVariant;
  className?: string;
  /** Accessible name for the list when no visible heading is present. */
  label?: string;
};

export function ChipList({ items, variant = "default", className, label }: ChipListProps) {
  return (
    <ul
      className={cn("flex flex-wrap gap-1.5", className)}
      {...(label ? { "aria-label": label } : {})}
    >
      {items.map((item) => (
        <Chip key={item} as="li" variant={variant}>
          {item}
        </Chip>
      ))}
    </ul>
  );
}
