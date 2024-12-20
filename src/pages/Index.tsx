import DashboardLayout from "@/components/layout/DashboardLayout";
import { TrendingUp, ShoppingBag, Package, Percent, Eye, MousePointer, ShoppingCart, Users, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { KPIContainer } from "@/components/kpi/KPIContainer";

const stats = [
  {
    name: "Total Revenue",
    value: "₹2.4M",
    change: "+12.3%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    name: "Average Order Value",
    value: "₹2,854",
    change: "+4.5%",
    trend: "up",
    icon: ShoppingBag,
  },
  {
    name: "No of Orders",
    value: "1,243",
    change: "+8.2%",
    trend: "up",
    icon: Package,
  },
  {
    name: "Fulfilment %",
    value: "94.8%",
    change: "+2.1%",
    trend: "up",
    icon: Percent,
  },
  {
    name: "Impressions",
    value: "125.4K",
    change: "+15.3%",
    trend: "up",
    icon: Eye,
  },
  {
    name: "Clicks",
    value: "28.6K",
    change: "+9.7%",
    trend: "up",
    icon: MousePointer,
  },
  {
    name: "Add to Cart",
    value: "4,521",
    change: "+6.8%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    name: "Sales by Customer Type",
    value: "",
    subStats: [
      { label: "New Customers", value: "65%", change: "+5.2%" },
      { label: "Returning Customers", value: "35%", change: "-5.2%" }
    ],
    icon: Users,
  }
];

const Index = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-primary-900">Analytics Overview</h1>
          <p className="mt-2 text-lg text-gray-600">Track your brand's performance and insights</p>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Date Range</h3>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        format(date.from, "LLL dd, y")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={date?.from}
                      onSelect={(day) =>
                        setDate((prev) => ({ from: day, to: prev?.to }))
                      }
                    />
                  </PopoverContent>
                </Popover>
                <span className="text-gray-500">to</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.to ? (
                        format(date.to, "LLL dd, y")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={date?.to}
                      onSelect={(day) =>
                        setDate((prev) => ({ from: prev?.from, to: day }))
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <KPIContainer
              key={stat.name}
              name={stat.name}
              value={stat.value}
              change={stat.change}
              trend={stat.trend}
              icon={stat.icon}
              subStats={stat.subStats}
              dateRange={date?.from && date?.to ? { from: date.from, to: date.to } : undefined}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">New user segment identified</p>
                      <p className="text-sm text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {["Generate Report", "Export Data", "Update Metrics", "View Insights"].map((action) => (
                <button
                  key={action}
                  className="p-4 text-left rounded-lg border border-gray-200 hover:border-primary hover:bg-primary-100 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
