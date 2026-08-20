# Pecho — Visual Refinement Pass

Refinement only. Routing, cart, checkout, admin, order flow, product data shape, and the EN/KA language system stay untouched.

## 1. Header — centered navigation
Rework the desktop header into a three-zone grid: logo left, nav truly centered, language switcher + cart right. Mobile menu, sticky behaviour, and the announcement bar stay as they are.

## 2. Typography — SS GEO BRO for body text
Add the uploaded `SS_GEO_BRO_ExtraBold` as the body font, replacing BPG Square for paragraphs, product descriptions, card copy, FAQ answers, and secondary UI text. Display (Brain Melt) and heading (Hakuna) fonts stay. Georgian glyph rendering gets verified in the preview before the swap is kept; if any glyph breaks, BPG Square remains the fallback for that use.

## 3. New product imagery
The four uploaded background-free jars (classic 450g/1kg, crunchy 450g/1kg) replace the current photos everywhere — cards, product detail pages, cart thumbnails, homepage. Images render with `object-contain`, fixed aspect boxes, and a shared baseline so nothing crops, stretches, or floats at a different height. Jar scale on the homepage drops noticeably with more whitespace around each one.

## 4. Product info panel on hover
Remove the generic marketing lines under the cards. Instead each card shows a Pecho-branded info panel that fades/slides in on desktop hover and never shifts layout:

- სახეობა: კლასიკური / ხრაშუნა
- წონა: 450გ / 1კგ
- ტექსტურა: გლუვი / ხრაშუნა
- შემადგენლობა: 100% ნატურალური მიწისთხილი + მცირე რაოდენობით მარილი
- ცილა: 25გ / 100გ

Values derive from each product's own data, so Classic reads გლუვი and Crunchy reads ხრაშუნა automatically. On touch/mobile the same block renders inline below the product — no hover dependency, no tiny overlay text.

## 5. Product card style
Equal card heights, identical image boxes, consistent radii and spacing, calmer hover (lift + panel only). Click-through, add-to-cart, quantity logic, pricing, and the 2+1 bundle behave exactly as today.

## 6. Partner marquee
New homepage section titled „სად შეგხვდებით“ with a seamless right-to-left CSS marquee: duplicated track, no jump at the loop point, fade masks on both edges, slow-down on hover, disabled under `prefers-reduced-motion`. Logos are height-normalised, aspect preserved. It launches with the აბგა logo in place and a simple data file (`src/data/partners.ts`) so the remaining logos drop in by adding entries.

## 7. Map section — smaller, two-column
Map shrinks to roughly 45% of the section on desktop with a store information panel beside it: title, short explanatory text, store count, list of locations with addresses, and a „იხილე რუკაზე“ action that recenters the map on a store. The map stays fully interactive (zoom, pan, marker clicks) and read-only for customers; locations still come from `src/data/stores.ts`. Mobile stacks map then list.

## 8. Color and text hierarchy
Audit visible sections and normalise on the existing tokens with `#f3820a` as the single accent. Clear tiers: display headings, section headings, body, small labels, accent (highlighted words, prices, numbers, promo), and interactive states. Orange stays deliberate, not everywhere; contrast checked against the cream/beige backgrounds.

## 9. Spacing and polish pass
Homepage and product surfaces get a consistent rhythm: section padding, radii, image alignment, and removal of oversized empty areas. No section is redesigned beyond what is listed above.

## 10. Performance
Animations use transform/opacity only, images lazy-load below the fold, no new animation libraries, and every motion respects `prefers-reduced-motion`.

## Verification
Preview checks at 1440, 1280, 1024, 768, 430, 390, and 375 px for cropped or oversized jars, nav centering, marquee seams, logo distortion, map footprint, Georgian glyph rendering, info-panel overlap, mobile overflow, and working cart + product navigation.

## Technical notes
- Fonts: new `@font-face` and `--font-body` update in `src/styles.css`; font file uploaded via the asset pipeline into `public/fonts`.
- New files: `src/components/PartnerMarquee.tsx`, `src/data/partners.ts`, `src/components/ProductInfoPanel.tsx`.
- Edited: `Header.tsx`, `ProductCard.tsx`, `StoreMap.tsx`, `products.$slug.tsx`, `index.tsx`, `products.ts` (image URLs + texture/protein fields only), `i18n.tsx` (new label strings), `styles.css`.
- Product data gains presentational fields only; existing keys, slugs, and prices are unchanged.
