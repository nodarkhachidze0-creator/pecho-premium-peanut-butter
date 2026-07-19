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

  "home.hero.eyebrow": "Limited-time 2+1 offer",
  "home.hero.title": "Buy 2, Get 1 Free — for a limited time.",
  "home.hero.subtitle":
    "Buy 2 jars and get the third one free — while the promotion lasts.",

  "nav.recipes": "Recipes",
  "nav.partners": "Partners",
  "recipes.title": "Recipes",
  "recipes.subtitle": "Ideas, snacks, and recipes made with Pecho peanut butter.",
  "recipes.empty": "New recipes coming soon.",

  "home.featured.eyebrow": "Products",
  "home.featured.title": "Pick your favorite Pecho",


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
  "products.cat.bundle": "Bundle",
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

  "partners.title": "Become a Partner",
  "partners.intro":
    "Pecho welcomes long-term wholesale partnerships. We deliver premium, small-batch peanut butter to businesses across Georgia with reliable, on-time service and transparent pricing.",
  "partners.who": "Who we work with",
  "partners.type.grocery": "Grocery stores",
  "partners.type.supermarket": "Supermarkets",
  "partners.type.cafe": "Cafés",
  "partners.type.restaurant": "Restaurants",
  "partners.type.fitness": "Fitness clubs",
  "partners.type.health": "Health food stores",
  "partners.type.retail": "Other retail businesses",
  "partners.type.hotel": "Hotels & Guesthouses",
  "partners.contactTitle": "Contact us",
  "partners.contactNote":
    "Reach out any time. Our team will get back to you as quickly as possible.",

  "about.hero.eyebrow": "About Pecho",
  "about.hero.title": "Healthy living starts with one spoonful.",
  "about.hero.body":
    "Pecho was born from a single idea — to create a product that makes every day a little healthier and a lot more delicious.",
  "about.story.p1":
    "We believe real quality starts with simple ingredients. That is why our peanut butter is made from only 100% peanuts and a touch of salt.",
  "about.story.p2":
    "No artificial additives. No preservatives. No unnecessary ingredients — just clean, natural flavor.",
  "about.story.p3":
    "But Pecho is more than peanut butter. It's energy, positivity and a lifestyle where caring for your health becomes an everyday habit.",
  "about.story.p4":
    "We want every jar to remind you that healthy living isn't complicated. It starts with one small choice.",
  "about.why.title": "Why Pecho?",
  "about.why.1.title": "100% natural ingredients",
  "about.why.1.body": "Only peanuts and a small amount of salt.",
  "about.why.2.title": "Zero harmful additives",
  "about.why.2.body": "No preservatives, palm oil or artificial ingredients.",
  "about.why.3.title": "Premium quality",
  "about.why.3.body": "For those who value taste and quality equally.",
  "about.why.4.title": "Everyday energy",
  "about.why.4.body": "For breakfast, before training, or any time of day.",
  "about.mission.eyebrow": "Our Mission",
  "about.mission.title": "Caring for your health shouldn't be boring.",
  "about.mission.body":
    "That's why we created Pecho — a brand that unites natural ingredients, premium quality and positive energy.",
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

  "home.hero.eyebrow": "2+1 აქცია ლიმიტირებული დროით",
  "home.hero.title": "იყიდე 2, მიიღე 1 საჩუქრად — ლიმიტირებული დროით.",
  "home.hero.subtitle":
    "იყიდე 2, მიიღე 1 საჩუქრად — ლიმიტირებული დროით.",

  "nav.recipes": "რეცეპტები",
  "nav.partners": "პარტნიორები",
  "recipes.title": "რეცეპტები",
  "recipes.subtitle": "იდეები, სნეკები და რეცეპტები Pecho-ს მიწისთხილის კარაქით.",
  "recipes.empty": "მალე დაემატება ახალი რეცეპტები.",

  "home.featured.eyebrow": "პროდუქტები",
  "home.featured.title": "აირჩიე შენი საყვარელი Pecho",


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
  "products.cat.bundle": "შეთავაზება",
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

  "partners.title": "გახდი პარტნიორი",
  "partners.intro":
    "Pecho ღიაა გრძელვადიანი საბითუმო თანამშრომლობისთვის. ჩვენ ვთავაზობთ პრემიუმ ხარისხის მიწისთხილის კარაქს, საიმედო მიწოდებას და გამჭვირვალე პირობებს ბიზნეს პარტნიორებისთვის.",
  "partners.who": "ვისთან ვმუშაობთ",
  "partners.type.grocery": "სასურსათო მაღაზიები",
  "partners.type.supermarket": "სუპერმარკეტები",
  "partners.type.cafe": "კაფეები",
  "partners.type.restaurant": "რესტორნები",
  "partners.type.fitness": "ფიტნეს კლუბები",
  "partners.type.health": "ჯანსაღი კვების მაღაზიები",
  "partners.type.retail": "სხვა საცალო ბიზნესები",
  "partners.type.hotel": "სასტუმროები და გესთჰაუსები",
  "partners.contactTitle": "დაგვიკავშირდი",
  "partners.contactNote":
    "დაგვიკავშირდით ნებისმიერ დროს. ჩვენს გუნდს მაქსიმალურად სწრაფად გიპასუხებთ.",

  "about.hero.eyebrow": "Pecho-ს შესახებ",
  "about.hero.title": "ჯანსაღი ცხოვრება იწყება ერთი კოვზიდან.",
  "about.hero.body":
    "Pecho შეიქმნა ერთი იდეით — შეგვექმნა პროდუქტი, რომელიც ყოველდღიურ არჩევანს უფრო ჯანსაღს და სასიამოვნოს გახდიდა.",
  "about.story.p1":
    "ჩვენ გვჯერა, რომ ნამდვილი ხარისხი იწყება უბრალო ინგრედიენტებით. ამიტომ ჩვენი მიწისთხილის კარაქი მზადდება მხოლოდ 100% მიწისთხილისა და მცირე რაოდენობით მარილისგან.",
  "about.story.p2":
    "არანაირი ხელოვნური დანამატი, კონსერვანტი ან ზედმეტი ინგრედიენტი — მხოლოდ სუფთა, ბუნებრივი გემო.",
  "about.story.p3":
    "მაგრამ Pecho მხოლოდ მიწისთხილის კარაქი არ არის. ეს არის ენერგია, პოზიტივი და ცხოვრების ისეთი სტილი, სადაც ჯანმრთელობაზე ზრუნვა ყოველდღიური ჩვევაა.",
  "about.story.p4":
    "ჩვენ გვინდა, რომ თითოეული ქილა ადამიანებს ახსენებდეს — ჯანსაღი ცხოვრება რთული არ არის. ის იწყება ერთი პატარა არჩევანით.",
  "about.why.title": "რატომ Pecho?",
  "about.why.1.title": "100% ბუნებრივი ინგრედიენტები",
  "about.why.1.body": "მხოლოდ მიწისთხილი და მცირე რაოდენობით მარილი.",
  "about.why.2.title": "არანაირი მავნე დანამატი",
  "about.why.2.body":
    "კონსერვანტების, პალმის ზეთისა და ხელოვნური ინგრედიენტების გარეშე.",
  "about.why.3.title": "პრემიუმ ხარისხი",
  "about.why.3.body": "შექმნილია მათთვის, ვინც ხარისხს და გემოს ერთნაირად აფასებს.",
  "about.why.4.title": "ყოველდღიური ენერგია",
  "about.why.4.body": "საუზმეზე, ვარჯიშამდე თუ დღის ნებისმიერ მონაკვეთში.",
  "about.mission.eyebrow": "ჩვენი მისია",
  "about.mission.title": "ჯანმრთელობაზე ზრუნვა მოსაწყენი არ უნდა იყოს.",
  "about.mission.body":
    "ამიტომ შევქმენით Pecho — ბრენდი, რომელიც აერთიანებს ბუნებრივ ინგრედიენტებს, პრემიუმ ხარისხსა და პოზიტიურ ენერგიას.",
};


const dicts: Record<Lang, Dict> = { en, ka };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ka");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pecho.lang") as Lang | null;
      const active: Lang = saved === "en" || saved === "ka" ? saved : "ka";
      setLangState(active);
      document.documentElement.lang = active;
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
