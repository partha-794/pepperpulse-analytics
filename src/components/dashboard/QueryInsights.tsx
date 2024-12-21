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
    </div>
  );
};