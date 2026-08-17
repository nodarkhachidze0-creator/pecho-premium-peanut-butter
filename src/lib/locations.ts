/**
 * Store-location data service.
 *
 * The customer-facing map and the admin manager both go through this module,
 * never through the raw storage. Today it is backed by the coded defaults plus
 * a browser-storage override layer (temporary development fallback). Swapping
 * in a real database later means replacing `localSource` with a remote source
 * that implements `LocationSource` — no UI changes required.
 */
import { defaultStores, type Store } from "@/data/stores";

export type StoreLocation = Store;

export type LocationSource = {
  list(): Promise<StoreLocation[]>;
  save(locations: StoreLocation[]): Promise<void>;
  /** True when writes only live on this device. */
  readonly isEphemeral: boolean;
};

const KEY = "pecho.locations.v1";

function readOverride(): StoreLocation[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(
      (l): l is StoreLocation =>
        !!l && typeof l.name === "string" && typeof l.lat === "number" && typeof l.lng === "number",
    );
  } catch {
    return null;
  }
}

const localSource: LocationSource = {
  isEphemeral: true,
  async list() {
    return readOverride() ?? defaultStores;
  },
  async save(locations) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY, JSON.stringify(locations));
    window.dispatchEvent(new CustomEvent("pecho:locations-changed"));
  },
};

let source: LocationSource = localSource;

/** Swap the backing store (e.g. to a database-backed source). */
export function setLocationSource(next: LocationSource) {
  source = next;
}

export function isLocationStorageEphemeral() {
  return source.isEphemeral;
}

export function listLocations() {
  return source.list();
}

export function saveLocations(locations: StoreLocation[]) {
  return source.save(locations);
}

export async function resetLocations() {
  if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("pecho:locations-changed"));
}

export function createLocationId() {
  return `loc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
