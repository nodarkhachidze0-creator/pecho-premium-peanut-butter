# Header and hero animation refinements

## Header controls

- Apply the existing short shake animation class to the cart button so the menu and cart controls react identically on pointer hover.
- Preserve the current button styling, click behavior, badge, drawer behavior, keyboard focus, and reduced-motion handling.

## Navigation drawer transitions

- Give each orange-drawer navigation row a consistent 300ms ease-in-out transition for background and text color.
- Preserve the current cream hover/focus fill, dark text state, numbered rows, keyboard focus behavior, and drawer layout.

## Hero peanut animation boundaries & styling

- Keep all seven uploaded colored peanut assets, as confirmed.
- **Strict Area Boundary:** Restrict the peanut particle container strictly to the upper hero background section. Ensure `overflow: hidden` is applied so that peanuts never spill over, drop down, or overlap with the lower product sections, cards, or lower text areas shown in the reference image.
- Increase the particle count by reusing the seven colors in a deliberately shuffled sequence, avoiding adjacent duplicate colors and distributing more particles across the hero without obscuring important content.
- Assign each particle its own position, responsive size, rotation, duration between 8–15 seconds, and negative delay so the animation is already in progress on first render.
- Update the keyframes to fade and scale gradually: hidden at 0%, fully visible around 15–20%, held through 80–85%, then smoothly faded and shrunk by 100%.
- Retain decorative semantics, click-through layering, mobile density controls, and a static reduced-motion fallback.

## Verification

- Check desktop and mobile hero density, color variety, smooth looping, and content readability.
- Confirm peanuts are strictly contained within the upper hero section and do not bleed into lower page areas.
- Confirm both header buttons shake on hover, menu-row colors transition smoothly, drawers and cart remain functional, and reduced-motion behavior remains calm.
- Run the focused type check and browser interaction checks with no new console errors.

## Technical details

- Update `src/components/Header.tsx`, `src/components/HeroPeanuts.tsx`, and the related animation rules in `src/styles.css` only.
- Use deterministic particle configuration rather than runtime randomness, preventing server/client rendering mismatches while still creating an organic appearance.
- Add no new dependencies and make no content, routing, product, cart, or checkout changes.