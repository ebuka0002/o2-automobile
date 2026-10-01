import { Link, useParams } from "react-router-dom";
import { CalendarCheck, Check, Heart, MessageSquare, Plus, ArrowLeft } from "lucide-react";
import VehicleGallery from "../components/VehicleGallery";
import VehicleSpecs from "../components/VehicleSpecs";
import FinanceCalculator from "../components/FinanceCalculator";
import VehicleCard from "../components/VehicleCard";
import WhatsAppButton from "../components/WhatsAppButton";
import StateMessage from "../components/StateMessage";
import { VehicleDetailsSkeleton } from "../components/Skeletons";
import { useVehicle, useVehicles } from "../hooks/useAsync";
import { useSeo } from "../hooks/useSeo";
import { useStore } from "../context/StoreContext";
import { formatMileage, formatPrice, vehicleTitle } from "../lib/format";
import { vehicleSchema } from "../lib/schema";
import { siteConfig } from "../config/site";

function Details({ vehicle: v }) {
  const { openEnquiry, openViewing, isFavorite, toggleFavorite, isCompared, toggleCompare } = useStore();
  const { data: all } = useVehicles();
  const title = vehicleTitle(v);
  useSeo({
    title: `${v.year} ${title} for Sale | 02 Automobile Company`,
    description: `${v.year} ${title}, ${formatMileage(v.mileage)}, ${v.transmission}, ${v.fuel}. Enquire or book a viewing with 02 Automobile Company.`,
    path: `/vehicles/${v.id}`,
    image: v.images?.[0],
    jsonLd: vehicleSchema(v),
  });
  const similar = (all || []).filter((o) => o.id !== v.id && (o.type === v.type || o.brand === v.brand)).slice(0, 3);
  const saved = isFavorite(v.id);
  const compared = isCompared(v.id);

  return (
    <div className="container-x pb-24 pt-28 md:pt-36">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <Link to="/vehicles" className="inline-flex min-h-11 items-center gap-2 hover:text-accent"><ArrowLeft className="h-4 w-4" /> All vehicles</Link>
      </nav>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7"><VehicleGallery vehicle={v} /></div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="flex flex-wrap gap-2 text-[0.65rem] font-semibold uppercase tracking-wider">
              <span className={`px-2.5 py-1 ${v.condition === "New" ? "bg-accent text-on-accent" : "border border-line"}`}>{v.condition}</span>
              {v.featured && <span className="border border-accent px-2.5 py-1 text-accent">Featured</span>}
              {siteConfig.showDemoNotice && v.demo && <span className="border border-line px-2.5 py-1 text-muted">Demo listing</span>}
            </div>
            <h1 className="h-display mt-4 text-6xl md:text-7xl">{title}</h1>
            <p className="mt-3 text-muted">{v.year} · {formatMileage(v.mileage)} · {v.transmission} · {v.fuel}</p>
            <p className="mt-6 font-display text-5xl font-bold tracking-wide text-accent">{formatPrice(v.price, v.currency)}</p>

            <div className="mt-8 grid gap-3">
              <button onClick={() => openEnquiry(v)} className="btn btn-primary"><MessageSquare className="h-4 w-4" /> I’m Interested</button>
              <button onClick={() => openViewing(v)} className="btn btn-outline"><CalendarCheck className="h-4 w-4" /> Book a Viewing</button>
              <WhatsAppButton vehicle={v} floating={false} className="btn btn-outline border-[#25D366]/60 hover:!border-[#25D366] hover:!text-[#25D366]">WhatsApp Enquiry</WhatsAppButton>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={() => toggleFavorite(v.id)} aria-pressed={saved} className="btn btn-quiet flex-1 border border-line"><Heart className={`h-4 w-4 ${saved ? "fill-accent text-accent" : ""}`} /> {saved ? "Saved" : "Save"}</button>
              <button onClick={() => toggleCompare(v.id)} aria-pressed={compared} className="btn btn-quiet flex-1 border border-line">{compared ? <Check className="h-4 w-4 text-accent" /> : <Plus className="h-4 w-4" />} Compare</button>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20" aria-labelledby="specs-title">
        <h2 id="specs-title" className="h-display mb-6 text-4xl md:text-5xl">Specifications</h2>
        <VehicleSpecs vehicle={v} />
      </section>

      <div className="mt-20 grid gap-14 lg:grid-cols-2">
        <section aria-labelledby="features-title">
          <h2 id="features-title" className="h-display text-4xl md:text-5xl">Features</h2>
          <ul className="mt-6 grid gap-x-6 sm:grid-cols-2">
            {v.features.map((f) => (
              <li key={f} className="flex items-center gap-3 border-b border-line py-3 text-sm"><Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{f}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="overview-title">
          <h2 id="overview-title" className="h-display text-4xl md:text-5xl">Vehicle Overview</h2>
          <p className="mt-6 max-w-prose leading-relaxed text-muted">{v.description}</p>
        </section>
      </div>

      <div className="mt-20"><FinanceCalculator price={v.price} currency={v.currency} /></div>

      {similar.length > 0 && (
        <section className="mt-24" aria-labelledby="similar-title">
          <h2 id="similar-title" className="h-display mb-8 text-4xl md:text-5xl">You May Also Like</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{similar.map((s) => <li key={s.id}><VehicleCard vehicle={s} /></li>)}</ul>
        </section>
      )}
    </div>
  );
}

export default function VehicleDetails() {
  const { id } = useParams();
  const { data, loading, error } = useVehicle(id);
  useSeo({ title: "Vehicle Not Found | 02 Automobile Company", description: "This vehicle could not be found.", path: `/vehicles/${id}`, noindex: true, ...(data ? { title: "Vehicle | 02 Automobile Company" } : {}) });
  if (loading) return <VehicleDetailsSkeleton />;
  if (error || !data)
    return (
      <div className="container-x pb-24 pt-40">
        <StateMessage icon="car" title="Vehicle Not Found" text="Sorry, we couldn’t find the vehicle you’re looking for." action={{ label: "Back to Vehicles", to: "/vehicles" }} />
      </div>
    );
  return <Details vehicle={data} />;
}
