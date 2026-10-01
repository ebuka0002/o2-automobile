import { vehicles } from "../data/vehicles";
import { formatPrice, formatMileage } from "./format";

export const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "mileage-asc", label: "Mileage: Low to High" },
];

export const emptyFilters = {
  q: "", brand: "", model: "", type: "", minPrice: "", maxPrice: "", year: "",
  maxMileage: "", fuel: "", transmission: "", condition: "", featured: "", sort: "newest",
};

export function filtersFromParams(params) {
  const filters = { ...emptyFilters };
  for (const key of Object.keys(filters)) {
    const value = params.get(key);
    if (value) filters[key] = value;
  }
  return filters;
}

export function paramsFromFilters(filters) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value && !(key === "sort" && value === "newest")) params.set(key, value);
  }
  return params;
}

const unique = (key) => [...new Set(vehicles.map((v) => v[key]))].sort();
export const brands = unique("brand");
export const types = unique("type");
export const fuels = unique("fuel");
export const transmissions = unique("transmission");
export const years = [...new Set(vehicles.map((v) => v.year))].sort((a, b) => b - a);
export const modelsFor = (brand) =>
  [...new Set(vehicles.filter((v) => !brand || v.brand === brand).map((v) => v.model))].sort();

const PRICE_STEPS = [5e6, 10e6, 20e6, 30e6, 50e6, 75e6, 100e6, 150e6];
const MILEAGE_STEPS = [10000, 25000, 50000, 75000, 100000];
export const priceOptions = PRICE_STEPS.map((n) => ({ value: String(n), label: formatPrice(n) }));
export const mileageOptions = MILEAGE_STEPS.map((n) => ({ value: String(n), label: `Up to ${formatMileage(n)}` }));
export const yearOptions = years.map((y) => ({ value: String(y), label: `${y} & newer` }));
export const listOptions = (arr) => arr.map((v) => ({ value: v, label: v }));

const sorters = {
  newest: (a, b) => b.year - a.year || a.mileage - b.mileage,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "mileage-asc": (a, b) => a.mileage - b.mileage,
};

export function applyFilters(list, f) {
  const q = f.q.trim().toLowerCase();
  const matches = list.filter((v) => {
    if (q && !`${v.brand} ${v.model} ${v.year} ${v.type} ${v.exteriorColor}`.toLowerCase().includes(q)) return false;
    if (f.brand && v.brand !== f.brand) return false;
    if (f.model && v.model !== f.model) return false;
    if (f.type && v.type !== f.type) return false;
    if (f.fuel && v.fuel !== f.fuel) return false;
    if (f.transmission && v.transmission !== f.transmission) return false;
    if (f.condition && v.condition !== f.condition) return false;
    if (f.featured && !v.featured) return false;
    if (f.minPrice && v.price < Number(f.minPrice)) return false;
    if (f.maxPrice && v.price > Number(f.maxPrice)) return false;
    if (f.year && v.year < Number(f.year)) return false;
    if (f.maxMileage && v.mileage > Number(f.maxMileage)) return false;
    return true;
  });
  return matches.sort(sorters[f.sort] || sorters.newest);
}

/** Real photos when provided in vehicle.images, otherwise 4 placeholder views. */
export const imageCount = (v) => (v.images && v.images.length ? v.images.length : 4);
