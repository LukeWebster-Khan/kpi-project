"use client";

import { useContext, useEffect, useState } from "react";
import { KPI_API_URL } from "./constants";
import { KPIItemsContext } from "@/app/contexts/KPIContextProvider";
import { FullKPI, KPImeta } from "./types";
import { useQuery } from "@tanstack/react-query";

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
  const fetchKPIs = async () => {
    const url = date ? `${KPI_API_URL}?inmonth=${date}` : KPI_API_URL;
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
    const data = await res.json();

    // Destructure data and omit the 'kpi' key
    const { kpi, ...generalData } = data;
    return { kpi, generalData };
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["kpis", date],
    queryFn: fetchKPIs,
    enabled: !!date,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    kpis: data?.kpi || null,
    kpiMeta: data?.generalData || null,
    loading: isLoading,
    error,
  };
};

export function useKPIContext() {
  const context = useContext(KPIItemsContext);
  if (!context) {
    throw new Error("useKPIContext must be used within a KPIItemsContext");
  }
  return context;
}
