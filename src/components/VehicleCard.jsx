import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Gauge, Cog, Fuel, MapPin, ArrowRight, Check, Plus } from "lucide-react";
import VehicleImage from "./VehicleImage";
import { useStore } from "../context/StoreContext";
import { formatMileage, formatPrice, vehicleTitle } from "../lib/format";
import { siteConfig } from "../config/site";

export default function VehicleCard({ vehicle: v, lead = false }) {
  const { isFavorite, toggleFavorite, isCompared, toggleCompare } = useStore();
  const saved = isFavorite(v.id);
  const compared = isCompared(v.id);
  const title = vehicleTitle(v);
  const badge = "px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider";

  return (
    <article className={`group flex h-full flex-col border border-line bg-surface transition-colors hover:border-accent/60 ${lead ? "md:flex-row lg:flex-col" : ""}`}>
      <div className={`relative overflow-hidden ${lead ? "md:w-1/2 lg:w-full" : ""}`}>
        <Link to={`/vehicles/${v.id}`} tabIndex={-1} aria-hidden="true" className={`block ${lead ? "aspect-[4/3] md:aspect-auto md:h-full lg:aspect-[16/9]" : "aspect-[4/3]"}`}>
          <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.05]">
            <VehicleImage vehicle={v} />
          </div>
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex gap-1.5">
          <span className={`${badge} ${v.condition === "New" ? "bg-accent text-on-accent" : "bg-black/70 text-white"}`}>{v.condition}</span>
          {v.featured && <span className={`${badge} border border-accent bg-black/70 text-accent`}>Featured</span>}
        </div>
        <motion.button
          onClick={() => toggleFavorite(v.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${title} from saved vehicles` : `Save ${title}`}
          whileTap={{ scale: 0.85 }}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center bg-black/60 text-white backdrop-blur-sm hover:bg-black/80"
        >
          <motion.span key={String(saved)} initial={{ scale: saved ? 0.4 : 1 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 12 }}>
            <Heart className={`h-[18px] w-[18px] ${saved ? "fill-accent text-accent" : ""}`} />
          </motion.span>
        </motion.button>
        {siteConfig.showDemoNotice && v.demo && (
          <span className="pointer-events-none absolute bottom-3 left-3 bg-black/60 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-white/70">Demo listing</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[1.7rem] font-semibold uppercase leading-none tracking-wide">
            <Link to={`/vehicles/${v.id}`} className="hover:text-accent">{title}</Link>
          </h3>
          <span className="shrink-0 text-sm text-muted">{v.year}</span>
        </div>
        <p className="mt-3 font-display text-3xl font-semibold tracking-wide text-accent">{formatPrice(v.price, v.currency)}</p>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.8rem] text-muted">
          <li className="flex items-center gap-2"><Gauge className="h-3.5 w-3.5 text-accent" aria-hidden="true" />{formatMileage(v.mileage)}</li>
          <li className="flex items-center gap-2"><Cog className="h-3.5 w-3.5 text-accent" aria-hidden="true" />{v.transmission}</li>
          <li className="flex items-center gap-2"><Fuel className="h-3.5 w-3.5 text-accent" aria-hidden="true" />{v.fuel}</li>
          <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />{v.location}</li>
        </ul>
        <div className="mt-auto flex items-center gap-3 pt-6">
          <button
            onClick={() => toggleCompare(v.id)}
            aria-pressed={compared}
            className={`btn !min-h-11 !px-4 border text-xs ${compared ? "border-accent text-accent" : "border-line text-fg hover:border-accent"}`}
          >
            {compared ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />} Compare
          </button>
          <Link to={`/vehicles/${v.id}`} className="ml-auto inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-fg hover:text-accent">
            View Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
