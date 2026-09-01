import video1 from "@/assets/recipe-1.mp4.asset.json";
import video2 from "@/assets/recipe-2.webm.asset.json";
import video3 from "@/assets/recipe-3.webm.asset.json";
import image1 from "@/assets/recipe-1.png.asset.json";
import image2 from "@/assets/recipe-2.png.asset.json";
import image3 from "@/assets/recipe-3.png.asset.json";

export type Recipe = {
  slug: string;
  title: { ka: string; en: string };
  description: { ka: string; en: string };
  ingredients: { emoji: string; text: string }[];
  steps: string[];
  plating?: string;
  platingTitle?: string;
  closing: string;
  videoUrl: string;
  imageUrl: string;
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
    videoUrl: video1.url,
    imageUrl: image1.url,
  },
  {
    slug: "pecho-peanut-butter-ice-cream",
    title: {
      ka: "🍦 Pecho-ს არაქისის კარაქის ნაყინი",
      en: "🍦 Pecho peanut butter ice cream",
    },
    description: {
      ka: "ბუნებრივი, მსუბუქი და გემრიელი დესერტი, რომელიც რამდენიმე მარტივი ინგრედიენტით მზადდება.",
      en: "A natural, light and delicious frozen dessert made with a few simple ingredients.",
    },
    ingredients: [
      { emoji: "🍌", text: "1 მწიფე ბანანი" },
      { emoji: "🥝", text: "1 კივი" },
      { emoji: "🍫", text: "1 სუფრის კოვზი კაკაო" },
      { emoji: "🍯", text: "1 სუფრის კოვზი თაფლი" },
      { emoji: "🥜", text: "Pecho Classic არაქისის კარაქი" },
    ],
    steps: [
      "ყველა ინგრედიენტი მოათავსეთ ბლენდერში და დააბლენდერეთ ერთგვაროვან მასამდე.",
      "მიღებული მასა გადაასხით ნაყინის ფორმებში.",
      "ჩხირები ჩაარჭვეთ ფორმებში და მოათავსეთ საყინულეში.",
      "გააჩერეთ საყინულეში რამდენიმე საათით, სანამ ნაყინი სრულად არ გამაგრდება.",
    ],
    platingTitle: "🥜 Pecho-ს შტრიხი",
    plating:
      "მიღებულ ნაყინს შეგიძლიათ ზემოდან მოასხათ Pecho Classic არაქისის კარაქი და დაამატოთ საყვარელი ტოპინგები.",
    closing: "✨ გემრიელად მიირთვით!",
    videoUrl: video2.url,
    imageUrl: image2.url,
  },
  {
    slug: "pecho-crunchy-peanut-butter-cookies",
    title: {
      ka: "🍪 Pecho-ს ხრაშუნა არაქისის კარაქის ქუქიები",
      en: "🍪 Pecho crunchy peanut butter cookies",
    },
    description: {
      ka: "მარტივი, გემრიელი და ნოყიერი ქუქიები, რომელიც სულ რამდენიმე ინგრედიენტით მზადდება.",
      en: "Simple, tasty and hearty cookies made with just a few ingredients.",
    },
    ingredients: [
      { emoji: "🍌", text: "1 მწიფე ბანანი" },
      { emoji: "🌾", text: "1 ჭიქა შვრიის ფანტელები" },
      { emoji: "🍫", text: "შოკოლადის ნატეხები — გემოვნებით" },
      { emoji: "🥜", text: "2 სუფრის კოვზი Pecho ხრაშუნა არაქისის კარაქი" },
    ],
    steps: [
      "ბანანი კარგად დაჭყლიტეთ ჩანგლით.",
      "დაუმატეთ შვრიის ფანტელები, შოკოლადის ნატეხები და Pecho ხრაშუნა არაქისის კარაქი. ყველაფერი კარგად აურიეთ ერთგვაროვანი მასის მიღებამდე.",
      "მიღებული მასისგან გააკეთეთ სასურველი ფორმის ქუქიები და დაალაგეთ საცხობ ქაღალდზე.",
      "გამოაცხვეთ 180°C-ზე დაახლოებით 12–15 წუთის განმავლობაში, სანამ ქუქიები ოდნავ არ შეყავისფრდება.",
    ],
    closing: "✨ გემრიელად მიირთვით!",
    videoUrl: video3.url,
    imageUrl: image3.url,
  },
];
