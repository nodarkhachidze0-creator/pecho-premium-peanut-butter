import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { stores } from "@/data/stores";

declare global {
  interface Window {
    google?: any;
    __pechoMapsInit?: () => void;
    __pechoMapsPromise?: Promise<void>;
  }
}

function loadMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps) return Promise.resolve();
  if (window.__pechoMapsPromise) return window.__pechoMapsPromise;

  const key = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
  const channel = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"];

  window.__pechoMapsPromise = new Promise<void>((resolve, reject) => {
    if (!key) {
      reject(new Error("Missing Google Maps browser key"));
      return;
    }
    window.__pechoMapsInit = () => resolve();
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=__pechoMapsInit${
      channel ? `&channel=${channel}` : ""
    }`;
    s.async = true;
    s.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(s);
  });

  return window.__pechoMapsPromise;
}

export function StoreMap() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoRef = useRef<any>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadMaps()
      .then(() => {
        if (cancelled || !ref.current) return;
        const g = window.google;
        const map = new g.maps.Map(ref.current, {
          center: { lat: 41.6416, lng: 41.6367 },
          zoom: 13,
          gestureHandling: "greedy",
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        });
        mapRef.current = map;

        const bounds = new g.maps.LatLngBounds();
        const info = new g.maps.InfoWindow();
        infoRef.current = info;

        markersRef.current = stores.map((store, i) => {
          const position = { lat: store.lat, lng: store.lng };
          bounds.extend(position);
          const marker = new g.maps.Marker({ position, map, title: store.name });
          marker.addListener("click", () => {
            setActive(i);
            info.setContent(
              `<div style="font-family:inherit;padding:2px 4px;max-width:220px">
                 <strong style="display:block;color:#2a1810;font-size:14px">${store.name}</strong>
                 <span style="color:#6b4a35;font-size:13px">${store.address}</span>
               </div>`,
            );
            info.open({ anchor: marker, map });
          });
          return marker;
        });

        if (stores.length > 1) map.fitBounds(bounds, 48);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const focus = (i: number) => {
    setActive(i);
    const map = mapRef.current;
    const marker = markersRef.current[i];
    if (!map || !marker) return;
    map.panTo(marker.getPosition());
    map.setZoom(16);
    if (infoRef.current) {
      const store = stores[i]!;
      infoRef.current.setContent(
        `<div style="font-family:inherit;padding:2px 4px;max-width:220px">
           <strong style="display:block;color:#2a1810;font-size:14px">${store.name}</strong>
           <span style="color:#6b4a35;font-size:13px">${store.address}</span>
         </div>`,
      );
      infoRef.current.open({ anchor: marker, map });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,45%)_minmax(0,1fr)] lg:items-start">
      <div className="relative h-[280px] w-full overflow-hidden rounded-3xl bg-brand-paper ring-1 ring-brand-roast/10 sm:h-[340px] lg:h-[420px]">
        <div ref={ref} className="absolute inset-0" />
        {status !== "ready" && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-paper text-sm text-brand-roast/60">
            {status === "error" ? "რუკის ჩატვირთვა ვერ მოხერხდა" : "რუკა იტვირთება…"}
          </div>
        )}
      </div>

      <div>
        <p className="font-label text-[11px] uppercase tracking-widest text-brand-toast">
          {stores.length} ლოკაცია
        </p>
        <p className="mt-3 max-w-lg leading-relaxed text-brand-roast/70">
          Pecho ხელმისაწვდომია ქვემოთ ჩამოთვლილ მაღაზიებში. აირჩიე მისამართი და რუკა
          ავტომატურად გადაინაცვლებს შესაბამის წერტილზე.
        </p>
        <ul className="mt-6 divide-y divide-brand-roast/10 border-y border-brand-roast/10">
          {stores.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                onClick={() => focus(i)}
                className={`flex w-full items-start gap-3 py-4 text-left transition-colors ${
                  active === i ? "text-brand-toast" : "hover:text-brand-toast"
                }`}
              >
                <MapPin
                  className={`mt-0.5 size-4 shrink-0 ${
                    active === i ? "text-brand-toast" : "text-brand-roast/40"
                  }`}
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-base leading-tight text-current">
                    {s.name}
                  </span>
                  <span className="mt-1 block text-sm text-brand-roast/60">{s.address}</span>
                </span>
                <span className="font-label shrink-0 self-center text-[10px] uppercase tracking-widest text-brand-toast">
                  იხილე რუკაზე
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StoreMap;
