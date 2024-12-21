import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DateRangeDisplay } from "@/components/dashboard/DateRangeDisplay";
import { KPIContainer } from "@/components/kpi/KPIContainer";
import { KPIPerformanceCharts } from "@/components/kpi/KPIPerformanceCharts";
import { useState } from "react";
import { DollarSign, ShoppingCart, Percent, TrendingUp, TrendingDown, ArrowUp } from "lucide-react";

const stats = [
  {
    title: "Active Users",
    value: "8,234",
    change: { value: "5%", trend: "up" as const },
  },
  {
    title: "New Users",
    value: "1,234",
    change: { value: "12%", trend: "up" as const },
  },
  {
    title: "Spends",
    value: "$12,345",
    change: { value: "2%", trend: "down" as const },
  },
  {
    title: "Clicks",
    value: "45,678",
    change: { value: "8%", trend: "up" as const },
  },
];

const Index = () => {
  const [selectedStat, setSelectedStat] = useState(stats[0].title);
  const [dateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 21),
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-primary">Analytics Overview</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Track your brand's performance and insights
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              onClick={() => setSelectedStat(stat.title)}
              className="cursor-pointer"
            >
              <StatsCard
                {...stat}
                isSelected={selectedStat === stat.title}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <DateRangeDisplay
              startDate={dateRange.from}
              endDate={dateRange.to}
            />

            {selectedStat && (
              <KPIPerformanceCharts
                kpiName={selectedStat}
                dateRange={dateRange}
              />
            )}
          </div>
          
          <div className="space-y-4">
            <KPIContainer
              name="Total Revenue"
              value="₹45,231"
              change="+12%"
              trend="up"
              icon={DollarSign}
              dateRange={dateRange}
            />
            <KPIContainer
              name="Orders"
              value="1,234"
              change="+8%"
              trend="up"
              icon={ShoppingCart}
              dateRange={dateRange}
            />
            <KPIContainer
              name="Conversion Rate"
              value="3.2%"
              change="-2%"
              trend="down"
              icon={Percent}
              dateRange={dateRange}
            />
            <KPIContainer
              name="Average Order Value"
              value="₹2,450"
              change="+5%"
              trend="up"
              icon={TrendingUp}
              dateRange={dateRange}
            />
            <KPIContainer
              name="Returns"
              value="124"
              change="-15%"
              trend="down"
              icon={TrendingDown}
              dateRange={dateRange}
            />
            <KPIContainer
              name="Customer Satisfaction"
              value="4.5/5"
              change="+0.3"
              trend="up"
              icon={ArrowUp}
              dateRange={dateRange}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;