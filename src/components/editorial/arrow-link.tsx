import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Children, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { arrowNudge, focusRing } from "./tokens";

const arrowSizes = {
  sm: "size-4",
  md: "size-5 sm:size-6",
} as const;

type ArrowSize = keyof typeof arrowSizes;

type ArrowLinkBase = {
  children?: ReactNode;
  className?: string;
  size?: ArrowSize;
};

type ArrowLinkInternal = ArrowLinkBase &
  Omit<LinkProps, "children" | "className"> & {
    to: LinkProps["to"];
    href?: never;
  };

type ArrowLinkExternal = ArrowLinkBase &
  Omit<React.ComponentPropsWithoutRef<"a">, "children" | "className"> & {
    href: string;
    to?: never;
  };

type ArrowLinkIconOnly = (ArrowLinkInternal | ArrowLinkExternal) & {
  children?: never;
  "aria-label": string;
};

export type ArrowLinkProps = ArrowLinkInternal | ArrowLinkExternal | ArrowLinkIconOnly;

function hasVisibleText(children: ReactNode): boolean {
  return Children.toArray(children).some((child) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child).trim().length > 0;
    }
    if (isValidElement(child)) return true;
    return false;
  });
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function externalAriaLabel(children: ReactNode, explicit?: string): string | undefined {
  if (explicit) return explicit;
  if (typeof children === "string" && children.trim()) {
    return `${children.trim()} (opens in new tab)`;
  }
  return undefined;
}

export function ArrowLink(props: ArrowLinkProps) {
  const { children, className, size = "sm", ...rest } = props;
  const arrowClass = cn(arrowSizes[size], "shrink-0 text-muted-foreground", arrowNudge);

  const linkClass = cn(
    "group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
    focusRing,
    className,
  );

  if (!hasVisibleText(children) && !("aria-label" in props && props["aria-label"])) {
    if (import.meta.env.DEV) {
      console.warn("[ArrowLink] Icon-only links require an aria-label prop.");
    }
  }

  if ("to" in rest && rest.to != null) {
    const { to, ...linkRest } = rest as ArrowLinkInternal;
    return (
      <Link to={to} className={linkClass} {...linkRest}>
        {children}
        <ArrowUpRight className={arrowClass} aria-hidden />
      </Link>
    );
  }

  const { href, ...anchorRest } = rest as ArrowLinkExternal;
  const external = isExternalHref(href);
  const ariaLabel = external
    ? externalAriaLabel(children, anchorRest["aria-label"])
    : anchorRest["aria-label"];

  return (
    <a
      href={href}
      className={linkClass}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...anchorRest}
      aria-label={ariaLabel}
    >
      {children}
      <ArrowUpRight className={arrowClass} aria-hidden />
    </a>
  );
}
