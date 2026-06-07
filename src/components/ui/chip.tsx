import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Unified chip primitive. Replaces all inline pill/tag/status snippets across
 * the portfolio. Two intents only: neutral (data) and active (live state).
 * Active variant uses an accent dot — the lime is a *punto*, never a fill.
 */
const chipVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-hairline transition-colors",
  {
    variants: {
      variant: {
        neutral: "bg-transparent text-foreground",
        soft: "bg-surface text-foreground",
        muted: "bg-transparent text-muted-foreground",
        active: "bg-transparent text-foreground",
      },
      size: {
        xs: "px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest",
        sm: "px-2.5 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: { variant: "neutral", size: "sm" },
  },
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {
  asChild?: boolean;
  /** When set on `active`, renders a tiny lime dot before the children. */
  dot?: boolean;
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, variant, size, dot, children, ...rest }, ref) => {
    const showDot = dot ?? variant === "active";
    return (
      <span ref={ref} className={cn(chipVariants({ variant, size }), className)} {...rest}>
        {showDot ? (
          <span
            aria-hidden
            className="size-1.5 shrink-0 rounded-full bg-accent"
          />
        ) : null}
        {children}
      </span>
    );
  },
);
Chip.displayName = "Chip";

export { chipVariants };
