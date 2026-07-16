import videoAsset from "@/assets/recipe-choco-tvorog-muffins.mp4.asset.json";

export type Recipe = {
  slug: string;
  title: { ka: string; en: string };
  description: { ka: string; en: string };
  ingredients: { emoji: string; text: string }[];
  steps: string[];
  plating: string;
  closing: string;
  videoUrl: string;
};

export const recipes: Recipe[] = [
  {
    slug: "choco-tvorog-muffins-pecho",
    title: {
      ka: "🍫 შოკოლადის ხაჭოს მაფინები Pecho-ს არაქისის კარაქით",
      en: "🍫 Chocolate & cottage cheese muffins with Pecho peanut butter",
    },
    description: {
      ka: "რბილი, ჯანსაღი და ცილებით მდიდარი დესერტი, რომელიც სულ რამდენიმე ინგრედიენტით მზადდება.",
      en: "A soft, healthy, protein-rich dessert made with just a handful of ingredients.",
    },
    ingredients: [
      { emoji: "🍌", text: "1 მწიფე ბანანი" },
      { emoji: "🥚", text: "1 კვერცხი" },
      { emoji: "🧀", text: "150 გ ხაჭო" },
      { emoji: "🍫", text: "2 სუფრის კოვზი კაკაო" },
      { emoji: "🥜", text: "Pecho Classic არაქისის კარაქი" },
    ],
    steps: [
      "ყველა ინგრედიენტი მოათავსეთ ბლენდერში და კარგად დააბლენდერეთ ერთგვაროვანი მასის მიღებამდე.",
      "მიღებული მასა თანაბრად გადაანაწილეთ საცხობ ფორმებში.",
      "გამოაცხვეთ 180°C-ზე დაახლოებით 20–25 წუთის განმავლობაში ღუმელში ან აეროგრილში.",
      "გამოცხობის შემდეგ გააგრილეთ რამდენიმე წუთით.",
    ],
    plating:
      "მზად დესერტს გადაასხით Pecho Classic არაქისის კარაქი და დაამატეთ ახალი მარწყვი. სურვილის შემთხვევაში შეგიძლიათ სხვა საყვარელი ტოპინგებიც გამოიყენოთ.",
    closing: "✨ გემრიელად მიირთვით!",
    videoUrl: videoAsset.url,
  },
];
