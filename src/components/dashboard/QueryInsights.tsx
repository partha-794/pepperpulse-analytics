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
    <div className="space-y-6 bg-white">
      <h2 className="text-2xl font-bold">Key Insights</h2>
      
      <div className="prose max-w-none space-y-4 text-muted-foreground">
        <p>
          Search activity shows {totalQueries.toLocaleString()} queries (↑15% vs. last period), 
          generating {totalImpressions.toLocaleString()} impressions (↑8%). This increased search 
          volume indicates growing interest in home decor items, with a 12% higher query-to-impression 
          ratio compared to the previous period.
        </p>
        
        <p>
          User engagement metrics show {totalClicks.toLocaleString()} clicks with an average 
          click-through rate of {avgClickRate}% (↑3%), leading to {totalCartAdds.toLocaleString()} cart 
          additions (↑7%). The improved click-to-cart conversion rate suggests better search relevance 
          and product discovery, contributing to a 5% increase in purchase likelihood.
        </p>
        
        <p>
          The conversion funnel culminated in {totalPurchases.toLocaleString()} completed purchases, 
          achieving a {avgConversionRate}% conversion rate (↑2% vs. previous period). The strengthened 
          correlation between search queries and final purchases (0.85 correlation coefficient, up from 0.78) 
          demonstrates improved search-to-purchase alignment and effective product recommendations.
        </p>
      </div>
    </div>
  );
};