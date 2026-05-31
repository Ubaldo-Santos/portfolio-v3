import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Printer, ArrowUpRight } from "lucide-react";
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
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">04</div>
        <h1 className="mt-2 font-display text-7xl leading-[0.95] sm:text-[10rem]">{t("contact.title")}</h1>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">{t("contact.subtitle")}</p>
      </Reveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <a
            href={`mailto:${cv.basics.email}`}
            className="group block rounded-3xl border border-hairline bg-surface/40 p-8 transition-colors hover:bg-surface sm:p-12"
          >
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{t("contact.ctaEmail")}</div>
            <div className="mt-4 flex items-center gap-3 font-display text-3xl break-all sm:text-5xl">
              {cv.basics.email}
              <ArrowUpRight className="size-7 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-6">
            <Row icon={<Mail className="size-4" />} label={t("contact.email")} value={cv.basics.email} href={`mailto:${cv.basics.email}`} />
            <Row icon={<Phone className="size-4" />} label={t("contact.phone")} value={cv.basics.phone} href={`tel:${cv.basics.phone.replace(/\s/g, "")}`} />
            <Row icon={<MapPin className="size-4" />} label={t("contact.location")} value={cv.basics.location[lang]} />
            <div className="pt-4">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{t("contact.social")}</div>
              <div className="mt-3 flex flex-col gap-2">
                {cv.basics.profiles.map((p) => (
                  <a key={p.network} href={p.url} target="_blank" rel="noreferrer" className="flex items-center justify-between border-b border-hairline py-2 hover:text-foreground">
                    <span>{p.network}</span>
                    <span className="font-mono text-xs text-muted-foreground">@{p.username}</span>
                  </a>
                ))}
              </div>
            </div>
            <Link to="/cv" className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-background">
              <Printer className="size-4" /> {t("actions.printCv")}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Row({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-lg">{value}</div>
    </>
  );
  return href ? (
    <a href={href} className="block hover:text-foreground">{inner}</a>
  ) : (
    <div>{inner}</div>
  );
}
