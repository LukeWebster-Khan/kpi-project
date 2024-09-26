"use client";

import { useContext } from "react";
import { KPI_API_URL } from "./constants";
import { KPIItemsContext } from "@/app/contexts/KPIContextProvider";
import { useQuery } from "@tanstack/react-query";

const fetchKPIs = async () => {
  const res = await fetch(`${KPI_API_URL}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  const data = await res.json();
  return data;
};

export const useFetchKPIs = (date?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["kpis", date],
    queryFn: fetchKPIs,
    enabled: !!date,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
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
