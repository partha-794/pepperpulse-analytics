import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { ProductSelector } from "./ProductSelector";

interface ProductPerformanceChartProps {
  kpiName: string;
  productData: Array<{ product: string; value: number }>;
  formatValue: (value: number) => string;
  yAxisDomain: [number, number];
}

export const ProductPerformanceChart = ({
  kpiName,
  productData,
  formatValue,
  yAxisDomain,
}: ProductPerformanceChartProps) => {
  console.log(`Rendering product performance chart for ${kpiName}`, productData);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          {kpiName} by Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={productData} 
              layout="vertical"
              margin={{ top: 10, right: 30, left: 30, bottom: 30 }}
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
                dataKey="product"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={70}
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