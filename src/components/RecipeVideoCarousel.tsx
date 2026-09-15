import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { recipes } from "@/data/recipes";
import { useT } from "@/lib/i18n";

export function RecipeVideoCarousel() {
  const { lang } = useT();
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef(new Map<string, HTMLVideoElement>());
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const preview = (slug: string) => {
    if (activeSlug === slug) return;
    const video = videoRefs.current.get(slug);
    if (!video) return;
    video.muted = true;
    void video.play().catch(() => undefined);
  };

  const pausePreview = (slug: string) => {
    if (activeSlug === slug) return;
    videoRefs.current.get(slug)?.pause();
  };

  const activate = (slug: string) => {
    videoRefs.current.forEach((video, key) => {
      if (key !== slug) {
        video.pause();
        video.muted = true;
      }
    });
    const video = videoRefs.current.get(slug);
    if (!video) return;
    setActiveSlug(slug);
    video.controls = true;
    video.muted = false;
    void video.play().catch(() => undefined);
  };

  const scroll = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({ left: direction * Math.min(420, window.innerWidth * 0.82), behavior: "smooth" });
  };

  return (
    <section className="bg-brand-cream px-4 py-16 sm:px-6 md:py-20" aria-labelledby="recipe-videos-heading">
      <div className="mx-auto max-w-7xl">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <p className="font-label text-xs font-bold uppercase tracking-widest text-brand-toast">
              {lang === "ka" ? "Pecho-სთან ერთად" : "Made with Pecho"}
            </p>
            <h2 id="recipe-videos-heading" className="mt-2 font-display text-2xl font-extrabold md:text-3xl">
              {lang === "ka" ? "ვიდეო რეცეპტები" : "Video recipes"}
            </h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button type="button" variant="outline" size="icon" onClick={() => scroll(-1)} className="rounded-full border-brand-roast/15 bg-brand-paper text-brand-roast" aria-label={lang === "ka" ? "წინა ვიდეო" : "Previous video"}>
              <ChevronLeft className="size-5" />
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={() => scroll(1)} className="rounded-full border-brand-roast/15 bg-brand-paper text-brand-roast" aria-label={lang === "ka" ? "შემდეგი ვიდეო" : "Next video"}>
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </header>

        <div ref={trackRef} className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6">
          {recipes.map((recipe) => {
            const active = activeSlug === recipe.slug;
            return (
              <article key={recipe.slug} className="w-[78vw] max-w-[330px] shrink-0 snap-start sm:w-[310px]">
                <div
                  className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-brand-roast"
                  onMouseEnter={() => preview(recipe.slug)}
                  onMouseLeave={() => pausePreview(recipe.slug)}
                  onFocus={() => preview(recipe.slug)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) pausePreview(recipe.slug);
                  }}
                >
                  <video
                    ref={(node) => {
                      if (node) videoRefs.current.set(recipe.slug, node);
                      else videoRefs.current.delete(recipe.slug);
                    }}
                    src={recipe.videoUrl}
                    poster={recipe.imageUrl}
                    preload="metadata"
                    playsInline
                    muted={!active}
                    controls={active}
                    onClick={() => activate(recipe.slug)}
                    aria-label={recipe.title[lang]}
                    className="size-full cursor-pointer object-cover"
                  />
                  {!active && (
                    <button
                      type="button"
                      onClick={() => activate(recipe.slug)}
                      className="absolute inset-0 grid place-items-center bg-brand-roast/20 text-brand-cream transition-colors hover:bg-brand-roast/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-toast"
                      aria-label={lang === "ka" ? `${recipe.title.ka} — ხმით დაკვრა` : `${recipe.title.en} — play with sound`}
                    >
                      <span className="grid size-14 place-items-center rounded-full bg-brand-paper/90 text-brand-roast shadow-lg">
                        <Play className="ml-1 size-6" fill="currentColor" />
                      </span>
                    </button>
                  )}
                </div>
                <Link to="/recipes/$slug" params={{ slug: recipe.slug }} className="mt-4 block font-display text-lg font-bold leading-snug text-brand-roast transition-colors hover:text-brand-toast">
                  {recipe.title[lang]}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}