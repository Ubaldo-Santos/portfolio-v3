import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { arrowNudge, focusRing } from "./tokens";

const variantClasses = {
  primary:
    "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm text-background transition-all hover:gap-3",
  secondary:
    "inline-flex items-center gap-2 rounded-full border border-hairline bg-background px-4 py-2 text-sm transition-colors hover:bg-surface",
  ghost:
    "inline-flex items-center gap-1.5 px-1 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline",
} as const;

type CtaVariant = keyof typeof variantClasses;

type CtaSharedProps = {
  variant?: CtaVariant;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
};

type CtaButtonAsButton = CtaSharedProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CtaSharedProps> & {
    as?: "button";
  };

type CtaButtonAsAnchor = CtaSharedProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CtaSharedProps> & {
    as: "a";
    href: string;
  };

type CtaButtonAsLink = CtaSharedProps &
  Omit<LinkProps, keyof CtaSharedProps | "children"> & {
    as: typeof Link;
    to: LinkProps["to"];
  };

export type CtaButtonProps = CtaButtonAsButton | CtaButtonAsAnchor | CtaButtonAsLink;

function arrowIcon(variant: CtaVariant) {
  return (
    <ArrowUpRight
      className={cn(variant === "ghost" ? "size-3.5 opacity-60" : "size-4", arrowNudge)}
      aria-hidden
    />
  );
}

export function CtaButton(props: CtaButtonProps) {
  const {
    variant = "primary",
    withArrow = false,
    children,
    className,
    as = "button",
    ...rest
  } = props;

  const classes = cn("group", variantClasses[variant], focusRing, className);

  const content = (
    <>
      {children}
      {withArrow ? arrowIcon(variant) : null}
    </>
  );

  if (as === Link) {
    const { to, ...linkRest } = rest as Omit<CtaButtonAsLink, keyof CtaSharedProps | "as">;
    return (
      <Link to={to} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  if (as === "a") {
    const { href, ...anchorRest } = rest as Omit<CtaButtonAsAnchor, keyof CtaSharedProps | "as">;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  const buttonRest = rest as Omit<CtaButtonAsButton, keyof CtaSharedProps | "as">;
  const { type = "button", ...buttonProps } = buttonRest;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
