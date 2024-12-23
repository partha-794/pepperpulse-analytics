import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - showing products with their average inventory days
const productPerformanceData = [
  { name: 'Bed Frame', avgDays: 85 },
  { name: 'Sofa Set', avgDays: 72 },
  { name: 'Study Desk', avgDays: 65 },
  { name: 'Bookshelf', avgDays: 45 },
].sort((a, b) => b.avgDays - a.avgDays);

export const ProductPerformanceChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Inventory Days</CardTitle>
        <p className="text-sm text-muted-foreground">
          Average number of days products remain in inventory
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productPerformanceData}
              margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number"
                label={{ value: 'Days', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={100}
              />
              <Tooltip
                formatter={(value) => [`${value} days`, 'Average Days in Inventory']}
              />
              <Bar 
                dataKey="avgDays" 
                fill="#4f46e5" 
                name="Average Days in Inventory"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#4f46e5]" />
            <span>Average Days in Inventory</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};