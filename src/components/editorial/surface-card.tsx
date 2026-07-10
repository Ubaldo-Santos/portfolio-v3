import { Link, type LinkProps } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { cardAccentFeature, cardFeature, cardPadding, cardSurface, focusRing } from "./tokens";

type CardPadding = keyof typeof cardPadding;

const variantClasses = {
  surface: cardSurface,
  feature: cardFeature,
  accentFeature: cardAccentFeature,
} as const;

type SurfaceVariant = keyof typeof variantClasses;

function AccentWash() {
  return (
    <div
      className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-accent/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
      aria-hidden
    />
  );
}

type SurfaceCardShared = {
  variant?: SurfaceVariant;
  padding?: CardPadding;
  wash?: boolean;
  children: ReactNode;
  className?: string;
};

type SurfaceCardAsDiv = SurfaceCardShared &
  ComponentPropsWithoutRef<"div"> & {
    as?: "div" | "article";
  };

type SurfaceCardAsAnchor = SurfaceCardShared &
  ComponentPropsWithoutRef<"a"> & {
    as: "a";
    href: string;
  };

type SurfaceCardAsLink = SurfaceCardShared &
  Omit<LinkProps, "children" | "className"> & {
    as: typeof Link;
    to: LinkProps["to"];
  };

export type SurfaceCardProps = SurfaceCardAsDiv | SurfaceCardAsAnchor | SurfaceCardAsLink;

function isInteractive(as: SurfaceCardProps["as"]): boolean {
  return as === "a" || as === Link;
}

export function SurfaceCard(props: SurfaceCardProps) {
  const {
    variant = "surface",
    padding = "md",
    wash = false,
    children,
    className,
    as = "div",
    ...rest
  } = props;

  const interactive = isInteractive(as);
  const classes = cn(
    variantClasses[variant],
    cardPadding[padding],
    wash && "group relative overflow-hidden",
    interactive && "group transition-colors hover:bg-surface",
    interactive && focusRing,
    className,
  );

  const content = (
    <>
      {wash ? <AccentWash /> : null}
      {children}
    </>
  );

  if (as === Link) {
    const { to, ...linkRest } = rest as Omit<SurfaceCardAsLink, keyof SurfaceCardShared | "as">;
    return (
      <Link to={to} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  if (as === "a") {
    const { href, ...anchorRest } = rest as Omit<
      SurfaceCardAsAnchor,
      keyof SurfaceCardShared | "as"
    >;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  const Tag = as === "article" ? "article" : "div";
  const tagRest = rest as Omit<SurfaceCardAsDiv, keyof SurfaceCardShared | "as">;

  return (
    <Tag className={classes} {...tagRest}>
      {content}
    </Tag>
  );
}
