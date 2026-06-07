import { cn } from "@/lib/utils";
import { cv } from "@/data/cv";
import { Monogram } from "./monogram";

type BrandLogoProps = {
  className?: string;
  iconClassName?: string;
  variant?: "nav" | "footer";
};

/** Monogram + name lockup. Tokens only — no hardcoded colors. */
export function BrandLogo({ className, iconClassName, variant = "nav" }: BrandLogoProps) {
  const isFooter = variant === "footer";

  return (
    <span
      className={cn(
        "inline-flex items-center text-foreground",
        isFooter ? "gap-3" : "gap-2.5",
        className,
      )}
    >
      <Monogram
        className={cn(
          isFooter ? "size-12" : "size-9",
          iconClassName,
        )}
      />

      <span
        className={cn(
          "flex min-w-0 flex-col leading-none",
          isFooter ? "" : "hidden sm:flex",
        )}
      >
        <span
          className={cn(
            "font-display tracking-tight",
            isFooter ? "text-2xl" : "text-base",
          )}
        >
          {cv.basics.givenName}
        </span>
        <span
          className={cn(
            "font-display-italic text-muted-foreground",
            isFooter ? "mt-0.5 text-xl" : "mt-0.5 text-sm",
          )}
        >
          {cv.basics.familyName}
        </span>
      </span>
    </span>
  );
}
