# Product page overhaul + removing the 2+1 offer

## 1. Remove the 2+1 offer everywhere

- Delete the bundle product (Pecho 2+1, 38 ₾) from the catalogue, so it disappears from the products page, homepage carousel and search.
- Homepage hero: the promo picture on the right is replaced by the Classic 1kg lifestyle photo in the same rounded frame, linking to the products page instead of the bundle.
- Remove the "2+1" corner badge from product cards and the bundle category label.
- Remove the "buy 2 get 1 free" sentence from the Georgian and English texts.
- Delete the promo image asset.

## 2. New product page layout

Two panels side by side (stacked on phones):

```text
+---------------------------+     +--------------------------+
| [thumb]                   |     | Title | flavour          |
| [thumb]   main photo      |     | 24.90 ₾  19.00 ₾  [save] |
| [thumb]   rounded frame   |     | აირჩიე გემო  [tiles]      |
| [thumb]                   |     | აირჩიე წონა  [tiles]      |
+---------------------------+     | qty + add to cart        |
                                  | tabs: description /      |
                                  | ingredients / nutrition  |
                                  +--------------------------+
```

- Main photo sits inside a fixed, rounded (20px) frame — no full-bleed background, no stretching. The jar is shown whole, centred, on the warm paper background.
- A vertical strip of selectable thumbnails runs down the left side of the frame (horizontal row under the photo on phones). Clicking one swaps the main photo.
- No Nutri-Score badge.

## 3. New lifestyle photos

The four uploaded spoon photos are added to the gallery of their exact variant:

- 450გრ კლასიკი4 → Classic 450g
- 450გრ ხრუხუნა4 → Crunchy 450g
- 1კგ კლასიკი4 → Classic 1kg
- 1კგ ხურხუნა4 → Crunchy 1kg

Each variant then has: packshot + its existing two lifestyle photos + the new spoon photo.

## 4. Flavour and weight selectors

- "აირჩიე გემო": two wide tiles — კლასიკური and ხრაშუნა, the latter carrying an orange "ახალი" badge.
- "აირჩიე წონა": two compact tiles — 450 გ and 1 კგ, each showing a small jar thumbnail of that size.
- Selecting a tile updates the title, the price, the savings badge, the gallery (all four photos of the chosen combination) and the add-to-cart button, and updates the page address so the link can be shared.

## 5. Prices and actions

- 450 გ: 12 ₾ crossed out, 9 ₾ active, badge "დაზოგეთ 3 ₾".
- 1 კგ: 24.90 ₾ crossed out, 19 ₾ active, badge "დაზოგეთ 5.90 ₾".
- The "წონა" tab is removed; the three remaining tabs stay.
- Add-to-cart button keeps the "კალათაში დამატება • ₾ …" format and follows the selected variant and quantity.
- Headings use the Hakuna display font, all other text Noto Sans Georgian, as today.

## Technical notes

- `src/data/products.ts`: drop the bundle entry and `bundleImg` import, add `originalPrice` (12 / 24.9) to the four jars, append the new `.asset.json` pointers to each `detailImages` array, and add the packshot as the first gallery entry.
- Upload the four uploaded webp files with `lovable-assets create`; no binaries land in the repo.
- `src/routes/products.$slug.tsx` is rewritten: derive flavour/weight from the loaded product, resolve the sibling variant via `products.find`, and switch with `navigate({ to: "/products/$slug" })` so the loader keeps working. Gallery state resets on slug change.
- Touched besides that: `src/routes/index.tsx` (hero), `src/components/ProductCard.tsx` (badge + label), `src/components/ProductCoverFlow.tsx` (bundle filter no longer needed), `src/lib/i18n.tsx` (bundle strings, new selector labels), and removal of `src/assets/pecho-promo-2plus1.png.asset.json`.
- Cart, checkout, admin and order logic are untouched.
