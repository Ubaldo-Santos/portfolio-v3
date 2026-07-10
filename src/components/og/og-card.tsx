import { cv } from "@/data/cv";
import codeSandboxLogo from "@/components/logo/code-sandbox.svg?url";
import { cn } from "@/lib/utils";
import { ogCopy } from "@/lib/og-copy";
import { OG_LANG, type OgTheme } from "@/lib/og-sizes";
import { OG_PALETTE, OG_TYPE, ogGap, ogGlowBackground, ogPx, ogScale } from "@/lib/og-theme";

type OgCardProps = {
  width: number;
  height: number;
  theme: OgTheme;
};

/** Browser OG preview — same layout at every size; content scales to the canvas. */
export function OgCard({ width, height, theme }: OgCardProps) {
  const copy = ogCopy(OG_LANG);
  const colors = OG_PALETTE[theme];
  const isSquare = height >= width * 0.95;
  const scale = ogScale(width, height);
  const padX = ogPx(48, width, height);
  const padY = ogPx(40, width, height);

  return (
    <div
      data-og-ready="true"
      data-og-card
      data-og-theme={theme}
      className="relative overflow-hidden font-sans"
      style={{ width, height, backgroundColor: colors.background, color: colors.foreground }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: ogGlowBackground(width, height, theme) }}
      />

      <div
        className="relative flex h-full min-h-0 flex-col"
        style={{ padding: `${padY}px ${padX}px` }}
      >
        <div className="flex shrink-0 justify-end">
          <img
            src={codeSandboxLogo}
            alt=""
            aria-hidden
            width={ogPx(OG_TYPE.logo, width, height)}
            height={ogPx(OG_TYPE.logo, width, height)}
            className="shrink-0"
            style={{ filter: colors.logoFilter }}
          />
        </div>

        <div
          className={cn("flex min-h-0 flex-1 flex-col justify-center", isSquare ? "pt-4" : "pt-0")}
          style={{ maxWidth: isSquare ? "100%" : "92%" }}
        >
          <p
            className="font-display leading-[0.88]"
            style={{
              fontSize: ogPx(OG_TYPE.name, width, height),
              color: colors.foreground,
            }}
          >
            <span className="block">{cv.basics.givenName}</span>
            <span
              className="font-display-italic block"
              style={{
                fontSize: ogPx(OG_TYPE.surname, width, height),
                color: colors.muted,
              }}
            >
              {cv.basics.familyName}
            </span>
          </p>

          <div
            style={{
              marginTop: ogGap(28, width, height),
              marginBottom: ogGap(24, width, height),
              height: Math.max(1, Math.round(2 * scale)),
              width: "100%",
              backgroundColor: colors.hairline,
            }}
          />

          <p
            className="font-display text-balance"
            style={{
              fontSize: ogPx(OG_TYPE.lead, width, height),
              lineHeight: 1.15,
              color: colors.foreground,
            }}
          >
            {copy.lead}
          </p>

          <p
            className="font-display text-balance"
            style={{
              marginTop: ogGap(12, width, height),
              fontSize: ogPx(OG_TYPE.detail, width, height),
              lineHeight: 1.2,
              color: colors.detailMuted,
            }}
          >
            {copy.detail}
          </p>

          <p
            className="font-mono uppercase tracking-[0.14em]"
            style={{
              marginTop: ogGap(14, width, height),
              fontSize: ogPx(OG_TYPE.tech, width, height),
              lineHeight: 1.25,
              color: colors.muted,
            }}
          >
            {copy.stack}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p
            className="font-mono tracking-tight"
            style={{
              fontSize: ogPx(OG_TYPE.contact, width, height),
              lineHeight: 1.2,
              color: colors.accent,
            }}
          >
            <span>{copy.linkedIn}</span>
            <span style={{ color: colors.muted }}> · </span>
            <span>{copy.site}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
