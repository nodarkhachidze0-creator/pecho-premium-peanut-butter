import smooth from "@/assets/product-smooth.jpg";
import crunchy from "@/assets/product-crunchy.jpg";
import seasalt from "@/assets/product-seasalt.jpg";
import chocolate from "@/assets/product-chocolate.jpg";
import honey from "@/assets/product-honey.jpg";

export type Category = "classic" | "crunchy" | "flavored" | "limited";

export type Product = {
  slug: string;
  name: { en: string; ka: string };
  short: { en: string; ka: string };
  description: { en: string; ka: string };
  price: number;
  weight: string;
  category: Category;
  image: string;
  ingredients: { en: string; ka: string };
  nutrition: { label: { en: string; ka: string }; value: string }[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "smooth-classic",
    name: { en: "Smooth Classic", ka: "გლუვი კლასიკური" },
    short: {
      en: "Velvety, slow-roasted, subtly salted.",
      ka: "ხავერდოვანი, ნელა მოხალული, მსუბუქად დამარილებული.",
    },
    description: {
      en: "Our flagship: Kakheti-grown peanuts roasted for depth, ground into a silky ribbon, finished with a whisper of Svaneti salt. Nothing else.",
      ka: "ჩვენი მთავარი პროდუქტი: კახეთის მიწისთხილი ღრმა გემოსთვის მოხალული, აბრეშუმის რიბონად დაფქვილი, სვანური მარილის ერთი ჩურჩულით.",
    },
    price: 18.5,
    weight: "300g",
    category: "classic",
    image: smooth,
    ingredients: {
      en: "100% roasted peanuts, sea salt.",
      ka: "100% მოხალული მიწისთხილი, ზღვის მარილი.",
    },
    nutrition: [
      { label: { en: "Energy", ka: "ენერგია" }, value: "598 kcal" },
      { label: { en: "Protein", ka: "ცილა" }, value: "26 g" },
      { label: { en: "Fat", ka: "ცხიმი" }, value: "50 g" },
      { label: { en: "Carbohydrates", ka: "ნახშირწყლები" }, value: "20 g" },
      { label: { en: "Sugars", ka: "შაქარი" }, value: "4 g" },
      { label: { en: "Salt", ka: "მარილი" }, value: "0.6 g" },
    ],
    featured: true,
  },
  {
    slug: "extra-crunchy",
    name: { en: "Extra Crunchy", ka: "ხრაშუნა ექსტრა" },
    short: {
      en: "Double-roasted with generous chunks.",
      ka: "ორმაგად მოხალული, დიდი ნაჭრებით.",
    },
    description: {
      en: "For the crunch obsessives. Deep-roasted peanuts blended with large peanut pieces for a jar that fights back.",
      ka: "მათთვის, ვინც ხრაშუნას ეთაყვანება. ღრმად მოხალული მიწისთხილი დიდი ნაჭრებით.",
    },
    price: 19.5,
    weight: "300g",
    category: "crunchy",
    image: crunchy,
    ingredients: {
      en: "100% roasted peanuts, sea salt.",
      ka: "100% მოხალული მიწისთხილი, ზღვის მარილი.",
    },
    nutrition: [
      { label: { en: "Energy", ka: "ენერგია" }, value: "602 kcal" },
      { label: { en: "Protein", ka: "ცილა" }, value: "26 g" },
      { label: { en: "Fat", ka: "ცხიმი" }, value: "50 g" },
      { label: { en: "Carbohydrates", ka: "ნახშირწყლები" }, value: "20 g" },
      { label: { en: "Sugars", ka: "შაქარი" }, value: "4 g" },
      { label: { en: "Salt", ka: "მარილი" }, value: "0.6 g" },
    ],
    featured: true,
  },
  {
    slug: "sea-salt-reserve",
    name: { en: "Sea Salt Reserve", ka: "ზღვის მარილის რეზერვი" },
    short: {
      en: "Finished with flaky Maldon salt.",
      ka: "დაფარული ფარფატა Maldon-ის მარილით.",
    },
    description: {
      en: "A small-batch tribute to salt. Our smooth base, topped with generous flakes for a finish that crystallizes on the tongue.",
      ka: "მცირე პარტიის ხარკი მარილს. ჩვენი გლუვი ბაზა, დაფარული უხვი ფარფატებით.",
    },
    price: 22.0,
    weight: "300g",
    category: "flavored",
    image: seasalt,
    ingredients: {
      en: "Roasted peanuts, flaky sea salt.",
      ka: "მოხალული მიწისთხილი, ფარფატა ზღვის მარილი.",
    },
    nutrition: [
      { label: { en: "Energy", ka: "ენერგია" }, value: "600 kcal" },
      { label: { en: "Protein", ka: "ცილა" }, value: "26 g" },
      { label: { en: "Fat", ka: "ცხიმი" }, value: "50 g" },
      { label: { en: "Carbohydrates", ka: "ნახშირწყლები" }, value: "20 g" },
      { label: { en: "Sugars", ka: "შაქარი" }, value: "4 g" },
      { label: { en: "Salt", ka: "მარილი" }, value: "0.9 g" },
    ],
    featured: true,
  },
  {
    slug: "dark-chocolate",
    name: { en: "Dark Chocolate", ka: "შავი შოკოლადი" },
    short: {
      en: "70% cocoa folded through the roast.",
      ka: "70% კაკაო მოხალვაში გახვეული.",
    },
    description: {
      en: "Roasted peanuts swirled with 70% dark chocolate. Rich, glossy, and deeply satisfying — like the best half of a spoonful of dessert.",
      ka: "მოხალული მიწისთხილი 70% შავ შოკოლადთან ერთად. მდიდარი, პრიალა, ღრმად დამაკმაყოფილებელი.",
    },
    price: 24.0,
    weight: "300g",
    category: "flavored",
    image: chocolate,
    ingredients: {
      en: "Roasted peanuts, 70% dark chocolate, sea salt.",
      ka: "მოხალული მიწისთხილი, 70% შავი შოკოლადი, ზღვის მარილი.",
    },
    nutrition: [
      { label: { en: "Energy", ka: "ენერგია" }, value: "612 kcal" },
      { label: { en: "Protein", ka: "ცილა" }, value: "23 g" },
      { label: { en: "Fat", ka: "ცხიმი" }, value: "48 g" },
      { label: { en: "Carbohydrates", ka: "ნახშირწყლები" }, value: "26 g" },
      { label: { en: "Sugars", ka: "შაქარი" }, value: "12 g" },
      { label: { en: "Salt", ka: "მარილი" }, value: "0.5 g" },
    ],
  },
  {
    slug: "honey-blend",
    name: { en: "Honey Blend", ka: "თაფლის ნაზავი" },
    short: {
      en: "Sweetened with Kakhetian honey.",
      ka: "დატკბობილი კახური თაფლით.",
    },
    description: {
      en: "A gentle drizzle of raw Kakhetian honey folded into our smooth base. Warm, floral, and just sweet enough.",
      ka: "კახური თაფლი ჩვენს გლუვ ბაზაში. თბილი, ყვავილოვანი და საკმარისად ტკბილი.",
    },
    price: 21.0,
    weight: "300g",
    category: "flavored",
    image: honey,
    ingredients: {
      en: "Roasted peanuts, raw Kakhetian honey, sea salt.",
      ka: "მოხალული მიწისთხილი, კახური თაფლი, ზღვის მარილი.",
    },
    nutrition: [
      { label: { en: "Energy", ka: "ენერგია" }, value: "605 kcal" },
      { label: { en: "Protein", ka: "ცილა" }, value: "24 g" },
      { label: { en: "Fat", ka: "ცხიმი" }, value: "48 g" },
      { label: { en: "Carbohydrates", ka: "ნახშირწყლები" }, value: "24 g" },
      { label: { en: "Sugars", ka: "შაქარი" }, value: "10 g" },
      { label: { en: "Salt", ka: "მარილი" }, value: "0.5 g" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeatured() {
  return products.filter((p) => p.featured);
}

export function getRelated(slug: string, limit = 3) {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}
