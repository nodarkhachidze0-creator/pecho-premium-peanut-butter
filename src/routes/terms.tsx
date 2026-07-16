import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Pecho" },
      { name: "description", content: "Pecho terms and conditions." },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { lang } = useT();
  const ka = lang === "ka";
  return (
    <article className="px-4 sm:px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-medium mb-8">
          {ka ? "წესები და პირობები" : "Terms & Conditions"}
        </h1>
        <div className="space-y-6 text-brand-roast/80 leading-relaxed">
          <p>
            {ka
              ? "Pecho.ge-ს გამოყენებით თქვენ ეთანხმებით ქვემოთ მოცემულ პირობებს."
              : "By using Pecho.ge you agree to the terms below."}
          </p>
          <h2 className="text-xl font-display mt-8">{ka ? "შეკვეთა" : "Orders"}</h2>
          <p>
            {ka
              ? "შეკვეთა ფორმდება საიტზე. მიწოდება — 2–3 სამუშაო დღეში მთელ საქართველოში. გადახდა ხდება ადგილზე ნაღდი ან ბარათით."
              : "Orders are placed on the site. Delivery in 2–3 business days across Georgia. Payment is Cash or Card on Delivery."}
          </p>
          <h2 className="text-xl font-display mt-8">{ka ? "დაბრუნება" : "Returns"}</h2>
          <p>
            {ka
              ? "თუ პროდუქტი დაზიანებულია მიწოდებისას, გთხოვთ დაგვიკავშირდეთ 24 საათში ჩანაცვლებისთვის."
              : "If a product arrives damaged, please contact us within 24 hours for a replacement."}
          </p>
          <h2 className="text-xl font-display mt-8">{ka ? "კონტაქტი" : "Contact"}</h2>
          <p>Pecho.official@gmail.com · 595 55 17 80 · ქ. გორი, შინდისის გმირების 17ბ</p>
        </div>
      </div>
    </article>
  );
}
