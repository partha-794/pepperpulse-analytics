import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DateRangeDisplay } from "@/components/dashboard/DateRangeDisplay";
import { KPIPerformanceCharts } from "@/components/kpi/KPIPerformanceCharts";
import { useState } from "react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹1,82,234",
    change: { value: "5%", trend: "up" as const },
  },
  {
    title: "Average Order Value",
    value: "₹1,234",
    change: { value: "12%", trend: "up" as const },
  },
  {
    title: "No of Orders",
    value: "1,345",
    change: { value: "2%", trend: "down" as const },
  },
  {
    title: "Fulfilment %",
    value: "92%",
    change: { value: "8%", trend: "up" as const },
  },
  {
    title: "Impressions",
    value: "45,678",
    change: { value: "3%", trend: "up" as const },
  },
  {
    title: "Clicks",
    value: "5,256",
    change: { value: "1%", trend: "down" as const },
  },
  {
    title: "Add to Cart",
    value: "2,145",
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
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-primary">Analytics Overview</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Track your brand's performance and insights
              </p>
            </div>
            <div className="flex-shrink-0">
              <DateRangeDisplay
                startDate={dateRange.from}
                endDate={dateRange.to}
              />
            </div>
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
        </div>

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