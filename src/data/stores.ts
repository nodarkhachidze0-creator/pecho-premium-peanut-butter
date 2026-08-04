/**
 * Pecho retail locations shown on the homepage map.
 *
 * ADMIN NOTE: this array is the single source of truth for the map markers.
 * To add, edit or remove a store, change this file only — nothing else needs
 * to be touched. Visitors can never edit these locations.
 */
export type Store = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export const stores: Store[] = [
  {
    name: "Pecho — ჭავჭავაძის",
    address: "გ. გამსახურდიას / ჭავჭავაძის 49/4, ბათუმი",
    lat: 41.6442113,
    lng: 41.6349596,
  },
  {
    name: "Pecho — ხულოს ქუჩა",
    address: "ხულოს ქუჩა 13, ბათუმი",
    lat: 41.6488806,
    lng: 41.6422392,
  },
  {
    name: "Pecho — ყაზბეგის",
    address: "ალექსანდრე ყაზბეგის 17, ბათუმი",
    lat: 41.64442,
    lng: 41.6336582,
  },
  {
    name: "Pecho — ხიმშიაშვილის",
    address: "შერიფ ხიმშიაშვილის 4, ბათუმი",
    lat: 41.6433672,
    lng: 41.6169731,
  },
  {
    name: "Pecho — ნიჟარაძის",
    address: "ნიჟარაძის 23, ბათუმი",
    lat: 41.6216318,
    lng: 41.5928631,
  },
  {
    name: "Pecho — მაიაკოვსკის",
    address: "მაიაკოვსკის 95, ბათუმი",
    lat: 41.6396655,
    lng: 41.667196,
  },
];
