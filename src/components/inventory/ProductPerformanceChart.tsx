import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - filtered to show only slow-moving products (turnover rate < 0.5)
const productPerformanceData = [
  { name: 'Bed Frame', sales: 65, turnoverRate: 0.4 },
  { name: 'Sofa Set', sales: 45, turnoverRate: 0.3 },
  { name: 'Study Desk', sales: 25, turnoverRate: 0.2 },
  { name: 'Bookshelf', sales: 15, turnoverRate: 0.1 },
].sort((a, b) => b.turnoverRate - a.turnoverRate);

export const ProductPerformanceChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Slow-Moving Products</CardTitle>
        <p className="text-sm text-muted-foreground">
          Products with turnover rate below 50% in the last 30 days
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productPerformanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                yAxisId="sales"
                orientation="left"
                stroke="#4f46e5"
                label={{ value: 'Sales Volume (units)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis
                yAxisId="turnover"
                orientation="right"
                stroke="#22c55e"
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                domain={[0, 0.5]}
                label={{ value: 'Turnover Rate (%)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip
                formatter={(value, name) => [
                  name === 'turnoverRate' ? `${(Number(value) * 100).toFixed(1)}%` : value,
                  name === 'turnoverRate' ? 'Turnover Rate' : 'Sales Volume (units)'
                ]}
              />
              <Bar yAxisId="sales" dataKey="sales" fill="#4f46e5" name="Sales Volume (units)" />
              <Bar yAxisId="turnover" dataKey="turnoverRate" fill="#22c55e" name="Turnover Rate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#4f46e5]" />
            <span>Sales Volume (units)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#22c55e]" />
            <span>Turnover Rate (%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};