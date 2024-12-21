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
    insight: {
      trend: "Revenue peaked at ₹8,245 on Dec 15th during the festival sale, with lowest performance of ₹2,890 on Nov 28th. Overall showing a consistent 5% month-over-month growth with daily average of ₹6,074.",
      correlation: "Growth primarily driven by 12% increase in Average Order Value (₹1,234 vs ₹1,102 last month) despite 2% decrease in order volume. Premium category sales contributed to 45% of total revenue, up from 32% last period."
    }
  },
  {
    title: "Average Order Value",
    value: "₹1,234",
    change: { value: "12%", trend: "up" as const },
    insight: {
      trend: "AOV reached highest point of ₹1,456 on Dec 16th, with lowest at ₹1,012 on Nov 30th. Maintained above ₹1,200 for 18 days this month, showing 12% improvement from last period's average of ₹1,102.",
      correlation: "Increase attributed to higher premium category conversion (up 25%) and improved product bundling, despite 1% decrease in click-through rate. Cart value optimization resulted in 15% more orders above ₹1,500."
    }
  },
  {
    title: "No of Orders",
    value: "1,345",
    change: { value: "2%", trend: "down" as const },
    insight: {
      trend: "Orders peaked at 82 orders/day on Dec 14th, dropping to 28 orders/day on Nov 29th. Average daily orders decreased from 48 to 45, resulting in a 2% overall decline from previous period.",
      correlation: "Decline correlates with 3% drop in cart completion rate and 1% decrease in click-through rate. However, higher AOV (₹1,234) compensated for volume decrease, maintaining revenue growth."
    }
  },
  {
    title: "Fulfilment %",
    value: "92%",
    change: { value: "8%", trend: "up" as const },
    insight: {
      trend: "Fulfillment rate maintained above 90% for 25 days, reaching peak efficiency of 98% on Dec 12th. Lowest performance was 85% on Nov 25th, with consistent improvement showing 8% growth from last period.",
      correlation: "Improvement directly impacted customer satisfaction scores (up 12%) and repeat purchase rate (up 15%). Enhanced fulfillment contributed to 5% revenue growth through increased customer trust and retention."
    }
  },
  {
    title: "Impressions",
    value: "45,678",
    change: { value: "3%", trend: "up" as const },
    insight: {
      trend: "Daily impressions averaged 45,678, with peak visibility of 62,345 on Dec 15th during campaign period. Lowest point was 32,456 on Nov 27th, showing overall 3% growth in visibility from previous month.",
      correlation: "Increased impressions led to 4% higher Add to Cart actions despite 1% lower click-through rate. SEO improvements contributed to 25% of total impression growth, while paid campaigns drove 75%."
    }
  },
  {
    title: "Clicks",
    value: "5,256",
    change: { value: "1%", trend: "down" as const },
    insight: {
      trend: "Click volume peaked at 312 on Dec 15th, with lowest engagement of 156 on Nov 28th. Average daily clicks decreased from 180 to 175, resulting in 1% overall decline compared to last period.",
      correlation: "Despite lower clicks, conversion to Add to Cart improved by 4% (2,145 vs 2,063), indicating better quality traffic. Click reduction primarily impacted lower-value product categories, minimizing revenue impact."
    }
  },
  {
    title: "Add to Cart",
    value: "2,145",
    change: { value: "4%", trend: "up" as const },
    insight: {
      trend: "Add to Cart actions reached high of 98 on Dec 16th, with lowest count of 45 on Nov 29th. Daily average increased from 68 to 71 actions, showing consistent 4% growth over previous period.",
      correlation: "Growth achieved despite 1% decrease in clicks, indicating improved conversion rate (4.7% vs 4.2% last month). Enhanced product recommendations drove 35% of additional cart additions."
    }
  },
];

const Index = () => {
  const [selectedStat, setSelectedStat] = useState(stats[0].title);
  const [dateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 21),
  });

  const selectedStatData = stats.find(stat => stat.title === selectedStat);

  const getNumberColor = (text: string) => {
    // Check for percentage values
    if (text.includes('%')) {
      const number = parseFloat(text);
      if (text.toLowerCase().includes('decrease') || number < 0) {
        return 'text-red-600';
      }
      if (text.toLowerCase().includes('increase') || number > 0) {
        return 'text-green-600';
      }
      return '';
    }
    // Keep existing logic for non-percentage values
    if (text.startsWith('+')) return 'text-green-600';
    if (text.startsWith('-')) return 'text-red-600';
    return '';
  };

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
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {selectedStatData?.insight.trend.split(' ').map((word, index) => {
                    const color = getNumberColor(word);
                    return (
                      <span key={index} className={color}>
                        {word}{' '}
                      </span>
                    );
                  })}
                </p>
                <p className="text-muted-foreground">
                  {selectedStatData?.insight.correlation.split(' ').map((word, index) => {
                    const color = getNumberColor(word);
                    return (
                      <span key={index} className={color}>
                        {word}{' '}
                      </span>
                    );
                  })}
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
