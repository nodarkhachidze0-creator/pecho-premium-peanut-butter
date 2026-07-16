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
          {
            q: "🚚 რამდენ ხანში ხდება მიწოდება?",
            a: "თბილისში მიწოდება ხდება 2–3 სამუშაო დღეში, ხოლო საქართველოს სხვა რეგიონებში — 3–4 სამუშაო დღეში. შეკვეთის დადასტურების შემდეგ დავამზადებთ და კურიერი მოგაწვდით პროდუქტს ადგილზე.",
          },
          {
            q: "🥜 როგორ შევინახო მიწისთხილის კარაქი?",
            a: "ჩვენი ნატურალური მიწისთხილის კარაქის შენახვა შესაძლებელია როგორც ოთახის ტემპერატურაზე, ასევე მაცივარში. საუკეთესო ხარისხის შესანარჩუნებლად გირჩევთ, მოარიდოთ პირდაპირ მზის სხივებს და შეინახოთ მშრალ, გრილ ადგილას.",
          },
          {
            q: "🌿 შეიცავს თუ არა დანამატებს ან შაქარს?",
            a: "არა. Pecho-ის მიწისთხილის კარაქი მზადდება 100% ნატურალური მიწისთხილისგან. არ შეიცავს დამატებულ შაქარს, პალმის ზეთს, კონსერვანტებს, ხელოვნურ არომატიზატორებსა და სხვა დანამატებს.",
          },
          {
            q: "💪 სპორტსმენებისთვის თუ არის რეკომენდებული?",
            a: "დიახ. ჩვენი პროდუქტი შეიცავს 25 გრამ ცილას 100 გრამზე, ასევე ბუნებრივ ცხიმებსა და ენერგიის წყაროს, რაც მას შესანიშნავ არჩევანს ხდის სპორტსმენებისა და ჯანსაღი ცხოვრების წესის მიმდევრებისთვის.",
          },
          {
            q: "💳 გადახდის რა მეთოდებია ხელმისაწვდომი?",
            a: "ამ ეტაპზე გადახდა შესაძლებელია მხოლოდ მიწოდებისას — ნაღდი ანგარიშსწორებით ან საბანკო ბარათით კურიერთან. ონლაინ გადახდა ამ ეტაპზე არ არის ხელმისაწვდომი.",
          },
          {
            q: "📦 შესაძლებელია თუ არა შეკვეთის დაბრუნება?",
            a: "დიახ. თუ პროდუქტი არ არის გახსნილი, მისი დაბრუნება ან გაცვლა შესაძლებელია მიღებიდან 24 საათის განმავლობაში. ასეთ შემთხვევაში დაგიბრუნებთ თანხას ან შეგიცვლით პროდუქტს.",
          },
          {
            q: "🌱 ვეგანურია?",
            a: "დიახ. ჩვენი მიწისთხილის კარაქი მზადდება მხოლოდ 100% ნატურალური მიწისთხილისგან და არ შეიცავს ცხოველური წარმოშობის ინგრედიენტებს, ამიტომ იგი სრულად ვეგანური პროდუქტია.",
          },
        ]
      : [
          {
            q: "🚚 How long does delivery take?",
            a: "Delivery in Tbilisi takes 2–3 business days; other regions of Georgia — 3–4 business days. Once your order is confirmed, we prepare it and a courier delivers it to you.",
          },
          {
            q: "🥜 How should I store the peanut butter?",
            a: "Our natural peanut butter can be stored at room temperature or in the fridge. To preserve the best quality, keep it away from direct sunlight in a cool, dry place.",
          },
          {
            q: "🌿 Does it contain any additives or sugar?",
            a: "No. Pecho peanut butter is made from 100% natural peanuts. No added sugar, palm oil, preservatives, artificial flavors, or other additives.",
          },
          {
            q: "💪 Is it recommended for athletes?",
            a: "Yes. Our product contains 25g of protein per 100g, plus natural fats and clean energy — an excellent choice for athletes and anyone following a healthy lifestyle.",
          },
          {
            q: "💳 What payment methods are available?",
            a: "For now, payment is available only on delivery — cash or bank card with the courier. Online payments are not available at this time.",
          },
          {
            q: "📦 Can I return an order?",
            a: "Yes. If the product is unopened, it can be returned or exchanged within 24 hours of delivery. We will refund or replace the product.",
          },
          {
            q: "🌱 Is it vegan?",
            a: "Yes. Our peanut butter is made from 100% natural peanuts and contains no animal-derived ingredients, so it is fully vegan.",
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
