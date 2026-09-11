import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { formatDate } from "@/lib/format-date";
import { news } from "@/data/news";
import { Reveal } from "@/components/Reveal";
import { StoreMap } from "@/components/StoreMap";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { ProductCoverFlow } from "@/components/ProductCoverFlow";

import heroImg from "@/assets/classic-1kg-lifestyle.webp.asset.json";
import aboutTexture from "@/assets/about-texture.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { t, lang } = useT();
  const latest = news.slice(0, 3);


  return (
    <>
      {/* Hero */}
      <section className="relative px-4 sm:px-6 pt-24 md:pt-32 pb-12 md:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-toast">
              {t("home.hero.eyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.05] text-balance">
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
                to="/about"
                className="inline-flex items-center px-7 py-4 rounded-full font-semibold border border-brand-roast/20 hover:bg-brand-paper transition-colors"
              >
                {t("cta.ourStory")}
              </Link>
            </div>
          </div>
          <div className="relative hero-float mx-auto w-full max-w-md lg:max-w-lg">
            <Link
              to="/products"
              className="block rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-2xl bg-brand-paper"
            >
              <img
                src={heroImg.url}
                alt="Pecho natural peanut butter jar"
                className="block w-full h-auto object-cover"
              />
            </Link>

          </div>


        </div>
      </section>



      {/* Featured Products */}
      <ProductCoverFlow />

      {/* Where you'll find us — partner marquee */}
      <section className="px-4 sm:px-6 py-14 md:py-16 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-8 md:mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-toast">
              {lang === "ka" ? "პარტნიორები" : "Partners"}
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-display font-extrabold">
              {lang === "ka" ? "სად შეგხვდებით" : "Where to find us"}
            </h2>
          </header>
          <PartnerMarquee />
        </div>
      </section>





      {/* About preview */}
      <section className="bg-brand-paper px-4 py-14 sm:px-6 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12">
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl ring-1 ring-brand-roast/5">
            <img
              src={aboutTexture}
              alt="Peanut butter texture on wooden spoon"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-toast">
              {t("home.about.eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold leading-tight text-balance">
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
            <h2 className="text-3xl md:text-4xl font-display font-extrabold">{t("home.news.title")}</h2>
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

      {/* Where to buy */}
      <section className="px-4 sm:px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <header className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-balance">
              სად შეგიძლიათ ჩვენი პროდუქტის შეძენა
            </h2>
            <p className="mt-4 text-brand-roast/70">
              იპოვეთ თქვენთან ყველაზე ახლოს არსებული მაღაზია.
            </p>
          </header>
          <Reveal>
            <StoreMap />
          </Reveal>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="px-4 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-display font-extrabold md:text-4xl">
            {t("home.faq.title")}
          </h2>
          <div className="divide-y divide-brand-roast/10 border-y border-brand-roast/10">
            {[
              {
                q: lang === "ka" ? "🚚 რამდენ ხანში ხდება მიწოდება?" : "🚚 How long does delivery take?",
                a: lang === "ka"
                  ? "თბილისში მიწოდება ხდება 2–3 სამუშაო დღეში, ხოლო საქართველოს სხვა რეგიონებში — 3–4 სამუშაო დღეში. შეკვეთის დადასტურების შემდეგ დავამზადებთ და კურიერი მოგაწვდით პროდუქტს ადგილზე."
                  : "Delivery in Tbilisi takes 2–3 business days; other regions of Georgia — 3–4 business days. Once your order is confirmed, we prepare it and a courier delivers it to you.",
              },
              {
                q: lang === "ka" ? "🥜 როგორ შევინახო მიწისთხილის კარაქი?" : "🥜 How should I store the peanut butter?",
                a: lang === "ka"
                  ? "ჩვენი ნატურალური მიწისთხილის კარაქის შენახვა შესაძლებელია როგორც ოთახის ტემპერატურაზე, ასევე მაცივარში. საუკეთესო ხარისხის შესანარჩუნებლად გირჩევთ, მოარიდოთ პირდაპირ მზის სხივებს და შეინახოთ მშრალ, გრილ ადგილას."
                  : "Our natural peanut butter can be stored at room temperature or in the fridge. To preserve the best quality, keep it away from direct sunlight in a cool, dry place.",
              },
              {
                q: lang === "ka" ? "🌿 შეიცავს თუ არა დანამატებს ან შაქარს?" : "🌿 Does it contain any additives or sugar?",
                a: lang === "ka"
                  ? "არა. Pecho-ის მიწისთხილის კარაქი მზადდება 100% ნატურალური მიწისთხილისგან. არ შეიცავს დამატებულ შაქარს, პალმის ზეთს, კონსერვანტებს, ხელოვნურ არომატიზატორებსა და სხვა დანამატებს."
                  : "No. Pecho peanut butter is made from 100% natural peanuts. It contains no added sugar, palm oil, preservatives, artificial flavors, or other additives.",
              },
              {
                q: lang === "ka" ? "💪 სპორტსმენებისთვის თუ არის რეკომენდებული?" : "💪 Is it recommended for athletes?",
                a: lang === "ka"
                  ? "დიახ. ჩვენი პროდუქტი შეიცავს 25 გრამ ცილას 100 გრამზე, ასევე ბუნებრივ ცხიმებსა და ენერგიის წყაროს, რაც მას შესანიშნავ არჩევანს ხდის სპორტსმენებისა და ჯანსაღი ცხოვრების წესის მიმდევრებისთვის."
                  : "Yes. Our product contains 25g of protein per 100g, along with natural fats and a source of energy, making it an excellent choice for athletes and people following a healthy lifestyle.",
              },
            ].map((item, i) => (
              <details key={i} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <span className="pr-4 text-sm font-medium md:text-base">{item.q}</span>
                  <span className="shrink-0 text-2xl text-brand-toast transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-brand-roast/70">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/faq" className="border-b border-brand-roast pb-1 text-sm font-semibold hover:border-brand-toast">
              {t("cta.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Contact strip */}

      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-7xl mx-auto bg-brand-roast text-brand-cream rounded-3xl p-8 md:p-14 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold">{t("home.contact.title")}</h2>
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
