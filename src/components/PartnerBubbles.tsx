import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { partners, type Partner } from "@/data/partners";
import { useT } from "@/lib/i18n";

const placementClasses: Record<Partner["placement"], string> = {
  "top-left": "left-[5%] top-[8%] sm:left-[9%] sm:top-[9%]",
  "top-right": "right-[5%] top-[20%] sm:right-[12%] sm:top-[12%]",
  "bottom-left": "bottom-[9%] left-[15%] sm:bottom-[10%] sm:left-[27%]",
  "bottom-right": "bottom-[13%] right-[10%] sm:bottom-[12%] sm:right-[29%]",
};

const sizeClasses: Record<Partner["size"], string> = {
  large: "size-28 sm:size-40",
  medium: "size-24 sm:size-32",
  small: "size-20 sm:size-28",
};

const drift: Record<Partner["id"], { x: number[]; y: number[]; rotate: number[]; duration: number }> = {
  jini: { x: [0, 7, -3, 0], y: [0, -8, 4, 0], rotate: [0, 1.5, -1, 0], duration: 7.2 },
  abga: { x: [0, -6, 4, 0], y: [0, 6, -7, 0], rotate: [0, -1.5, 1, 0], duration: 8.1 },
  billion: { x: [0, 5, -6, 0], y: [0, 8, -4, 0], rotate: [0, -1, 1.5, 0], duration: 7.7 },
  panda: { x: [0, -5, 6, 0], y: [0, -7, 5, 0], rotate: [0, 1, -1.5, 0], duration: 8.6 },
};

export function PartnerBubbles() {
  const { lang } = useT();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<Partner["id"] | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-brand-cream px-4 py-14 sm:px-6 md:py-20" aria-labelledby="partner-bubbles-heading">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center md:mb-10">
          <p className="font-label text-xs font-bold uppercase tracking-widest text-brand-toast">
            {lang === "ka" ? "ჩვენი პარტნიორები" : "Our partners"}
          </p>
          <h2 id="partner-bubbles-heading" className="mt-2 font-display text-3xl font-extrabold md:text-4xl">
            {lang === "ka" ? "სად იპოვით Pecho-ს" : "Where to find Pecho"}
          </h2>
        </header>

        <div
          ref={constraintsRef}
          className="partner-bubbles-stage relative h-[420px] overflow-hidden rounded-3xl border border-brand-roast/10 bg-brand-paper/45 sm:h-[500px]"
        >
          <div className="pointer-events-none absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-brand-roast/10">
            <span className="font-display text-5xl font-extrabold sm:text-7xl">PECHO</span>
          </div>

          {partners.map((partner, index) => {
            const isDragging = dragging === partner.id;
            const animation = drift[partner.id];
            return (
              <motion.div
                key={partner.id}
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.2}
                dragMomentum={false}
                onDragStart={() => setDragging(partner.id)}
                onDragEnd={() => setDragging(null)}
                whileDrag={{ scale: 1.07, zIndex: 20 }}
                className={`partner-bubble absolute ${placementClasses[partner.placement]} ${sizeClasses[partner.size]} cursor-grab touch-none select-none active:cursor-grabbing`}
                aria-label={partner.name[lang]}
                role="img"
              >
                <motion.div
                  animate={reduceMotion || isDragging ? { x: 0, y: 0, rotate: 0 } : animation}
                  transition={
                    reduceMotion || isDragging
                      ? { duration: 0.2 }
                      : { duration: animation.duration, delay: index * 0.35, repeat: Infinity, ease: "easeInOut" }
                  }
                  className={`partner-bubble-surface partner-bubble-${partner.accent} size-full overflow-hidden rounded-full bg-card p-1.5 sm:p-2`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name[lang]}
                    draggable={false}
                    className="pointer-events-none size-full rounded-full object-contain"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}