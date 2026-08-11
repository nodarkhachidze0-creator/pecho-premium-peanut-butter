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
    box-shadow:0 20px 40px -12px rgba(243,130,10,0.55);
    transition: transform 780ms cubic-bezier(0.65,0,0.35,1), opacity 780ms ease-out, border-radius 780ms ease-out;
    will-change: transform, opacity;
  `;
  document.body.appendChild(el);

  const dx = toRect.left + toRect.width / 2 - (fromRect.left + fromRect.width / 2);
  const dy = toRect.top + toRect.height / 2 - (fromRect.top + fromRect.height / 2);

  requestAnimationFrame(() => {
    el.style.transform = `translate(${dx}px, ${dy}px) scale(0.08) rotate(20deg)`;
    el.style.opacity = "0.2";
    el.style.borderRadius = "999px";
  });

  const cleanup = () => {
    el.remove();
    window.dispatchEvent(new CustomEvent("pecho:cart-bump"));
  };
  el.addEventListener("transitionend", cleanup, { once: true });
  setTimeout(cleanup, 1000);
}
