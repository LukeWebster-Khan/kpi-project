import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FullKPI } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKPIDataforChart(kpi: FullKPI) {
  const enquiriesTotal =
    (parseInt(kpi.penquiry || "0") || 0) +
    (parseInt(kpi.wenquiry || "0") || 0) +
    (parseInt(kpi.oenquiry || "0") || 0);

  const formattedData = [
    { value: enquiriesTotal, category: "Enquiries" },
    { value: parseInt(kpi.quotes || "0") || 0, category: "Quotes" },

    {
      value: parseInt(kpi.qualifications || "0") || 0,
      category: "Qualifications",
    },
    { value: parseInt(kpi.proposals || "0") || 0, category: "Proposals" },
    { value: parseInt(kpi.enqorders || "0") || 0, category: "Orders" },
  ];

  return formattedData;
}
