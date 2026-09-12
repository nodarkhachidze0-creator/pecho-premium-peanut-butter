# Hero, homepage, drawer, and recipe media updates

## Hero peanut animation

- Keep all seven existing colored peanut assets and confine their particle layer to the homepage hero only.
- Preserve `overflow-hidden` on the hero wrapper and reinforce clipping/paint containment on the absolute particle layer so no peanut can enter the product section or any content outside the hero.
- Change the loop to a roughly four-second visible cycle: hidden and half-size at 0%, fully visible by 10%, held through 70%, then quickly faded and reduced to half-size by 85–100%.
- Reorganize the deterministic particle positions into widely distributed spawn zones. Stagger each zone's repeated particles so the same vicinity has at least three seconds of inactivity before it is reused.
- Keep the particles decorative, behind hero content, non-interactive, responsive, and static for reduced-motion users.

## Homepage About image

- Upload `ლოგო.png` through the project asset flow and replace only the homepage “PECHO-ს შესახებ” spoon image with it.
- Preserve the existing compact About layout and rounded media frame, using contained image fitting so the logo is not cropped or distorted.
- Update the image description to identify the Pecho logo.

## Navigation drawer image

- Upload `450გრ კლასიკი2.png` through the project asset flow.
- Add it as the requested side panel inside the orange navigation drawer on desktop, with the navigation links retained alongside it.
- Use a stacked, space-efficient placement on mobile so the existing 85%-width drawer remains usable.
- Present the photo in a stable responsive frame with 16px rounded corners, hidden overflow, and proportional cropping; preserve numbered links, language controls, keyboard focus handling, scrolling, and drawer close behavior.

## Recipe detail video

- Leave the recipe listing grid, static thumbnails, links, and play overlays unchanged.
- Keep the existing HTML5 video player on every recipe detail page, but remove the static recipe image poster so the top media area immediately presents the video player rather than the final photo.
- Preserve controls, inline playback, portrait framing, preload behavior, and the desktop sticky two-column layout without adding dependencies.

## Verification

- Check desktop and mobile hero clipping, particle spacing, timing, cooldowns, text readability, and reduced-motion behavior.
- Confirm the homepage About section uses the uploaded logo without cropping.
- Confirm the drawer uses the uploaded 450g Classic photo with rounded corners in the chosen desktop side-panel layout and remains usable on mobile.
- Confirm recipe cards remain unchanged and all three detail pages open directly to playable videos without static poster images.
- Run the focused type check and browser interaction checks with no new console errors.

## Technical details

- Expected files: `src/components/HeroPeanuts.tsx`, `src/components/Header.tsx`, `src/routes/index.tsx`, `src/routes/recipes.$slug.tsx`, `src/styles.css`, plus CDN asset pointers for both uploaded images.
- Use deterministic timing and placement rather than runtime randomness to avoid server/client rendering mismatches while retaining an organic pattern.
- No content, product, cart, checkout, recipe-grid, or routing changes.
