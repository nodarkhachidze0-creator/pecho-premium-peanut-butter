import { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Ban, ChevronLeft, ChevronRight, Leaf, ShieldCheck, WheatOff } from "lucide-react";
import { products } from "@/data/products";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: WheatOff,
    label: { ka: "არ შეიცავს შაქარს", en: "No added sugar" },
  },
  {
    icon: Ban,
    label: { ka: "პალმის ზეთის გარეშე", en: "No palm oil" },
  },
  {
    icon: Leaf,
    label: { ka: "სამარხვო", en: "Vegan" },
  },
  {
    icon: ShieldCheck,
    label: { ka: "NON-GMO", en: "NON-GMO" },
  },
] as const;

export function ProductCoverFlow() {
  const { lang } = useT();
  const carouselProducts = useMemo(
    () => products.filter((product) => product.category !== "bundle"),
    [],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((current) => {
        const total = carouselProducts.length;
        const target = ((index % total) + total) % total;
        if (target === current) return current;
        const forward = (target - current + total) % total;
        setDirection(forward <= total / 2 ? "next" : "prev");
        return target;
      });
    },
    [carouselProducts.length],
  );

  const previousIndex = (activeIndex - 1 + carouselProducts.length) % carouselProducts.length;
  const nextIndex = (activeIndex + 1) % carouselProducts.length;
  const activeProduct = carouselProducts[activeIndex];
  const previousProduct = carouselProducts[previousIndex];
  const nextProduct = carouselProducts[nextIndex];

  if (!activeProduct || !previousProduct || !nextProduct) return null;

  const imageClass = (slug: string, side = false) => {
    if (slug === "crunchy-450g") {
      return side
        ? "max-h-[64%] max-w-[88%] scale-x-[1.27]"
        : "max-h-[80%] max-w-[98%] scale-x-[1.27]";
    }
    if (slug.endsWith("-1kg")) {
      return side ? "max-h-[82%] max-w-[88%]" : "max-h-[98%] max-w-[98%]";
    }
    return side ? "max-h-[72%] max-w-[78%]" : "max-h-[88%] max-w-[88%]";
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0]?.clientX - touchStartX.current;
    touchStartX.current = null;
    if (distance === undefined || Math.abs(distance) < 45) return;
    goTo(distance < 0 ? activeIndex + 1 : activeIndex - 1);
  };

  return (
    <section
      className="coverflow-stage relative isolate overflow-hidden bg-brand-cream px-4 py-20 text-brand-roast sm:px-6 md:py-28"
      aria-roledescription="carousel"
      aria-label={lang === "ka" ? "Pecho-ს პროდუქტები" : "Pecho products"}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goTo(activeIndex - 1);
        if (event.key === "ArrowRight") goTo(activeIndex + 1);
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={handleTouchEnd}
    >
      <div className="coverflow-spotlight pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2" />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => goTo(activeIndex - 1)}
        aria-label={lang === "ka" ? "წინა პროდუქტი" : "Previous product"}
        className="absolute left-3 top-1/2 z-20 size-11 -translate-y-1/2 rounded-full border border-brand-roast/15 bg-brand-paper/80 text-brand-roast backdrop-blur-md hover:bg-brand-toast hover:text-white sm:left-6 md:size-12"
      >
        <ChevronLeft className="size-5" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => goTo(activeIndex + 1)}
        aria-label={lang === "ka" ? "შემდეგი პროდუქტი" : "Next product"}
        className="absolute right-3 top-1/2 z-20 size-11 -translate-y-1/2 rounded-full border border-brand-roast/15 bg-brand-paper/80 text-brand-roast backdrop-blur-md hover:bg-brand-toast hover:text-white sm:right-6 md:size-12"
      >
        <ChevronRight className="size-5" />
      </Button>

      <div className="mx-auto max-w-7xl">
        <header className="relative z-10 mx-auto min-h-24 max-w-3xl text-center" aria-live="polite">
          <h2 className="font-display text-3xl font-extrabold leading-tight text-brand-roast sm:text-4xl md:text-5xl">
            {activeProduct.name[lang]}
          </h2>
          <p className="mt-3 font-ui text-sm text-brand-roast/60 sm:text-base">
            {activeProduct.weight}
          </p>
        </header>

        <div className="relative mt-4 grid h-[390px] grid-cols-[1fr_minmax(230px,360px)_1fr] items-center sm:h-[470px] md:h-[520px]">
          <Button
            type="button"
            variant="ghost"
            onClick={() => goTo(previousIndex)}
            aria-label={`${previousProduct.name[lang]} — ${lang === "ka" ? "არჩევა" : "select"}`}
            className="coverflow-side hidden h-full min-w-0 items-center justify-end bg-transparent p-0 hover:bg-transparent md:flex"
          >
            <img
              src={previousProduct.image}
              alt=""
              className={`${imageClass(previousProduct.slug, true)} object-contain`}
            />
          </Button>

          <Link
            key={activeProduct.slug}
            to="/products/$slug"
            params={{ slug: activeProduct.slug }}
            aria-label={`${activeProduct.name[lang]} — ${lang === "ka" ? "პროდუქტის ნახვა" : "view product"}`}
            data-dir={direction}
            className="coverflow-active relative z-10 col-start-2 flex h-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-toast focus-visible:ring-offset-4 focus-visible:ring-offset-brand-cream"
          >
            <img
              src={activeProduct.image}
              alt={activeProduct.name[lang]}
              className={`coverflow-float ${imageClass(activeProduct.slug)} object-contain`}
            />
          </Link>

          <Button
            type="button"
            variant="ghost"
            onClick={() => goTo(nextIndex)}
            aria-label={`${nextProduct.name[lang]} — ${lang === "ka" ? "არჩევა" : "select"}`}
            className="coverflow-side hidden h-full min-w-0 items-center justify-start bg-transparent p-0 hover:bg-transparent md:flex"
          >
            <img
              src={nextProduct.image}
              alt=""
              className={`${imageClass(nextProduct.slug, true)} object-contain`}
            />
          </Button>
        </div>

        <ul className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-x-5 gap-y-5 sm:flex sm:flex-wrap sm:justify-center sm:gap-8 md:mt-8 md:gap-12">
          {features.map(({ icon: Icon, label }) => (
            <li key={label.en} className="flex items-center justify-center gap-2 font-ui text-[11px] uppercase text-brand-roast/75 sm:text-xs">
              <Icon className="size-4 shrink-0 text-brand-toast" strokeWidth={1.7} aria-hidden="true" />
              <span>{label[lang]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}