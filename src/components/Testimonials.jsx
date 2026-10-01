import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const step = (d) => setI((n) => (n + d + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => step(1), 7000);
    return () => clearInterval(t);
  }, [paused]);

  const btn = "grid h-12 w-12 place-items-center border border-line hover:border-accent hover:text-accent";
  return (
    <section className="container-x py-24 md:py-32" aria-labelledby="testi-title" aria-roledescription="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <h2 id="testi-title" className="h-display text-5xl md:text-7xl">What Our Customers Say</h2>
      <div className="mt-14 min-h-[19rem] md:min-h-[17rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
            <TestimonialCard item={testimonials[i]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <button onClick={() => step(-1)} aria-label="Previous testimonial" className={btn}><ChevronLeft className="h-5 w-5" /></button>
        <button onClick={() => step(1)} aria-label="Next testimonial" className={btn}><ChevronRight className="h-5 w-5" /></button>
        <div className="ml-4 flex">
          {testimonials.map((t, n) => (
            <button key={t.id} onClick={() => setI(n)} aria-label={`Show testimonial ${n + 1}`} aria-current={n === i} className="group grid h-11 w-8 place-items-center">
              <span className={`h-0.5 w-6 transition-colors ${n === i ? "bg-accent" : "bg-line group-hover:bg-muted"}`} />
            </button>
          ))}
        </div>
      </div>
      <p className="mt-6 text-xs text-muted">Sample testimonials — replace with verified customer reviews.</p>
    </section>
  );
}
