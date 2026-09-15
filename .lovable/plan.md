# Contact, Mobile Layout, Recipe Carousel, and Product FAQ

## Changes

1. **Update the partners contact sentence**
   - Replace the Georgian `partners.contactNote` value with exactly: `დაგვიკავშირდით ნებისმიერ დროს, ჩვენი გუნდი კი უმოკლეს დროში გიპასუხოთ.`
   - Keep the current English translation unchanged.

2. **Constrain the homepage product jar on mobile**
   - Update the active product image in the homepage product carousel so screens below 768px cap it at `50vh` high and `85vw` wide with contained scaling.
   - Add mobile-safe spacing and stacking around the product stage so the jar stays centered without covering the product title, navigation arrows, or benefit icons.
   - Preserve the current larger desktop presentation and carousel animation.

3. **Make the cart drawer fully scrollable on mobile**
   - Give the drawer panel a full-height flex column layout.
   - Keep the header fixed within the drawer and combine the populated cart’s items, delivery selector, totals, and actions inside one `flex-1 min-h-0 overflow-y-auto touch-pan-y` region.
   - Preserve cart calculations, quantity controls, checkout links, focus trapping, and the desktop drawer width.

4. **Add a recipe video carousel to product pages**
   - Create a focused reusable recipe-video carousel using the three recipes and their existing thumbnail/video assets.
   - Place it directly after “You May Also Like.”
   - Use a horizontal, touch-friendly snap track with stable portrait video card dimensions and previous/next arrow controls.
   - Start each card paused on its thumbnail. Mouse hover or keyboard/touch focus previews the video muted and inline; leaving or blurring pauses it.
   - Clicking or tapping activates that card with sound and native playback controls for volume and scrubbing. Switching cards pauses the previously active video.
   - Keep titles bilingual and link each recipe title to its full recipe page without making the video activation ambiguous.

5. **Reuse the full FAQ on product pages**
   - Extract the existing bilingual FAQ questions and accordion display into reusable shared modules so the standalone FAQ page and product pages use one source of truth.
   - Render the full FAQ section below the recipe carousel and above the global footer.
   - Keep the standalone FAQ page’s single page heading while using a section heading on product pages to preserve semantic structure.

## Validation

- Check the homepage product carousel and cart drawer at mobile widths below 768px, including a populated cart scrolled to its final action buttons.
- Check product pages on mobile and desktop for snap scrolling, arrows, muted preview, sound/control activation, and only one active video at a time.
- Confirm the full bilingual FAQ renders correctly on both the FAQ page and every product page.
- Run the project type check and verify cart totals and checkout behavior remain unchanged.

## Technical notes

- Existing source confirmed: homepage jar sizing is in `ProductCoverFlow`; the cart currently scrolls only its item list; recipe videos and thumbnails are centralized in the recipe data; FAQ questions currently live directly inside the FAQ page.
- No backend, order logic, delivery pricing, or checkout changes are included.
