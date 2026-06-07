import { cn } from "@/lib/utils";
import { cv } from "@/data/cv";

type LogoMarkProps = {
  className?: string;
};

/**
 * Monograma propio "US" (Ubaldo Santos) en una forma squircle hairline.
 * Sin dependencias externas, hereda color del contenedor (`currentColor`)
 * y usa el token `--accent` para el punto.
 */
function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden
      focusable="false"
      className={cn("shrink-0 text-[oklch(0.34_0.01_80)] dark:text-[oklch(0.72_0.01_90)]", className)}
    >
      {/* squircle frame */}
      <path
        d="M24 2.5
           C 8.5 2.5, 2.5 8.5, 2.5 24
           S 8.5 45.5, 24 45.5
           S 45.5 39.5, 45.5 24
           S 39.5 2.5, 24 2.5 Z"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.25"
      />
      {/* U */}
      <text
        x="14.5"
        y="26"
        textAnchor="middle"
        fontFamily="Fraunces, ui-serif, Georgia, serif"
        fontWeight="800"
        fontSize="20"
        fill="currentColor"
        style={{ fontVariationSettings: "'opsz' 72, 'SOFT' 0" }}
      >
        u
      </text>
      {/* S (italic, espejo del wordmark) */}
      <text
        x="32"
        y="34"
        textAnchor="middle"
        fontFamily="Fraunces, ui-serif, Georgia, serif"
        fontWeight="750"
        fontStyle="italic"
        fontSize="18"
        fill="currentColor"
        style={{ fontVariationSettings: "'opsz' 72, 'SOFT' 0" }}
      >
        s
      </text>
      {/* acento lime */}
      <circle cx="37.5" cy="13.5" r="1.6" fill="var(--accent)" />
    </svg>
  );
}

type BrandLogoProps = {
  className?: string;
  iconClassName?: string;
  variant?: "nav" | "footer";
};

/** Monograma US + wordmark — header y footer. */
export function BrandLogo({ className, iconClassName, variant = "nav" }: BrandLogoProps) {
  const isFooter = variant === "footer";

  return (
    <span
      className={cn(
        "inline-flex items-center",
        isFooter ? "gap-2.5" : "gap-2",
        className,
      )}
    >
      <LogoMark
        className={cn(
          isFooter ? "size-12" : "size-9 sm:size-10",
          iconClassName,
        )}
      />

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
