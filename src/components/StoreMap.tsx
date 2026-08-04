import { useEffect, useRef, useState } from "react";
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
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

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

        const bounds = new g.maps.LatLngBounds();
        const info = new g.maps.InfoWindow();

        stores.forEach((store) => {
          const position = { lat: store.lat, lng: store.lng };
          bounds.extend(position);
          const marker = new g.maps.Marker({
            position,
            map,
            title: store.name,
          });
          marker.addListener("click", () => {
            info.setContent(
              `<div style="font-family:inherit;padding:2px 4px;max-width:220px">
                 <strong style="display:block;color:#3b2314;font-size:14px">${store.name}</strong>
                 <span style="color:#6b5344;font-size:13px">${store.address}</span>
               </div>`,
            );
            info.open({ anchor: marker, map });
          });
        });

        if (stores.length > 1) {
          map.fitBounds(bounds, 64);
        }
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] md:h-[520px] rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-lg bg-brand-paper">
      <div ref={ref} className="absolute inset-0" />
      {status !== "ready" && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-paper text-sm text-brand-roast/60">
          {status === "error" ? "რუკის ჩატვირთვა ვერ მოხერხდა" : "რუკა იტვირთება…"}
        </div>
      )}
    </div>
  );
}

export default StoreMap;
