import { createFileRoute, Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { news } from "@/data/news";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Journal — Pecho | სიახლეები" },
      { name: "description", content: "Recipes, announcements, and stories from Pecho." },
      { property: "og:title", content: "News — Pecho" },
      { property: "og:description", content: "Recipes, announcements, and stories from Pecho." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsIndex,
});

function NewsIndex() {
  const { t, lang } = useT();
  return (
    <section className="px-4 sm:px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 md:mb-16 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-display font-medium">{t("news.title")}</h1>
          <p className="text-brand-roast/70 mt-4 text-lg">{t("news.subtitle")}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {news.map((post) => (
            <Link
              key={post.slug}
              to="/news/$slug"
              params={{ slug: post.slug }}
              className="group block bg-brand-beige rounded-3xl p-8 md:p-10 ring-1 ring-black/5 hover:ring-brand-toast/40 transition-all"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-roast/50">
                {new Date(post.date).toLocaleDateString(lang === "ka" ? "ka-GE" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <h2 className="text-2xl md:text-3xl font-display mt-3 group-hover:text-brand-toast transition-colors">
                {post.title[lang]}
              </h2>
              <p className="text-brand-roast/60 mt-4 leading-relaxed">{post.excerpt[lang]}</p>
              <span className="mt-6 inline-block text-sm font-semibold border-b border-brand-roast pb-0.5 group-hover:border-brand-toast">
                {t("cta.readMore")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
