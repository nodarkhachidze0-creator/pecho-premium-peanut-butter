# Pecho — Refresh to match the new design brief

Most of what the brief describes already exists on the site (announcement bar, centered menu, product cards with hover specs, partner marquee, news, FAQ accordion, map, contact strip). This plan changes only the parts that differ.

## 1. Typography
- Headings and titles switch to the Hakuna font everywhere (hero headline, section titles, product names, promo headlines).
- All body text, paragraphs, small labels, navigation, buttons, prices, cart, checkout and footer switch to Noto Sans Georgian, loaded from Google Fonts.
- The other Georgian fonts currently used for body/UI text are retired.

## 2. Hero
- Add the jagged red/yellow discount badge on the top-left corner of the promo image: "57 ₾" struck through, "38 ₾" highlighted in white.
- Keep the current two-column layout, orange subtitle, headline, paragraph, and the two buttons.

## 3. Locations section
- Rebuild as a 50/50 split: map on the left filling the container height, list on the right.
- Right side shows "6 ლოკაცია", a short description, and a scrollable address list.
- Each row: orange pin icon, bold store name, street details underneath, and a "იხილე რუკაზე" button that centers the map on that store and opens its popup.
- Store data stays in the existing single locations file.

## 4. Colors
- Confirm the warm palette matches the brief: background #F9F6F0, text #2b2b2b, accent orange #f97316, applied through the existing design tokens so every page updates at once.

## 5. Footer
- The dark brown closing section opens with the heading "დაგვიკავშირდი".

## Technical notes
- Fonts: add Google Fonts `<link>` tags in `src/routes/__root.tsx` and repoint `--font-display` / `--font-sans` / label tokens in `src/styles.css`; no `@import` of remote URLs.
- Badge: presentational absolute-positioned SVG/clip-path element inside the hero image wrapper in `src/routes/index.tsx`.
- Locations: rework `src/components/StoreMap.tsx` layout and add a per-item focus handler using the existing Google Maps instance; `src/data/stores.ts` unchanged apart from ordering.
- No content, pricing, cart, checkout or admin logic changes.
