"use client";

import { useKPIContext } from "@/lib/hooks";
import KpiChart from "./kpi-chart";

export default function Details() {
  const { individualKPI, kpiMeta } = useKPIContext();
  return (
    <div className="w-full bg-gray-100 p-4">
      {individualKPI ? (
        <>
          <div className="flex justify-between">
            <section>
              <h1 className="text-2xl font-semibold">
                Team: {individualKPI.team || "No Team"}
              </h1>
              <p>Assigned: {individualKPI.assigned || "not assigned"}</p>
            </section>
            <section>
              <p>
                Display Month:{" "}
                <span className="font-semibold">{kpiMeta.displaymonth}</span>
              </p>
            </section>
          </div>
          <KpiChart />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <span className="text-gray-800 font-semibold text-xl mb-5">
            Whose KPIs are we looking for?
          </span>
          <span className="whitespace-nowrap text-base">
            Select a KPI from the sidebar
          </span>
        </div>
      )}
    </div>
  );
}
