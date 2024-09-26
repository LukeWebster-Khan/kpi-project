"use client";

import { useFetchKPIs } from "@/lib/hooks";
import { FullKPI, KPImeta } from "@/lib/types";
import React, { createContext, useState } from "react";

type KPISContextType = {
  kpis: FullKPI[] | null;
  loading: boolean;
  kpiMeta: KPImeta | null;
  individualKPI: FullKPI | null;
  numberOfSearchResults?: number;
  handleSidebarItemClick: (kpi: FullKPI) => void;
  handleDateChange: (date: string) => void;
};

export const KPIItemsContext = createContext<KPISContextType | null>(null);

export function KPIContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // state declerations
  const [individualKPI, setIndividualKPI] = useState<FullKPI | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const { kpis, loading, kpiMeta } = useFetchKPIs(selectedDate);

  // derived state
  const numberOfSearchResults = 10;

  // handle functions
  function handleSidebarItemClick(kpi: FullKPI) {
    setIndividualKPI(kpi);
  }

  function handleDateChange(date: string) {
    setSelectedDate(date);
  }

  const contextValue = {
    kpis,
    loading,
    individualKPI: individualKPI ? individualKPI : null,
    numberOfSearchResults,
    kpiMeta,
    handleSidebarItemClick,
    handleDateChange,
  };

  return (
    <KPIItemsContext.Provider value={contextValue}>
      {children}
    </KPIItemsContext.Provider>
  );
}
