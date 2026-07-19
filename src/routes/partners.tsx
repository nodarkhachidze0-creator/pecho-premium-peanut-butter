import { createFileRoute } from "@tanstack/react-router";
import {
  Store,
  ShoppingCart,
  Coffee,
  UtensilsCrossed,
  Dumbbell,
  Leaf,
  Building2,
  Hotel,
  Phone,
  Mail,
  MapPin,
  Handshake,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — Pecho | გახდი პარტნიორი" },
      {
        name: "description",
        content:
          "Wholesale partnerships with Pecho — premium peanut butter for grocery stores, cafés, restaurants, fitness clubs, and retail businesses across Georgia.",
      },
      { property: "og:title", content: "Partners — Pecho" },
      {
        property: "og:description",
        content: "Long-term wholesale partnerships for premium Pecho peanut butter.",
      },
      { property: "og:url", content: "/partners" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: PartnersPage,
});

function PartnersPage() {
  const { t } = useT();

  const types = [
    { icon: Store, label: t("partners.type.grocery") },
    { icon: ShoppingCart, label: t("partners.type.supermarket") },
    { icon: Coffee, label: t("partners.type.cafe") },
    { icon: UtensilsCrossed, label: t("partners.type.restaurant") },
    { icon: Dumbbell, label: t("partners.type.fitness") },
    { icon: Leaf, label: t("partners.type.health") },
    { icon: Hotel, label: t("partners.type.hotel") },
    { icon: Building2, label: t("partners.type.retail") },
  ];

  return (
    <>
      <section className="px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-toast">
                <Handshake className="size-4" />
                B2B
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mt-4 text-balance">
                🤝 {t("partners.title")}
              </h1>
              <p className="text-brand-roast/70 mt-6 text-lg leading-relaxed text-pretty">
                {t("partners.intro")}
              </p>
            </div>
          </Reveal>

          <div className="mt-16 md:mt-20">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest text-brand-roast/60 mb-8">
              {t("partners.who")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {types.map((it, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="group bg-brand-paper rounded-3xl p-6 md:p-8 ring-1 ring-black/5 hover:ring-brand-toast/40 hover:-translate-y-1 transition-all h-full flex flex-col items-center text-center gap-4">
                    <span className="size-14 rounded-2xl bg-brand-toast/10 flex items-center justify-center group-hover:bg-brand-toast/20 transition-colors">
                      <it.icon className="size-6 text-brand-toast" strokeWidth={1.5} />
                    </span>
                    <span className="text-sm md:text-base font-medium text-brand-roast leading-snug">
                      {it.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="bg-brand-roast text-brand-cream rounded-3xl p-8 md:p-14 shadow-2xl">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-display font-medium">
                  {t("partners.contactTitle")}
                </h2>
                <p className="text-brand-cream/70 mt-4 leading-relaxed">
                  {t("partners.contactNote")}
                </p>
              </div>

              <div className="mt-10 grid md:grid-cols-3 gap-4">
                <ContactCard
                  icon={Phone}
                  label="Phone"
                  value="595 55 17 80"
                  href="tel:+995595551780"
                />
                <ContactCard
                  icon={Mail}
                  label="Email"
                  value="Pecho.official@gmail.com"
                  href="mailto:Pecho.official@gmail.com"
                />
                <ContactCard
                  icon={MapPin}
                  label="Address"
                  value="ქ. გორი, შინდისის გმირების 17ბ"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="h-full bg-brand-cream/5 hover:bg-brand-cream/10 transition-colors rounded-2xl p-5 ring-1 ring-brand-cream/10 flex gap-4 items-start">
      <span className="size-11 rounded-xl bg-brand-toast/20 flex items-center justify-center shrink-0">
        <Icon className="size-5 text-brand-toast" strokeWidth={1.6} />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-cream/50">
          {label}
        </div>
        <div className="text-brand-cream font-medium mt-1 break-words">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}
