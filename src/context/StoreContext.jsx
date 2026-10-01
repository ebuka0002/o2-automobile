import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(null);
export const MAX_COMPARE = 3;

function usePersisted(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable (private mode) — keep in-memory state */
    }
  }, [key, value]);
  return [value, setValue];
}

export function StoreProvider({ children }) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  const [favorites, setFavorites] = usePersisted("o2-favorites", []);
  const [compare, setCompare] = usePersisted("o2-compare", []);
  const [modal, setModal] = useState(null); // { mode: "enquiry" | "viewing", vehicle }
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("o2-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const notify = useCallback((message) => setToast(message ? { id: Date.now(), message } : null), []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      favorites,
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite: (id) => {
        const saved = favorites.includes(id);
        setFavorites(saved ? favorites.filter((f) => f !== id) : [...favorites, id]);
        notify(saved ? "Removed from saved vehicles" : "Saved to your vehicles");
      },
      compare,
      isCompared: (id) => compare.includes(id),
      toggleCompare: (id) => {
        if (compare.includes(id)) return setCompare(compare.filter((c) => c !== id));
        if (compare.length >= MAX_COMPARE) return notify(`You can compare up to ${MAX_COMPARE} vehicles`);
        setCompare([...compare, id]);
      },
      clearCompare: () => setCompare([]),
      modal,
      openEnquiry: (vehicle = null) => setModal({ mode: "enquiry", vehicle }),
      openViewing: (vehicle = null) => setModal({ mode: "viewing", vehicle }),
      closeModal: () => setModal(null),
      toast,
      notify,
    }),
    [theme, favorites, compare, modal, toast, notify, setFavorites, setCompare]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
