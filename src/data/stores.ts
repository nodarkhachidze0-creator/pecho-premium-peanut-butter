/**
 * Default Pecho retail locations.
 *
 * ADMIN NOTE: this array is the coded *default* source. Admins can override it
 * from /admin/locations. Reads and writes always go through
 * `src/lib/locations.ts` so the storage backend can be swapped for a real
 * database later without touching the customer-facing map.
 */
export type Store = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  note?: string;
};

export const defaultStores: Store[] = [
  {
    id: "chavchavadze",
    name: "Pecho — ჭავჭავაძის",
    address: "გ. გამსახურდიას / ჭავჭავაძის 49/4, ბათუმი",
    lat: 41.6442113,
    lng: 41.6349596,
  },
  {
    id: "khulos",
    name: "Pecho — ხულოს ქუჩა",
    address: "ხულოს ქუჩა 13, ბათუმი",
    lat: 41.6488806,
    lng: 41.6422392,
  },
  {
    id: "kazbegi",
    name: "Pecho — ყაზბეგის",
    address: "ალექსანდრე ყაზბეგის 17, ბათუმი",
    lat: 41.64442,
    lng: 41.6336582,
  },
  {
    id: "khimshiashvili",
    name: "Pecho — ხიმშიაშვილის",
    address: "შერიფ ხიმშიაშვილის 4, ბათუმი",
    lat: 41.6433672,
    lng: 41.6169731,
  },
  {
    id: "nizharadze",
    name: "Pecho — ნიჟარაძის",
    address: "ნიჟარაძის 23, ბათუმი",
    lat: 41.6216318,
    lng: 41.5928631,
  },
  {
    id: "mayakovski",
    name: "Pecho — მაიაკოვსკის",
    address: "მაიაკოვსკის 95, ბათუმი",
    lat: 41.6396655,
    lng: 41.667196,
  },
];

/** @deprecated import from `@/lib/locations` instead. */
export const stores = defaultStores;
