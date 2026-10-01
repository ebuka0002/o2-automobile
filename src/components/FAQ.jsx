import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "../data/content";

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left text-base font-semibold hover:text-accent md:text-lg"
              >
                {item.q}
                <Plus className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} aria-hidden="true" />
              </button>
            </h3>
            <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden"><p className="max-w-2xl pb-6 text-muted">{item.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
