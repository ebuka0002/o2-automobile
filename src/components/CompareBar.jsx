import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { getVehicleById } from "../data/vehicles";
import { vehicleTitle } from "../lib/format";

export default function CompareBar() {
  const { compare, toggleCompare, clearCompare } = useStore();
  const { pathname } = useLocation();
  const show = compare.length > 0 && pathname !== "/compare";
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed inset-x-3 bottom-[4.25rem] z-40 border border-line bg-surface2 md:inset-x-auto md:bottom-6 md:left-6 md:w-auto"
          role="region"
          aria-label="Vehicles selected for comparison"
        >
          <div className="flex items-center gap-3 p-3">
            <ul className="flex min-w-0 flex-1 gap-2 overflow-x-auto no-scrollbar">
              {compare.map((id) => {
                const v = getVehicleById(id);
                return (
                  <li key={id} className="flex shrink-0 items-center gap-1.5 border border-line bg-surface py-1 pl-3 pr-1 text-xs">
                    {v ? vehicleTitle(v) : id}
                    <button onClick={() => toggleCompare(id)} aria-label={`Remove ${v ? vehicleTitle(v) : id} from comparison`} className="grid h-7 w-7 place-items-center text-muted hover:text-fg">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
            <button onClick={clearCompare} className="hidden text-xs text-muted hover:text-fg sm:block">Clear</button>
            <Link to="/compare" className="btn btn-primary !min-h-10 shrink-0 !px-4">
              Compare ({compare.length})
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
