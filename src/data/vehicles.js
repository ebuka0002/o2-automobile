/**
 * DEMO / PLACEHOLDER INVENTORY — none of these vehicles are real listings.
 * Replace this array with the dealership's real stock.
 *
 * To add a vehicle: copy any entry, give it a unique `id` (used in the URL), edit the fields.
 * Photos: put files in /public/assets/vehicles/<id>/ and list them, e.g.
 *   images: ["/assets/vehicles/bmw-x5-2022/1.jpg", "/assets/vehicles/bmw-x5-2022/2.jpg"]
 * While `images` is empty the site shows built-in placeholder artwork.
 * Set `demo: false` on real vehicles to remove the demo tag.
 */
const F = {
  leather: "Leather interior",
  camera: "Reverse camera",
  carplay: "Apple CarPlay",
  android: "Android Auto",
  pano: "Panoramic roof",
  sensors: "Parking sensors",
  cruise: "Cruise control",
  keyless: "Keyless entry",
  led: "LED headlights",
  nav: "Navigation",
  ac: "Air conditioning",
  bluetooth: "Bluetooth",
};
export const ALL_FEATURES = Object.values(F);
const pick = (...keys) => keys.map((k) => F[k]);

// Real stock photography (Pexels — free to use, no attribution required) standing in for
// this demo inventory, grouped by body style. Replace with the dealership's own photos in
// each vehicle's `images` array once available — see the README.
const px = (id, slug = "") => `https://images.pexels.com/photos/${id}/pexels-photo-${id}${slug ? `/free-photo-of-${slug}` : ""}.jpeg?auto=compress&cs=tinysrgb&w=1260`;
const IMAGES_BY_TYPE = {
  SUV: [px(12984743), px(32720088, "suv-navigating-desert-at-sunset"), px(18207329, "view-of-a-mitsubishi-pajero-driving-on-a-dirt-road"), px(38554964, "classic-range-rover-in-modern-indoor-setting")],
  Sedan: [px(29734680), px(29734681), px(29734676), px(29734679)],
  Coupe: [px(2475808), px(210019), px(29633948, "alfa-romeo-8c-competizione-in-modern-showroom"), px(29734675, "white-nissan-skyline-gt-r-v-spec-on-autumn-road")],
  Pickup: [px(18207365, "mitsubishi-pajero-car-offroad"), px(18207339, "mitsubishi-pajero-car"), px(32720088, "suv-navigating-desert-at-sunset"), px(12984743)],
};

const vehicle = (v) => ({
  currency: "NGN",
  location: "Nigeria",
  seats: 5,
  doors: 5,
  featured: false,
  demo: true,
  images: IMAGES_BY_TYPE[v.type] || [],
  ...v,
});

