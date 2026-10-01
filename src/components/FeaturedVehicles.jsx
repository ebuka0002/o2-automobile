import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import VehicleCard from "./VehicleCard";
import { VehicleCardSkeleton } from "./Skeletons";
import { useVehicles } from "../hooks/useAsync";

export default function FeaturedVehicles() {
  const { data, loading } = useVehicles();
  const featured = (data || []).filter((v) => v.featured).slice(0, 5);
  return (
    <section className="container-x py-24 md:py-32" aria-labelledby="featured-title">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 id="featured-title" className="h-display text-5xl md:text-7xl">Featured Vehicles</h2>
          <p className="mt-4 max-w-md text-muted">Explore a selection of vehicles chosen for quality, style and performance.</p>
        </div>
        <Link to="/vehicles" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:text-accent">View All Vehicles <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 5 }, (_, i) => <div key={i} className={i === 0 ? "lg:col-span-2" : ""}><VehicleCardSkeleton /></div>)
          : featured.map((v, i) => (
              <div key={v.id} className={i === 0 ? "md:col-span-2" : ""}><VehicleCard vehicle={v} lead={i === 0} /></div>
            ))}
      </div>
    </section>
  );
}
