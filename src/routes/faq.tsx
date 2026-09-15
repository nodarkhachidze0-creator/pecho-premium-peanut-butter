import { createFileRoute } from "@tanstack/react-router";
import { FAQSection } from "@/components/FAQSection";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Pecho | კითხვები" },
      { name: "description", content: "Delivery, storage, ingredients — everything you need to know." },
      { property: "og:title", content: "FAQ — Pecho" },
      { property: "og:description", content: "Everything you need to know about Pecho." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQPage,
});

function FAQPage() {
  return <FAQSection page />;
}