export const vehicles = [
  vehicle({
    id: "bmw-x5-2022", brand: "BMW", model: "X5", year: 2022, price: 85000000, mileage: 35000,
    images: [
    "/vehicle/x5.jpg",
  ],
    condition: "Used", transmission: "Automatic", fuel: "Petrol", engine: "3.0L Turbo", drive: "AWD",
    type: "SUV", exteriorColor: "Black", interiorColor: "Black", featured: true,
    features: pick("leather", "camera", "carplay", "android", "pano", "sensors", "cruise", "keyless", "led", "nav", "ac", "bluetooth"),
    description: "A clean and well-equipped family SUV designed for comfort, performance and everyday practicality. Sample description — replace with the vehicle's real details.",
  }),
  vehicle({
    id: "mercedes-gle-450-2021", brand: "Mercedes-Benz", model: "GLE 450", year: 2021, price: 95000000, mileage: 28000,
     images: [
    "/vehicle/gle450.jpg",
  ],
    condition: "Used", transmission: "Automatic", fuel: "Petrol", engine: "3.0L Turbo", drive: "AWD",
    type: "SUV", exteriorColor: "White", interiorColor: "Brown", featured: true,
    features: pick("leather", "camera", "carplay", "android", "pano", "sensors", "cruise", "keyless", "led", "nav", "ac", "bluetooth"),
    description: "A refined luxury SUV with a composed ride and a well-appointed cabin. Sample description — replace with real details.",
  }),
  vehicle({
    id: "range-rover-sport-2020", brand: "Range Rover", model: "Sport", year: 2020, price: 110000000, mileage: 41000,
    images: [
    "/vehicle/range-rover.jpg",
  ],
    condition: "Used", transmission: "Automatic", fuel: "Petrol", engine: "3.0L Supercharged", drive: "4x4",
    type: "SUV", exteriorColor: "Grey", interiorColor: "Black", featured: true,
    features: pick("leather", "camera", "pano", "sensors", "cruise", "keyless", "led", "nav", "ac", "bluetooth"),
    description: "Commanding presence with capable all-terrain ability and a premium interior. Sample description — replace with real details.",
  }),
  vehicle({
    id: "toyota-land-cruiser-2023", brand: "Toyota", model: "Land Cruiser", year: 2023, price: 180000000, mileage: 150,
    images: [
       "/vehicle/landcruiser.webp",
    "/vehicle/land-cruiser.jpg",
    
  ],
    condition: "New", transmission: "Automatic", fuel: "Petrol", engine: "3.5L Twin Turbo", drive: "4x4",
    type: "SUV", exteriorColor: "White", interiorColor: "Black", seats: 7, featured: true,
    features: pick("leather", "camera", "carplay", "android", "sensors", "cruise", "keyless", "led", "nav", "ac", "bluetooth"),
    description: "A flagship full-size SUV built for long distances and rough roads alike. Sample description — replace with real details.",
  }),
  vehicle({
    id: "audi-q7-2020", brand: "Audi", model: "Q7", year: 2020, price: 72000000, mileage: 39000,
    images: [
    "/vehicle/audi.jpg",
  ],
    condition: "Used", transmission: "Automatic", fuel: "Petrol", engine: "3.0L TFSI", drive: "AWD",
    type: "SUV", exteriorColor: "Black", interiorColor: "Brown", seats: 7, featured: true,
    features: pick("leather", "camera", "carplay", "pano", "sensors", "cruise", "keyless", "led", "nav", "ac", "bluetooth"),
    description: "Seven seats, a quiet cabin and confident all-wheel-drive handling. Sample description — replace with real details.",
  }),
  vehicle({
    id: "bmw-330i-2023", brand: "BMW", model: "330i", year: 2023, price: 78000000, mileage: 150,
    images: [
    "/vehicle/2026-BMW-330i_05.jpg",
  ],
    condition: "New", transmission: "Automatic", fuel: "Petrol", engine: "2.0L Turbo", drive: "RWD",
    type: "Sedan", exteriorColor: "Blue", interiorColor: "Black", doors: 4,
    features: pick("leather", "camera", "carplay", "android", "sensors", "cruise", "keyless", "led", "nav", "ac", "bluetooth"),
    description: "A sharp, driver-focused sports sedan with balanced handling. Sample description — replace with real details.",
  }),
  vehicle({
    id: "bmw-430i-coupe-2022", brand: "BMW", model: "430i Coupe", year: 2022, price: 82000000, mileage: 18000,
    images: [
    "/vehicle/bmw-coupe.jpg",
  ],
    condition: "Used", transmission: "Automatic", fuel: "Petrol", engine: "2.0L Turbo", drive: "RWD",
    type: "Coupe", exteriorColor: "White", interiorColor: "Brown", doors: 2, seats: 4,
    features: pick("leather", "camera", "carplay", "sensors", "cruise", "keyless", "led", "nav", "ac", "bluetooth"),
    description: "Low, wide and quick — a stylish coupe for drivers who enjoy the journey. Sample description — replace with real details.",
  }),
  vehicle({
    id: "lexus-rx-350-2019", brand: "Lexus", model: "RX 350", year: 2019, price: 58000000, mileage: 52000,
    images: [
    "/vehicle/rx350.jpg",
  ],
    condition: "Used", transmission: "Automatic", fuel: "Petrol", engine: "3.5L V6", drive: "AWD",
    type: "SUV", exteriorColor: "Silver", interiorColor: "Beige",
    features: pick("leather", "camera", "sensors", "cruise", "keyless", "led", "nav", "ac", "bluetooth"),
    description: "A quiet, comfortable crossover known for a smooth V6 and a relaxed cabin. Sample description — replace with real details.",
  }),
  vehicle({
    id: "lexus-es-300h-2021", brand: "Lexus", model: "ES 300h", year: 2021, price: 52000000, mileage: 30000,
    images: [
    "/vehicle/lexus300.jpg",
  ],
    condition: "Used", transmission: "Automatic", fuel: "Hybrid", engine: "2.5L Hybrid", drive: "FWD",
    type: "Sedan", exteriorColor: "White", interiorColor: "Beige", doors: 4,
    features: pick("leather", "camera", "carplay", "android", "sensors", "cruise", "keyless", "led", "nav", "ac", "bluetooth"),
    description: "A hybrid executive sedan focused on comfort and efficiency. Sample description — replace with real details.",
  }),
  vehicle({
    id: "toyota-camry-2020", brand: "Toyota", model: "Camry", year: 2020, price: 32000000, mileage: 46000,
    images: [
    "/vehicle/camry.jpg",
  ],
    condition: "Used", transmission: "Automatic", fuel: "Petrol", engine: "2.5L", drive: "FWD",
    type: "Sedan", exteriorColor: "Blue", interiorColor: "Black", doors: 4,
    features: pick("camera", "carplay", "android", "sensors", "cruise", "keyless", "led", "ac", "bluetooth"),
    description: "A dependable, practical sedan suited to daily driving. Sample description — replace with real details.",
  }),
  vehicle({
    id: "honda-accord-2019", brand: "Honda", model: "Accord", year: 2019, price: 24000000, mileage: 62000,
    images: [
    "/vehicle/accord.jpg",
  ],
    condition: "Used", transmission: "Automatic", fuel: "Petrol", engine: "1.5L Turbo", drive: "FWD",
    type: "Sedan", exteriorColor: "Grey", interiorColor: "Black", doors: 4,
    features: pick("camera", "carplay", "android", "cruise", "keyless", "led", "ac", "bluetooth"),
    description: "Roomy, efficient and easy to live with. Sample description — replace with real details.",
  }),
  vehicle({
    id: "audi-a4-2019", brand: "Audi", model: "A4", year: 2019, price: 34000000, mileage: 55000,
    images: [
    "/vehicle/audi-a4.jpg",
    "/vehicle/Audi_A4.jpg",
    
  ],
    condition: "Used", transmission: "Automatic", fuel: "Petrol", engine: "2.0L TFSI", drive: "AWD",
    type: "Sedan", exteriorColor: "Silver", interiorColor: "Black", doors: 4,
    features: pick("leather", "camera", "carplay", "sensors", "cruise", "keyless", "led", "nav", "ac", "bluetooth"),
    description: "A polished compact executive sedan with quattro all-wheel drive. Sample description — replace with real details.",
  }),
  vehicle({
    id: "mercedes-c300-2018", brand: "Mercedes-Benz", model: "C300", year: 2018, price: 38000000, mileage: 68000,
    images: [
    "/vehicle/c300.jpg",
  ],
    condition: "Used", transmission: "Automatic", fuel: "Petrol", engine: "2.0L Turbo", drive: "RWD",
    type: "Sedan", exteriorColor: "Black", interiorColor: "Beige", doors: 4,
    features: pick("leather", "camera", "sensors", "cruise", "keyless", "led", "nav", "ac", "bluetooth"),
    description: "A classic compact luxury sedan with a comfortable, well-finished interior. Sample description — replace with real details.",
  }),
  vehicle({
    id: "ford-ranger-wildtrak-2021", brand: "Ford", model: "Ranger Wildtrak", year: 2021, price: 48000000, mileage: 44000,
    images: [
    "/vehicle/Ford_Ranger.jpg",
  ],
    condition: "Used", transmission: "Automatic", fuel: "Diesel", engine: "2.0L Bi-Turbo", drive: "4x4",
    type: "Pickup", exteriorColor: "Grey", interiorColor: "Black", doors: 4,
    features: pick("leather", "camera", "carplay", "android", "sensors", "cruise", "keyless", "led", "nav", "ac", "bluetooth"),
    description: "A capable double-cab pickup that balances work ability with everyday comfort. Sample description — replace with real details.",
  }),
  vehicle({
    id: "honda-cr-v-2020", brand: "Honda", model: "CR-V", year: 2020, price: 36000000, mileage: 48000,
    images: [
    "/vehicle/honda.jpg",
  ],
    condition: "Used", transmission: "Automatic", fuel: "Petrol", engine: "1.5L Turbo", drive: "AWD",
    type: "SUV", exteriorColor: "Red", interiorColor: "Black",
    features: pick("camera", "carplay", "android", "sensors", "cruise", "keyless", "led", "ac", "bluetooth"),
    description: "A practical compact SUV with generous space and easy running costs. Sample description — replace with real details.",
  }),
];

export const getVehicleById = (id) => vehicles.find((v) => v.id === id);
