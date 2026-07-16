
## Scope

Only the 10 items below. No redesign — existing branding, colors, fonts, layout, and animations stay.

## 1. New "გახდი პარტნიორი" (Become a Partner) section

- New route `src/routes/partners.tsx` (bilingual, KA default) with:
  - Hero heading `🤝 გახდი პარტნიორი` + intro paragraph explaining Pecho welcomes long-term wholesale partnerships with premium quality and reliable delivery.
  - Premium card grid of partner types (7 cards, each with a Lucide icon + label): Grocery stores, Supermarkets, Cafés, Restaurants, Fitness clubs, Health food stores, Other retail businesses.
  - Contact block styled as a premium card: Phone `595 55 17 80` (tel:+995595551780), Email `Pecho.official@gmail.com`, Address `ქ. გორი, შინდისის გმირების 17ბ`, closing line `დაგვიკავშირდით ნებისმიერ დროს. ჩვენს გუნდს მაქსიმალურად სწრაფად გიპასუხებთ.`
  - Uses existing `Reveal` animation, cream/orange palette, rounded-3xl cards, brand shadows.
- Add nav entry `პარტნიორები / Partners` to `src/components/Header.tsx` and `src/components/Footer.tsx` (Quick Links). Final nav order: Home · Products · Recipes · Partners · About · News · FAQ · Contact · Cart.
- Add i18n keys (`nav.partners`, `partners.*`) in `src/lib/i18n.tsx`.

## 2. Phone number sitewide

Replace every occurrence of the placeholder `+995 599 599 599` (and any other phone strings) with `595 55 17 80` (display) / `tel:+995595551780` (link). Files: `Footer.tsx`, `contact.tsx`, any i18n string, the new Partners page. Search/replace confirms coverage.

## 3. Hero promo image — rounded corners

In `src/routes/index.tsx`, add `rounded-3xl overflow-hidden shadow-2xl` (matching other premium cards) to the 2+1 promo image wrapper.

## 4. Hero eyebrow copy

Confirm eyebrow reads `2+1 აქცია ლიმიტირებული დროით` in `src/lib/i18n.tsx` (already set — verify and align EN counterpart to `Limited-time 2+1 offer`).

## 5. Hero paragraph

Replace hero paragraph with `იყიდე 2, მიიღე 1 საჩუქრად — ლიმიტირებული დროით.` (KA) and `Buy 2, get 1 free — for a limited time.` (EN) in `src/lib/i18n.tsx`.

## 6. Homepage section titles: კოლექცია → პროდუქტები

Sweep `src/lib/i18n.tsx` and any hardcoded strings in `src/routes/index.tsx`; replace every homepage occurrence of `კოლექცია` with `პროდუქტები` (EN equivalent stays `Products`).

## 7. Featured products subtitle

Replace `ჩვენი ყოველდღიური მოხალვები` with `აირჩიე შენი საყვარელი Pecho` in `src/lib/i18n.tsx`. Typography untouched.

## 8. 2+1 banner on Products page

Add the same promo image (existing asset `pecho-promo-2plus1.png`) as a rounded-3xl banner at the top of `src/routes/products.index.tsx`, above the filter/sort bar, with the eyebrow + paragraph copy. No layout shift to the grid below. If the user's newly-uploaded banner arrives, we swap the asset pointer in place.

## 9. FAQ rewrite

Replace the entire KA `items` array in `src/routes/faq.tsx` with the 7 new Q/A pairs verbatim (delivery, storage, additives, athletes, payment, returns, vegan). Provide matching EN translations of the same 7. Keep the current accordion (`<details>` group) styling untouched.

## 10. Recipes page — first recipe with video

- Upload the recipe video (user-provided) via `lovable-assets` and store the pointer at `src/assets/recipe-choco-tvorog-muffins.mp4.asset.json`. If the user hasn't attached the file yet, ship the recipe with the video slot present and a "video coming soon" placeholder, and swap in the pointer as soon as the file lands.
- New data module `src/data/recipes.ts` with a typed `Recipe` entry (`slug: "choco-tvorog-muffins-pecho"`, title, description, ingredients[], steps[], plating, videoUrl, cover).
- Update `src/routes/recipes.tsx` to render a grid of recipe cards (one entry for now) with cover thumbnail, title, short description, link to detail.
- New dynamic route `src/routes/recipes.$slug.tsx` with premium layout:
  - Hero: title `🍫 შოკოლადის ხაჭოს მაფინები Pecho-ს არაქისის კარაქით`, description, decorative peanut-butter drip accent reusing existing `DrippingPeanutButter` styling tokens.
  - Embedded `<video controls playsInline>` from asset URL (poster from cover).
  - Ingredients as a card grid (emoji + text): 🍌 1 მწიფე ბანანი, 🥚 1 კვერცხი, 🧀 150 გ ხაჭო, 🍫 2 სუფრის კოვზი კაკაო, 🥜 Pecho Classic არაქისის კარაქი.
  - Preparation steps as a numbered vertical timeline (4 steps, verbatim).
  - Plating (მორთვა) card: Pecho Classic + fresh strawberries note.
  - Closing flourish `✨ გემრიელად მიირთვით!`.
  - `head()` with unique title/description + og tags; og:image = cover.
- Update `src/lib/i18n.tsx` recipes section keys as needed.

## Files touched

**New**: `src/routes/partners.tsx`, `src/routes/recipes.$slug.tsx`, `src/data/recipes.ts`, `src/assets/recipe-choco-tvorog-muffins.mp4.asset.json` (once video arrives).

**Edited**: `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/lib/i18n.tsx`, `src/routes/index.tsx`, `src/routes/products.index.tsx`, `src/routes/faq.tsx`, `src/routes/recipes.tsx`, `src/routes/contact.tsx`.

**Not touched**: cart/checkout, admin panel, drip animation, product catalog, other pages.

## What I need from you

- The recipe video file — I'll upload it to the CDN and wire it into the recipe. Until then, the recipe page ships with a placeholder video slot.
- The new 2+1 banner image (if different from the current hero promo). Otherwise I'll reuse the existing promo asset on the Products page.
