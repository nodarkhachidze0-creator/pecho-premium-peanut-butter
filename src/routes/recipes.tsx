import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

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
  const { t } = useT();
  return (
    <section className="px-4 sm:px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-display font-medium">{t("recipes.title")}</h1>
        <p className="text-brand-roast/70 mt-4 text-lg">{t("recipes.subtitle")}</p>
        <div className="mt-16 bg-brand-paper rounded-3xl p-16 text-brand-roast/60">
          {t("recipes.empty")}
        </div>
      </div>
    </section>
  );
}
