# Animated peanut sticker for the empty cart

## What will change

- Upload the attached transparent peanut sticker to the project asset service and reference it through its generated asset pointer.
- Replace the existing drawn peanut mascot only in the empty-cart view.
- Present the sticker in a fixed, responsive square frame, capped at 220px, so loading never shifts the text or button.
- Add a slow, gentle body bob with restrained vertical movement.
- Add two precisely positioned pupil layers over the sticker’s eyes:
  - On pointer devices, the pupils follow the cursor within a small safe radius.
  - On touch/mobile devices, the pupils drift subtly in a loop.
  - Movement is handled with transforms for smooth performance.
- Respect reduced-motion preferences by disabling the bob and eye movement.
- Keep the empty-cart message and shopping button centered directly underneath, updating the Georgian message to the exact requested wording: “შენი კალათა გემრიელი ჩასუსვის მოლოდინშია.”
- Leave populated-cart behavior, delivery calculations, and checkout links unchanged.

## Technical details

- Create a small dedicated animated sticker component with pointer tracking scoped to its own bounds.
- Add semantic animation classes and keyframes to the existing global styles, including a reduced-motion fallback.
- Remove the old mascot import from the cart page; keep the old component untouched if it is used elsewhere.
- Complete the cart page’s route metadata with its existing no-index behavior preserved.

## Verification

- Check the empty state at desktop and narrow mobile sizes.
- Confirm the uploaded image remains sharp, transparent, centered, and distortion-free.
- Confirm pupil movement stays inside both eye frames and the body animation causes no layout shift.
- Confirm reduced-motion mode displays a still, polished sticker.
- Run the project type check and inspect browser console errors.
