import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

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
  const { t, lang } = useT();

  const items =
    lang === "ka"
      ? [
          { q: "რამდენ ხანში მიწოდება?", a: "2–3 სამუშაო დღე მთელ საქართველოში." },
          {
            q: "როგორ ვინახოთ მიწისთხილის კარაქი?",
            a: "მშრალ, გრილ ადგილას. გახსნის შემდეგ — მაცივარში 1 თვემდე.",
          },
          {
            q: "აქვს დამატებული შაქარი?",
            a: "კლასიკური და ხრაშუნა ვერსია — არა. თაფლის და შოკოლადის ვერსიები ბუნებრივ დამატებებს შეიცავს.",
          },
          {
            q: "სპორტსმენებისთვის გამოსადეგია?",
            a: "დიახ — 26გ ცილა 100 გრამზე, ბუნებრივი ცხიმები.",
          },
          {
            q: "გადახდის მეთოდი?",
            a: "მხოლოდ ადგილზე გადახდა — ნაღდი ან ბარათი. ონლაინ გადახდა არ არის.",
          },
          {
            q: "შემიძლია დავაბრუნო შეკვეთა?",
            a: "თუ პროდუქტთან რაიმე პრობლემაა, დაგვიკავშირდი 24 საათში — გაცვლას ან თანხის დაბრუნებას მოვახდენთ.",
          },
          {
            q: "ვეგანური?",
            a: "დიახ — გარდა თაფლის ვერსიისა, ყველა ჩვენი პროდუქტი მცენარეულია.",
          },
        ]
      : [
          { q: "How long does delivery take?", a: "2–3 business days anywhere in Georgia." },
          {
            q: "How should peanut butter be stored?",
            a: "In a cool, dry place. After opening, refrigerate for up to a month.",
          },
          {
            q: "Does it contain added sugar?",
            a: "No — Classic and Crunchy are just peanuts and salt. Flavored lines contain honey or dark chocolate.",
          },
          {
            q: "Is it suitable for athletes?",
            a: "Yes — 26g of protein per 100g, natural fats, no added oils or fillers.",
          },
          {
            q: "What payment methods are available?",
            a: "Cash or Card on Delivery only. We do not accept online payments at this time.",
          },
          {
            q: "Can I return an order?",
            a: "If anything is wrong with your order, contact us within 24 hours for an exchange or refund.",
          },
          {
            q: "Is it vegan?",
            a: "Yes — all products except the Honey Blend are 100% plant-based.",
          },
        ];

  return (
    <section className="px-4 sm:px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-medium">{t("faq.title")}</h1>
          <p className="text-brand-roast/70 mt-4 text-lg">{t("faq.subtitle")}</p>
        </header>

        <div className="divide-y divide-brand-roast/10 border-y border-brand-roast/10">
          {items.map((item, i) => (
            <details key={i} className="group py-6">
              <summary className="list-none flex justify-between items-center cursor-pointer gap-4">
                <span className="text-base md:text-lg font-medium">{item.q}</span>
                <span className="text-2xl text-brand-toast transition-transform group-open:rotate-45 shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-4 text-brand-roast/70 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
