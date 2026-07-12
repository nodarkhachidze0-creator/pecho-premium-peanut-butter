import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ka";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.products": "Products",
  "nav.about": "About",
  "nav.news": "News",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "nav.cart": "Cart",

  "cta.shop": "Shop Now",
  "cta.shopCollection": "Shop the Collection",
  "cta.viewAll": "View All",
  "cta.addToCart": "Add to Cart",
  "cta.readMore": "Read More",
  "cta.ourStory": "Our Story",
  "cta.continue": "Continue Shopping",
  "cta.checkout": "Proceed to Checkout",
  "cta.placeOrder": "Place Order",
  "cta.send": "Send Message",

  "home.hero.eyebrow": "Premium Georgian Craft",
  "home.hero.title": "Roasted by hand in the hills of Georgia.",
  "home.hero.subtitle":
    "Single-origin peanuts, double-roasted for a depth of flavor you won't find in a supermarket aisle. No palm oil, just the pure, glossy ribbon of nature.",

  "home.featured.eyebrow": "The Collection",
  "home.featured.title": "Our Daily Roasts",

  "home.why.title": "Why Choose Pecho",
  "home.why.1.title": "Purely Georgian",
  "home.why.1.body":
    "100% of our peanuts are sourced from family-owned farms in the Kakheti region.",
  "home.why.2.title": "Zero Fillers",
  "home.why.2.body":
    "No palm oil, no stabilizers, no hidden sugars. Just slow-roasted peanuts and a pinch of salt.",
  "home.why.3.title": "Freshly Jarred",
  "home.why.3.body":
    "Made in small batches weekly to ensure the oils stay fresh and the flavor stays vibrant.",

  "home.about.eyebrow": "About Pecho",
  "home.about.title": "A jar with a story.",
  "home.about.body":
    "Pecho was born in Tbilisi from a simple belief: peanut butter deserves to be treated like fine food. Small batches. Honest ingredients. Bold flavor.",

  "home.news.title": "Latest News",
  "home.delivery.title": "Straight to your door across Georgia.",
  "home.delivery.item1": "Delivery in 2–3 business days",
  "home.delivery.item2": "Cash or Card on Delivery",
  "home.delivery.item3": "Eco-friendly glass jar packaging",

  "home.faq.title": "Frequently Asked",
  "home.contact.title": "Get in touch",
  "home.contact.body": "Questions, wholesale, or feedback — we'd love to hear from you.",

  "products.title": "Our Products",
  "products.subtitle": "Small-batch peanut butter, made in Tbilisi.",
  "products.search": "Search products…",
  "products.sort.featured": "Featured",
  "products.sort.priceAsc": "Price: Low to High",
  "products.sort.priceDesc": "Price: High to Low",
  "products.sort.name": "Name",
  "products.cat.all": "All",
  "products.cat.classic": "Classic",
  "products.cat.crunchy": "Crunchy",
  "products.cat.flavored": "Flavored",
  "products.cat.limited": "Limited",
  "products.empty": "No products match your search.",

  "pdp.ingredients": "Ingredients",
  "pdp.nutrition": "Nutrition (per 100g)",
  "pdp.weight": "Weight",
  "pdp.description": "Description",
  "pdp.related": "You may also like",
  "pdp.quantity": "Quantity",
  "pdp.notFound": "Product not found.",

  "cart.title": "Your Cart",
  "cart.empty": "Your cart is empty.",
  "cart.subtotal": "Subtotal",
  "cart.delivery": "Delivery",
  "cart.total": "Total",
  "cart.remove": "Remove",
  "cart.deliveryNote": "Flat delivery fee across Georgia.",

  "checkout.title": "Checkout",
  "checkout.subtitle": "No account needed. Pay on delivery.",
  "checkout.name": "Full Name",
  "checkout.phone": "Phone Number",
  "checkout.address": "Delivery Address",
  "checkout.apt": "Apartment / Floor (optional)",
  "checkout.notes": "Additional Notes (optional)",
  "checkout.payment": "Payment Method",
  "checkout.paymentValue": "Cash or Card on Delivery",
  "checkout.summary": "Order Summary",
  "checkout.emptyCart": "Your cart is empty. Add products before checking out.",

  "success.title": "Order received!",
  "success.body":
    "Thank you for your order. We'll call you shortly to confirm delivery details. Your peanut butter will arrive in 2–3 business days.",

  "about.title": "About Pecho",
  "about.lede":
    "Small-batch, single-origin peanut butter made with obsessive care in Tbilisi, Georgia.",
  "about.story.title": "Our Story",
  "about.story.body":
    "Pecho started as a kitchen experiment: could peanut butter — a pantry staple most of us stop noticing — actually taste like something remarkable? We roast Kakheti-grown peanuts in small batches, blend without shortcuts, and jar within hours. No palm oil, no stabilizers, no added sugar in our classic line. Just the pure, glossy ribbon of what peanut butter should be.",
  "about.values.title": "What we believe",

  "news.title": "News & Journal",
  "news.subtitle": "Recipes, announcements, and stories from the Pecho kitchen.",

  "faq.title": "Frequently Asked Questions",
  "faq.subtitle": "Everything you might want to know before you order.",

  "contact.title": "Contact Us",
  "contact.subtitle": "We reply within one business day.",
  "contact.form.name": "Your Name",
  "contact.form.email": "Email",
  "contact.form.message": "Message",
  "contact.info.phone": "Phone",
  "contact.info.email": "Email",
  "contact.info.address": "Address",
  "contact.info.hours": "Hours",
  "contact.info.hoursValue": "Mon–Fri, 9:00–18:00",

  "footer.tagline":
    "Crafting Georgia's finest peanut butter. Small batches, big flavor, zero compromises.",
  "footer.quickLinks": "Quick Links",
  "footer.contact": "Contact",
  "footer.delivery": "Delivery",
  "footer.deliveryBody": "2–3 business days across Georgia. Cash or Card on Delivery.",
  "footer.legal": "Legal",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms & Conditions",
  "footer.rights": "© 2026 Pecho. Made in Georgia.",

  "form.required": "Required",
  "form.sent": "Message sent — we'll be in touch.",
  "form.error": "Something went wrong. Please try again.",
};

