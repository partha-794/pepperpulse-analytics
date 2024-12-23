import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { ProductSelector } from "./ProductSelector";

interface MonthlyPerformanceChartProps {
  kpiName: string;
  monthlyData: Array<{ date: string; value: number }>;
  selectedProduct: string;
  onProductSelect: (value: string) => void;
  formatValue: (value: number) => string;
  yAxisDomain: [number, number];
}

export const MonthlyPerformanceChart = ({
  kpiName,
  monthlyData,
  selectedProduct,
  onProductSelect,
  formatValue,
  yAxisDomain,
}: MonthlyPerformanceChartProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">
            {kpiName} Month on Month
          </CardTitle>
          <ProductSelector value={selectedProduct} onValueChange={onProductSelect} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={monthlyData} 
              layout="vertical"
              margin={{ top: 10, right: 30, left: 60, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} />
              <XAxis
                type="number"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatValue}
                domain={yAxisDomain}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                type="category"
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={50}
              />
              <ChartTooltip />
              <Bar
                dataKey="value"
                fill="#1f2937"
                radius={[0, 4, 4, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};