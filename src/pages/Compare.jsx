import PageHeader from "../components/PageHeader";
import VehicleComparison from "../components/VehicleComparison";
import StateMessage from "../components/StateMessage";
import { VehicleCardSkeleton } from "../components/Skeletons";
import { useVehicles } from "../hooks/useAsync";
import { useStore } from "../context/StoreContext";
import { useSeo } from "../hooks/useSeo";

export default function Compare() {
  useSeo({ title: "Compare Vehicles | 02 Automobile Company", description: "Compare up to three vehicles side by side.", path: "/compare", noindex: true });
  const { compare, toggleCompare, clearCompare } = useStore();
  const { data, loading } = useVehicles();
  const selected = (data || []).filter((v) => compare.includes(v.id));
  return (
    <>
      <PageHeader title="Compare" text="Compare up to three vehicles side by side." />
      <div className="container-x py-12">
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-3"><VehicleCardSkeleton /><VehicleCardSkeleton /><VehicleCardSkeleton /></div>
        ) : selected.length === 0 ? (
          <StateMessage icon="car" title="Nothing to compare yet" text="Use the Compare button on a vehicle to add it here." action={{ label: "Browse Vehicles", to: "/vehicles" }} />
        ) : (
          <>
            <VehicleComparison vehicles={selected} onRemove={toggleCompare} />
            <button onClick={clearCompare} className="btn btn-outline mt-6">Clear comparison</button>
          </>
        )}
      </div>
    </>
  );
}
