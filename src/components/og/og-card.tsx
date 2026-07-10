import { cv } from "@/data/cv";
import { translations } from "@/i18n/translations";
import codeSandboxLogo from "@/components/logo/code-sandbox.svg?url";
import { cn } from "@/lib/utils";
import type { OgTheme } from "@/lib/og-sizes";

type OgCardProps = {
  width: number;
  height: number;
  theme: OgTheme;
};

const DEFAULT_LANG = "es" as const;

/** Tech labels shown on OG cards — mirrors the landing ribbon subset. */
const OG_TECH_ITEMS = cv.skills.ribbon.slice(0, 8);

const PALETTE = {
  light: {
    background: "#FAFAF8",
    foreground: "#2D2A26",
    muted: "#6B6660",
    hairline: "#E0DDD8",
    accentA: "rgba(200, 240, 50, 0.2)",
    accentB: "rgba(200, 240, 50, 0.08)",
    logoFilter: undefined,
  },
  dark: {
    background: "#1F1E1C",
    foreground: "#F5F4F2",
    muted: "#A8A5A0",
    hairline: "#3A3835",
    accentA: "rgba(200, 240, 50, 0.22)",
    accentB: "rgba(200, 240, 50, 0.1)",
    logoFilter: "invert(1)",
  },
} as const;

export function OgCard({ width, height, theme }: OgCardProps) {
  const lang = DEFAULT_LANG;
  const meta = translations[lang].meta;
  const colors = PALETTE[theme];
  const isSquare = height >= width * 0.95;
  const scale = Math.min(width / 1200, height / (isSquare ? 1200 : 630));
  const logoSize = Math.round(Math.max(48, Math.min(88, 72 * scale)));
  const nameSize = Math.round(Math.max(52, Math.min(112, 96 * scale)));
  const surnameSize = Math.round(Math.max(40, Math.min(88, 76 * scale)));

  return (
    <div
      data-og-ready="true"
      data-og-card
      data-og-theme={theme}
      className="relative overflow-hidden"
      style={{ width, height, backgroundColor: colors.background, color: colors.foreground }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full blur-[120px]"
        style={{
          top: "-18%",
          right: "-12%",
          width: width * 0.55,
          height: width * 0.55,
          backgroundColor: colors.accentA,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full blur-[100px]"
        style={{
          bottom: "-8%",
          left: "-14%",
          width: width * 0.42,
          height: width * 0.42,
          backgroundColor: colors.accentB,
        }}
      />

      <div
        className="relative flex h-full flex-col"
        style={{ padding: `${Math.round(40 * scale)}px ${Math.round(48 * scale)}px` }}
      >
        <div className="flex justify-end">
          <img
            src={codeSandboxLogo}
            alt=""
            aria-hidden
            width={logoSize}
            height={logoSize}
            className="shrink-0"
            style={{ filter: colors.logoFilter }}
          />
        </div>

        <div
          className={cn("flex flex-1 flex-col justify-center", isSquare ? "pt-6" : "pt-2")}
          style={{ maxWidth: isSquare ? "100%" : "78%" }}
        >
          <p
            className="font-display leading-[0.88] tracking-tight"
            style={{ fontSize: nameSize, color: colors.foreground }}
          >
            <span className="block">{cv.basics.givenName}</span>
            <span className="font-display-italic block" style={{ color: colors.muted }}>
              {cv.basics.familyName}
            </span>
          </p>

          <div
            style={{
              marginTop: Math.round(28 * scale),
              marginBottom: Math.round(24 * scale),
              height: 1,
              width: "100%",
              backgroundColor: colors.hairline,
            }}
          />

          <p
            className="font-display leading-snug text-balance"
            style={{
              fontSize: Math.round(Math.max(16, Math.min(28, 22 * scale))),
              color: colors.foreground,
            }}
          >
            {cv.basics.tagline.lead[lang]}
          </p>

          <p
            className="font-display leading-snug text-balance"
            style={{
              marginTop: Math.round(12 * scale),
              fontSize: Math.round(Math.max(14, Math.min(24, 18 * scale))),
              color: colors.muted,
            }}
          >
            {cv.basics.label[lang]} · {meta.siteName}
          </p>

          <p
            className="font-mono uppercase tracking-[0.22em]"
            style={{
              marginTop: Math.round(16 * scale),
              fontSize: Math.round(Math.max(9, Math.min(13, 11 * scale))),
              color: colors.muted,
            }}
          >
            {OG_TECH_ITEMS.join(" · ")}
          </p>
        </div>

        <div className="flex justify-end">
          <p
            className="font-mono uppercase tracking-[0.18em]"
            style={{
              fontSize: Math.round(Math.max(11, Math.min(16, 13 * scale))),
              color: colors.muted,
            }}
          >
            {cv.basics.url.replace(/^https?:\/\//, "")}
          </p>
        </div>
      </div>
    </div>
  );
}
