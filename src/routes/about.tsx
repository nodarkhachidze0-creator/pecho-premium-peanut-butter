import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import aboutTexture from "@/assets/about-texture.jpg";
import { Heart, Sprout, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Pecho | ჩვენს შესახებ" },
      {
        name: "description",
        content: "Pecho: small-batch, single-origin peanut butter made in Tbilisi, Georgia.",
      },
      { property: "og:title", content: "About — Pecho" },
      { property: "og:description", content: "Small-batch peanut butter, made in Tbilisi." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const { t, lang } = useT();
  const values = [
    {
      icon: Heart,
      title: lang === "ka" ? "ხარისხი უპირობოდ" : "Quality, unconditionally",
      body:
        lang === "ka"
          ? "მხოლოდ საუკეთესო მიწისთხილი. მხოლოდ საუკეთესო მარილი. მხოლოდ საუკეთესო ქილა."
          : "Only the best peanuts. Only the best salt. Only the best jar.",
    },
    {
      icon: Sprout,
      title: lang === "ka" ? "ადგილობრივი მიწიდან" : "From local soil",
      body:
        lang === "ka"
          ? "მიწისთხილს ვიღებთ კახეთის მცირე მეურნეობებიდან."
          : "We source our peanuts from small family farms in Kakheti.",
    },
    {
      icon: Award,
      title: lang === "ka" ? "ხელნაკეთი პარტიები" : "Handmade batches",
      body:
        lang === "ka"
          ? "ყოველი ქილა ხელით არის შემოწმებული და დათარიღებული."
          : "Every jar is hand-checked and dated before it leaves the kitchen.",
    },
  ];

  return (
    <>
      <section className="px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-toast">
            {t("about.title")}
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-medium mt-4 text-balance">
            {t("about.lede")}
          </h1>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img
            src={aboutTexture}
            alt="Peanut butter texture"
            loading="lazy"
            className="w-full aspect-square object-cover rounded-3xl ring-1 ring-black/5"
          />
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-medium">
              {t("about.story.title")}
            </h2>
            <p className="text-brand-roast/70 leading-relaxed">{t("about.story.body")}</p>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20 bg-brand-paper">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-12">
            {t("about.values.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {values.map((v, i) => (
              <div key={i} className="space-y-4">
                <v.icon className="size-7 text-brand-toast" strokeWidth={1.5} />
                <h3 className="text-xl font-display">{v.title}</h3>
                <p className="text-sm text-brand-roast/70 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
