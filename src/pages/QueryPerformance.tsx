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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const totalPurchases = sortedData.reduce(
    (sum, item) => sum + parseInt(item.purchases.replace(/,/g, "")),
    0
  );
  const avgConversionRate = (
    (totalPurchases / totalQueries) *
    100
  ).toFixed(2);

  const avgClickRate = (
    sortedData.reduce(
      (sum, item) => sum + parseFloat(item.clickRate.replace("%", "")),
      0
    ) / sortedData.length
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

        <div className="rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("query")}
                      className="hover:bg-transparent"
                    >
                      Search Query
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("queryVolume")}
                      className="hover:bg-transparent"
                    >
                      Query Volume
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("impressions")}
                      className="hover:bg-transparent"
                    >
                      Impressions
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("brandCount")}
                      className="hover:bg-transparent"
                    >
                      Brand Count
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("brandShare")}
                      className="hover:bg-transparent"
                    >
                      Brand Share
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("clicks")}
                      className="hover:bg-transparent"
                    >
                      Clicks
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("clickRate")}
                      className="hover:bg-transparent"
                    >
                      Click Rate
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("brandClickCount")}
                      className="hover:bg-transparent"
                    >
                      Brand Click Count
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("brandClickShare")}
                      className="hover:bg-transparent"
                    >
                      Brand Click Share
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("cartAdds")}
                      className="hover:bg-transparent"
                    >
                      Cart Adds
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("brandCartCount")}
                      className="hover:bg-transparent"
                    >
                      Brand Cart Count
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("brandCartShare")}
                      className="hover:bg-transparent"
                    >
                      Brand Cart Share
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("purchases")}
                      className="hover:bg-transparent"
                    >
                      Purchases
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("purchaseRate")}
                      className="hover:bg-transparent"
                    >
                      Purchase Rate
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("brandPurchaseCount")}
                      className="hover:bg-transparent"
                    >
                      Brand Purchase Count
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("brandPurchaseShare")}
                      className="hover:bg-transparent"
                    >
                      Brand Purchase Share
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((row, index) => (
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
              <CardTitle className="text-sm font-medium">
                Average Click Rate
              </CardTitle>
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
              <div className="text-2xl font-bold">
                {totalPurchases.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgConversionRate}%</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QueryPerformance;