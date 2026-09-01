# Pecho — Three recipes with video, photo and text

## Assets
Upload the six uploaded files to the CDN asset pipeline and reference them from the recipe data:

- recipe-1: video (mp4) + photo — chocolate cottage-cheese muffins
- recipe-2: video (webm) + photo — Pecho peanut butter ice cream
- recipe-3: video (webm) + photo — crunchy peanut butter cookies

Each photo is used as the recipe card thumbnail and as the `poster` frame of the video on the detail page, so cards show a real image instead of a dark video frame.

## Recipe content
`src/data/recipes.ts` gets three entries. Recipe 1 is the muffin recipe already on the site — its text stays, and it gains the new photo and the newly uploaded video. Recipes 2 and 3 are new:

**2. 🍦 Pecho-ს არაქისის კარაქის ნაყინი** — banana, kiwi, cocoa, honey, Pecho Classic; blend, pour into molds, insert sticks, freeze until firm, top with Pecho Classic and toppings.

**3. 🍪 Pecho-ს ხრაშუნა არაქისის კარაქის ქუქიები** — banana, oats, chocolate chunks, 2 tbsp Pecho Crunchy; mash, mix, shape, bake at 180°C for 12–15 min.

Note: the middle of the ice-cream ingredient list came through partly cut off in your message. I will use the ingredients that arrived (ბანანი, კივი, კაკაო, თაფლი, Pecho Classic) and you can correct or add any missing line afterwards.

English titles/descriptions are added for the EN language toggle, matching the existing bilingual structure. Steps, ingredients, plating and closing text stay Georgian, as with the current recipe.

## Page changes
- `/recipes` listing shows three cards in the existing grid — same styling, but the thumbnail becomes the photo with the play overlay on top.
- `/recipes/<slug>` detail pages keep the current two-column layout: sticky 9:16 video on the left, ingredients / steps / plating on the right. No layout redesign.
- The plating/"Pecho touch" block renders only when a recipe has one.

## Technical notes
- Files touched: `src/data/recipes.ts` (three entries, new `imageUrl` field), `src/routes/recipes.index.tsx` (image thumbnail), `src/routes/recipes.$slug.tsx` (video poster, optional plating block).
- New `.asset.json` pointers under `src/assets/` for the three videos and three photos; no binaries committed.
- No changes to cart, products, admin, routing or fonts.
