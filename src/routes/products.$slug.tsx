import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Leaf, Truck, Wallet } from "lucide-react";
import { getProduct, getRelated } from "@/data/products";
import { useT } from "@/lib/i18n";
import { useCart, formatGEL } from "@/lib/cart";
import { flyToCart } from "@/lib/fly-to-cart";
import { QuantityStepper } from "@/components/QuantityStepper";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { WeightSelector } from "@/components/WeightSelector";
import { Reveal } from "@/components/Reveal";
import nutritionImg from "@/assets/nutrition-facts.webp.asset.json";
import spoonImg from "@/assets/pb-spoon-peanuts.jpg.asset.json";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Pecho" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name.en} ${loaderData.weight} — Pecho`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.short.en },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.short.en },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${params.slug}` },
        { property: "og:image", content: loaderData.image },
        { name: "twitter:image", content: loaderData.image },
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
            name: `${loaderData.name.en} ${loaderData.weight}`,
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

function ProductDetail() {
  const product = Route.useLoaderData();
  const { t, lang } = useT();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [activeShot, setActiveShot] = useState(0);
  const heroRef = useRef<HTMLImageElement | null>(null);
  const related = getRelated(product.slug);
  const ka = lang === "ka";

  // Reset per-product UI state when switching weights.
  useEffect(() => {
    setQty(1);
    setActiveShot(0);
  }, [product.slug]);

  const shots = [product.cutout, ...product.gallery];
  const currentShot = shots[activeShot] ?? product.image;

  const handleAdd = () => {
    if (heroRef.current) flyToCart(currentShot, heroRef.current.getBoundingClientRect());
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
            {/* Gallery */}
            <div className="space-y-4 md:sticky md:top-[140px]">
              <div className="rounded-3xl ring-1 ring-black/5 overflow-hidden bg-gradient-to-b from-brand-paper to-brand-beige p-6">
                <ProductImage
                  ref={heroRef}
                  src={currentShot}
                  alt={`${product.name[lang]} ${product.weight}`}
                  priority
                  fit={activeShot === 0 ? "contain" : "cover"}
                  className="aspect-square"
                  imgClassName={activeShot === 0 ? "drop-shadow-2xl" : "rounded-2xl"}
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {shots.map((shot, i) => (
                  <button
                    key={shot + i}
                    onClick={() => setActiveShot(i)}
                    aria-label={`${product.name[lang]} — ${i + 1}`}
                    aria-current={i === activeShot}
                    className={`aspect-square rounded-xl overflow-hidden bg-brand-paper ring-1 transition-all ${
                      i === activeShot ? "ring-brand-toast ring-2" : "ring-black/5 hover:ring-brand-toast/40"
                    }`}
                  >
                    <img
                      src={shot}
                      alt=""
                      loading="lazy"
                      className={`w-full h-full ${i === 0 ? "object-contain p-2" : "object-cover"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Buy box */}
            <div className="space-y-7">
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

              <WeightSelector product={product} label={ka ? "წონა" : "Weight"} />

              <div className="flex flex-wrap items-end gap-4">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-brand-roast/60 mb-2">
                    {t("pdp.quantity")}
                  </span>
                  <QuantityStepper value={qty} onChange={setQty} />
                </div>
                <button
                  onClick={handleAdd}
                  className="btn-premium flex-1 min-w-[220px] bg-brand-roast text-brand-cream px-7 py-4 rounded-full font-semibold hover:bg-brand-toast transition-colors"
                >
                  {t("cta.addToCart")} · {formatGEL(product.price * qty)}
                </button>
              </div>

              <ul className="grid sm:grid-cols-3 gap-3 pt-2">
                {[
                  { icon: Truck, text: ka ? "მიწოდება 2–3 სამუშაო დღეში" : "Delivery in 2–3 business days" },
                  { icon: Wallet, text: ka ? "გადახდა ადგილზე" : "Pay on delivery" },
                  { icon: Leaf, text: ka ? "100% ბუნებრივი" : "100% natural" },
                ].map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-3 rounded-2xl bg-brand-paper px-4 py-3 text-sm text-brand-roast/75"
                  >
                    <Icon className="size-4 text-brand-toast shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-brand-roast/10 space-y-6">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-roast/60">
                    {t("pdp.description")}
                  </h2>
                  <p className="mt-3 leading-relaxed text-brand-roast/80">
                    {product.description[lang]}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-roast/60">
                    {t("pdp.ingredients")}
                  </h2>
                  <p className="mt-3 leading-relaxed text-brand-roast/80">
                    {product.ingredients[lang]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition */}
      <section className="px-4 sm:px-6 py-16 md:py-24 bg-brand-beige">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <div className="rounded-3xl overflow-hidden bg-white ring-1 ring-black/5 p-4">
              <img
                src={nutritionImg.url}
                alt={ka ? "Pecho — კვებითი ღირებულება" : "Pecho nutrition facts"}
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-toast">
                {t("pdp.nutrition")}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium mt-3 leading-tight">
                {ka ? "გამჭვირვალე შემადგენლობა" : "Nothing to hide"}
              </h2>
              <table className="w-full mt-6">
                <tbody>
                  {product.nutrition.map((n) => (
                    <tr key={n.value + n.label.en} className="border-b border-brand-roast/10">
                      <td className="py-3 text-brand-roast/60">{n.label[lang]}</td>
                      <td className="py-3 text-right font-medium">{n.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-brand-roast/50 mt-4">
                {ka ? "მნიშვნელობები 100 გრამზე." : "Values per 100 g."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-medium leading-tight text-balance">
                {ka ? "მხოლოდ მიწისთხილი. სხვა არაფერი." : "Just peanuts. Nothing else."}
              </h2>
              <p className="mt-5 text-brand-roast/70 leading-relaxed">
                {product.description[lang]}
              </p>
              <p className="mt-4 text-brand-roast/70 leading-relaxed">
                {product.ingredients[lang]}
              </p>
              <Link
                to="/recipes"
                className="mt-7 inline-flex text-sm font-semibold border-b border-brand-roast pb-1 hover:border-brand-toast"
              >
                {ka ? "რეცეპტები Pecho-თი" : "Recipes with Pecho"}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <img
              src={spoonImg.url}
              alt={ka ? "Pecho მიწისთხილის კარაქი კოვზზე" : "Pecho peanut butter on a spoon"}
              loading="lazy"
              className="w-full aspect-square object-cover rounded-3xl ring-1 ring-black/5"
            />
          </Reveal>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20 bg-brand-beige">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-medium mb-10">{t("pdp.related")}</h2>
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
