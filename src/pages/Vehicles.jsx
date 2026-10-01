import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import PageHeader from "../components/PageHeader";
import VehicleFilter from "../components/VehicleFilter";
import VehicleGrid from "../components/VehicleGrid";
import { SelectField } from "../components/Fields";
import { useVehicles } from "../hooks/useAsync";
import { useSeo } from "../hooks/useSeo";
import { siteConfig } from "../config/site";
import { SORTS, applyFilters, filtersFromParams, paramsFromFilters } from "../lib/inventory";

export default function Vehicles() {
  useSeo({ title: "Vehicles for Sale | 02 Automobile Company", description: "Browse and filter quality vehicles from 02 Automobile Company by make, price, year, mileage, fuel and more.", path: "/vehicles" });
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => filtersFromParams(params), [params]);
  const { data, loading } = useVehicles();
  const [drawer, setDrawer] = useState(false);

  const setFilter = (key, value) => {
    const next = { ...filters, [key]: value };
    if (key === "brand") next.model = "";
    setParams(paramsFromFilters(next), { replace: true });
  };
  const reset = () => setParams({}, { replace: true });
  const results = useMemo(() => (data ? applyFilters(data, filters) : []), [data, filters]);

  return (
    <>
      <PageHeader title="Vehicles" text="Search the inventory, narrow it down and save the ones you like." />
      <div className="container-x py-10 md:py-14">
        {siteConfig.showDemoNotice && (
          <p className="mb-8 border border-accent/40 bg-accent/10 px-4 py-3 text-sm">
            <strong>Demo inventory.</strong> These vehicles are placeholders and are not available for sale. Replace them in <code>src/data/vehicles.js</code>.
          </p>
        )}
        <div className="grid gap-10 lg:grid-cols-[17rem_1fr]">
          <VehicleFilter filters={filters} onChange={setFilter} onReset={reset} drawerOpen={drawer} onCloseDrawer={() => setDrawer(false)} count={results.length} />
          <div>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <p className="font-display text-3xl font-semibold uppercase tracking-wide" aria-live="polite">
                {loading ? "Loading vehicles…" : `${results.length} Vehicle${results.length === 1 ? "" : "s"} Found`}
              </p>
              <div className="flex items-end gap-3">
                <button onClick={() => setDrawer(true)} className="btn btn-outline lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Filters</button>
                <SelectField id="sort" label="Sort by" value={filters.sort} onChange={(v) => setFilter("sort", v || "newest")} options={SORTS} placeholder="Newest" className="w-52" />
              </div>
            </div>
            <VehicleGrid vehicles={results} loading={loading} onReset={reset} />
          </div>
        </div>
      </div>
    </>
  );
}
