import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { format, subMonths, eachDayOfInterval, eachMonthOfInterval, startOfMonth } from "date-fns";
import { OrderMilestonesChart } from "../charts/OrderMilestonesChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface KPIPerformanceChartsProps {
  kpiName: string;
  dateRange: { from: Date; to: Date };
  className?: string;
}

// Sample product titles
const productTitles = [
  "All Products",
  "Dining Chair",
  "Coffee Table",
  "Bed Frame",
  "Sofa Set",
  "Study Table",
  "Wardrobe",
];

export const KPIPerformanceCharts = ({ kpiName, dateRange, className }: KPIPerformanceChartsProps) => {
  console.log(`Rendering charts for KPI: ${kpiName}`);

  // Generate sample data based on KPI type and product
  const generateSampleData = (kpiType: string, value: number, productTitle: string) => {
    const baseValue = productTitle === "All Products" ? value : value / 2;
    
    switch (kpiType) {
      case "Total Revenue":
        return Math.floor(Math.random() * 10000) + baseValue;
      case "No of Orders":
        return Math.floor(Math.random() * 100) + baseValue;
      case "Average Order Value":
        return Math.floor(Math.random() * 1000) + baseValue;
      case "Fulfilment %":
        return Math.min(100, Math.floor(Math.random() * 20) + 80);
      case "Impressions":
        return Math.floor(Math.random() * 5000) + baseValue;
      case "Clicks":
        return Math.floor(Math.random() * 1000) + baseValue;
      case "Add to Cart":
        return Math.floor(Math.random() * 200) + baseValue;
      default:
        return Math.floor(Math.random() * 1000) + baseValue;
    }
  };

  // Generate daily data for the selected date range and product
  const generateDailyData = (productTitle: string) => {
    return eachDayOfInterval({ start: dateRange.from, end: dateRange.to })
      .map(date => ({
        date: format(date, "yyyy-MM-dd"),
        value: generateSampleData(kpiName, 0, productTitle)
      }));
  };

  // Generate monthly data for the last 5 months and product
  const generateMonthlyData = (productTitle: string) => {
    return eachMonthOfInterval({
      start: subMonths(startOfMonth(new Date()), 4),
      end: new Date()
    }).map(date => ({
      date: format(date, "MMM"),
      value: generateSampleData(kpiName, 0, productTitle)
    }));
  };

  const [selectedDailyProduct, setSelectedDailyProduct] = React.useState("All Products");
  const [selectedMonthlyProduct, setSelectedMonthlyProduct] = React.useState("All Products");

  const dailyData = generateDailyData(selectedDailyProduct);
  const monthlyData = generateMonthlyData(selectedMonthlyProduct);

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

  const getYAxisDomain = () => {
    const maxValue = Math.max(
      ...dailyData.map(item => item.value),
      ...monthlyData.map(item => item.value)
    );
    const step = Math.ceil(maxValue / 5);
    return [0, Math.ceil(maxValue / step) * step];
  };

  return (
    <div className={className}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                {kpiName} Day on Day
              </CardTitle>
              <Select value={selectedDailyProduct} onValueChange={setSelectedDailyProduct}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {productTitles.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData} margin={{ top: 10, right: 30, left: 60, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => format(new Date(value), "MM-dd")}
                    interval={Math.ceil(dailyData.length / 7)}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatValue}
                    domain={getYAxisDomain()}
                    padding={{ top: 20, bottom: 20 }}
                  />
                  <ChartTooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1f2937"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                {kpiName} Month on Month
              </CardTitle>
              <Select value={selectedMonthlyProduct} onValueChange={setSelectedMonthlyProduct}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {productTitles.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={monthlyData} 
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 60, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} />
                  <XAxis
                    type="number"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatValue}
                    domain={getYAxisDomain()}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={50}
                  />
                  <ChartTooltip />
                  <Bar
                    dataKey="value"
                    fill="#1f2937"
                    radius={[0, 4, 4, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {kpiName === "Fulfilment %" && <OrderMilestonesChart />}
      </div>
    </div>
  );
};