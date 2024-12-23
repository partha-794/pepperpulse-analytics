import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const OrderMilestonesChart = () => {
  const data = {
    labels: [
      'Order Received',
      'Order Processed',
      'Order Packed',
      'Ready for Dispatch',
      'In Transit',
      'Out for Delivery',
      'Delivered',
      'Failed Delivery Attempt',
      'Cancelled',
      'Returned',
      'Refunded'
    ],
    datasets: [{
      data: [150, 130, 120, 100, 80, 60, 500, 20, 30, 25, 15],
      backgroundColor: [
        '#4f46e5', // indigo-600
        '#6366f1', // indigo-500
        '#818cf8', // indigo-400
        '#a5b4fc', // indigo-300
        '#c7d2fe', // indigo-200
        '#e0e7ff', // indigo-100
        '#22c55e', // green-500
        '#f43f5e', // rose-500
        '#64748b', // slate-500
        '#f59e0b', // amber-500
        '#ef4444', // red-500
      ],
      borderWidth: 1
    }]
  };

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Order Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <Pie data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};