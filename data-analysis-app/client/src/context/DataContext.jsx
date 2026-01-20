import { createContext, useContext, useState, useCallback } from "react";

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [listeners, setListeners] = useState([]);

  // Trigeriraj refresh svih komponenti koje slušaju
  const triggerRefresh = useCallback(() => {
    const now = Date.now();
    setLastUpdate(now);
    // Notify all listeners
    listeners.forEach((callback) => callback(now));
  }, [listeners]);

  // Registriraj listener za promjene
  const subscribe = useCallback((callback) => {
    setListeners((prev) => [...prev, callback]);
    return () => {
      setListeners((prev) => prev.filter((cb) => cb !== callback));
    };
  }, []);

  // Kad se doda novi artikal
  const onDataAdded = useCallback(
    (data) => {
      console.log("📊 Novi artikal dodan:", data);
      triggerRefresh();
    },
    [triggerRefresh]
  );

  // Kad se artikal ažurira
  const onDataUpdated = useCallback(
    (data) => {
      console.log("📝 Artikal ažuriran:", data);
      triggerRefresh();
    },
    [triggerRefresh]
  );

  // Kad se artikal obriše
  const onDataDeleted = useCallback(
    (id) => {
      console.log("🗑️ Artikal obrisan:", id);
      triggerRefresh();
    },
    [triggerRefresh]
  );

  const value = {
    lastUpdate,
    triggerRefresh,
    subscribe,
    onDataAdded,
    onDataUpdated,
    onDataDeleted,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
