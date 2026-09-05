# Homepage premium product cover-flow

## Experience
- Replace the homepage’s current featured-product card grid with a dedicated dark-brown cover-flow section.
- Show exactly three jars on desktop: one dominant centered jar and the adjacent products at 75% scale and reduced opacity; adapt to a focused single-jar composition on narrow screens without clipping.
- Keep the 2+1 bundle completely out of this section. The carousel will use only the four Classic and Crunchy 450g/1kg products already in the catalog.
- Place the active product’s localized title and weight above the jar, and four centered icon badges below it: no added sugar, no palm oil, fasting/vegan, and NON-GMO.

## Interaction and motion
- Add previous/next edge controls with looping navigation, keyboard arrow support, touch/swipe navigation, and stable transitions between active and side products.
- Link the active jar directly to its existing product-detail page; side jars can also be selected to bring them into focus.
- Give only the active jar a subtle 4–5 second vertical floating loop and center spotlight glow.
- Respect reduced-motion preferences by removing continuous floating and minimizing transitions.

## Visual system
- Use the existing semantic brand tokens, extending them only where needed for the requested deep brown, warm spotlight, off-white text, and orange accents.
- Use the existing Hakuna display font for the product title and Noto Sans Georgian for weight, controls, and feature labels.
- Use minimal Lucide line icons and accessible labels/focus states for navigation.

## Technical approach
- Create a focused reusable carousel component with local active-index and swipe state, using React and CSS rather than adding Framer Motion because the project already has the required carousel and animation foundations.
- Add the float, cover-flow positioning, spotlight, and reduced-motion rules to the global stylesheet.
- Mount the component in the existing featured-products position on the homepage and leave the catalog, product detail pages, prices, cart, and promotion content unchanged.
- Verify desktop and mobile layout, looping controls, swipe/keyboard behavior, product links, Georgian typography, and absence of all 2+1 references inside the carousel.
