import { Calendar, Gauge, Cog, Settings2, Fuel, Route, Palette, Armchair, DoorOpen, Users } from "lucide-react";
import { formatMileage } from "../lib/format";

export default function VehicleSpecs({ vehicle: v }) {
  const specs = [
    [Calendar, "Year", v.year], [Gauge, "Mileage", formatMileage(v.mileage)], [Cog, "Engine", v.engine],
    [Settings2, "Transmission", v.transmission], [Fuel, "Fuel", v.fuel], [Route, "Drive", v.drive],
    [Palette, "Exterior", v.exteriorColor], [Armchair, "Interior", v.interiorColor], [DoorOpen, "Doors", v.doors], [Users, "Seats", v.seats],
  ];
  return (
    <dl className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
      {specs.map(([Icon, label, value]) => (
        <div key={label} className="bg-surface p-5">
          <Icon className="h-5 w-5 text-accent" strokeWidth={1.6} aria-hidden="true" />
          <dt className="mt-4 text-xs text-muted">{label}</dt>
          <dd className="mt-1 font-display text-2xl font-semibold uppercase tracking-wide">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
