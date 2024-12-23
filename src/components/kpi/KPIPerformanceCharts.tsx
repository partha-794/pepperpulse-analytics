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

  // Generate daily data with its own product selection
  const generateDailyData = () => {
    console.log(`Generating daily data for product: ${selectedDailyProduct}`);
    return eachDayOfInterval({ start: dateRange.from, end: dateRange.to })
      .map(date => ({
        date: format(date, "yyyy-MM-dd"),
        value: generateSampleData(kpiName, 0, selectedDailyProduct)
      }));
  };

  // Generate monthly data with its own product selection
  const generateMonthlyData = () => {
    console.log(`Generating monthly data for product: ${selectedMonthlyProduct}`);
    return eachMonthOfInterval({
      start: subMonths(startOfMonth(new Date()), 4),
      end: new Date()
    }).map(date => ({
      date: format(date, "MMM"),
      value: generateSampleData(kpiName, 0, selectedMonthlyProduct)
    }));
  };

  // Generate data independently for each chart
  const dailyData = generateDailyData();
  const monthlyData = generateMonthlyData();

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

  const getYAxisDomain = (data: Array<{ value: number }>) => {
    const maxValue = Math.max(...data.map(item => item.value));
    const step = Math.ceil(maxValue / 5);
    return [0, Math.ceil(maxValue / step) * step] as [number, number];
  };

  return (
    <div className={className}>
      <div className="grid gap-6 md:grid-cols-2">
        <DailyPerformanceChart
          kpiName={kpiName}
          dailyData={dailyData}
          selectedProduct={selectedDailyProduct}
          onProductSelect={setSelectedDailyProduct}
          formatValue={formatValue}
          yAxisDomain={getYAxisDomain(dailyData)}
        />
        <MonthlyPerformanceChart
          kpiName={kpiName}
          monthlyData={monthlyData}
          selectedProduct={selectedMonthlyProduct}
          onProductSelect={setSelectedMonthlyProduct}
          formatValue={formatValue}
          yAxisDomain={getYAxisDomain(monthlyData)}
        />
        {kpiName === "Fulfilment %" && <OrderMilestonesChart />}
      </div>
    </div>
  );
};