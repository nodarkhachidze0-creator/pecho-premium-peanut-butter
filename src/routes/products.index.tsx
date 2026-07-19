import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useT } from "@/lib/i18n";
import { products, type Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import promoImg from "@/assets/pecho-promo-2plus1.png.asset.json";


export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Pecho | პროდუქცია" },
      {
        name: "description",
        content:
          "Explore Pecho's small-batch peanut butter collection: Smooth Classic, Extra Crunchy, Sea Salt Reserve, Dark Chocolate, and more.",
      },
      { property: "og:title", content: "Products — Pecho" },
      { property: "og:description", content: "Small-batch peanut butter. Delivered across Georgia." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

const CATEGORIES: (Category | "all")[] = ["all", "classic", "crunchy"];

function ProductsPage() {
  const { t, lang } = useT();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) => (cat === "all" ? true : p.category === cat));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.en.toLowerCase().includes(q) ||
          p.name.ka.toLowerCase().includes(q) ||
          p.short.en.toLowerCase().includes(q),
      );
    }
    switch (sort) {
      case "priceAsc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name[lang].localeCompare(b.name[lang]));
        break;
    }
    return list;
  }, [query, cat, sort, lang]);

  return (
    <section className="px-4 sm:px-6 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 md:mb-14 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-display font-medium">{t("products.title")}</h1>
          <p className="text-brand-roast/70 mt-3 text-lg">{t("products.subtitle")}</p>
        </header>

        <a
          href="/products/bundle-2plus1"
          className="block mb-12 rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-2xl bg-brand-paper"
        >
          <img
            src={promoImg.url}
            alt={t("home.hero.eyebrow")}
            className="block w-full h-auto object-contain"
            loading="lazy"
          />
        </a>




        <div className="grid gap-4 mb-10 md:flex md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-brand-roast/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("products.search")}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-brand-paper border border-transparent focus:border-brand-toast/40 focus:outline-none text-sm"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 rounded-full bg-brand-paper text-sm font-medium border border-transparent focus:border-brand-toast/40 focus:outline-none"
          >
            <option value="featured">{t("products.sort.featured")}</option>
            <option value="priceAsc">{t("products.sort.priceAsc")}</option>
            <option value="priceDesc">{t("products.sort.priceDesc")}</option>
            <option value="name">{t("products.sort.name")}</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors ${
                cat === c
                  ? "bg-brand-roast text-brand-cream"
                  : "bg-brand-paper text-brand-roast/70 hover:bg-brand-beige"
              }`}
            >
              {t(`products.cat.${c}`)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-brand-roast/60 py-20 text-center">{t("products.empty")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
