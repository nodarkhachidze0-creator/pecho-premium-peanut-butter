import { createFileRoute, Link } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { useT } from "@/lib/i18n";
import { recipes } from "@/data/recipes";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/recipes")({
  head: () => ({
    meta: [
      { title: "Recipes — Pecho | რეცეპტები" },
      { name: "description", content: "Recipes and ideas with Pecho peanut butter." },
      { property: "og:title", content: "Recipes — Pecho" },
      { property: "og:description", content: "Recipes and ideas with Pecho peanut butter." },
    ],
    links: [{ rel: "canonical", href: "/recipes" }],
  }),
  component: RecipesPage,
});

function RecipesPage() {
  const { t, lang } = useT();
  return (
    <section className="px-4 sm:px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <header className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-medium">{t("recipes.title")}</h1>
          <p className="text-brand-roast/70 mt-4 text-lg">{t("recipes.subtitle")}</p>
        </header>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {recipes.map((r, i) => (
            <Reveal key={r.slug} delay={i * 80}>
              <Link
                to="/recipes/$slug"
                params={{ slug: r.slug }}
                className="group block bg-brand-paper rounded-3xl overflow-hidden ring-1 ring-black/5 hover:ring-brand-toast/40 hover:-translate-y-1 transition-all h-full"
              >
                <div className="relative aspect-video bg-brand-roast/90 overflow-hidden">
                  <video
                    src={r.videoUrl}
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-brand-roast/30 group-hover:bg-brand-roast/10 transition-colors">
                    <PlayCircle className="size-14 text-white drop-shadow-lg" strokeWidth={1.4} />
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-display leading-snug group-hover:text-brand-toast transition-colors">
                    {r.title[lang]}
                  </h2>
                  <p className="mt-3 text-sm text-brand-roast/70 leading-relaxed line-clamp-3">
                    {r.description[lang]}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
