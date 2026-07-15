import classicJar from "@/assets/pecho-classic-1kg.png.asset.json";
import crunchyJar from "@/assets/pecho-crunchy-1kg.png.asset.json";

export type Category = "classic" | "crunchy";

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

const classicNutrition = [
  { label: { en: "Energy", ka: "ენერგია" }, value: "598 kcal" },
  { label: { en: "Protein", ka: "ცილა" }, value: "26 g" },
  { label: { en: "Fat", ka: "ცხიმი" }, value: "50 g" },
  { label: { en: "Carbohydrates", ka: "ნახშირწყლები" }, value: "20 g" },
  { label: { en: "Sugars", ka: "შაქარი" }, value: "4 g" },
  { label: { en: "Salt", ka: "მარილი" }, value: "0.6 g" },
];

const ingredients = {
  en: "100% roasted peanuts, sea salt.",
  ka: "100% მოხალული მიწისთხილი, ზღვის მარილი.",
};

const classicName = { en: "Classic Peanut Butter", ka: "კლასიკური მიწისთხილის კარაქი" };
const crunchyName = { en: "Crunchy Peanut Butter", ka: "ხრაშუნა მიწისთხილის კარაქი" };

const classicShort = {
  en: "Velvety, slow-roasted, subtly salted.",
  ka: "ხავერდოვანი, ნელა მოხალული, მსუბუქად დამარილებული.",
};
const crunchyShort = {
  en: "Double-roasted with generous peanut chunks.",
  ka: "ორმაგად მოხალული, დიდი ნაჭრებით.",
};

const classicDesc = {
  en: "Our flagship: Kakheti-grown peanuts roasted for depth, ground into a silky ribbon, finished with a whisper of sea salt. Nothing else.",
  ka: "ჩვენი მთავარი პროდუქტი: კახეთის მიწისთხილი ღრმა გემოსთვის მოხალული, აბრეშუმის რიბონად დაფქვილი, ზღვის მარილის ერთი ჩურჩულით.",
};
const crunchyDesc = {
  en: "For crunch lovers. Deep-roasted peanuts blended with large peanut pieces for a jar that fights back.",
  ka: "მათთვის, ვინც ხრაშუნას ეთაყვანება. ღრმად მოხალული მიწისთხილი დიდი ნაჭრებით.",
};

export const products: Product[] = [
  {
    slug: "classic-450g",
    name: classicName,
    short: classicShort,
    description: classicDesc,
    price: 9,
    weight: "450g",
    category: "classic",
    image: classicJar.url,
    ingredients,
    nutrition: classicNutrition,
    featured: true,
  },
  {
    slug: "classic-1kg",
    name: classicName,
    short: classicShort,
    description: classicDesc,
    price: 19,
    weight: "1kg",
    category: "classic",
    image: classicJar.url,
    ingredients,
    nutrition: classicNutrition,
    featured: true,
  },
  {
    slug: "crunchy-450g",
    name: crunchyName,
    short: crunchyShort,
    description: crunchyDesc,
    price: 9,
    weight: "450g",
    category: "crunchy",
    image: crunchyJar.url,
    ingredients,
    nutrition: classicNutrition,
    featured: true,
  },
  {
    slug: "crunchy-1kg",
    name: crunchyName,
    short: crunchyShort,
    description: crunchyDesc,
    price: 19,
    weight: "1kg",
    category: "crunchy",
    image: crunchyJar.url,
    ingredients,
    nutrition: classicNutrition,
    featured: true,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeatured() {
  return products;
}

export function getRelated(slug: string, limit = 3) {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}
