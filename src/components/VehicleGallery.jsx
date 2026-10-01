import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import VehicleImage from "./VehicleImage";
import { useDialog } from "../hooks/useDialog";
import { imageCount } from "../lib/inventory";
import { vehicleTitle } from "../lib/format";

function Lightbox({ vehicle, index, total, onIndex, onClose }) {
  const ref = useRef(null);
  useDialog(ref, onClose);
  const go = useCallback((d) => onIndex((index + d + total) % total), [index, total, onIndex]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go]);

  const btn = "absolute z-10 grid h-12 w-12 place-items-center bg-white/10 text-white backdrop-blur hover:bg-white/20";
  return (
    <motion.div ref={ref} role="dialog" aria-modal="true" aria-label={`${vehicleTitle(vehicle)} image viewer`} tabIndex={-1}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 outline-none"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button onClick={onClose} aria-label="Close image viewer" className={`${btn} right-4 top-4`}><X className="h-5 w-5" /></button>
      <button onClick={() => go(-1)} aria-label="Previous image" className={`${btn} left-3 top-1/2 -translate-y-1/2`}><ChevronLeft className="h-6 w-6" /></button>
      <button onClick={() => go(1)} aria-label="Next image" className={`${btn} right-3 top-1/2 -translate-y-1/2`}><ChevronRight className="h-6 w-6" /></button>
      <div className="aspect-[16/10] w-[min(94vw,1200px)] overflow-hidden"><VehicleImage vehicle={vehicle} index={index} priority /></div>
      <p className="absolute bottom-5 text-sm text-white/70" aria-live="polite">{index + 1} / {total}</p>
    </motion.div>
  );
}

export default function VehicleGallery({ vehicle }) {
  const total = imageCount(vehicle);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const touchX = useRef(null);
  const step = (d) => setIndex((i) => (i + d + total) % total);

  return (
    <div>
      <div
        className="group relative aspect-[16/10] overflow-hidden border border-line bg-surface2"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <button onClick={() => setOpen(true)} aria-label="Open image in full screen" className="block h-full w-full cursor-zoom-in">
          <AnimatePresence mode="wait">
            <motion.div key={index} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <VehicleImage vehicle={vehicle} index={index} priority />
            </motion.div>
          </AnimatePresence>
        </button>
        <span className="pointer-events-none absolute bottom-3 right-3 grid h-9 w-9 place-items-center bg-black/60 text-white"><Expand className="h-4 w-4" /></span>
        <button onClick={() => step(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center bg-black/60 text-white opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100 md:grid"><ChevronLeft className="h-5 w-5" /></button>
        <button onClick={() => step(1)} aria-label="Next image" className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center bg-black/60 text-white opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100 md:grid"><ChevronRight className="h-5 w-5" /></button>
        <p className="pointer-events-none absolute left-3 top-3 bg-black/60 px-2 py-1 text-xs text-white md:hidden">{index + 1} / {total}</p>
      </div>

      <ul className="mt-3 grid grid-cols-4 gap-3">
        {Array.from({ length: total }, (_, i) => (
          <li key={i}>
            <button onClick={() => setIndex(i)} aria-label={`Show image ${i + 1}`} aria-current={i === index} className={`aspect-[4/3] w-full overflow-hidden border-2 transition-colors ${i === index ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"}`}>
              <VehicleImage vehicle={vehicle} index={i} />
            </button>
          </li>
        ))}
      </ul>
      {!vehicle.images?.length && <p className="mt-3 text-xs text-muted">Placeholder artwork — add real photos in src/data/vehicles.js.</p>}

      <AnimatePresence>{open && <Lightbox key="lb" vehicle={vehicle} index={index} total={total} onIndex={setIndex} onClose={() => setOpen(false)} />}</AnimatePresence>
    </div>
  );
}
