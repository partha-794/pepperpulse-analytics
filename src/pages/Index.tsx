import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Package2 } from "lucide-react";
import { KPIContainer } from "@/components/kpi/KPIContainer";

const Index = () => {
  const dateRange = {
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 31),
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-primary">Dashboard Overview</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Monitor key performance indicators and trends
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPIContainer
            name="Total Revenue"
            value="₹2.4M"
            change="+12.5%"
            trend="up"
            icon={BarChart3}
            dateRange={dateRange}
          />
          <KPIContainer
            name="Order Growth"
            value="1.2K"
            change="+8.2%"
            trend="up"
            icon={TrendingUp}
            dateRange={dateRange}
          />
          <KPIContainer
            name="Active Users"
            value="45.2K"
            change="+5.1%"
            trend="up"
            icon={Users}
            dateRange={dateRange}
          />
          <KPIContainer
            name="Inventory Value"
            value="₹1.8M"
            change="-2.3%"
            trend="down"
            icon={Package2}
            dateRange={dateRange}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-muted-foreground">
              View your dashboard sections using the navigation menu above.
            </p>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <p className="text-muted-foreground">
              Navigate to specific sections using the top navigation bar.
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;