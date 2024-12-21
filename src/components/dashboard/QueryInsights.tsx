import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QueryInsightsProps {
  totalQueries: number;
  totalImpressions: number;
  totalClicks: number;
  totalCartAdds: number;
  totalPurchases: number;
  avgClickRate: number;
  avgConversionRate: number;
}

export const QueryInsights = ({
  totalQueries,
  totalImpressions,
  totalClicks,
  totalCartAdds,
  totalPurchases,
  avgClickRate,
  avgConversionRate
}: QueryInsightsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Key Insights</h2>
      
      <div className="prose max-w-none space-y-4 text-muted-foreground">
        <p>
          Analysis of search behavior shows a total of {totalQueries.toLocaleString()} queries, 
          generating {totalImpressions.toLocaleString()} impressions. This indicates significant 
          user interest in home decor items across the platform.
        </p>
        
        <p>
          From these impressions, {totalClicks.toLocaleString()} clicks were recorded with an 
          average click-through rate of {avgClickRate}%. This engagement led to 
          {totalCartAdds.toLocaleString()} cart additions, showing strong user intent to purchase.
        </p>
        
        <p>
          The funnel culminated in {totalPurchases.toLocaleString()} successful purchases, 
          achieving a conversion rate of {avgConversionRate}% from cart additions to final purchases. 
          This suggests an effective product discovery and purchase journey for home decor items.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQueries.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Click Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgClickRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPurchases.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgConversionRate}%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};