import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { TrendingUp, ShoppingBag, Package, Percent, Eye, MousePointer, ShoppingCart, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

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
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Date Range</h3>
            <div className="text-sm text-gray-900">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                "Select a date range"
              )}
            </div>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="rounded-md border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.name} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  {stat.subStats ? (
                    <div className="mt-2 space-y-1">
                      {stat.subStats.map((subStat) => (
                        <div key={subStat.label} className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{subStat.label}:</span>
                          <div>
                            <span className="text-lg font-semibold">{subStat.value}</span>
                            <span className={`ml-2 text-sm ${
                              subStat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {subStat.change}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                  )}
                </div>
                <div className={`p-3 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
              </div>
              {!stat.subStats && stat.change && (
                <div className="mt-4">
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-600"> vs last month</span>
                </div>
              )}
            </Card>
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