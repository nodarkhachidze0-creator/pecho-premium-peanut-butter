import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useT } from "@/lib/i18n";
import { formatDate } from "@/lib/format-date";
import { getFeatured, getProduct } from "@/data/products";
import { news } from "@/data/news";
import { recipes } from "@/data/recipes";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";
import { StoreMap } from "@/components/StoreMap";
import promoImg from "@/assets/pecho-promo-2plus1.png.asset.json";
import heartPeanut from "@/assets/heart-with-peanut.webp.asset.json";
import classicBread from "@/assets/classic-bited-bread.webp.asset.json";
import crunchyBread from "@/assets/crunchy-bited-bread.webp.asset.json";
import breadPhoto from "@/assets/peanut-butter-on-bread.jpg.asset.json";
import spoonPhoto from "@/assets/pb-spoon-peanuts.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pecho — 100% ბუნებრივი მიწისთხილის კარაქი" },
      {
        name: "description",
        content:
          "Pecho — 100% ბუნებრივი მიწისთხილის კარაქი. კლასიკური და ხრაშუნა, 450გ და 1კგ. მიწოდება 2–3 სამუშაო დღეში, გადახდა ადგილზე.",
      },
      { property: "og:title", content: "Pecho — 100% ბუნებრივი მიწისთხილის კარაქი" },
      {
        property: "og:description",
        content: "კლასიკური და ხრაშუნა მიწისთხილის კარაქი. მიწოდება მთელ საქართველოში.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useT();
  const ka = lang === "ka";
  const featured = getFeatured();
  const latest = news.slice(0, 3);
  const heroJar = getProduct("classic-1kg");
  const recipePreview = recipes.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-16 md:pt-24 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-toast">
              {t("home.hero.eyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.05] text-balance">
              {t("home.hero.title")}
            </h1>
            <p className="text-base md:text-lg text-brand-roast/70 max-w-xl text-pretty leading-relaxed">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/products"
                className="btn-premium inline-flex items-center gap-2 bg-brand-toast text-white px-7 py-4 rounded-full font-semibold ring-2 ring-brand-toast/20"
              >
                {t("cta.shop")}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/products/$slug"
                params={{ slug: "bundle-2plus1" }}
                className="inline-flex items-center px-7 py-4 rounded-full font-semibold border border-brand-roast/20 hover:bg-brand-paper transition-colors"
              >
                {ka ? "2+1 შეთავაზება" : "See the 2+1 offer"}
              </Link>
            </div>
          </div>

          <div className="relative">
            {heroJar && (
              <div className="hero-float relative z-10 mx-auto max-w-[440px]">
                <Link to="/products/$slug" params={{ slug: heroJar.slug }} className="block">
                  <ProductImage
                    src={heroJar.cutout}
                    alt={`${heroJar.name[lang]} 1kg`}
                    priority
                    className="aspect-[4/5]"
                    imgClassName="drop-shadow-2xl"
                  />
                </Link>
              </div>
            )}
            <img
              src={heartPeanut.url}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute -bottom-6 -right-2 w-28 md:w-40 opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <section className="px-4 sm:px-6 py-16 md:py-24 bg-brand-paper">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-2xl md:text-4xl font-display font-medium leading-snug text-balance">
              {t("home.about.body")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 sm:px-6 py-20 md:py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 md:mb-14 gap-6">
            <div className="space-y-2 min-w-0">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-toast">
                {t("home.featured.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium">
                {t("home.featured.title")}
              </h2>
            </div>
            <Link
              to="/products"
              className="text-sm font-semibold border-b border-brand-roast pb-1 hover:border-brand-toast shrink-0"
            >
              {t("cta.viewAll")}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2+1 bundle strip */}
      <section className="px-4 sm:px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center bg-brand-roast text-brand-cream rounded-3xl p-8 md:p-12">
          <Link
            to="/products/$slug"
            params={{ slug: "bundle-2plus1" }}
            className="block rounded-2xl overflow-hidden bg-brand-cream/5"
          >
            <img
              src={promoImg.url}
              alt={ka ? "Pecho 2+1 შეთავაზება" : "Pecho 2+1 offer"}
              loading="lazy"
              className="block w-full h-auto object-contain"
            />
          </Link>
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-display font-medium leading-tight text-balance">
              {t("home.hero.title")}
            </h2>
            <p className="text-brand-cream/70 leading-relaxed max-w-md">{t("home.hero.subtitle")}</p>
            <Link
              to="/products/$slug"
              params={{ slug: "bundle-2plus1" }}
              className="inline-flex items-center gap-2 bg-brand-toast text-white px-7 py-4 rounded-full font-semibold hover:brightness-110 transition"
            >
              {t("cta.addToCart")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Food storytelling */}
      <section className="px-4 sm:px-6 py-16 md:py-24 bg-brand-paper">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8 items-center">
          <Reveal>
            <img
              src={classicBread.url}
              alt={ka ? "კლასიკური Pecho პურზე" : "Classic Pecho on bread"}
              loading="lazy"
              className="w-full aspect-square object-contain"
            />
          </Reveal>
          <Reveal delay={80}>
            <img
              src={breadPhoto.url}
              alt={ka ? "მიწისთხილის კარაქი პურზე" : "Peanut butter on bread"}
              loading="lazy"
              className="w-full aspect-square object-cover rounded-3xl ring-1 ring-black/5"
            />
          </Reveal>
          <Reveal delay={160}>
            <img
              src={crunchyBread.url}
              alt={ka ? "ხრაშუნა Pecho პურზე" : "Crunchy Pecho on bread"}
              loading="lazy"
              className="w-full aspect-square object-contain"
            />
          </Reveal>
        </div>
      </section>

      {/* Recipes */}
      <section className="px-4 sm:px-6 py-20 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 md:mb-14 gap-6">
            <h2 className="text-3xl md:text-4xl font-display font-medium">{t("recipes.title")}</h2>
            <Link
              to="/recipes"
              className="text-sm font-semibold border-b border-brand-roast pb-1 hover:border-brand-toast shrink-0"
            >
              {t("cta.viewAll")}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {recipePreview.map((r) => (
              <Link
                key={r.slug}
                to="/recipes/$slug"
                params={{ slug: r.slug }}
                className="group block bg-brand-paper rounded-3xl overflow-hidden ring-1 ring-black/5 hover:ring-brand-toast/40 transition-all"
              >
                <div className="relative aspect-[4/5] bg-brand-roast/90">
                  {r.poster ? (
                    <img src={r.poster} alt="" loading="lazy" className="w-full h-full object-cover" />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center bg-brand-roast/25">
                    <PlayCircle className="size-14 text-white drop-shadow-lg" strokeWidth={1.4} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-display leading-snug group-hover:text-brand-toast transition-colors">
                    {r.title[lang]}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="px-4 sm:px-6 py-20 md:py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img
            src={spoonPhoto.url}
            alt={ka ? "Pecho მიწისთხილის კარაქი კოვზზე" : "Pecho peanut butter on a spoon"}
            loading="lazy"
            className="w-full aspect-square object-cover rounded-3xl ring-1 ring-black/5"
          />
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-toast">
              {t("home.about.eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium leading-tight text-balance">
              {t("home.about.title")}
            </h2>
            <p className="text-brand-roast/70 leading-relaxed max-w-lg">{t("home.about.body")}</p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold border-b border-brand-roast pb-1 hover:border-brand-toast"
            >
              {t("cta.ourStory")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="px-4 sm:px-6 py-20 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 md:mb-14 gap-6">
            <h2 className="text-3xl md:text-4xl font-display font-medium">{t("home.news.title")}</h2>
            <Link
              to="/news"
              className="text-sm font-semibold border-b border-brand-roast pb-1 hover:border-brand-toast shrink-0"
            >
              {t("cta.viewAll")}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {latest.map((post) => (
              <Link
                key={post.slug}
                to="/news/$slug"
                params={{ slug: post.slug }}
                className="group block bg-brand-beige rounded-2xl p-8 ring-1 ring-black/5 hover:ring-brand-toast/40 transition-all"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-roast/50">
                  {formatDate(post.date, lang)}
                </span>
                <h3 className="text-xl font-display mt-3 group-hover:text-brand-toast transition-colors">
                  {post.title[lang]}
                </h3>
                <p className="text-sm text-brand-roast/60 mt-3 leading-relaxed">
                  {post.excerpt[lang]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="px-4 sm:px-6 py-20 md:py-24 bg-brand-paper">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-center mb-12">
            {t("home.faq.title")}
          </h2>
          <div className="divide-y divide-brand-roast/10 border-y border-brand-roast/10">
            {[
              {
                q: ka ? "რამდენ ხანში მოვა შეკვეთა?" : "How long does delivery take?",
                a: ka
                  ? "2–3 სამუშაო დღე მთელ საქართველოში."
                  : "2–3 business days anywhere in Georgia.",
              },
              {
                q: ka ? "როგორ შევინახო?" : "How should I store the peanut butter?",
                a: ka
                  ? "მშრალ, გრილ ადგილას. გახსნის შემდეგ — მაცივარში."
                  : "In a cool, dry place. After opening, refrigerate for freshness.",
              },
              {
                q: ka ? "აქვს დამატებული შაქარი?" : "Does it contain added sugar?",
                a: ka
                  ? "არა — მხოლოდ მიწისთხილი და ზღვის მარილი."
                  : "No — only peanuts and sea salt.",
              },
              {
                q: ka ? "სპორტსმენებისთვის გამოსადეგია?" : "Is it suitable for athletes?",
                a: ka
                  ? "დიახ — 26გ ცილა 100 გრამზე, ბუნებრივი ცხიმები, დამატებული ცხიმების გარეშე."
                  : "Yes — 26g of protein per 100g, natural fats, no added oils.",
              },
            ].map((item, i) => (
              <details key={i} className="group py-5">
                <summary className="list-none flex justify-between items-center cursor-pointer">
                  <span className="text-sm md:text-base font-medium pr-4">{item.q}</span>
                  <span className="text-2xl text-brand-toast transition-transform group-open:rotate-45 shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-brand-roast/70 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/faq"
              className="text-sm font-semibold border-b border-brand-roast pb-1 hover:border-brand-toast"
            >
              {t("cta.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Where to buy */}
      <section className="px-4 sm:px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <header className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-medium text-balance">
              სად შეგიძლიათ ჩვენი პროდუქტის შეძენა
            </h2>
            <p className="mt-4 text-brand-roast/70">იპოვეთ თქვენთან ყველაზე ახლოს არსებული მაღაზია.</p>
          </header>
          <Reveal>
            <StoreMap />
          </Reveal>
        </div>
      </section>

      {/* Contact strip */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-7xl mx-auto bg-brand-roast text-brand-cream rounded-3xl p-8 md:p-14 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-display font-medium">
              {t("home.contact.title")}
            </h2>
            <p className="text-brand-cream/60 max-w-md">{t("home.contact.body")}</p>
          </div>
          <div className="md:justify-self-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-toast text-white px-7 py-4 rounded-full font-semibold hover:brightness-110 transition-transform active:scale-95"
            >
              {t("nav.contact")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
