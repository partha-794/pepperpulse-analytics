import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    trend: "up" | "down";
  };
  isSelected?: boolean;
}

export const StatsCard = ({ title, value, change, isSelected }: StatsCardProps) => {
  return (
    <Card 
      className={cn(
        "p-6 transition-all hover:shadow-md",
        isSelected && "ring-2 ring-primary"
      )}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-muted-foreground">
            {title}
          </h3>
          <div className={cn(
            "flex items-center text-sm",
            change.trend === "up" ? "text-green-600" : "text-red-600"
          )}>
            {change.trend === "up" ? (
              <ArrowUpIcon className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="mr-1 h-4 w-4" />
            )}
            {change.value}
          </div>
        </div>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </Card>
  );
};