import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface QueryTableProps {
  data: any[];
  onSort: (key: string) => void;
}

export const QueryTable = ({ data, onSort }: QueryTableProps) => {
  return (
    <div className="rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">
                <Button
                  variant="ghost"
                  onClick={() => onSort("query")}
                  className="hover:bg-transparent"
                >
                  Search Query
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("queryVolume")}
                  className="hover:bg-transparent"
                >
                  Query Volume
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("impressions")}
                  className="hover:bg-transparent"
                >
                  Impressions
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("brandCount")}
                  className="hover:bg-transparent"
                >
                  Brand Count
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("brandShare")}
                  className="hover:bg-transparent"
                >
                  Brand Share
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("clicks")}
                  className="hover:bg-transparent"
                >
                  Clicks
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("clickRate")}
                  className="hover:bg-transparent"
                >
                  Click Rate
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("brandClickCount")}
                  className="hover:bg-transparent"
                >
                  Brand Click Count
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("brandClickShare")}
                  className="hover:bg-transparent"
                >
                  Brand Click Share
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("cartAdds")}
                  className="hover:bg-transparent"
                >
                  Cart Adds
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("brandCartCount")}
                  className="hover:bg-transparent"
                >
                  Brand Cart Count
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("brandCartShare")}
                  className="hover:bg-transparent"
                >
                  Brand Cart Share
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("purchases")}
                  className="hover:bg-transparent"
                >
                  Purchases
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("purchaseRate")}
                  className="hover:bg-transparent"
                >
                  Purchase Rate
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("brandPurchaseCount")}
                  className="hover:bg-transparent"
                >
                  Brand Purchase Count
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort("brandPurchaseShare")}
                  className="hover:bg-transparent"
                >
                  Brand Purchase Share
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
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
  );
};
