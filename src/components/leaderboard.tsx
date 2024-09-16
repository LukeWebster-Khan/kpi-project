"use client";

import { useKPIContext } from "@/lib/hooks";
import React from "react";

export default function LeaderBoard() {
  const { kpis } = useKPIContext();

  if (!kpis) return <div>Loading...</div>;

  const sortedKpis = kpis
    .map((kpi) => {
      const totalEnquiries =
        Number(kpi.penquiry) + Number(kpi.wenquiry) + Number(kpi.oenquiry);
      const proportionOfOrders =
        totalEnquiries > 0 ? Number(kpi.enqorders) / totalEnquiries : 0;
      const percentageOfOrders = (proportionOfOrders * 100).toFixed(1);

      return { ...kpi, proportionOfOrders, percentageOfOrders };
    })
    .sort((a, b) => b.proportionOfOrders - a.proportionOfOrders);

  return (
    <div className="w-[90%] mx-auto overflow-x-hidden">
      <h1>Leaderboard</h1>
      <div className="flex flex-col justify-center overflow-x-hidden">
        {sortedKpis.map((kpi, index) => (
          <div
            className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-200 transition cursor-pointer"
            key={index}
          >
            <h2>{kpi.team}</h2>
            <p>Proportion of Orders: {kpi.percentageOfOrders}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
