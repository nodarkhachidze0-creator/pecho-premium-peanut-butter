import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChefHat, Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n";
import { recipes } from "@/data/recipes";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/recipes/$slug")({
  loader: ({ params }) => {
    const recipe = recipes.find((r) => r.slug === params.slug);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Recipe — Pecho" }, { name: "robots", content: "noindex" }] };
    }
    const title = loaderData.recipe.title.ka;
    const desc = loaderData.recipe.description.ka;
    return {
      meta: [
        { title: `${title} — Pecho` },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: RecipeNotFound,
  component: RecipeDetail,
});

function RecipeDetail() {
  const { recipe } = Route.useLoaderData();
  const { lang } = useT();

  return (
    <article className="px-4 sm:px-6 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/recipes"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-roast/60 hover:text-brand-toast transition-colors"
        >
          <ArrowLeft className="size-4" />
          {lang === "ka" ? "ყველა რეცეპტი" : "All recipes"}
        </Link>

        <header className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-toast">
            <ChefHat className="size-4" />
            {lang === "ka" ? "რეცეპტი" : "Recipe"}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display font-medium leading-tight text-balance">
            {recipe.title[lang]}
          </h1>
          <p className="mt-6 text-brand-roast/70 text-lg leading-relaxed max-w-2xl mx-auto text-pretty">
            {recipe.description[lang]}
          </p>
        </header>

        <Reveal>
          <div className="mt-10 rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-2xl bg-brand-roast">
            <video
              src={recipe.videoUrl}
              controls
              playsInline
              preload="metadata"
              className="w-full aspect-video object-cover"
            />
          </div>
        </Reveal>

        {/* Ingredients */}
        <Reveal>
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-display font-medium flex items-center gap-3">
              🥣 {lang === "ka" ? "ინგრედიენტები" : "Ingredients"}
            </h2>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {recipe.ingredients.map((ing, i) => (
                <div
                  key={i}
                  className="bg-brand-paper rounded-2xl p-5 ring-1 ring-black/5 flex flex-col items-center text-center gap-3 hover:ring-brand-toast/40 transition-all"
                >
                  <span className="text-3xl leading-none" aria-hidden>
                    {ing.emoji}
                  </span>
                  <span className="text-sm font-medium text-brand-roast leading-snug">
                    {ing.text}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Steps */}
        <Reveal>
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-display font-medium flex items-center gap-3">
              👨‍🍳 {lang === "ka" ? "მომზადების წესი" : "Preparation"}
            </h2>
            <ol className="mt-6 space-y-4">
              {recipe.steps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-5 bg-brand-cream rounded-2xl p-5 md:p-6 ring-1 ring-brand-roast/5"
                >
                  <span className="shrink-0 size-10 rounded-full bg-brand-toast text-white font-bold flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <p className="text-brand-roast/85 leading-relaxed pt-1.5">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        {/* Plating */}
        <Reveal>
          <section className="mt-16">
            <div className="bg-brand-beige rounded-3xl p-8 md:p-10 ring-1 ring-black/5">
              <h2 className="text-2xl md:text-3xl font-display font-medium flex items-center gap-3">
                🍓 {lang === "ka" ? "მორთვა" : "Plating"}
              </h2>
              <p className="mt-4 text-brand-roast/80 leading-relaxed">{recipe.plating}</p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <div className="mt-16 text-center">
            <p className="inline-flex items-center gap-3 text-2xl md:text-3xl font-display text-brand-toast">
              <Sparkles className="size-6" />
              {recipe.closing}
            </p>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

function RecipeNotFound() {
  return (
    <div className="px-4 sm:px-6 py-24 text-center">
      <p className="text-brand-roast/70">Recipe not found.</p>
      <Link
        to="/recipes"
        className="mt-4 inline-block text-sm font-semibold border-b border-brand-roast pb-1"
      >
        Back to recipes
      </Link>
    </div>
  );
}
