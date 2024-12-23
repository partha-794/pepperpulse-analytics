import React, { useState } from "react";
import { format, subMonths, eachDayOfInterval, eachMonthOfInterval, startOfMonth } from "date-fns";
import { OrderMilestonesChart } from "../charts/OrderMilestonesChart";
import { DailyPerformanceChart } from "./DailyPerformanceChart";
import { MonthlyPerformanceChart } from "./MonthlyPerformanceChart";

interface KPIPerformanceChartsProps {
  kpiName: string;
  dateRange: { from: Date; to: Date };
  className?: string;
}

export const KPIPerformanceCharts = ({ kpiName, dateRange, className }: KPIPerformanceChartsProps) => {
  console.log(`Rendering charts for KPI: ${kpiName}`);

  // Separate state for each chart's product selection
  const [selectedDailyProduct, setSelectedDailyProduct] = useState("All Products");
  const [selectedMonthlyProduct, setSelectedMonthlyProduct] = useState("All Products");

  // Generate sample data based on KPI type and product
  const generateSampleData = (kpiType: string, value: number, productTitle: string) => {
    const baseValue = productTitle === "All Products" ? value : value / 2;
    
    switch (kpiType) {
      case "Total Revenue":
        return Math.floor(Math.random() * 10000) + baseValue;
      case "No of Orders":
        return Math.floor(Math.random() * 100) + baseValue;
      case "Average Order Value":
        return Math.floor(Math.random() * 1000) + baseValue;
      case "Fulfilment %":
        return Math.min(100, Math.floor(Math.random() * 20) + 80);
      case "Impressions":
        return Math.floor(Math.random() * 5000) + baseValue;
      case "Clicks":
        return Math.floor(Math.random() * 1000) + baseValue;
      case "Add to Cart":
        return Math.floor(Math.random() * 200) + baseValue;
      default:
        return Math.floor(Math.random() * 1000) + baseValue;
    }
  };

  // Generate daily data for the selected date range and product
  const generateDailyData = (productTitle: string) => {
    return eachDayOfInterval({ start: dateRange.from, end: dateRange.to })
      .map(date => ({
        date: format(date, "yyyy-MM-dd"),
        value: generateSampleData(kpiName, 0, productTitle)
      }));
  };

  // Generate monthly data for the last 5 months and product
  const generateMonthlyData = (productTitle: string) => {
    return eachMonthOfInterval({
      start: subMonths(startOfMonth(new Date()), 4),
      end: new Date()
    }).map(date => ({
      date: format(date, "MMM"),
      value: generateSampleData(kpiName, 0, productTitle)
    }));
  };

  const dailyData = generateDailyData(selectedDailyProduct);
  const monthlyData = generateMonthlyData(selectedMonthlyProduct);

  const formatValue = (value: number) => {
    switch (kpiName) {
      case "Total Revenue":
        return `₹${value.toLocaleString()}`;
      case "Fulfilment %":
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  const getYAxisDomain = () => {
    const maxValue = Math.max(
      ...dailyData.map(item => item.value),
      ...monthlyData.map(item => item.value)
    );
    const step = Math.ceil(maxValue / 5);
    return [0, Math.ceil(maxValue / step) * step] as [number, number];
  };

  const yAxisDomain = getYAxisDomain();

  return (
    <div className={className}>
      <div className="grid gap-6 md:grid-cols-2">
        <DailyPerformanceChart
          kpiName={kpiName}
          dailyData={dailyData}
          selectedProduct={selectedDailyProduct}
          onProductSelect={setSelectedDailyProduct}
          formatValue={formatValue}
          yAxisDomain={yAxisDomain}
        />
        <MonthlyPerformanceChart
          kpiName={kpiName}
          monthlyData={monthlyData}
          selectedProduct={selectedMonthlyProduct}
          onProductSelect={setSelectedMonthlyProduct}
          formatValue={formatValue}
          yAxisDomain={yAxisDomain}
        />
        {kpiName === "Fulfilment %" && <OrderMilestonesChart />}
      </div>
    </div>
  );
};