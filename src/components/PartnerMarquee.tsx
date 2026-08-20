import { partners } from "@/data/partners";

export function PartnerMarquee() {
  if (partners.length === 0) return null;

  // Repeat so the track is always wide enough, then duplicate for a seamless loop.
  const min = 8;
  const base: typeof partners = [];
  while (base.length < min) base.push(...partners);
  const track = [...base, ...base];

  return (
    <div className="marquee-mask overflow-hidden">
      <div className="marquee-track items-center gap-12 sm:gap-20">
        {track.map((p, i) => (
          <div key={`${p.name}-${i}`} className="shrink-0" aria-hidden={i >= base.length}>
            <img
              src={p.logo}
              alt={p.name}
              loading="lazy"
              draggable={false}
              className="h-14 w-auto object-contain sm:h-20"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
