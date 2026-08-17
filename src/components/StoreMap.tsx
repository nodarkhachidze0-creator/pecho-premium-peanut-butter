import { useEffect, useRef, useState } from "react";
import { listLocations, type StoreLocation } from "@/lib/locations";

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

const MARKER_ICON = {
  path: "M12 0C6.5 0 2 4.5 2 10c0 7.5 10 18 10 18s10-10.5 10-18c0-5.5-4.5-10-10-10z",
  fillColor: "#F3820A",
  fillOpacity: 1,
  strokeColor: "#3B2314",
  strokeWeight: 1.5,
  scale: 1.5,
  anchor: { x: 12, y: 28 },
};

/** Customer-facing, strictly read-only map. Never renders admin controls. */
export function StoreMap() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [locations, setLocations] = useState<StoreLocation[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      listLocations().then((l) => {
        if (!cancelled) setLocations(l);
      });
    };
    load();
    window.addEventListener("pecho:locations-changed", load);
    return () => {
      cancelled = true;
      window.removeEventListener("pecho:locations-changed", load);
    };
  }, []);

  useEffect(() => {
    if (locations.length === 0) return;
    let cancelled = false;

    loadMaps()
      .then(() => {
        if (cancelled || !ref.current) return;
        const g = window.google;
        const map = new g.maps.Map(ref.current, {
          center: { lat: locations[0]!.lat, lng: locations[0]!.lng },
          zoom: 13,
          gestureHandling: "greedy",
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        });

        const bounds = new g.maps.LatLngBounds();
        const info = new g.maps.InfoWindow();

        locations.forEach((store) => {
          const position = { lat: store.lat, lng: store.lng };
          bounds.extend(position);
          const marker = new g.maps.Marker({
            position,
            map,
            title: store.name,
            icon: {
              ...MARKER_ICON,
              anchor: new g.maps.Point(12, 28),
            },
          });
          marker.addListener("click", () => {
            info.setContent(
              `<div style="font-family:inherit;padding:2px 4px;max-width:220px">
                 <strong style="display:block;color:#3b2314;font-size:14px">${store.name}</strong>
                 <span style="color:#6b5344;font-size:13px">${store.address}</span>
                 ${store.note ? `<span style="display:block;color:#8a7466;font-size:12px;margin-top:4px">${store.note}</span>` : ""}
               </div>`,
            );
            info.open({ anchor: marker, map });
          });
        });

        if (locations.length > 1) map.fitBounds(bounds, 64);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [locations]);

  return (
    <div>
      <div className="relative w-full h-[360px] md:h-[520px] rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-lg bg-brand-paper">
        <div ref={ref} className="absolute inset-0" />
        {status !== "ready" && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-paper text-sm text-brand-roast/60">
            {status === "error" ? "რუკის ჩატვირთვა ვერ მოხერხდა" : "რუკა იტვირთება…"}
          </div>
        )}
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((s) => (
          <li key={s.id} className="rounded-2xl bg-brand-paper p-4 ring-1 ring-black/5">
            <p className="font-medium text-brand-roast">{s.name}</p>
            <p className="text-sm text-brand-roast/60 mt-1">{s.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoreMap;
