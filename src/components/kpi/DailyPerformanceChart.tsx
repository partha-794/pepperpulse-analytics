import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { format } from "date-fns";
import { ProductSelector } from "./ProductSelector";

interface DailyPerformanceChartProps {
  kpiName: string;
  dailyData: Array<{ date: string; value: number }>;
  selectedProduct: string;
  onProductSelect: (value: string) => void;
  formatValue: (value: number) => string;
  yAxisDomain: [number, number];
}

export const DailyPerformanceChart = ({
  kpiName,
  dailyData,
  selectedProduct,
  onProductSelect,
  formatValue,
  yAxisDomain,
}: DailyPerformanceChartProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">
            {kpiName} Day on Day
          </CardTitle>
          <ProductSelector value={selectedProduct} onValueChange={onProductSelect} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyData} margin={{ top: 10, right: 30, left: 60, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => format(new Date(value), "MM-dd")}
                interval={Math.ceil(dailyData.length / 7)}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatValue}
                domain={yAxisDomain}
                padding={{ top: 20, bottom: 20 }}
              />
              <ChartTooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1f2937"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};