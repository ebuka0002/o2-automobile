import { Link } from "react-router-dom";
import PlaceholderArt from "./PlaceholderArt";
import { siteConfig } from "../config/site";

export default function CTA() {
  return (
    <section className="stage relative isolate overflow-hidden" aria-labelledby="cta-title">
      <div className="absolute inset-0 -z-10 opacity-60" aria-hidden="true">
        {siteConfig.ctaImage ? <img src={siteConfig.ctaImage} alt="" loading="lazy" className="h-full w-full object-cover" /> : <PlaceholderArt vehicle={{ type: "Coupe", exteriorColor: "Grey" }} view={0} label="" />}
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0c0d0f] via-[#0c0d0f]/80 to-[#0c0d0f]/30" aria-hidden="true" />
      <div className="container-x py-28 md:py-40">
        <h2 id="cta-title" className="h-display max-w-3xl text-6xl md:text-9xl">Your Next Drive Starts Here.</h2>
        <p className="mt-6 max-w-md text-lg text-fg/80">Explore our vehicles or speak with the 02 Automobile team today.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/vehicles" className="btn btn-primary !px-8">Browse Vehicles</Link>
          <Link to="/contact" className="btn btn-outline !px-8">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
