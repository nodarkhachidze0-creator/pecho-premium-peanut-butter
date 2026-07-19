import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { getProduct, getRelated } from "@/data/products";
import { useT } from "@/lib/i18n";
import { useCart, formatGEL } from "@/lib/cart";
import { QuantityStepper } from "@/components/QuantityStepper";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product not found — Pecho" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${loaderData.name.en} — Pecho` },
        { name: "description", content: loaderData.short.en },
        { property: "og:title", content: `${loaderData.name.en} — Pecho` },
        { property: "og:description", content: loaderData.short.en },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${params.slug}` },
        { property: "og:image", content: loaderData.image },
        { property: "product:price:amount", content: String(loaderData.price) },
        { property: "product:price:currency", content: "GEL" },
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: loaderData.name.en,
            description: loaderData.description.en,
            image: loaderData.image,
            brand: { "@type": "Brand", name: "Pecho" },
            offers: {
              "@type": "Offer",
              price: loaderData.price,
              priceCurrency: "GEL",
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-md mx-auto text-center py-32 px-6">
      <h1 className="text-3xl font-display">Product not found</h1>
      <Link to="/products" className="mt-6 inline-block text-brand-toast font-semibold">
        ← Back to products
      </Link>
    </div>
  ),
  component: ProductDetail,
});

type Tab = "description" | "ingredients" | "nutrition" | "weight";

function ProductDetail() {
  const product = Route.useLoaderData();
  const { t, lang } = useT();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("description");
  const related = getRelated(product.slug);

  const handleAdd = () => {
    add(
      {
        id: product.slug,
        name: product.name[lang],
        price: product.price,
        image: product.image,
        weight: product.weight,
      },
      qty,
    );
    toast.success(`${product.name[lang]} × ${qty} — ${t("cta.addToCart")}`);
  };

  return (
    <>
      <section className="px-4 sm:px-6 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-brand-roast/60 hover:text-brand-roast mb-8"
          >
            <ArrowLeft className="size-4" /> {t("nav.products")}
          </Link>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div className="space-y-4">
              <div className="bg-brand-paper rounded-3xl ring-1 ring-black/5 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name[lang]}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-brand-paper rounded-xl ring-1 ring-black/5 overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-toast">
                  {t(`products.cat.${product.category}`)}
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-medium mt-2 leading-tight">
                  {product.name[lang]}
                </h1>
                <p className="text-brand-roast/70 mt-3 text-lg">{product.short[lang]}</p>
              </div>

              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-display text-brand-toast">
                  {formatGEL(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-brand-roast/40 line-through">
                    {formatGEL(product.originalPrice)}
                  </span>
                )}
                <span className="text-sm text-brand-roast/50">/ {product.weight}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-brand-roast/60 mb-2">
                    {t("pdp.quantity")}
                  </span>
                  <QuantityStepper value={qty} onChange={setQty} />
                </div>
                <button
                  onClick={handleAdd}
                  className="mt-6 flex-1 min-w-[200px] bg-brand-roast text-brand-cream px-7 py-4 rounded-full font-semibold hover:bg-brand-toast transition-colors"
                >
                  {t("cta.addToCart")} · {formatGEL(product.price * qty)}
                </button>
              </div>

              <div className="pt-8 border-t border-brand-roast/10">
                <div className="flex gap-6 border-b border-brand-roast/10 -mb-px">
                  {(["description", "ingredients", "nutrition", "weight"] as Tab[]).map((k) => (
                    <button
                      key={k}
                      onClick={() => setTab(k)}
                      className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                        tab === k
                          ? "border-brand-toast text-brand-roast"
                          : "border-transparent text-brand-roast/50 hover:text-brand-roast"
                      }`}
                    >
                      {t(`pdp.${k}`)}
                    </button>
                  ))}
                </div>
                <div className="pt-6 text-sm leading-relaxed text-brand-roast/80">
                  {tab === "description" && <p>{product.description[lang]}</p>}
                  {tab === "ingredients" && <p>{product.ingredients[lang]}</p>}
                  {tab === "nutrition" && (
                    <table className="w-full">
                      <tbody>
                        {product.nutrition.map((n: { label: { en: string; ka: string }; value: string }) => (
                          <tr key={n.value} className="border-b border-brand-roast/5">
                            <td className="py-2 text-brand-roast/60">{n.label[lang]}</td>
                            <td className="py-2 text-right font-medium">{n.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {tab === "weight" && (
                    <p>
                      {product.weight} — {lang === "ka" ? "შუშის ქილა" : "glass jar"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20 bg-brand-beige">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-medium mb-10">
            {t("pdp.related")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
