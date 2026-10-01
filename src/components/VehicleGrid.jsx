import { AnimatePresence, motion } from "framer-motion";
import VehicleCard from "./VehicleCard";
import { VehicleCardSkeleton } from "./Skeletons";
import StateMessage from "./StateMessage";

export default function VehicleGrid({ vehicles, loading, onReset, emptyState, columns = "sm:grid-cols-2 xl:grid-cols-3" }) {
  if (loading) {
    return (
      <div className={`grid gap-5 ${columns}`} aria-busy="true" aria-label="Loading vehicles">
        {Array.from({ length: 6 }, (_, i) => <VehicleCardSkeleton key={i} />)}
      </div>
    );
  }
  if (!vehicles.length) {
    return emptyState || (
      <StateMessage
        title="No vehicles found"
        text="Try adjusting your filters or search criteria."
        action={onReset && { label: "Reset Filters", onClick: onReset }}
      />
    );
  }
  return (
    <ul className={`grid gap-5 ${columns}`}>
      <AnimatePresence mode="popLayout">
        {vehicles.map((v) => (
          <motion.li key={v.id} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <VehicleCard vehicle={v} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
