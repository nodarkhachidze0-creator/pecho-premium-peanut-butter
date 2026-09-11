import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { getProduct, getRelated, products, type Category } from "@/data/products";
import { useT } from "@/lib/i18n";
import { useCart, formatGEL } from "@/lib/cart";
import { QuantityStepper } from "@/components/QuantityStepper";
import { ProductCard } from "@/components/ProductCard";
import nutritionFacts from "@/assets/nutrition-facts.png.asset.json";

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

type Tab = "description" | "ingredients" | "storage" | "nutrition";

const FLAVORS: { key: Category; label: { en: string; ka: string }; isNew?: boolean }[] = [
  { key: "classic", label: { en: "Classic", ka: "კლასიკური" } },
  { key: "crunchy", label: { en: "Crunchy", ka: "ხრაშუნა" }, isNew: true },
];

const WEIGHTS: { key: string; label: { en: string; ka: string } }[] = [
  { key: "450g", label: { en: "450 g", ka: "450 გ" } },
  { key: "1kg", label: { en: "1 kg", ka: "1 კგ" } },
];

function findVariant(flavor: Category, weight: string) {
  return products.find((p) => p.category === flavor && p.weight === weight);
}

function ProductDetail() {
  const product = Route.useLoaderData();
  const navigate = useNavigate();
  const { t, lang } = useT();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("description");
  const gallery = product.detailImages ?? [product.detailImage ?? product.image];
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const related = getRelated(product.slug);
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  useEffect(() => {
    setSelectedImage(gallery[0]);
    setQty(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  const switchTo = (flavor: Category, weight: string) => {
    const next = findVariant(flavor, weight);
    if (!next || next.slug === product.slug) return;
    navigate({ to: "/products/$slug", params: { slug: next.slug } });
  };

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

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Media panel */}
            <div className="flex flex-col-reverse gap-4 sm:flex-row md:sticky md:top-24">
              <div
                className="flex flex-row gap-3 sm:flex-col"
                aria-label={lang === "ka" ? "პროდუქტის ფოტოები" : "Product photos"}
              >
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    aria-label={lang === "ka" ? `ფოტო ${index + 1}` : `Photo ${index + 1}`}
                    aria-pressed={selectedImage === image}
                    className={`size-16 shrink-0 overflow-hidden rounded-[14px] bg-brand-paper sm:size-20 ${
                      selectedImage === image
                        ? "ring-2 ring-brand-toast"
                        : "ring-1 ring-brand-roast/10 hover:ring-brand-roast/25"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      className="size-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>

              <div className="w-full max-w-[520px] flex-1 overflow-hidden rounded-[20px] bg-brand-paper shadow-lg ring-1 ring-brand-roast/5">
                <div className="flex aspect-square w-full items-center justify-center p-4 sm:p-6">
                  <img
                    key={selectedImage}
                    src={selectedImage}
                    alt={product.name[lang]}
                    className="product-gallery-image max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Details panel */}
            <div className="space-y-6">
              <div>
                <span className="font-label text-xs font-bold uppercase tracking-widest text-brand-toast">
                  {t(`products.cat.${product.category}`)}
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-extrabold mt-2 leading-tight">
                  {product.name[lang]}
                </h1>
                <p className="text-brand-roast/70 mt-3 text-lg">{product.short[lang]}</p>
              </div>

              <div className="flex items-baseline gap-3 flex-wrap">
                {product.originalPrice && (
                  <span className="text-lg text-brand-roast/40 line-through">
                    {formatGEL(product.originalPrice)}
                  </span>
                )}
                <span className="text-3xl font-display text-brand-toast">
                  {formatGEL(product.price)}
                </span>
                {savings > 0 && (
                  <span className="rounded-full bg-brand-toast px-3 py-1 text-xs font-semibold text-white">
                    {t("pdp.save")} {formatGEL(savings)}
                  </span>
                )}
                <span className="text-sm text-brand-roast/50">/ {product.weight}</span>
              </div>

              {/* Flavor selector */}
              <div>
                <span className="mb-2 block font-label text-xs font-semibold uppercase tracking-widest text-brand-roast/60">
                  {t("pdp.chooseFlavor")}
                </span>
                <div className="grid gap-3">
                  {FLAVORS.map((flavor) => {
                    const variant = findVariant(flavor.key, product.weight);
                    const active = product.category === flavor.key;
                    return (
                      <button
                        key={flavor.key}
                        type="button"
                        onClick={() => switchTo(flavor.key, product.weight)}
                        aria-pressed={active}
                        className={`flex items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left transition-colors ${
                          active
                            ? "bg-brand-paper ring-2 ring-brand-toast"
                            : "bg-brand-paper/60 ring-1 ring-brand-roast/10 hover:ring-brand-roast/25"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {variant && (
                            <img
                              src={variant.image}
                              alt=""
                              className="h-10 w-8 object-contain"
                              loading="lazy"
                            />
                          )}
                          <span className="font-semibold">{flavor.label[lang]}</span>
                        </span>
                        {flavor.isNew && (
                          <span className="rounded-full bg-brand-toast px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                            {t("pdp.new")}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weight selector */}
              <div>
                <span className="mb-2 block font-label text-xs font-semibold uppercase tracking-widest text-brand-roast/60">
                  {t("pdp.chooseWeight")}
                </span>
                <div className="flex flex-wrap gap-3">
                  {WEIGHTS.map((w) => {
                    const variant = findVariant(product.category, w.key);
                    const active = product.weight === w.key;
                    return (
                      <button
                        key={w.key}
                        type="button"
                        onClick={() => switchTo(product.category, w.key)}
                        aria-pressed={active}
                        className={`flex w-28 flex-col items-center gap-2 rounded-2xl px-4 py-3 transition-colors ${
                          active
                            ? "bg-brand-paper ring-2 ring-brand-toast"
                            : "bg-brand-paper/60 ring-1 ring-brand-roast/10 hover:ring-brand-roast/25"
                        }`}
                      >
                        {variant && (
                          <img
                            src={variant.image}
                            alt=""
                            className="h-14 w-auto object-contain"
                            loading="lazy"
                          />
                        )}
                        <span className="text-sm font-semibold">{w.label[lang]}</span>
                        {variant && (
                          <span className="text-xs text-brand-roast/60">
                            {formatGEL(variant.price)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-end gap-4 pt-2">
                <div>
                  <span className="mb-2 block font-label text-xs font-semibold uppercase tracking-widest text-brand-roast/60">
                    {t("pdp.quantity")}
                  </span>
                  <QuantityStepper value={qty} onChange={setQty} />
                </div>
                <button
                  onClick={handleAdd}
                  className="flex-1 min-w-[200px] bg-brand-roast text-brand-cream px-7 py-4 rounded-full font-semibold hover:bg-brand-toast transition-colors"
                >
                  {t("cta.addToCart")} · {formatGEL(product.price * qty)}
                </button>
              </div>

              <div className="pt-8 border-t border-brand-roast/10">
                <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-brand-roast/10 -mb-px">
                  {(["description", "ingredients", "storage", "nutrition"] as Tab[]).map((k) => (
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
                <div className="pt-6 text-base leading-relaxed text-brand-roast/80">
                  {tab === "description" && <p className="whitespace-pre-line">{t("pdp.descriptionContent")}</p>}
                  {tab === "ingredients" && <p className="whitespace-pre-line">{t("pdp.ingredientsContent")}</p>}
                  {tab === "storage" && <p className="whitespace-pre-line">{t("pdp.storageContent")}</p>}
                  {tab === "nutrition" && (
                    <div className="space-y-5">
                      <p>{t("pdp.nutritionContent")}</p>
                      <div className="overflow-hidden rounded-[20px] bg-brand-paper shadow-lg">
                        <img
                          src={nutritionFacts.url}
                          alt={lang === "ka" ? "კვებითი ღირებულება 100 გრამ პროდუქტზე" : "Nutritional values per 100 grams"}
                          loading="lazy"
                          className="h-auto w-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20 bg-brand-beige">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-extrabold mb-10">
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
