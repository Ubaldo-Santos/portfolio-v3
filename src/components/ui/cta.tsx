import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Unified pill-CTA primitive used across the portfolio. Replaces ad-hoc
 * `rounded-full bg-foreground ...` inline buttons. Three intents only:
 * - primary: solid foreground (one per view, ideally)
 * - outline: bordered, for secondary actions like "Descargar CV"
 * - ghost: text + underline on hover
 */
const ctaVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background hover:opacity-90",
        outline:
          "border border-hairline bg-surface text-foreground hover:bg-background hover:border-foreground/30",
        ghost:
          "text-muted-foreground underline-offset-4 hover:text-foreground hover:underline rounded-none px-1",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    compoundVariants: [
      { variant: "ghost", size: "sm", className: "px-1 py-0" },
      { variant: "ghost", size: "md", className: "px-1 py-0" },
      { variant: "ghost", size: "lg", className: "px-1 py-0" },
    ],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface CtaProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ctaVariants> {
  asChild?: boolean;
}

export const Cta = React.forwardRef<HTMLButtonElement, CtaProps>(
  ({ className, variant, size, asChild, ...rest }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(ctaVariants({ variant, size }), className)}
        {...rest}
      />
    );
  },
);
Cta.displayName = "Cta";

export { ctaVariants };
