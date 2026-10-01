import { useEffect, useState } from "react";
import { fetchVehicles, fetchVehicle } from "../lib/api";

function useAsync(loader, key) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  useEffect(() => {
    let active = true;
    setState({ data: null, error: null, loading: true });
    loader()
      .then((data) => active && setState({ data, error: null, loading: false }))
      .catch((error) => active && setState({ data: null, error, loading: false }));
    return () => {
      active = false;
    };
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return state;
}

export const useVehicles = () => useAsync(fetchVehicles, "all");
export const useVehicle = (id) => useAsync(() => fetchVehicle(id), id);
