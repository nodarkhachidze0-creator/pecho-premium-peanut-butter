import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Pecho" },
      { name: "description", content: "Pecho privacy policy." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { lang } = useT();
  const ka = lang === "ka";
  return (
    <article className="px-4 sm:px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto prose prose-neutral">
        <h1 className="text-4xl md:text-5xl font-display font-medium mb-8">
          {ka ? "კონფიდენციალურობის პოლიტიკა" : "Privacy Policy"}
        </h1>
        <div className="space-y-6 text-brand-roast/80 leading-relaxed">
          <p>
            {ka
              ? "Pecho პატივს სცემს თქვენს კონფიდენციალურობას. ეს გვერდი განმარტავს, თუ რა ინფორმაციას ვაგროვებთ და როგორ ვიყენებთ."
              : "Pecho respects your privacy. This page explains what information we collect and how we use it."}
          </p>
          <h2 className="text-xl font-display mt-8">
            {ka ? "რას ვაგროვებთ" : "What we collect"}
          </h2>
          <p>
            {ka
              ? "შეკვეთის გასაფორმებლად ვაგროვებთ: სახელი, ტელეფონი, მიწოდების მისამართი და დამატებითი შენიშვნა. ეს მონაცემები გამოიყენება მხოლოდ თქვენი შეკვეთის შესრულებისა და მიწოდებისთვის."
              : "To fulfil your order we collect: full name, phone number, delivery address and any additional notes. This information is used only to process and deliver your order."}
          </p>
          <h2 className="text-xl font-display mt-8">
            {ka ? "მონაცემთა გაზიარება" : "Data sharing"}
          </h2>
          <p>
            {ka
              ? "თქვენს მონაცემებს არ ვყიდით და არ ვუზიარებთ მესამე პირებს, გარდა კურიერისა, რომელიც ახორციელებს მიწოდებას."
              : "We do not sell or share your data with third parties, except for the courier who delivers your order."}
          </p>
          <h2 className="text-xl font-display mt-8">
            {ka ? "კონტაქტი" : "Contact"}
          </h2>
          <p>
            {ka
              ? "შეკითხვების შემთხვევაში: Pecho.official@gmail.com"
              : "For any questions: Pecho.official@gmail.com"}
          </p>
        </div>
      </div>
    </article>
  );
}
