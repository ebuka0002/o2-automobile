import { MapPin } from "lucide-react";
import { siteConfig } from "../config/site";

/**
 * Map placeholder — no address is invented.
 * To go live, replace the inner <div> with an <iframe src="https://www.google.com/maps/embed?..."
 * title="02 Automobile Company location" loading="lazy" /> (or an OpenStreetMap embed).
 */
export default function MapPlaceholder() {
  return (
    <div className="relative grid min-h-[320px] place-items-center overflow-hidden border border-line bg-surface2">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative px-6 text-center">
        <MapPin className="mx-auto h-9 w-9 text-accent" strokeWidth={1.5} aria-hidden="true" />
        <p className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide">Map placeholder</p>
        <p className="mt-2 max-w-xs text-sm text-muted">{siteConfig.address} — embed a Google Maps or OpenStreetMap view here once the address is confirmed.</p>
      </div>
    </div>
  );
}
