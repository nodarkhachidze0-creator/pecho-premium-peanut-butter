# Product page gallery, content, and footer refinement

## Product gallery and scrolling
- Keep the existing two-column product layout, but make the media column sticky on desktop so it remains visible while the longer details column scrolls; release it naturally when the product section ends.
- Keep mobile behavior in normal document flow so the gallery does not obstruct content on small screens.
- Place thumbnails in a vertical column to the left of the main image on desktop, with a horizontal thumbnail strip on mobile.
- Restore the main image frame to a clipped 20px radius with a restrained shadow, preserving `object-contain` and natural image proportions.
- Animate thumbnail changes with a short fade and subtle movement/scale transition, including reduced-motion support and clear selected states.

## Product information tabs
- Replace the current three product-data tabs with four sections:
  1. პროდუქტის აღწერა
  2. შემადგენლობა & ალერგენები
  3. შენახვის პირობები
  4. კვებითი ღირებულება
- Use the supplied Georgian copy exactly, preserving paragraph breaks and the final feature line.
- Add matching English translations for English mode so the bilingual experience remains complete.
- Import the supplied nutrition image through the project asset system and show it below the nutrition introduction, responsively contained with useful alternative text.
- Keep the existing product selectors, prices, quantity, cart action, and variant-specific galleries unchanged.

## Logo and footer
- Replace the shared Pecho logo asset with the newly supplied transparent logo so the corrected artwork appears consistently, including the footer and header.
- Create a matching square favicon from the supplied logo without stretching it.
- Update the footer slogan to “ჯანსაღი ცხოვრება იწყება ერთი კოვზიდან” and provide the corresponding English translation.
- Increase footer section-heading and content sizes slightly while preserving the existing dark footer layout, links, contact details, and delivery text.
- Remove the current forced color inversion from the footer logo if it conflicts with the supplied artwork, while maintaining clear contrast.

## Verification
- Check the product page at desktop and mobile sizes, including gallery switching, sticky start/end behavior, all four content sections, image proportions, and variant changes.
- Check the corrected logo and improved footer readability on both viewport sizes.
- Run the focused type check and confirm there are no new browser console errors from these changes.

## Technical details
- The product detail route currently renders a responsive thumbnail/main-image flex layout and three tab keys; this will be extended without changing its URL-based variant switching.
- Sticky positioning will be applied only at the desktop breakpoint with a top offset that clears the floating header.
- The uploaded nutrition graphic and logo will be stored as CDN-backed asset pointers; the favicon remains a real square file under `public/`.
