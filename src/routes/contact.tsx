import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Printer, ArrowUpRight, Copy, Check, AtSign } from "lucide-react";
import { useState } from "react";
import { cv } from "@/data/cv";
import { currentLang } from "@/lib/format";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ubaldo Santos" },
      { name: "description", content: "Get in touch with Ubaldo Santos: email, phone and social profiles." },
      { property: "og:title", content: "Contact — Ubaldo Santos" },
      { property: "og:description", content: "Let's talk." },
      { property: "og:url", content: "https://ubaldo.is-a.dev/contact" },
    ],
    links: [{ rel: "canonical", href: "https://ubaldo.is-a.dev/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">06</div>
        <h1 className="mt-2 font-display text-7xl leading-[0.95] sm:text-[9rem]">
          {t("contact.title")}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">{t("contact.subtitle")}</p>
      </Reveal>

      {/* Primary email block */}
      <div className="mt-16 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface/40 p-8 sm:p-12">
            <div className="absolute -right-16 -top-16 size-56 rounded-full bg-accent/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80" aria-hidden />
            <div className="relative">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {t("contact.ctaEmail")}
              </div>
              <a
                href={`mailto:${cv.basics.email}`}
                className="mt-4 flex items-center gap-3 break-all font-display text-3xl underline-offset-4 hover:underline sm:text-5xl"
              >
                {cv.basics.email}
                <ArrowUpRight className="size-7 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <div className="mt-6 flex flex-wrap gap-2">
                <CopyButton value={cv.basics.email} label={t("actions.copy")} doneLabel={t("actions.copied")} />
                <a
                  href={`mailto:${cv.basics.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-background"
                >
                  <Mail className="size-4" /> {t("actions.writeMe")}
                </a>
              </div>
              <p className="mt-6 max-w-md text-sm text-muted-foreground">{t("contact.availability")}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-3">
            <ContactCard
              icon={<Phone className="size-4" />}
              label={t("contact.phone")}
              value={cv.basics.phone}
              href={`tel:${cv.basics.phone.replace(/\s/g, "")}`}
              actionLabel={t("actions.callMe")}
            />
            <ContactCard
              icon={<MapPin className="size-4" />}
              label={t("contact.location")}
              value={cv.basics.location[lang]}
            />
            <Link
              to="/cv"
              className="group flex items-center justify-between rounded-2xl border border-hairline bg-foreground p-4 text-background"
            >
              <span className="flex items-center gap-3">
                <Printer className="size-4" />
                <span className="text-sm font-medium uppercase tracking-wider">{t("actions.printCv")}</span>
              </span>
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Social */}
      <Reveal delay={0.1}>
        <section className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {t("contact.social")}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t("contact.preferred")}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {cv.basics.profiles.map((p) => (
              <a
                key={p.network}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-hairline bg-surface/40 p-5 transition-colors hover:bg-surface"
              >
                <div className="flex items-center gap-3">
                  <span aria-hidden className="grid size-9 place-items-center rounded-full border border-hairline bg-background font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {p.network.slice(0, 2)}
                  </span>
                  <div>
                    <div className="font-display text-xl">{p.network}</div>
                    <div className="font-mono text-xs text-muted-foreground">@{p.username}</div>
                  </div>
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  actionLabel,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  actionLabel?: string;
}) {
  const body = (
    <>
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 flex items-center justify-between gap-3">
        <span className="text-lg">{value}</span>
        {href && actionLabel && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {actionLabel} →
          </span>
        )}
      </div>
    </>
  );
  const cls = "rounded-2xl border border-hairline bg-surface/40 p-4";
  return href ? (
    <a href={href} className={`${cls} block hover:bg-surface`}>{body}</a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function CopyButton({ value, label, doneLabel }: { value: string; label: string; doneLabel: string }) {
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
