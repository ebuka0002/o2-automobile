import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { SelectField } from "./Fields";
import { brands, types, fuels, transmissions, modelsFor, priceOptions, yearOptions, listOptions, emptyFilters, paramsFromFilters } from "../lib/inventory";

/** Homepage quick search — sends the chosen filters to /vehicles as URL params. */
export default function VehicleSearch() {
  const navigate = useNavigate();
  const [f, setF] = useState(emptyFilters);
  const set = (key) => (value) => setF((prev) => ({ ...prev, [key]: value, ...(key === "brand" ? { model: "" } : {}) }));

  const submit = (e) => {
    e.preventDefault();
    navigate(`/vehicles?${paramsFromFilters(f).toString()}`);
  };

  return (
    <section id="find" aria-labelledby="find-title" className="relative z-10 -mt-14 md:-mt-16">
      <div className="container-x">
        <form onSubmit={submit} className="border border-line bg-surface p-6 shadow-2xl shadow-black/30 md:p-8">
          <h2 id="find-title" className="h-display text-3xl md:text-4xl">Find Your Perfect Vehicle</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField id="hs-make" label="Make" value={f.brand} onChange={set("brand")} options={listOptions(brands)} />
            <SelectField id="hs-model" label="Model" value={f.model} onChange={set("model")} options={listOptions(modelsFor(f.brand))} />
            <SelectField id="hs-type" label="Vehicle type" value={f.type} onChange={set("type")} options={listOptions(types)} />
            <SelectField id="hs-year" label="Year" value={f.year} onChange={set("year")} options={yearOptions} />
            <SelectField id="hs-min" label="Min price" value={f.minPrice} onChange={set("minPrice")} options={priceOptions} placeholder="No min" />
            <SelectField id="hs-max" label="Max price" value={f.maxPrice} onChange={set("maxPrice")} options={priceOptions} placeholder="No max" />
            <SelectField id="hs-trans" label="Transmission" value={f.transmission} onChange={set("transmission")} options={listOptions(transmissions)} />
            <SelectField id="hs-fuel" label="Fuel type" value={f.fuel} onChange={set("fuel")} options={listOptions(fuels)} />
          </div>
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setF(emptyFilters)} className="btn btn-quiet">Reset Filters</button>
            <button type="submit" className="btn btn-primary sm:min-w-56"><Search className="h-4 w-4" /> Search Inventory</button>
          </div>
        </form>
      </div>
    </section>
  );
}
