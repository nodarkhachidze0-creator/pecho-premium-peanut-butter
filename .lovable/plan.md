# Critical homepage and About corrections

## Scope
Only the requested hero particles, homepage About logo, navigation drawer, and `/about` image will change. Recipe videos and all other content remain untouched.

## Changes
1. **Hard-contain hero particles**
   - Keep the top hero as the sole positioned clipping boundary and strengthen it with explicit relative positioning, hidden overflow, isolation, and paint containment.
   - Restrict the particle layer to the hero’s own top/side/bottom bounds with a `100vh` maximum height so no particle can render over the product section.
   - Preserve all seven peanut colors and the existing distributed positions.

2. **Guarantee exact 0.2-second particle fades**
   - Replace the current percentage timing with a fixed cycle whose opening 0.2 seconds fade and scale from hidden to visible, whose middle holds steady, and whose final 0.2 seconds fade and scale back out.
   - Keep staggered negative delays so the animation is already in progress when the page opens.
   - Preserve the reduced-motion behavior.

3. **Remove the homepage logo frame**
   - Remove the image wrapper’s background treatment, border/ring, rounded corners, clipping, and forced 4:3 crop.
   - Use a transparent-background version of the supplied Pecho logo, preserving the logo artwork while removing the orange pixels baked into the uploaded image.
   - Render the logo directly on the section’s natural cream surface with proportional sizing and no decorative box.

4. **Restore the navigation drawer**
   - Remove the jar photograph and its import from the orange drawer.
   - Return the drawer body to the navigation links and language controls only, without the media column.

5. **Move the jar photograph to `/about`**
   - Replace the first large story photograph currently using the peanut-butter texture with the supplied `450გრ კლასიკი2-2.png` image.
   - Display it with contained, undistorted proportions and appropriate rounded corners within the existing two-column About layout.
   - Remove the displaced image’s unused import.

## Verification
- Check desktop and mobile homepages to confirm particles are invisible outside the hero and the logo has no orange frame.
- Open and close the navigation drawer to confirm it contains no image and retains its existing behavior.
- Check `/about` at desktop and mobile sizes for the correct jar image, natural proportions, and rounded corners.
- Confirm there are no new browser errors or type errors.
