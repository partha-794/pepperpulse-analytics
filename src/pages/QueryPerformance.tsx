import DashboardLayout from "@/components/layout/DashboardLayout";
import { DateRangeDisplay } from "@/components/dashboard/DateRangeDisplay";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const QueryPerformance = () => {
  const [dateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 21),
  });

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
            <DateRangeDisplay
              startDate={dateRange.from}
              endDate={dateRange.to}
            />
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Search Query</TableHead>
                  <TableHead>Query Volume</TableHead>
                  <TableHead>Impressions</TableHead>
                  <TableHead>Brand Count</TableHead>
                  <TableHead>Brand Share</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Click Rate</TableHead>
                  <TableHead>Brand Click Count</TableHead>
                  <TableHead>Brand Click Share</TableHead>
                  <TableHead>Cart Adds</TableHead>
                  <TableHead>Brand Cart Count</TableHead>
                  <TableHead>Brand Cart Share</TableHead>
                  <TableHead>Purchases</TableHead>
                  <TableHead>Purchase Rate</TableHead>
                  <TableHead>Brand Purchase Count</TableHead>
                  <TableHead>Brand Purchase Share</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queryData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.query}</TableCell>
                    <TableCell>{row.queryVolume}</TableCell>
                    <TableCell>{row.impressions}</TableCell>
                    <TableCell>{row.brandCount}</TableCell>
                    <TableCell>{row.brandShare}</TableCell>
                    <TableCell>{row.clicks}</TableCell>
                    <TableCell>{row.clickRate}</TableCell>
                    <TableCell>{row.brandClickCount}</TableCell>
                    <TableCell>{row.brandClickShare}</TableCell>
                    <TableCell>{row.cartAdds}</TableCell>
                    <TableCell>{row.brandCartCount}</TableCell>
                    <TableCell>{row.brandCartShare}</TableCell>
                    <TableCell>{row.purchases}</TableCell>
                    <TableCell>{row.purchaseRate}</TableCell>
                    <TableCell>{row.brandPurchaseCount}</TableCell>
                    <TableCell>{row.brandPurchaseShare}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QueryPerformance;