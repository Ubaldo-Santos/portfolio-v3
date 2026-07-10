import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { kickerSm } from "./tokens";

const metaSizes = {
  sm: kickerSm,
  md: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
} as const;

type MetaSize = keyof typeof metaSizes;

type MetaLabelProps = {
  children: ReactNode;
  icon?: LucideIcon;
  size?: MetaSize;
  className?: string;
};

export function MetaLabel({ children, icon: Icon, size = "md", className }: MetaLabelProps) {
  return (
    <div className={cn(metaSizes[size], className)}>
      {Icon ? (
        <span className="inline-flex items-center gap-1 normal-case">
          <Icon className="size-3" aria-hidden />
          {children}
        </span>
      ) : (
        children
      )}
    </div>
  );
}
