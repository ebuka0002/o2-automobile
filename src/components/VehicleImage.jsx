import { useState } from "react";
import PlaceholderArt from "./PlaceholderArt";
import { vehicleTitle } from "../lib/format";

/** Renders a real photo (lazy, with skeleton) or falls back to placeholder artwork. */
export default function VehicleImage({ vehicle, index = 0, priority = false, className = "" }) {
  const src = vehicle.images?.[index];
  const [status, setStatus] = useState("loading");
  const alt = `${vehicle.year} ${vehicleTitle(vehicle)}${index ? `, photo ${index + 1}` : ""}`;

  if (!src || status === "failed") return <PlaceholderArt vehicle={vehicle} view={index} label={alt} className={className} />;

  return (
    <div className="relative h-full w-full">
      {status === "loading" && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("failed")}
        className={`h-full w-full object-cover transition-opacity duration-500 ${status === "loaded" ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </div>
  );
}
