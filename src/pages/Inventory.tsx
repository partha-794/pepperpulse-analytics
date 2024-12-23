import { useState } from "react";
import { Package2, PackageOpen, Boxes, ArrowUpDown, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { KPIContainer } from "@/components/kpi/KPIContainer";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DateRange } from "react-day-picker";
import { InventoryStockChart } from "@/components/inventory/InventoryStockChart";
import { StockoutHeatmap } from "@/components/inventory/StockoutHeatmap";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Inventory = () => {
  const [date, setDate] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  // Sample data for Average Inventory Days
  const averageInventoryData = [
    { name: 'Bed Frame', avgDays: 85 },
    { name: 'Sofa Set', avgDays: 72 },
    { name: 'Study Desk', avgDays: 65 },
    { name: 'Bookshelf', avgDays: 45 },
  ].sort((a, b) => b.avgDays - a.avgDays);

  // Sample data for slow-moving SKUs
  const slowMovingSkus = [
    { 
      name: "Vintage Armchair",
      sku: "VA-001",
      daysInStock: 120,
      lastSaleDate: "2023-12-15",
      currentStock: 8,
      salesLast30Days: 1
    },
    { 
      name: "Crystal Chandelier",
      sku: "CC-102",
      daysInStock: 95,
      lastSaleDate: "2023-12-28",
      currentStock: 5,
      salesLast30Days: 2
    },
    { 
      name: "Leather Ottoman",
      sku: "LO-203",
      daysInStock: 85,
      lastSaleDate: "2024-01-05",
      currentStock: 12,
      salesLast30Days: 1
    }
  ];

  const inventoryStats = [
    {
      title: "Total Products",
      value: "2,543",
      change: { value: "12%", trend: "up" as const },
    },
    {
      title: "Low Stock Items",
      value: "45",
      change: { value: "5%", trend: "down" as const },
    },
    {
      title: "Out of Stock",
      value: "12",
      change: { value: "2%", trend: "down" as const },
    },
    {
      title: "Stock Value",
      value: "₹12.5M",
      change: { value: "8%", trend: "up" as const },
    },
  ];

  const lowStockItems = [
    { name: "Dining Chair", sku: "DC-001", stock: 5, reorderPoint: 10 },
    { name: "Coffee Table", sku: "CT-102", stock: 3, reorderPoint: 8 },
    { name: "Bed Frame", sku: "BF-203", stock: 2, reorderPoint: 5 },
    { name: "Sofa Set", sku: "SS-405", stock: 1, reorderPoint: 3 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary">Inventory Summary</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Track stock levels, stockouts, and inventory metrics
            </p>
          </div>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {inventoryStats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Current Stock Levels</h3>
            <InventoryStockChart />
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Average Inventory Days</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={averageInventoryData}
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
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Slow-Moving SKUs</h3>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Days in Stock</TableHead>
                <TableHead>Last Sale Date</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Sales (Last 30 Days)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slowMovingSkus.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.daysInStock}</TableCell>
                  <TableCell>{item.lastSaleDate}</TableCell>
                  <TableCell>{item.currentStock}</TableCell>
                  <TableCell>{item.salesLast30Days}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Low Stock Alerts</h3>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Reorder Point</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockItems.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{item.reorderPoint}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Low Stock
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;
