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
import { ProductPerformanceChart } from "@/components/inventory/ProductPerformanceChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Inventory = () => {
  const [date, setDate] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  // Mock data for demonstration
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
            <h3 className="text-lg font-semibold mb-4">Stockout Patterns</h3>
            <StockoutHeatmap />
          </Card>
        </div>

        <ProductPerformanceChart />

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