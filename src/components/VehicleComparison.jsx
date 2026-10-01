import { Link } from "react-router-dom";
import { Check, Minus, X } from "lucide-react";
import VehicleImage from "./VehicleImage";
import { ALL_FEATURES } from "../data/vehicles";
import { formatMileage, formatPrice, vehicleTitle } from "../lib/format";

export default function VehicleComparison({ vehicles, onRemove }) {
  const minPrice = Math.min(...vehicles.map((v) => v.price));
  const minMileage = Math.min(...vehicles.map((v) => v.mileage));
  const rows = [
    ["Price", (v) => formatPrice(v.price, v.currency), (v) => v.price === minPrice && vehicles.length > 1],
    ["Year", (v) => v.year],
    ["Mileage", (v) => formatMileage(v.mileage), (v) => v.mileage === minMileage && vehicles.length > 1],
    ["Condition", (v) => v.condition],
    ["Engine", (v) => v.engine],
    ["Transmission", (v) => v.transmission],
    ["Fuel", (v) => v.fuel],
    ["Drive", (v) => v.drive],
  ];
  const cell = "border-t border-line px-4 py-4 align-top text-sm";
  return (
    <div className="overflow-x-auto border border-line no-scrollbar">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">Vehicle comparison</caption>
        <thead>
          <tr>
            <th scope="col" className="sticky left-0 z-10 w-32 bg-surface2 px-4 py-4 text-xs font-medium text-muted">Vehicle</th>
            {vehicles.map((v) => (
              <th key={v.id} scope="col" className="min-w-[210px] bg-surface p-4 align-top font-normal">
                <div className="relative aspect-[4/3] overflow-hidden"><VehicleImage vehicle={v} /></div>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <Link to={`/vehicles/${v.id}`} className="font-display text-2xl font-semibold uppercase leading-none tracking-wide hover:text-accent">{vehicleTitle(v)}</Link>
                  <button onClick={() => onRemove(v.id)} aria-label={`Remove ${vehicleTitle(v)} from comparison`} className="grid h-9 w-9 shrink-0 place-items-center text-muted hover:text-fg"><X className="h-4 w-4" /></button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, get, best]) => (
            <tr key={label}>
              <th scope="row" className={`${cell} sticky left-0 z-10 bg-surface2 text-xs font-medium text-muted`}>{label}</th>
              {vehicles.map((v) => (
                <td key={v.id} className={`${cell} bg-surface ${best?.(v) ? "font-semibold text-accent" : ""}`}>{get(v)}</td>
              ))}
            </tr>
          ))}
          {ALL_FEATURES.map((f) => (
            <tr key={f}>
              <th scope="row" className={`${cell} sticky left-0 z-10 bg-surface2 text-xs font-medium text-muted`}>{f}</th>
              {vehicles.map((v) => (
                <td key={v.id} className={`${cell} bg-surface`}>
                  {v.features.includes(f) ? <Check className="h-4 w-4 text-accent" aria-label="Included" /> : <Minus className="h-4 w-4 text-muted/60" aria-label="Not listed" />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
