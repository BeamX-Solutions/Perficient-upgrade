/**
 * The Perficient fleet.
 *
 * The export repeated this list verbatim in three files (fleet, contact, and
 * the homepage booking dialog). It lives here once so a rate change cannot
 * drift between the catalogue, the estimator and the booking form.
 *
 * Rates are per day, in Nigerian Naira, and include a Perficient chauffeur
 * and fuel. Never invent a rate: every figure below is a confirmed one.
 */

export const FLEET_CATEGORIES = [
  "Economy Sedan",
  "Premium SUV",
  "Luxury",
  "Bus & Van",
] as const;

export type FleetCategory = (typeof FLEET_CATEGORIES)[number];

export type Vehicle = {
  name: string;
  /** Confirmed day rate in NGN. Driver and fuel included. */
  price: number;
  category: FleetCategory;
  /** Optional fact shown as an extra tag — facts only, never a decorative badge. */
  note?: string;
};

export const FLEET: Vehicle[] = [
  { name: "Toyota Camry 2014 Model", price: 80000, category: "Economy Sedan" },
  { name: "Toyota Corolla 2015", price: 80000, category: "Economy Sedan" },
  { name: "Toyota Camry 2016 Model", price: 100000, category: "Economy Sedan" },
  { name: "Toyota Avalon 2015 Model", price: 100000, category: "Economy Sedan" },
  { name: "Toyota Prado 2017 Model", price: 100000, category: "Premium SUV" },
  { name: "Lexus LX 570 2014 Model", price: 100000, category: "Premium SUV" },
  { name: "Toyota Hilux 2014 Model", price: 120000, category: "Premium SUV" },
  { name: "Toyota Prado 2018 Model", price: 130000, category: "Premium SUV" },
  { name: "Toyota Landcruiser 2015 Model", price: 150000, category: "Premium SUV" },
  { name: "Toyota Prado 2020 Upgraded", price: 150000, category: "Premium SUV" },
  { name: "Lexus GX 460 2019 Model", price: 160000, category: "Premium SUV" },
  { name: "Toyota Hilux 2020 Model", price: 170000, category: "Premium SUV" },
  { name: "Toyota Prado 2020 Model", price: 180000, category: "Premium SUV" },
  { name: "Toyota Landcruiser 2020 Upgraded", price: 200000, category: "Premium SUV" },
  { name: "Toyota Hilux 2024 Model", price: 250000, category: "Premium SUV" },
  { name: "Toyota Landcruiser 2020 Model", price: 250000, category: "Premium SUV" },
  { name: "Lexus LX 570 2020 Model", price: 350000, category: "Luxury" },
  { name: "Benz GL 550 2015 Model", price: 550000, category: "Luxury" },
  { name: "Toyota Landcruiser 2025 Model", price: 550000, category: "Luxury" },
  { name: "Benz S550", price: 580000, category: "Luxury" },
  {
    name: "Toyota Landcruiser Armored / Bulletproof",
    price: 700000,
    category: "Luxury",
    note: "Armoured",
  },
  { name: "Range Rover 2020", price: 800000, category: "Luxury" },
  { name: "Range Rover", price: 850000, category: "Luxury" },
  { name: "G-Wagon Benz 2023", price: 1500000, category: "Luxury" },
  { name: "Rolls Royce", price: 2500000, category: "Luxury" },
  { name: "Toyota Hiace Bus Flat Roof", price: 130000, category: "Bus & Van" },
  { name: "Toyota Hiace Bus High Roof Executive", price: 150000, category: "Bus & Van" },
  { name: "Toyota Hiace Bus High Roof Executive 2021", price: 180000, category: "Bus & Van" },
  { name: "Toyota Coaster Bus (New Model)", price: 200000, category: "Bus & Van" },
  { name: "Mercedes Benz Sprinter Bus", price: 2000000, category: "Bus & Van" },
];

export const FLEET_SIZE = FLEET.length;

/** Lowest confirmed day rate across the fleet — drives every "from" figure. */
export const FLEET_FROM_PRICE = Math.min(...FLEET.map((vehicle) => vehicle.price));

/** Display order for the catalogue's default sort. */
export const CATEGORY_ORDER: Record<FleetCategory, number> = {
  "Economy Sedan": 0,
  "Premium SUV": 1,
  Luxury: 2,
  "Bus & Van": 3,
};

/** Short labels for the catalogue filter pills. */
export const CATEGORY_FILTERS: { label: string; value: FleetCategory | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Economy", value: "Economy Sedan" },
  { label: "SUV", value: "Premium SUV" },
  { label: "Luxury", value: "Luxury" },
  { label: "Bus & van", value: "Bus & Van" },
];

/** The three vehicles the homepage showroom steps through. */
export const FEATURED_FLEET: Vehicle[] = [
  "Toyota Camry 2014 Model",
  "Toyota Prado 2017 Model",
  "Lexus LX 570 2020 Model",
].map((name) => {
  const vehicle = FLEET.find((item) => item.name === name);
  if (!vehicle) throw new Error(`Featured vehicle "${name}" is not in the fleet.`);
  return vehicle;
});

export function findVehicle(name: string | undefined | null): Vehicle | undefined {
  if (!name) return undefined;
  return FLEET.find((vehicle) => vehicle.name === name);
}
