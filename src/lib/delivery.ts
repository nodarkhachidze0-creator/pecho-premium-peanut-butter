import { useCallback, useEffect, useState } from "react";

export type DeliveryZone = "city" | "regions";

/** Fee by jar count (index 1..3, 4+ uses last value). Jar size does not matter. */
const TIERS: Record<DeliveryZone, [number, number, number, number]> = {
  city: [7, 5, 3, 0],
  regions: [9, 8, 7, 5],
};

export const FREE_TIER_JARS = 4;

export function deliveryFee(zone: DeliveryZone, jarCount: number): number {
  if (jarCount <= 0) return 0;
  const tiers = TIERS[zone];
  const index = Math.min(jarCount, FREE_TIER_JARS) - 1;
  return tiers[index]!;
}

/** Fee the customer would pay with one more jar, or null if already at best tier. */
export function nextTier(
  zone: DeliveryZone,
  jarCount: number,
): { jarsNeeded: number; fee: number } | null {
  if (jarCount >= FREE_TIER_JARS) return null;
  const target = Math.max(jarCount + 1, 1);
  return { jarsNeeded: target - jarCount, fee: deliveryFee(zone, target) };
}

const STORAGE_KEY = "pecho.deliveryZone";

export function useDeliveryZone(): [DeliveryZone, (zone: DeliveryZone) => void] {
  const [zone, setZoneState] = useState<DeliveryZone>("city");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "city" || saved === "regions") setZoneState(saved);
    } catch {}
  }, []);

  const setZone = useCallback((next: DeliveryZone) => {
    setZoneState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("pecho:zone", { detail: next }));
    }
  }, []);

  useEffect(() => {
    const onZone = (e: Event) => {
      const detail = (e as CustomEvent<DeliveryZone>).detail;
      if (detail === "city" || detail === "regions") setZoneState(detail);
    };
    window.addEventListener("pecho:zone", onZone);
    return () => window.removeEventListener("pecho:zone", onZone);
  }, []);

  return [zone, setZone];
}
