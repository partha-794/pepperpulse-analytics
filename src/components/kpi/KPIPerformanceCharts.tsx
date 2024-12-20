import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { format, subMonths, eachDayOfInterval, eachMonthOfInterval, startOfMonth } from "date-fns";

interface KPIPerformanceChartsProps {
  kpiName: string;
  dateRange: { from: Date; to: Date };
  className?: string;
}

export const KPIPerformanceCharts = ({ kpiName, dateRange, className }: KPIPerformanceChartsProps) => {
  // Generate sample daily data for the selected date range
  const dailyData = eachDayOfInterval({ start: dateRange.from, end: dateRange.to })
    .map(date => ({
      date: format(date, "MMM dd"),
      value: Math.floor(Math.random() * 1000)
    }));

  // Generate sample monthly data for the last 5 months
  const monthlyData = eachMonthOfInterval({
    start: subMonths(startOfMonth(new Date()), 4),
    end: new Date()
  }).map(date => ({
    date: format(date, "MMM yyyy"),
    value: Math.floor(Math.random() * 5000)
  }));

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
                  tickFormatter={(value) => `${value}`}
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
              <LineChart data={monthlyData}>
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
                  tickFormatter={(value) => `${value}`}
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
      </div>
    </div>
  );
};