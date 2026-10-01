import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PlaceholderArt from "./PlaceholderArt";
import Reveal from "./Reveal";
import { siteConfig } from "../config/site";

export default function AboutSection() {
  return (
    <section className="container-x grid items-center gap-14 py-24 md:py-32 lg:grid-cols-2" aria-labelledby="about-title">
      <Reveal className="relative">
        <span aria-hidden="true" className="absolute -left-2 -top-14 font-display text-[9rem] font-bold leading-none text-transparent [-webkit-text-stroke:1px_var(--line)] md:text-[13rem]">02</span>
        <div className="relative aspect-[5/4] overflow-hidden border border-line">
          {siteConfig.aboutImage ? <img src={siteConfig.aboutImage} alt="02 Automobile showroom" loading="lazy" className="h-full w-full object-cover" /> : <PlaceholderArt vehicle={{ type: "Sedan", exteriorColor: "Silver" }} view={0} label="Placeholder showroom vehicle" />}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 id="about-title" className="h-display text-5xl md:text-7xl">Driven by trust. Built for the road ahead.</h2>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          02 Automobile Company is focused on connecting customers with quality vehicles while providing a professional, transparent and customer-focused experience.
        </p>
        <Link to="/about" className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-accent hover:underline">Learn More About Us <ArrowRight className="h-4 w-4" /></Link>
      </Reveal>
    </section>
  );
}
