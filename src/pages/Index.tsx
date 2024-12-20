import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { TrendingUp, TrendingDown, Users, ShoppingBag } from "lucide-react";

const stats = [
  {
    name: "Total Sales",
    value: "₹2.4M",
    change: "+12.3%",
    trend: "up",
    icon: ShoppingBag,
  },
  {
    name: "Active Users",
    value: "11.5K",
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
  {
    name: "Conversion Rate",
    value: "3.2%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingDown,
  },
  {
    name: "Avg. Order Value",
    value: "₹2,854",
    change: "+4.5%",
    trend: "up",
    icon: TrendingUp,
  },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-primary-900">Analytics Overview</h1>
          <p className="mt-2 text-lg text-gray-600">Track your brand's performance and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.name} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${
                  stat.trend === "up" ? "bg-green-100" : "bg-red-100"
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`} />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600"> vs last month</span>
              </div>
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