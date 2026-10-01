import PageHeader from "../components/PageHeader";
import VehicleGrid from "../components/VehicleGrid";
import StateMessage from "../components/StateMessage";
import { useVehicles } from "../hooks/useAsync";
import { useStore } from "../context/StoreContext";
import { useSeo } from "../hooks/useSeo";

export default function Saved() {
  useSeo({ title: "Saved Vehicles | 02 Automobile Company", description: "Your saved vehicles at 02 Automobile Company.", path: "/saved", noindex: true });
  const { favorites } = useStore();
  const { data, loading } = useVehicles();
  const saved = (data || []).filter((v) => favorites.includes(v.id));
  return (
    <>
      <PageHeader title="Saved Vehicles" text="Vehicles you’ve saved are stored on this device." />
      <div className="container-x py-12">
        <VehicleGrid
          vehicles={saved}
          loading={loading}
          emptyState={<StateMessage icon="heart" title="No saved vehicles yet" text="Tap the heart on any vehicle to keep it here." action={{ label: "Browse Vehicles", to: "/vehicles" }} />}
        />
      </div>
    </>
  );
}
