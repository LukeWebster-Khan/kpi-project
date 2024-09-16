import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useKPIContext } from "@/lib/hooks";
import { formatKPIDataforChart } from "@/lib/utils";

export default function KpiChart() {
  const { individualKPI } = useKPIContext();
  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    // Create root element
    const root = am5.Root.new(chartRef.current);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // Create series
    const series = chart.series.push(
      am5percent.FunnelSeries.new(root, {
        alignLabels: false,
        orientation: "vertical",
        valueField: "value",
        categoryField: "category",
      })
    );

    // Set data
    if (!individualKPI) return;

    const kpiData = formatKPIDataforChart(individualKPI);
    series.data.setAll(kpiData);

    // Create legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );
    legend.data.setAll(series.dataItems);

    // Calculate total enquiries for target lines
    const totalEnquiries =
      kpiData.find((d) => d.category === "Enquiries")?.value || 0;

    // Define performance targets
    const targets = [
      { category: "Qualifications", percentage: 0.7 },
      { category: "Quotes", percentage: 0.5 },
      { category: "Proposals", percentage: 0.3 },
      { category: "Orders", percentage: 0.1 },
    ];

    // Add target lines
    targets.forEach((target) => {
      const targetValue = totalEnquiries * target.percentage;

      // Ensure plotContainer exists before accessing its children
      const plotContainer = chart.plotContainer;
      if (!plotContainer) return;

      const targetLine = plotContainer.children.push(
        am5.Label.new(root, {
          text: `${target.category} Target: ${targetValue}`,
          x: am5.percent(50),
          y: am5.percent(100 - target.percentage * 100),
          centerX: am5.percent(50),
          centerY: am5.percent(50),
          background: am5.RoundedRectangle.new(root, {
            cornerRadius: 10,
            fill: am5.color(0xffffff),
          }),
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 10,
          paddingRight: 10,
          fontSize: "0.8em",
          textAlign: "center",
        })
      );

      targetLine.label.setAll({
        fill: am5.color(0x000000),
        fontSize: "0.8em",
      });
    });

    // Animate series on load
    series.appear();
    chart.appear(1000, 100);

    // Cleanup on component unmount
    return () => {
      root.dispose();
    };
  }, [individualKPI]);

  return (
    <div
      id="chartdiv"
      ref={chartRef}
      style={{ width: "100%", height: "500px" }}
    ></div>
  );
}
