import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { SelectField } from "./Fields";
import { useDialog } from "../hooks/useDialog";
import { brands, types, fuels, transmissions, modelsFor, priceOptions, yearOptions, mileageOptions, listOptions } from "../lib/inventory";

function Fields({ filters, onChange, prefix }) {
  const id = (n) => `${prefix}-${n}`;
  return (
    <div className="grid gap-4">
      <div>
        <label htmlFor={id("q")} className="mb-1.5 block text-xs font-medium text-muted">Search</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input id={id("q")} type="search" value={filters.q} onChange={(e) => onChange("q", e.target.value)} placeholder="Brand, model, colour…" className="field pl-10" />
        </div>
      </div>
      <SelectField id={id("brand")} label="Make" value={filters.brand} onChange={(v) => onChange("brand", v)} options={listOptions(brands)} />
      <SelectField id={id("model")} label="Model" value={filters.model} onChange={(v) => onChange("model", v)} options={listOptions(modelsFor(filters.brand))} />
      <SelectField id={id("type")} label="Vehicle type" value={filters.type} onChange={(v) => onChange("type", v)} options={listOptions(types)} />
      <div className="grid grid-cols-2 gap-3">
        <SelectField id={id("min")} label="Min price" value={filters.minPrice} onChange={(v) => onChange("minPrice", v)} options={priceOptions} placeholder="No min" />
        <SelectField id={id("max")} label="Max price" value={filters.maxPrice} onChange={(v) => onChange("maxPrice", v)} options={priceOptions} placeholder="No max" />
      </div>
      <SelectField id={id("year")} label="Year" value={filters.year} onChange={(v) => onChange("year", v)} options={yearOptions} />
      <SelectField id={id("mileage")} label="Mileage" value={filters.maxMileage} onChange={(v) => onChange("maxMileage", v)} options={mileageOptions} />
      <SelectField id={id("fuel")} label="Fuel type" value={filters.fuel} onChange={(v) => onChange("fuel", v)} options={listOptions(fuels)} />
      <SelectField id={id("trans")} label="Transmission" value={filters.transmission} onChange={(v) => onChange("transmission", v)} options={listOptions(transmissions)} />
      <SelectField id={id("cond")} label="Condition" value={filters.condition} onChange={(v) => onChange("condition", v)} options={listOptions(["New", "Used"])} />
      <label htmlFor={id("featured")} className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
        <input id={id("featured")} type="checkbox" checked={!!filters.featured} onChange={(e) => onChange("featured", e.target.checked ? "1" : "")} className="h-4 w-4 accent-[var(--accent)]" />
        Featured vehicles only
      </label>
    </div>
  );
}

function Drawer({ filters, onChange, onReset, onClose, count }) {
  const ref = useRef(null);
  useDialog(ref, onClose);
  return (
    <motion.div className="fixed inset-0 z-[80] bg-scrim lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Filter vehicles"
        tabIndex={-1}
        className="ml-auto flex h-full w-[min(92vw,26rem)] flex-col border-l border-line bg-bg outline-none"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="h-display text-2xl">Filters</h2>
          <button onClick={onClose} aria-label="Close filters" className="grid h-10 w-10 place-items-center"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5"><Fields filters={filters} onChange={onChange} prefix="m" /></div>
        <div className="grid grid-cols-2 gap-3 border-t border-line p-4">
          <button onClick={onReset} className="btn btn-outline">Reset</button>
          <button onClick={onClose} className="btn btn-primary">Show {count}</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function VehicleFilter({ filters, onChange, onReset, drawerOpen, onCloseDrawer, count }) {
  return (
    <>
      <aside aria-label="Filters" className="sticky top-24 hidden self-start lg:block">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="h-display text-2xl">Filters</h2>
          <button onClick={onReset} className="text-xs font-semibold text-accent hover:underline">Reset Filters</button>
        </div>
        <Fields filters={filters} onChange={onChange} prefix="d" />
      </aside>
      <AnimatePresence>{drawerOpen && <Drawer key="drawer" filters={filters} onChange={onChange} onReset={onReset} onClose={onCloseDrawer} count={count} />}</AnimatePresence>
    </>
  );
}
