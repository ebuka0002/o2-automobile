import { vehicles } from "../data/vehicles";

// Shaped like a real API so it can be swapped for fetch()/Supabase later.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let warm = false;

export async function fetchVehicles() {
  if (!warm) await wait(450);
  warm = true;
  return vehicles;
}

export async function fetchVehicle(id) {
  if (!warm) await wait(450);
  warm = true;
  const found = vehicles.find((v) => v.id === id);
  if (!found) throw new Error("not-found");
  return found;
}
