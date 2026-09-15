# Copy updates, duplicate icon fix, empty-cart text & footer social links

Small copy/consistency pass across five existing elements. No layout or logic changes.

## 1. Hero subtitle (home page)

- `src/lib/i18n.tsx` — replace `home.hero.subtitle` (Georgian, ~line 223-224):
  - Old: "ნელა მოხალული ქართული მიწისთხილი და ცოტა ზღვის მარილი — მეტი არაფერი."
  - New: "ჯანსაღი ცხოვრება იწყება ერთი კოვზიდან"
  - English translation updated to match: "Healthy living starts with one spoonful"

## 2. Contact section subtitle (partners page dark contact block)

The quoted text lives in `partners.contactNote`, rendered in `src/routes/partners.tsx`.

- `src/lib/i18n.tsx` — replace `partners.contactNote` (Georgian, ~line 367-368):
  - Old: "დაგვიკავშირდით ნებისმიერ დროს. ჩვენს გუნდს მაქსიმალურად სწრაფად გიპასუხებთ."
  - New: "დაგვიკავშირდით ნებისმიერ დროს, ჩვენი გუნდი კი შეეცდება უმოკლეს დროში გიპასუხოთ."
  - English translation updated to match: "Get in touch any time, and our team will aim to reply as quickly as possible."

## 3. Remove duplicate icons in "Why Pecho?" benefit cards (About page)

- `src/routes/about.tsx` — each of the 4 cards currently shows the emoji inside the rounded badge AND a separate Lucide icon (Leaf/Ban/Star/Zap) to its right. Remove the standalone icon outside the badge; keep only the emoji badge.
- Drop the now-unused `icon` property from the `whys` array and the unused Lucide imports.

## 4. Empty cart text (cart page)

- `src/routes/cart.tsx` line 34:
  - Old: "შენი კალათა გემრიელი ჩასუსვის მოლოდინშია."
  - New: "შენი კალათა გემრიელობების მოლოდინშია."
- The cart drawer has its own (different) empty message — untouched, per scope.

## 5. Footer social links & email

- `src/components/Footer.tsx`:
  - Instagram icon → `https://www.instagram.com/pecho_geo?stkn=MWF4dHpjdXJlZ25q`
  - Facebook icon → `https://www.facebook.com/share/1JYF8pGtRU/`
  - Email icon → `mailto:pecho.official@gmail.com` (lowercase)
  - Footer contact list display text: "Pecho.official@gmail.com" → "pecho.official@gmail.com"

## Consistency (same accounts, one extra touch)

- `src/routes/contact.tsx` also links the old Instagram/Facebook profiles (`pecho.official`). Update those two URLs to the new profiles so the site doesn't point at different accounts. Say the word if you'd rather keep contact.tsx untouched.

## Verification

- `bunx tsgo --noEmit` typecheck.
- Playwright check in `/tmp/browser/copy-updates/`: home hero, partners contact block, about benefit cards, empty cart, footer — screenshots on desktop and mobile widths.
