import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useDialog } from "../hooks/useDialog";

function Panel({ title, onClose, children }) {
  const ref = useRef(null);
  useDialog(ref, onClose);
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-scrim md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="max-h-[92dvh] w-full max-w-xl overflow-y-auto border border-line bg-surface outline-none"
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface px-6 py-4">
          <h2 id="modal-title" className="h-display text-2xl">{title}</h2>
          <button onClick={onClose} aria-label="Close dialog" className="grid h-10 w-10 place-items-center text-muted hover:text-fg">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export default function Modal({ open, ...props }) {
  return <AnimatePresence>{open && <Panel key="panel" {...props} />}</AnimatePresence>;
}