const ka: Dict = {
  "nav.home": "მთავარი",
  "nav.products": "პროდუქცია",
  "nav.about": "ჩვენს შესახებ",
  "nav.news": "სიახლეები",
  "nav.faq": "კითხვები",
  "nav.contact": "კონტაქტი",
  "nav.cart": "კალათა",

  "cta.shop": "შეიძინე ახლა",
  "cta.shopCollection": "ნახე კოლექცია",
  "cta.viewAll": "ყველა",
  "cta.addToCart": "კალათაში დამატება",
  "cta.readMore": "სრულად",
  "cta.ourStory": "ჩვენი ისტორია",
  "cta.continue": "შოპინგის გაგრძელება",
  "cta.checkout": "შეკვეთის გაფორმება",
  "cta.placeOrder": "შეკვეთის დადასტურება",
  "cta.send": "შეტყობინების გაგზავნა",

  "home.hero.eyebrow": "პრემიუმ ქართული ხელნაკეთი",
  "home.hero.title": "ხელით მოხალული საქართველოს გორაკებზე.",
  "home.hero.subtitle":
    "ერთი წარმოშობის მიწისთხილი, ორმაგად მოხალული ღრმა გემოსთვის, რომელსაც სუპერმარკეტში ვერ იპოვი. პალმის ზეთის გარეშე — მხოლოდ ბუნების პრიალა რიბონი.",

  "home.featured.eyebrow": "კოლექცია",
  "home.featured.title": "ჩვენი ყოველდღიური მოხალვები",

  "home.why.title": "რატომ Pecho",
  "home.why.1.title": "წმინდა ქართული",
  "home.why.1.body":
    "მიწისთხილს 100%-ით ვიღებთ კახეთის ოჯახური მეურნეობებიდან.",
  "home.why.2.title": "ნატურალური შემადგენლობა",
  "home.why.2.body":
    "პალმის ზეთის, სტაბილიზატორის ან ფარული შაქრის გარეშე. მხოლოდ ნელა მოხალული მიწისთხილი და ცოტა მარილი.",
  "home.why.3.title": "ახლადგამომუშავებული",
  "home.why.3.body":
    "მცირე პარტიებით ვამზადებთ ყოველკვირეულად, რომ გემო და სიახლე შენარჩუნდეს.",

  "home.about.eyebrow": "Pecho-ს შესახებ",
  "home.about.title": "ქილა თავისი ისტორიით.",
  "home.about.body":
    "Pecho დაიბადა თბილისში მარტივი რწმენით: მიწისთხილის კარაქი იმსახურებს იმას, რომ სერიოზული საკვების დონეზე მოვექცეთ.",

  "home.news.title": "სიახლეები",
  "home.delivery.title": "მიწოდება მთელ საქართველოში.",
  "home.delivery.item1": "მიწოდება 2–3 სამუშაო დღეში",
  "home.delivery.item2": "გადახდა ადგილზე — ნაღდი ან ბარათი",
  "home.delivery.item3": "ეკო-შუშის ქილა",

  "home.faq.title": "ხშირად დასმული კითხვები",
  "home.contact.title": "დაგვიკავშირდი",
  "home.contact.body": "შეკითხვები, საბითუმო თუ უკუკავშირი — მოხარულები ვიქნებით.",

  "products.title": "ჩვენი პროდუქცია",
  "products.subtitle": "მცირე პარტიით დამზადებული მიწისთხილის კარაქი თბილისში.",
  "products.search": "პროდუქტის ძებნა…",
  "products.sort.featured": "რჩეული",
  "products.sort.priceAsc": "ფასი: დაბლიდან მაღლა",
  "products.sort.priceDesc": "ფასი: მაღლიდან დაბლა",
  "products.sort.name": "სახელი",
  "products.cat.all": "ყველა",
  "products.cat.classic": "კლასიკური",
  "products.cat.crunchy": "ხრაშუნა",
  "products.cat.flavored": "არომატიზირებული",
  "products.cat.limited": "ლიმიტირებული",
  "products.empty": "შედეგი ვერ მოიძებნა.",

  "pdp.ingredients": "შემადგენლობა",
  "pdp.nutrition": "კვებითი ღირებულება (100გ)",
  "pdp.weight": "წონა",
  "pdp.description": "აღწერა",
  "pdp.related": "შესაძლოა მოგეწონოს",
  "pdp.quantity": "რაოდენობა",
  "pdp.notFound": "პროდუქტი ვერ მოიძებნა.",

  "cart.title": "შენი კალათა",
  "cart.empty": "კალათა ცარიელია.",
  "cart.subtotal": "ჯამი",
  "cart.delivery": "მიწოდება",
  "cart.total": "სულ",
  "cart.remove": "წაშლა",
  "cart.deliveryNote": "ერთიანი მიწოდების ტარიფი მთელ საქართველოში.",

  "checkout.title": "შეკვეთის გაფორმება",
  "checkout.subtitle": "რეგისტრაცია არ არის საჭირო. გადაიხადე ადგილზე.",
  "checkout.name": "სახელი და გვარი",
  "checkout.phone": "ტელეფონი",
  "checkout.address": "მიწოდების მისამართი",
  "checkout.apt": "ბინა / სართული (არასავალდებულო)",
  "checkout.notes": "დამატებითი შენიშვნა (არასავალდებულო)",
  "checkout.payment": "გადახდის მეთოდი",
  "checkout.paymentValue": "ნაღდი ან ბარათი მიწოდებისას",
  "checkout.summary": "შეკვეთის დეტალები",
  "checkout.emptyCart": "კალათა ცარიელია. დაამატე პროდუქცია, სანამ შეკვეთას გააფორმებ.",

  "success.title": "შეკვეთა მიღებულია!",
  "success.body":
    "მადლობა შეკვეთისთვის. მალე დაგირეკავთ დეტალების დასაზუსტებლად. მიწოდება 2–3 სამუშაო დღეშია.",

  "about.title": "Pecho-ს შესახებ",
  "about.lede":
    "მცირე პარტიით, ერთი წარმოშობის მიწისთხილის კარაქი, დამზადებული აკვიატებული ზრუნვით თბილისში.",
  "about.story.title": "ჩვენი ისტორია",
  "about.story.body":
    "Pecho დაიწყო სამზარეულოს ექსპერიმენტით: შეიძლება თუ არა მიწისთხილის კარაქი — ყოველდღიური საკვები, რომელსაც უკვე ვეღარ ვამჩნევთ — გახდეს ნამდვილად აღსანიშნავი. კახეთის მიწისთხილს ვხალავთ მცირე პარტიებით და ვათავსებთ ქილაში საათებში. პალმის ზეთის, სტაბილიზატორისა და კლასიკურ ვერსიაში დამატებული შაქრის გარეშე.",
  "about.values.title": "რაშიც გვჯერა",

  "news.title": "სიახლეები და ჟურნალი",
  "news.subtitle": "რეცეპტები, სიახლეები და ისტორიები Pecho-ს სამზარეულოდან.",

  "faq.title": "ხშირად დასმული კითხვები",
  "faq.subtitle": "ყველაფერი, რაც უნდა იცოდე შეკვეთამდე.",

  "contact.title": "დაგვიკავშირდი",
  "contact.subtitle": "ვპასუხობთ ერთი სამუშაო დღის განმავლობაში.",
  "contact.form.name": "სახელი",
  "contact.form.email": "ელფოსტა",
  "contact.form.message": "შეტყობინება",
  "contact.info.phone": "ტელეფონი",
  "contact.info.email": "ელფოსტა",
  "contact.info.address": "მისამართი",
  "contact.info.hours": "სამუშაო საათები",
  "contact.info.hoursValue": "ორშ–პარ, 9:00–18:00",

  "footer.tagline":
    "საქართველოს საუკეთესო მიწისთხილის კარაქი. მცირე პარტიები, დიდი გემო, კომპრომისების გარეშე.",
  "footer.quickLinks": "სწრაფი ბმულები",
  "footer.contact": "კონტაქტი",
  "footer.delivery": "მიწოდება",
  "footer.deliveryBody": "2–3 სამუშაო დღე მთელ საქართველოში. გადახდა ადგილზე.",
  "footer.legal": "იურიდიული",
  "footer.privacy": "კონფიდენციალობა",
  "footer.terms": "წესები და პირობები",
  "footer.rights": "© 2026 Pecho. დამზადებულია საქართველოში.",

  "form.required": "სავალდებულო",
  "form.sent": "შეტყობინება გაიგზავნა — მალე დაგიკავშირდებით.",
  "form.error": "დაფიქსირდა შეცდომა. სცადე ხელახლა.",
};

const dicts: Record<Lang, Dict> = { en, ka };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pecho.lang") as Lang | null;
      if (saved === "en" || saved === "ka") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("pecho.lang", l);
      document.documentElement.lang = l;
    } catch {}
  };

  const t = (key: string) => dicts[lang][key] ?? dicts.en[key] ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useT() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useT must be used within I18nProvider");
  return ctx;
}
