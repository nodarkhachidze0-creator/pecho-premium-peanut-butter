# Homepage Hero Product Stand

## Scope

Replace only the homepage hero’s right-hand image area. Keep the left-side copy, buttons, hero layout, and animated peanut background unchanged.

## Implementation

- Create a focused `HeroProductStand` component with two stateful controls:
  - Type: `კლასიკი` / `ხრუხუნა`
  - Size: `450გ` / `1კგ`
- Use the four newly uploaded transparent jar images for the matching type-and-size combinations.
- Replace the current rectangular linked photo with a centered product-stage layout:
  - stable responsive media area to prevent layout shifts
  - floating jar with preserved proportions and `object-contain`
  - soft elliptical radial floor shadow beneath the jar
  - compact pill toggle groups below the stage
- Animate the selected jar with:
  - a continuous 3-second, 12px vertical float
  - a coordinated soft drop shadow
  - a short fade-and-scale entrance whenever either selection changes
- Give each toggle a smoothly sliding orange active indicator, clear keyboard focus, and accessible pressed/selected state.
- Scale the stage, jar, shadow, and controls down for narrow screens while preventing clipping or horizontal overflow.
- Respect reduced-motion preferences by disabling continuous floating and simplifying selection transitions.

## Asset handling

- Upload the four attached `-2.webp` packshots to the project asset service and reference their generated asset pointers.
- Preserve the source transparency and natural aspect ratios; no stretching or uneven transforms.

## Verification

- Check all four type/size combinations show the correct jar.
- Verify smooth selection and floating motion, stable layout, and keyboard control behavior.
- Check desktop and mobile hero layouts, confirming the left content and peanut particles remain unchanged.
- Run the project’s focused type check and inspect the homepage for browser errors.