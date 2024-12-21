import DashboardLayout from "@/components/layout/DashboardLayout";
import { DateRangeDisplay } from "@/components/dashboard/DateRangeDisplay";
import { QueryTable } from "@/components/dashboard/QueryTable";
import { QueryInsights } from "@/components/dashboard/QueryInsights";
import { useState } from "react";

const queryData = [
  {
    query: "modern wall decor",
    queryVolume: "14,789",
    impressions: "182,345",
    brandCount: "8,234",
    brandShare: "5.89%",
    clicks: "15,678",
    clickRate: "8.54%",
    brandClickCount: "945",
    brandClickShare: "6.87%",
    cartAdds: "1,234",
    brandCartCount: "89",
    brandCartShare: "7.21%",
    purchases: "456",
    purchaseRate: "36.95%",
    brandPurchaseCount: "42",
    brandPurchaseShare: "9.21%",
  },
  {
    query: "decorative pillows",
    queryVolume: "12,567",
    impressions: "165,432",
    brandCount: "7,890",
    brandShare: "4.77%",
    clicks: "13,456",
    clickRate: "8.13%",
    brandClickCount: "876",
    brandClickShare: "6.51%",
    cartAdds: "1,098",
    brandCartCount: "76",
    brandCartShare: "6.92%",
    purchases: "389",
    purchaseRate: "35.43%",
    brandPurchaseCount: "35",
    brandPurchaseShare: "9.00%",
  },
  {
    query: "table lamps",
    queryVolume: "11,234",
    impressions: "145,678",
    brandCount: "6,789",
    brandShare: "4.66%",
    clicks: "12,345",
    clickRate: "8.47%",
    brandClickCount: "798",
    brandClickShare: "6.46%",
    cartAdds: "987",
    brandCartCount: "68",
    brandCartShare: "6.89%",
    purchases: "345",
    purchaseRate: "34.95%",
    brandPurchaseCount: "31",
    brandPurchaseShare: "8.99%",
  },
];

type SortConfig = {
  key: keyof typeof queryData[0] | null;
  direction: "asc" | "desc";
};

const QueryPerformance = () => {
  const [dateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 21),
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  const handleSort = (key: keyof typeof queryData[0]) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = [...queryData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key].replace(/[,%]/g, "");
    const bValue = b[sortConfig.key].replace(/[,%]/g, "");

    const comparison = isNaN(Number(aValue))
      ? aValue.localeCompare(bValue)
      : Number(aValue) - Number(bValue);

    return sortConfig.direction === "asc" ? comparison : -comparison;
  });

  // Calculate insights
  const totalQueries = sortedData.reduce(
    (sum, item) => sum + parseInt(item.queryVolume.replace(/,/g, "")),
    0
  );
  const totalImpressions = sortedData.reduce(
    (sum, item) => sum + parseInt(item.impressions.replace(/,/g, "")),
    0
  );
  const totalClicks = sortedData.reduce(
    (sum, item) => sum + parseInt(item.clicks.replace(/,/g, "")),
    0
  );
  const totalCartAdds = sortedData.reduce(
    (sum, item) => sum + parseInt(item.cartAdds.replace(/,/g, "")),
    0
  );
  const totalPurchases = sortedData.reduce(
    (sum, item) => sum + parseInt(item.purchases.replace(/,/g, "")),
    0
  );
  const avgClickRate = (
    sortedData.reduce(
      (sum, item) => sum + parseFloat(item.clickRate.replace("%", "")),
      0
    ) / sortedData.length
  ).toFixed(2);
  const avgConversionRate = (
    (totalPurchases / totalQueries) *
    100
  ).toFixed(2);

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary">Query Performance</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Track search query metrics and performance
            </p>
          </div>
          <div className="flex-shrink-0">
            <DateRangeDisplay startDate={dateRange.from} endDate={dateRange.to} />
          </div>
        </div>

        <QueryTable data={sortedData} onSort={handleSort} />

        <QueryInsights
          totalQueries={totalQueries}
          totalImpressions={totalImpressions}
          totalClicks={totalClicks}
          totalCartAdds={totalCartAdds}
          totalPurchases={totalPurchases}
          avgClickRate={parseFloat(avgClickRate)}
          avgConversionRate={parseFloat(avgConversionRate)}
        />
      </div>
    </DashboardLayout>
  );
};

export default QueryPerformance;
