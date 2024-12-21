import { useState } from "react";
import { Package2, PackageOpen, Boxes, ArrowUpDown, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { KPIContainer } from "@/components/kpi/KPIContainer";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DateRange } from "react-day-picker";

const Inventory = () => {
  const [date, setDate] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

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
            <h1 className="text-4xl font-bold text-primary">Inventory Management</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Track stock levels, product performance, and inventory metrics
            </p>
          </div>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {inventoryStats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <KPIContainer
            name="Stock Movement"
            icon={ArrowUpDown}
            value="1,234"
            change="+15.2%"
            trend="up"
            dateRange={date.from && date.to ? { from: date.from, to: date.to } : undefined}
            subStats={[
              { label: "Inbound", value: "756", change: "+12.3%" },
              { label: "Outbound", value: "478", change: "+18.1%" },
            ]}
          />
          <KPIContainer
            name="Storage Utilization"
            icon={Boxes}
            value="78%"
            change="+5.5%"
            trend="up"
            dateRange={date.from && date.to ? { from: date.from, to: date.to } : undefined}
            subStats={[
              { label: "Used Space", value: "3,450 sqft", change: "+8.2%" },
              { label: "Available", value: "950 sqft", change: "-15.3%" },
            ]}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Low Stock Alerts</h3>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div
                  key={item.sku}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-500 font-semibold">{item.stock} units</p>
                    <p className="text-sm text-muted-foreground">
                      Reorder at: {item.reorderPoint}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Activities</h3>
              <Package2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Today</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <PackageOpen className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Stock received: 50x Dining Chairs</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Package2 className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Order fulfilled: 5x Coffee Tables</span>
                    </div>
                    <span className="text-xs text-muted-foreground">4 hours ago</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Yesterday</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Low stock alert: Bed Frames</span>
                    </div>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;