import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getPost } from "@/data/news";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — Pecho" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.title.en} — Pecho` },
        { name: "description", content: loaderData.excerpt.en },
        { property: "og:title", content: loaderData.title.en },
        { property: "og:description", content: loaderData.excerpt.en },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/news/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/news/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-md mx-auto text-center py-32 px-6">
      <h1 className="text-3xl font-display">Post not found</h1>
      <Link to="/news" className="mt-6 inline-block text-brand-toast font-semibold">
        ← Back to news
      </Link>
    </div>
  ),
  component: NewsPost,
});

function NewsPost() {
  const post = Route.useLoaderData();
  const { t, lang } = useT();

  return (
    <article className="px-4 sm:px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-sm text-brand-roast/60 hover:text-brand-roast mb-8"
        >
          <ArrowLeft className="size-4" /> {t("nav.news")}
        </Link>
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-roast/50">
          {new Date(post.date).toLocaleDateString(lang === "ka" ? "ka-GE" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <h1 className="text-3xl md:text-5xl font-display font-medium mt-3 text-balance">
          {post.title[lang]}
        </h1>
        <p className="mt-6 text-xl text-brand-roast/70 leading-relaxed">{post.excerpt[lang]}</p>
        <div className="mt-8 prose max-w-none text-brand-roast/80 leading-relaxed whitespace-pre-line">
          {post.body[lang]}
        </div>
      </div>
    </article>
  );
}
