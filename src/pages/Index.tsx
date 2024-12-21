import DashboardLayout from "@/components/layout/DashboardLayout";
import { KPIContainer } from "@/components/kpi/KPIContainer";
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  PercentIcon, 
  Eye, 
  MousePointerClick, 
  ShoppingBag,
  Users
} from "lucide-react";

const Index = () => {
  const dateRange = {
    from: new Date(2024, 0, 1),
    to: new Date()
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-primary">Analytics Overview</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Track your brand's performance and insights
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPIContainer
            name="Total Revenue"
            value="₹45,231"
            change="+12.5%"
            trend="up"
            icon={DollarSign}
            dateRange={dateRange}
          />
          <KPIContainer
            name="Average Order Value"
            value="₹2,345"
            change="+5.2%"
            trend="up"
            icon={ShoppingCart}
            dateRange={dateRange}
          />
          <KPIContainer
            name="No of Orders"
            value="1,234"
            change="-2.1%"
            trend="down"
            icon={Package}
            dateRange={dateRange}
          />
          <KPIContainer
            name="Fulfilment %"
            value="94.5%"
            change="+1.2%"
            trend="up"
            icon={PercentIcon}
            dateRange={dateRange}
          />
          <KPIContainer
            name="Impressions"
            value="125.4K"
            change="+15.3%"
            trend="up"
            icon={Eye}
            dateRange={dateRange}
          />
          <KPIContainer
            name="Clicks"
            value="45.2K"
            change="+8.7%"
            trend="up"
            icon={MousePointerClick}
            dateRange={dateRange}
          />
          <KPIContainer
            name="Add to Cart"
            value="12.3K"
            change="+6.4%"
            trend="up"
            icon={ShoppingBag}
            dateRange={dateRange}
          />
          <KPIContainer
            name="Sales Distribution"
            icon={Users}
            subStats={[
              { label: "New Customers", value: "65%", change: "+5.2%" },
              { label: "Old Customers", value: "35%", change: "-5.2%" }
            ]}
            dateRange={dateRange}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;