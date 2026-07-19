import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import aboutTexture from "@/assets/about-texture.jpg";
import classicJar from "@/assets/pecho-classic-1kg.png.asset.json";
import { Leaf, Ban, Star, Zap, Sparkles, Utensils } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Pecho | ჩვენს შესახებ" },
      {
        name: "description",
        content:
          "Pecho: 100% natural peanut butter — no additives, no preservatives, no palm oil. Healthy living starts with one spoonful.",
      },
      { property: "og:title", content: "About — Pecho" },
      {
        property: "og:description",
        content: "Healthy living starts with one spoonful. 100% natural peanut butter.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const { t } = useT();

  const whys = [
    { icon: Leaf, emoji: "🌿", title: t("about.why.1.title"), body: t("about.why.1.body") },
    { icon: Ban, emoji: "🚫", title: t("about.why.2.title"), body: t("about.why.2.body") },
    { icon: Star, emoji: "⭐", title: t("about.why.3.title"), body: t("about.why.3.body") },
    { icon: Zap, emoji: "⚡", title: t("about.why.4.title"), body: t("about.why.4.body") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative px-4 sm:px-6 pt-20 md:pt-28 pb-16 md:pb-24 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 size-[420px] rounded-full bg-brand-toast/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 size-[380px] rounded-full bg-brand-toast/5 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-brand-toast">
              <Sparkles className="size-4" />
              {t("about.hero.eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium mt-6 leading-[1.05] text-balance">
              {t("about.hero.title")}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 text-lg md:text-xl text-brand-roast/70 leading-relaxed max-w-2xl mx-auto text-pretty">
              {t("about.hero.body")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-brand-roast/15 to-transparent" />
      </div>

      {/* Story — alternating block 1 */}
      <section className="px-4 sm:px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div className="relative">
              <img
                src={aboutTexture}
                alt="Peanut butter texture"
                loading="lazy"
                className="w-full aspect-square object-cover rounded-3xl ring-1 ring-black/5 shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 hidden md:flex size-28 rounded-full bg-brand-toast text-white items-center justify-center font-display text-lg text-center leading-tight shadow-lg rotate-6">
                100%
                <br />
                ნატურალური
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-toast">
                {t("about.hero.eyebrow")}
              </span>
              <p className="text-lg md:text-xl font-display leading-snug text-brand-roast">
                {t("about.story.p1")}
              </p>
              <p className="text-brand-roast/70 leading-relaxed">{t("about.story.p2")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Alternating block 2 — reverse */}
      <section className="px-4 sm:px-6 pb-20 md:pb-28 bg-brand-paper">
        <div className="max-w-6xl mx-auto pt-20 md:pt-28 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal delay={120} className="md:order-2">
            <div className="relative">
              <img
                src={classicJar.url}
                alt="Pecho classic jar"
                loading="lazy"
                className="w-full aspect-square object-contain rounded-3xl"
              />
            </div>
          </Reveal>
          <Reveal className="md:order-1">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-toast">
                <Utensils className="size-4" />
                Lifestyle
              </span>
              <p className="text-lg md:text-xl font-display leading-snug text-brand-roast">
                {t("about.story.p3")}
              </p>
              <p className="text-brand-roast/70 leading-relaxed">{t("about.story.p4")}</p>
              <p className="pt-4 text-2xl md:text-3xl font-display text-brand-toast leading-tight">
                {t("about.hero.title")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Pecho — 4 cards */}
      <section className="px-4 sm:px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-medium text-balance">
                {t("about.why.title")}
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {whys.map((w, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="group h-full bg-brand-paper rounded-3xl p-7 ring-1 ring-black/5 hover:ring-brand-toast/40 hover:-translate-y-1 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="size-12 rounded-2xl bg-brand-toast/10 flex items-center justify-center text-2xl group-hover:bg-brand-toast/20 transition-colors">
                      {w.emoji}
                    </span>
                    <w.icon className="size-5 text-brand-toast" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 text-lg md:text-xl font-display leading-snug">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-sm text-brand-roast/70 leading-relaxed">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="relative bg-brand-roast text-brand-cream rounded-[2rem] p-10 md:p-16 shadow-2xl overflow-hidden">
              <div className="pointer-events-none absolute -top-32 -right-32 size-[420px] rounded-full bg-brand-toast/20 blur-3xl" />
              <div className="relative max-w-3xl">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-toast">
                  {t("about.mission.eyebrow")}
                </span>
                <h2 className="mt-5 text-3xl md:text-5xl font-display font-medium leading-tight text-balance">
                  {t("about.mission.title")}
                </h2>
                <p className="mt-6 text-brand-cream/80 text-lg leading-relaxed max-w-2xl">
                  {t("about.mission.body")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
