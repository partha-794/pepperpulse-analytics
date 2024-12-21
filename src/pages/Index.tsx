import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DateRangeDisplay } from "@/components/dashboard/DateRangeDisplay";
import { KPIPerformanceCharts } from "@/components/kpi/KPIPerformanceCharts";
import { useState } from "react";

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
  {
    title: "Average Order Value",
    value: "$256",
    change: { value: "3%", trend: "up" as const },
  },
  {
    title: "Returns",
    value: "234",
    change: { value: "1%", trend: "down" as const },
  },
  {
    title: "Customer Satisfaction",
    value: "4.8/5",
    change: { value: "4%", trend: "up" as const },
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

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
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
    </DashboardLayout>
  );
};

export default Index;