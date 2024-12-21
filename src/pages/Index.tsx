import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DateRangeDisplay } from "@/components/dashboard/DateRangeDisplay";
import { KPIPerformanceCharts } from "@/components/kpi/KPIPerformanceCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹1,82,234",
    change: { value: "5%", trend: "up" as const },
    insight: "Increased revenue driven by successful festival season campaign and higher average order values."
  },
  {
    title: "Average Order Value",
    value: "₹1,234",
    change: { value: "12%", trend: "up" as const },
    insight: "Premium product categories showing strong performance, contributing to higher average basket size."
  },
  {
    title: "No of Orders",
    value: "1,345",
    change: { value: "2%", trend: "down" as const },
    insight: "Slight decrease in order volume due to temporary website performance issues during peak hours."
  },
  {
    title: "Fulfilment %",
    value: "92%",
    change: { value: "8%", trend: "up" as const },
    insight: "Improved warehouse efficiency and new delivery partner integrations boosting fulfillment rates."
  },
  {
    title: "Impressions",
    value: "45,678",
    change: { value: "3%", trend: "up" as const },
    insight: "Enhanced SEO optimization and increased social media presence driving higher visibility."
  },
  {
    title: "Clicks",
    value: "5,256",
    change: { value: "1%", trend: "down" as const },
    insight: "Minor decrease in click-through rate, potentially due to increased competition in paid search."
  },
  {
    title: "Add to Cart",
    value: "2,145",
    change: { value: "4%", trend: "up" as const },
    insight: "Improved product recommendations and UI optimizations leading to better conversion at cart stage."
  },
];

const Index = () => {
  const [selectedStat, setSelectedStat] = useState(stats[0].title);
  const [dateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 21),
  });

  const selectedStatData = stats.find(stat => stat.title === selectedStat);

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
          <>
            <KPIPerformanceCharts
              kpiName={selectedStat}
              dateRange={dateRange}
            />
            
            {/* Insights Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>Performance Insights</span>
                  {selectedStatData?.change.trend === 'up' ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {selectedStatData?.insight}
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Index;