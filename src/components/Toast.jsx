import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../context/StoreContext";

export default function Toast() {
  const { toast } = useStore();
  const { notify } = useStore();
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => notify(null), 2400);
    return () => clearTimeout(t);
  }, [toast, notify]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[95] flex justify-center px-4 md:bottom-8" role="status" aria-live="polite">
      <AnimatePresence>
        {toast?.message && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="border border-line bg-surface2 px-5 py-3 text-sm text-fg shadow-xl"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
