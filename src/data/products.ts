import classic1kgCutout from "@/assets/classic-1kg-cutout.webp.asset.json";
import classic1kgFront from "@/assets/classic-1kg-front.jpg.asset.json";
import classic450Cutout from "@/assets/classic-450g-cutout.webp.asset.json";
import classic450Front from "@/assets/classic-450g-front.jpg.asset.json";
import classicDessert from "@/assets/classic-dessert.jpg.asset.json";
import classicBread from "@/assets/classic-bread.webp.asset.json";
import crunchy450Cutout from "@/assets/crunchy-450g-cutout.webp.asset.json";
import crunchy450Front from "@/assets/crunchy-450g-front.jpg.asset.json";
import crunchyDessert from "@/assets/crunchy-dessert.jpg.asset.json";
import crunchyBread from "@/assets/crunchy-bread.webp.asset.json";
import crunchy1kgJar from "@/assets/pecho-crunchy-1kg.png.asset.json";
import bundleImg from "@/assets/pecho-promo-2plus1.png.asset.json";

export type Category = "classic" | "crunchy" | "bundle";
/** Flavour family — weight switching may only happen inside one family. */
export type Family = "classic" | "crunchy" | "bundle";

export type Product = {
  slug: string;
  name: { en: string; ka: string };
  short: { en: string; ka: string };
  description: { en: string; ka: string };
  price: number;
  originalPrice?: number;
  weight: string;
  /** Short label used by the weight selector, e.g. "450g". */
  weightLabel: string;
  category: Category;
  family: Family;
  /** Primary product shot (packshot on background). */
  image: string;
  /** Transparent cutout used for hero / floating treatments. */
  cutout: string;
  /** Editorial gallery shots for the product page. */
  gallery: string[];
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
  en: "Our flagship: peanuts roasted for depth, ground into a silky ribbon, finished with a whisper of sea salt. Nothing else.",
  ka: "ჩვენი მთავარი პროდუქტი: ღრმა გემოსთვის მოხალული მიწისთხილი, აბრეშუმისებრ მასად დაფქვილი, ზღვის მარილის ერთი ჩურჩულით.",
};
const crunchyDesc = {
  en: "For crunch lovers. Deep-roasted peanuts blended with large peanut pieces for a jar that fights back.",
  ka: "მათთვის, ვინც ხრაშუნას ეთაყვანება. ღრმად მოხალული მიწისთხილი დიდი ნაჭრებით.",
};

const bundleName = {
  en: "Pecho 2+1 Bundle",
  ka: "Pecho 2+1 შეთავაზება",
};
const bundleShort = {
  en: "Buy 2 jars, get the 3rd free — limited time.",
  ka: "იყიდე 2 ქილა, მიიღე მე-3 საჩუქრად — ლიმიტირებული დროით.",
};
const bundleDesc = {
  en: "Our best-value pack: three jars of Pecho peanut butter for the price of two. Mix Classic and Crunchy — our team will contact you to confirm your selection.",
  ka: "საუკეთესო ღირებულების შეთავაზება: სამი ქილა Pecho მიწისთხილის კარაქი ორის ფასად. აირჩიე Classic ან Crunchy — ჩვენი გუნდი დაგიკავშირდება არჩევანის დასაზუსტებლად.",
};

export const products: Product[] = [
  {
    slug: "bundle-2plus1",
    name: bundleName,
    short: bundleShort,
    description: bundleDesc,
    price: 38,
    originalPrice: 57,
    weight: "3 × 1kg",
    weightLabel: "3 × 1kg",
    category: "bundle",
    family: "bundle",
    image: bundleImg.url,
    cutout: bundleImg.url,
    gallery: [bundleImg.url, classicDessert.url, crunchyDessert.url],
    ingredients,
    nutrition: classicNutrition,
    featured: true,
  },
  {
    slug: "classic-450g",
    name: classicName,
    short: classicShort,
    description: classicDesc,
    price: 9,
    weight: "450g",
    weightLabel: "450g",
    category: "classic",
    family: "classic",
    image: classic450Front.url,
    cutout: classic450Cutout.url,
    gallery: [classic450Front.url, classicBread.url, classicDessert.url],
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
    weightLabel: "1kg",
    category: "classic",
    family: "classic",
    image: classic1kgFront.url,
    cutout: classic1kgCutout.url,
    gallery: [classic1kgFront.url, classicBread.url, classicDessert.url],
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
    weightLabel: "450g",
    category: "crunchy",
    family: "crunchy",
    image: crunchy450Front.url,
    cutout: crunchy450Cutout.url,
    gallery: [crunchy450Front.url, crunchyBread.url, crunchyDessert.url],
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
    weightLabel: "1kg",
    category: "crunchy",
    family: "crunchy",
    image: crunchy1kgJar.url,
    cutout: crunchy1kgJar.url,
    gallery: [crunchy1kgJar.url, crunchyBread.url, crunchyDessert.url],
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

/**
 * Sibling sizes of the SAME flavour family, ordered by price.
 * Classic can never resolve to Crunchy and vice versa.
 */
export function getFamilyVariants(product: Product) {
  return products
    .filter((p) => p.family === product.family)
    .sort((a, b) => a.price - b.price);
}

export function getRelated(slug: string, limit = 3) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);
  const others = products.filter((p) => p.slug !== slug && p.family !== current.family);
  const sameFamily = products.filter((p) => p.slug !== slug && p.family === current.family);
  return [...others, ...sameFamily].slice(0, limit);
}
