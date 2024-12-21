import DashboardLayout from "@/components/layout/DashboardLayout";
import { KPIContainer } from "@/components/kpi/KPIContainer";
import { Users, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Card } from "@/components/ui/card";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerSegment = () => {
  const [date, setDate] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const pieChartData = {
    labels: ['Top Tier', 'Promising', 'At Risk', 'Hibernating'],
    datasets: [
      {
        data: [2543, 12854, 5399, 2798],
        backgroundColor: [
          'rgb(67, 56, 202)',
          'rgb(99, 102, 241)',
          'rgb(129, 140, 248)',
          'rgb(199, 210, 254)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '0%',
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Segments</h1>
            <p className="text-muted-foreground mt-2">
              Track customer segments and their performance metrics
            </p>
          </div>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPIContainer
            name="Total Customers"
            icon={Users}
            value="23,594"
            change="+1.61%"
            trend="up"
            dateRange={{ from: date.from!, to: date.to! }}
          />
          <KPIContainer
            name="Top Tier Customers"
            icon={Users}
            value="2,543"
            change="+2.22%"
            trend="up"
            dateRange={{ from: date.from!, to: date.to! }}
          />
          <KPIContainer
            name="Promising Customers"
            icon={Users}
            value="12,854"
            change="+1.25%"
            trend="up"
            dateRange={{ from: date.from!, to: date.to! }}
          />
          <KPIContainer
            name="At Risk Customers"
            icon={Users}
            value="5,399"
            change="+1.44%"
            trend="up"
            dateRange={{ from: date.from!, to: date.to! }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Customer Segments Distribution</h3>
            <div className="relative h-[300px]">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
            <div className="mt-6 space-y-3">
              {pieChartData.labels.map((label, index) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: pieChartData.datasets[0].backgroundColor[index] }}
                    />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {((pieChartData.datasets[0].data[index] / 23594) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Segment Insights</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">New & Potential Customers</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">New Customers</span>
                    <span className="text-sm font-medium">373</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Orders</span>
                    <span className="text-sm font-medium">410</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sales</span>
                    <span className="text-sm font-medium">₹7,385.40</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Repeat Customers</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Customers</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">2,769</span>
                      <span className="text-xs text-green-600">+6.42%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Repeat Purchase Rate</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">6.12%</span>
                      <span className="text-xs text-green-600">+2.34%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Purchase Interval</span>
                    <span className="text-sm font-medium">45 days</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerSegment;