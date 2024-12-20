import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { format, subMonths, eachDayOfInterval, eachMonthOfInterval, startOfMonth } from "date-fns";

interface KPIPerformanceChartsProps {
  kpiName: string;
  dateRange: { from: Date; to: Date };
  className?: string;
}

export const KPIPerformanceCharts = ({ kpiName, dateRange, className }: KPIPerformanceChartsProps) => {
  console.log(`Rendering charts for KPI: ${kpiName}`);

  // Generate sample data based on KPI type
  const generateSampleData = (kpiType: string, value: number) => {
    switch (kpiType) {
      case "Total Revenue":
        return Math.floor(Math.random() * 10000) + value;
      case "No of Orders":
        return Math.floor(Math.random() * 100) + value;
      case "Average Order Value":
        return Math.floor(Math.random() * 1000) + value;
      case "Fulfilment %":
        return Math.min(100, Math.floor(Math.random() * 20) + 80);
      case "Impressions":
        return Math.floor(Math.random() * 5000) + value;
      case "Clicks":
        return Math.floor(Math.random() * 1000) + value;
      case "Add to Cart":
        return Math.floor(Math.random() * 200) + value;
      default:
        return Math.floor(Math.random() * 1000) + value;
    }
  };

  // Generate daily data for the selected date range
  const dailyData = eachDayOfInterval({ start: dateRange.from, end: dateRange.to })
    .map(date => ({
      date: format(date, "MMM dd"),
      value: generateSampleData(kpiName, 0)
    }));

  // Generate monthly data for the last 5 months
  const monthlyData = eachMonthOfInterval({
    start: subMonths(startOfMonth(new Date()), 4),
    end: new Date()
  }).map(date => ({
    date: format(date, "MMM yyyy"),
    value: generateSampleData(kpiName, 0)
  }));

  const formatValue = (value: number) => {
    switch (kpiName) {
      case "Total Revenue":
        return `₹${value.toLocaleString()}`;
      case "Fulfilment %":
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  return (
    <div className={className}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Daily {kpiName} Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={{}}>
              <LineChart data={dailyData}>
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatValue}
                />
                <ChartTooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8B4513"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Monthly {kpiName} Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={{}}>
              <BarChart data={monthlyData}>
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatValue}
                />
                <ChartTooltip />
                <Bar
                  dataKey="value"
                  fill="#8B4513"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};