import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Handshake, HeartHandshake, ArrowRight, ChevronDown } from "lucide-react";
import PlaceholderArt from "./PlaceholderArt";
import Magnetic from "./Magnetic";
import { siteConfig } from "../config/site";

const ease = [0.22, 1, 0.36, 1];
const up = (delay) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease } });

export default function Hero() {
  return (
    <section className="stage relative isolate flex min-h-[100svh] items-end overflow-hidden" aria-labelledby="hero-title">
      {/* Vehicle stage */}
      <motion.div className="absolute inset-x-0 bottom-[8%] -z-10 mx-auto w-[150%] max-w-[1500px] md:bottom-[10%] md:w-[95%] lg:left-[12%] lg:w-[80%]" initial={{ scale: 1, opacity: 0 }} animate={{ scale: 1.06, opacity: 1 }} transition={{ scale: { duration: 24, ease: "linear" }, opacity: { duration: 1.4 } }}>
        {siteConfig.heroImage ? (
          <img src={siteConfig.heroImage} alt="Premium vehicle" className="h-full w-full object-cover" fetchPriority="high" />
        ) : (
          <div className="aspect-[800/360] w-full"><PlaceholderArt vehicle={{ type: "SUV", exteriorColor: "Grey" }} bare label="Placeholder hero vehicle" /></div>
        )}
      </motion.div>
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_70%_45%,#23272e_0%,#0c0d0f_62%)]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0c0d0f] via-[#0c0d0f]/40 to-[#0c0d0f]/70" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0c0d0f]/90 via-[#0c0d0f]/30 to-transparent" aria-hidden="true" />

      <div className="container-x relative pb-28 pt-40 md:pb-32">
        <motion.p {...up(0.1)} className="label">Premium automotive experience</motion.p>
        <motion.h1 id="hero-title" {...up(0.25)} className="h-display mt-5 max-w-4xl text-[clamp(3.6rem,11vw,9.5rem)]">
          Drive Something Exceptional.
        </motion.h1>
        <motion.p {...up(0.45)} className="mt-6 max-w-md text-lg text-fg/80">
          Quality vehicles. Trusted service. A smarter way to find your next car.
        </motion.p>
        <motion.div {...up(0.6)} className="mt-9 flex flex-wrap gap-3">
          <Magnetic><Link to="/vehicles" className="btn btn-primary !px-8">Explore Vehicles <ArrowRight className="h-4 w-4" /></Link></Magnetic>
          <Link to="/contact" className="btn btn-outline !px-8">Talk to Us</Link>
        </motion.div>
      </div>

      <motion.ul
        initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.8, ease }}
        className="absolute bottom-10 right-10 hidden border border-line bg-black/50 backdrop-blur-md lg:block"
        aria-label="Our promise"
      >
        {[[ShieldCheck, "Quality vehicles"], [Handshake, "Trusted service"], [HeartHandshake, "Customer first"]].map(([Icon, text]) => (
          <li key={text} className="flex items-center gap-3 border-b border-line px-6 py-4 last:border-0">
            <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">{text}</span>
          </li>
        ))}
      </motion.ul>

      <a href="#find" aria-label="Scroll to vehicle search" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-fg/60 hover:text-accent md:block">
        <ChevronDown className="h-6 w-6 [animation:scroll-cue_2s_ease-in-out_infinite]" />
      </a>
    </section>
  );
}
