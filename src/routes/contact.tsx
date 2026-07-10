import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Printer, ArrowUpRight, Copy, Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cv } from "@/data/cv";
import { currentLang } from "@/lib/format";
import { cvPageSubtitle, cvContactCopy } from "@/lib/cv-copy";
import { routeHead, seoBreadcrumbs } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { PageHeader, PageShell, pageLeadClass } from "@/components/page-shell";
import { MotionPage } from "@/components/page-transition";
import {
  CtaButton,
  MetaLabel,
  SectionHeader,
  SurfaceCard,
  arrowNudge,
  kickerMd,
  sectionGap,
} from "@/components/editorial";

export const Route = createFileRoute("/contact")({
  head: () => routeHead("contact", "/contact", { breadcrumbs: seoBreadcrumbs("contact") }),
  component: ContactPage,
});

function ContactPage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);

  return (
    <MotionPage>
      <PageShell>
        <PageHeader page="contact" subtitle={cvPageSubtitle("contact", lang)} />

        {/* Primary email — full-width feature card */}
        <Reveal delay={0.04}>
          <SurfaceCard variant="feature" padding="lg" wash className={pageLeadClass}>
            <div className="relative grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end">
              <div>
                <MetaLabel>{t("contact.ctaEmail")}</MetaLabel>
                <a
                  href={`mailto:${cv.basics.email}`}
                  className="group mt-3 flex items-center gap-3 break-all font-display text-3xl underline-offset-4 hover:underline sm:text-5xl"
                >
                  {cv.basics.email}
                  <ArrowUpRight
                    className={cn("size-7 shrink-0 text-muted-foreground", arrowNudge)}
                    aria-hidden
                  />
                </a>
                <p className="mt-4 max-w-md text-sm text-muted-foreground">
                  {cvContactCopy("availability", lang)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <CtaButton as="a" href={`mailto:${cv.basics.email}`} variant="primary">
                  <Mail className="size-4" /> {t("actions.writeMe")}
                </CtaButton>
                <CopyButton
                  value={cv.basics.email}
                  label={t("actions.copy")}
                  doneLabel={t("actions.copied")}
                />
              </div>
            </div>
          </SurfaceCard>
        </Reveal>

        {/* Quick info — uniform 3-up grid */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Reveal delay={0.06}>
            <InfoCard
              icon={<Phone className="size-4" />}
              label={t("contact.phone")}
              value={cv.basics.phone}
              href={`tel:${cv.basics.phone.replace(/\s/g, "")}`}
              action={t("actions.callMe")}
            />
          </Reveal>
          <Reveal delay={0.09}>
            <InfoCard
              icon={<MapPin className="size-4" />}
              label={t("contact.location")}
              value={cv.basics.location[lang]}
            />
          </Reveal>
          <Reveal delay={0.12}>
            <InfoCard
              as={Link}
              to="/cv"
              icon={<Printer className="size-4" />}
              label={t("cv.title")}
              value={t("actions.printCv")}
              action="→"
              highlight
            />
          </Reveal>
        </div>

        {/* Social — uniform 2-up grid */}
        <section className={sectionGap.md}>
          <Reveal>
            <SectionHeader
              title={t("contact.social")}
              description={cvContactCopy("preferred", lang)}
            />
          </Reveal>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {cv.basics.profiles.map((p, i) => (
              <Reveal key={p.network} delay={i * 0.04}>
                <SurfaceCard
                  as="a"
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  variant="surface"
                  padding="sm"
                  className="flex h-full items-center justify-between"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-hairline bg-background font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {p.network.slice(0, 2)}
                    </span>
                    <span>
                      <span className="block font-display text-xl leading-tight">{p.network}</span>
                      <span className="block font-mono text-xs text-muted-foreground">
                        @{p.username}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    className={cn("size-5 text-muted-foreground", arrowNudge)}
                    aria-hidden
                  />
                </SurfaceCard>
              </Reveal>
            ))}
          </div>
        </section>
      </PageShell>
    </MotionPage>
  );
}

/** Uniform info card. Same height, padding, radius across the row. */
function InfoCard({
  as: As,
  icon,
  label,
  value,
  action,
  href,
  to,
  highlight,
}: {
  as?: typeof Link;
  icon: ReactNode;
  label: string;
  value: string;
  action?: string;
  href?: string;
  to?: string;
  highlight?: boolean;
}) {
  const body = (
    <>
      <div className={cn(kickerMd, "flex items-center gap-2")}>
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <span className="font-display text-lg leading-tight">{value}</span>
        {action ? (
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {action}
          </span>
        ) : null}
      </div>
    </>
  );

  const cardClass = cn(
    "flex h-full min-h-[112px] flex-col justify-between",
    highlight && "border-accent/50 bg-accent/10 hover:bg-accent/15",
  );

  if (As && to) {
    return (
      <SurfaceCard as={Link} to={to} variant="surface" padding="sm" className={cardClass}>
        {body}
      </SurfaceCard>
    );
  }
  if (href) {
    return (
      <SurfaceCard as="a" href={href} variant="surface" padding="sm" className={cardClass}>
        {body}
      </SurfaceCard>
    );
  }
  return (
    <SurfaceCard variant="surface" padding="sm" className={cardClass}>
      {body}
    </SurfaceCard>
  );
}

function CopyButton({
  value,
  label,
  doneLabel,
}: {
  value: string;
  label: string;
  doneLabel: string;
}) {
  const { t } = useTranslation();
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  const [liveMessage, setLiveMessage] = useState("");

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      /* fall through to legacy copy */
    }

    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  };

  return (
    <>
      <CtaButton
        variant="secondary"
        aria-label={label}
        onClick={async () => {
          const ok = await copyToClipboard(value);
          if (ok) {
            setFailed(false);
            setDone(true);
            setLiveMessage(t("a11y.copySuccess"));
            window.setTimeout(() => setDone(false), 1500);
            return;
          }

          setDone(false);
          setFailed(true);
          setLiveMessage(t("a11y.copyFailed"));
          window.setTimeout(() => setFailed(false), 2000);
        }}
      >
        {done ? (
          <Check className="size-4 text-accent" aria-hidden />
        ) : failed ? (
          <Copy className="size-4 text-destructive" aria-hidden />
        ) : (
          <Copy className="size-4" aria-hidden />
        )}
        {done ? doneLabel : failed ? t("a11y.copyFailed") : label}
      </CtaButton>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </span>
    </>
  );
}
