"use client";

import { useContext, useEffect, useState } from "react";
import { KPI_API_URL } from "./constants";
import { KPIItemsContext } from "@/app/contexts/KPIContextProvider";
import { FullKPI, KPImeta } from "./types";

// const fetchKPIs = async () => {
//   const res = await fetch(`${KPI_API_URL}`);
//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData.message);
//   }
//   const data = await res.json();
//   return data;
// };

export const useFetchKPIs = (date?: string) => {
  const [kpiMeta, setKpiMeta] = useState<KPImeta>(null); // Adjust type if you have a specific type for meta data
  const [kpis, setKpis] = useState<FullKPI[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        setLoading(true);
        const url = date ? `${KPI_API_URL}?inmonth=${date}` : KPI_API_URL;
        const res = await fetch(url);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message);
        }
        const data = await res.json();

        // Destructure data and omit the 'kpi' key
        const { kpi, ...generalData } = data;

        setKpis(kpi); // Set the kpi data separately
        setKpiMeta(generalData); // Set the rest of the data excluding 'kpi'
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
  }, [date]);

  return { kpiMeta, kpis, loading };
};

export function useKPIContext() {
  const context = useContext(KPIItemsContext);
  if (!context) {
    throw new Error("useKPIContext must be used within a KPIItemsContext");
  }
  return context;
}
