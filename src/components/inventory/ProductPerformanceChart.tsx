import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - in a real app, this would come from your backend
const productPerformanceData = [
  { name: 'Dining Chair', sales: 120, turnoverRate: 0.8 },
  { name: 'Coffee Table', sales: 85, turnoverRate: 0.6 },
  { name: 'Bed Frame', sales: 65, turnoverRate: 0.4 },
  { name: 'Sofa Set', sales: 45, turnoverRate: 0.3 },
  { name: 'Study Desk', sales: 25, turnoverRate: 0.2 },
  { name: 'Bookshelf', sales: 15, turnoverRate: 0.1 },
].sort((a, b) => b.turnoverRate - a.turnoverRate);

export const ProductPerformanceChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productPerformanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip
                formatter={(value, name) => [
                  name === 'turnoverRate' ? `${(Number(value) * 100).toFixed(1)}%` : value,
                  name === 'turnoverRate' ? 'Turnover Rate' : 'Sales'
                ]}
              />
              <Bar dataKey="sales" fill="#4f46e5" name="Sales" />
              <Bar dataKey="turnoverRate" fill="#22c55e" name="Turnover Rate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};