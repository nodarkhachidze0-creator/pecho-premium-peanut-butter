export type NewsPost = {
  slug: string;
  date: string;
  title: { en: string; ka: string };
  excerpt: { en: string; ka: string };
  body: { en: string; ka: string };
};

export const news: NewsPost[] = [
  {
    slug: "the-toast-test",
    date: "2026-06-14",
    title: {
      en: "The perfect toast pairing with Kakhetian sourdough",
      ka: "იდეალური ტოსტი კახური მჟავე პურით",
    },
    excerpt: {
      en: "Why the fat of a good peanut butter loves the acidity of a proper sourdough.",
      ka: "რატომ ერწყმის კარგი მიწისთხილის კარაქის ცხიმი კარგი მჟავე პურის მჟავიანობას.",
    },
    body: {
      en: "There is a chemistry to the perfect toast. The lactic tang of a long-fermented Kakhetian sourdough cuts through the richness of nut fat in a way commercial white bread simply cannot. Try a thick smear of our Sea Salt Reserve on a warm slice; the salt flakes carry both sides of the flavor.",
      ka: "იდეალურ ტოსტს ქიმია აქვს. კარგად დადუღებული კახური მჟავე პურის ლაქტიური სიმჟავე ჭრის მიწისთხილის ცხიმის სიმდიდრეს ისე, როგორც ჩვეულებრივი თეთრი პური ვერ ახერხებს.",
    },
  },
  {
    slug: "new-batch-svaneti-salt",
    date: "2026-05-30",
    title: {
      en: "New batch: the limited Svaneti salt edition",
      ka: "ახალი პარტია: ლიმიტირებული სვანური მარილის ვერსია",
    },
    excerpt: {
      en: "A one-time run made in collaboration with a Mestia salt maker.",
      ka: "ერთჯერადი პარტია, დამზადებული მესტიის მარილის ოსტატთან თანამშრომლობით.",
    },
    body: {
      en: "This spring we partnered with a fourth-generation Svaneti salt maker for a strictly limited batch. Herbaceous, bold, and unapologetic. Available while it lasts.",
      ka: "ამ გაზაფხულზე ვითანამშრომლეთ სვანური მარილის მეოთხე თაობის ოსტატთან. მდელოვანი, თამამი, უკომპრომისო.",
    },
  },
  {
    slug: "why-oil-on-top",
    date: "2026-04-18",
    title: {
      en: "Why there's oil on top of your jar (and why that's good)",
      ka: "რატომ ჩანს ზეთი ქილის თავზე (და რატომ არის ეს კარგი)",
    },
    excerpt: {
      en: "Real peanut butter separates. That's a feature, not a bug.",
      ka: "ნამდვილი მიწისთხილის კარაქი იშლება. ეს თვისებაა, არა შეცდომა.",
    },
    body: {
      en: "If you see a layer of oil at the top of your jar, that's nature saying hello. We don't add stabilizers or hydrogenated fats to prevent separation. Give it a good stir with a butter knife — you'll be rewarded with a creamier, more honest peanut butter.",
      ka: "თუ ქილის თავზე ზეთის ფენას ხედავ — ეს ბუნებაა. ჩვენ არ ვამატებთ სტაბილიზატორებს. უბრალოდ კარგად აურიე.",
    },
  },
];

export function getPost(slug: string) {
  return news.find((n) => n.slug === slug);
}
