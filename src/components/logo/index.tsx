import { cn } from "@/lib/utils";
import { cv } from "@/data/cv";
import codeSandboxLogo from "./code-sandbox.svg?url";

type LogoMarkProps = {
  className?: string;
};

function LogoMark({ className }: LogoMarkProps) {
  return (
    <img
      src={codeSandboxLogo}
      alt=""
      aria-hidden
      width={1024}
      height={1024}
      decoding="async"
      className={cn("shrink-0 dark:invert", className)}
    />
  );
}

type BrandLogoProps = {
  className?: string;
  iconClassName?: string;
  variant?: "nav" | "footer";
};

/** CodeSandbox mark + name lockup — header and footer only. */
export function BrandLogo({ className, iconClassName, variant = "nav" }: BrandLogoProps) {
  const isFooter = variant === "footer";

  return (
    <span className={cn("inline-flex items-center", isFooter ? "gap-1.5" : "gap-1", className)}>
      <LogoMark className={cn(isFooter ? "size-14" : "size-11 sm:size-12", iconClassName)} />

      <span className="flex min-w-0 flex-col text-[oklch(0.34_0.01_80)] dark:text-[oklch(0.72_0.01_90)]">
        <span
          className={cn(
            "font-display leading-none tracking-tight [font-weight:800] [font-variation-settings:'opsz'_72,'SOFT'_0]",
            isFooter ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl",
          )}
        >
          {cv.basics.givenName}
        </span>
        <span
          className={cn(
            "font-display-italic leading-none [font-weight:750] [font-variation-settings:'opsz'_72,'SOFT'_0]",
            isFooter
              ? "-mt-1.5 text-2xl sm:-mt-2 sm:text-3xl"
              : "-mt-1 text-lg sm:-mt-1.5 sm:text-xl",
          )}
        >
          {cv.basics.familyName}
        </span>
      </span>
    </span>
  );
}
