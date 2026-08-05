/**
 * Fly the product image from its origin to the cart icon.
 * Cart icon must have `data-cart-icon` attribute.
 * Also dispatches "pecho:cart-bump" once the flight completes so the
 * cart icon can play its bounce animation.
 */
export function flyToCart(imageSrc: string, fromRect: DOMRect) {
  if (typeof window === "undefined") return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const target = document.querySelector<HTMLElement>("[data-cart-icon]");
  if (!target || reduce) {
    window.dispatchEvent(new CustomEvent("pecho:cart-bump"));
    return;
  }
  const toRect = target.getBoundingClientRect();

  for (let index = 0; index < 6; index += 1) {
    const particle = document.createElement("span");
    particle.className = "peanut-particle";
    particle.textContent = "🥜";
    particle.style.left = `${fromRect.left + fromRect.width / 2}px`;
    particle.style.top = `${fromRect.top + fromRect.height * 0.62}px`;
    particle.style.setProperty("--particle-x", `${(index - 2.5) * 18}px`);
    particle.style.setProperty("--particle-y", `${-24 - (index % 3) * 14}px`);
    particle.style.animationDelay = `${index * 28}ms`;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
  }

  const el = document.createElement("img");
  el.src = imageSrc;
  el.alt = "";
  el.decoding = "async";
  el.style.cssText = `
    position:fixed;
    left:${fromRect.left}px;
    top:${fromRect.top}px;
    width:${fromRect.width}px;
    height:${fromRect.height}px;
    border-radius:16px;
    object-fit:cover;
    pointer-events:none;
    z-index:9999;
    box-shadow:0 20px 40px -12px color-mix(in srgb, var(--brand-toast) 55%, transparent);
    transition: transform 720ms cubic-bezier(0.22,1,0.36,1), opacity 720ms ease-out, border-radius 720ms ease-out;
    will-change: transform, opacity;
  `;
  document.body.appendChild(el);

  const dx = toRect.left + toRect.width / 2 - (fromRect.left + fromRect.width / 2);
  const dy = toRect.top + toRect.height / 2 - (fromRect.top + fromRect.height / 2);

  requestAnimationFrame(() => {
    el.style.transform = `translate(${dx}px, ${dy}px) scale(0.06) rotate(8deg)`;
    el.style.opacity = "0.12";
    el.style.borderRadius = "999px";
  });

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    el.remove();
    window.dispatchEvent(new CustomEvent("pecho:cart-bump"));
  };
  el.addEventListener("transitionend", cleanup, { once: true });
  setTimeout(cleanup, 900);
}
