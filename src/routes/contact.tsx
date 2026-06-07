import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Printer, ArrowUpRight, Copy, Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cv } from "@/data/cv";
import { currentLang } from "@/lib/format";
import { routeHead } from "@/lib/seo";
import { Reveal } from "@/components/reveal";
import { PageHeader, PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/contact")({
  head: () => routeHead("contact", "/contact"),
  component: ContactPage,
});

function ContactPage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);

  return (
    <PageShell>
      <PageHeader page="contact" subtitle={t("contact.subtitle")} />

      {/* Primary email — full-width feature card */}
      <Reveal delay={0.04}>
        <div className="group relative mt-12 overflow-hidden rounded-3xl border border-hairline bg-surface/40 p-8 sm:p-12">
          <div
            className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
            aria-hidden
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {t("contact.ctaEmail")}
              </div>
              <a
                href={`mailto:${cv.basics.email}`}
                className="mt-3 flex items-center gap-3 break-all font-display text-3xl underline-offset-4 hover:underline sm:text-5xl"
              >
                {cv.basics.email}
                <ArrowUpRight className="size-7 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="mt-4 max-w-md text-sm text-muted-foreground">
                {t("contact.availability")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <a
                href={`mailto:${cv.basics.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-background hover:opacity-90"
              >
                <Mail className="size-4" /> {t("actions.writeMe")}
              </a>
              <CopyButton
                value={cv.basics.email}
                label={t("actions.copy")}
                doneLabel={t("actions.copied")}
              />
            </div>
          </div>
        </div>
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
      <section className="mt-16">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {t("contact.social")}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t("contact.preferred")}</p>
        </Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {cv.basics.profiles.map((p, i) => (
            <Reveal key={p.network} delay={i * 0.04}>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full items-center justify-between rounded-2xl border border-hairline bg-surface/40 p-5 transition-colors hover:bg-surface"
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
                <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
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
  const base =
    "group flex h-full min-h-[112px] flex-col justify-between rounded-2xl border p-5 transition-colors";
  const variant = highlight
    ? "border-foreground bg-foreground text-background hover:opacity-90"
    : "border-hairline bg-surface/40 hover:bg-surface";
  const cls = `${base} ${variant}`;

  const body = (
    <>
      <div
        className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest ${
          highlight ? "text-background/80" : "text-muted-foreground"
        }`}
      >
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <span className="font-display text-lg leading-tight">{value}</span>
        {action && (
          <span
            className={`font-mono text-[10px] uppercase tracking-widest ${
              highlight ? "text-background/80" : "text-muted-foreground"
            }`}
          >
            {action}
          </span>
        )}
      </div>
    </>
  );

  if (As && to) {
    return (
      <As to={to} className={cls}>
        {body}
      </As>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls}>
        {body}
      </a>
    );
  }
  return <div className={cls}>{body}</div>;
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
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          window.setTimeout(() => setDone(false), 1500);
        } catch {
          /* ignore */
        }
      }}
      className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background px-4 py-2 text-sm transition-colors hover:bg-surface"
      aria-label={label}
    >
      {done ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
      {done ? doneLabel : label}
    </button>
  );
}
