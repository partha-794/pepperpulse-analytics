import { Calendar } from "lucide-react";

interface DateRangeDisplayProps {
  startDate: Date;
  endDate: Date;
}

export const DateRangeDisplay = ({ startDate, endDate }: DateRangeDisplayProps) => {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Showing data from {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
      </p>
      <div className="flex gap-4">
        <div className="inline-flex items-center rounded-md border px-4 py-2">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{startDate.toLocaleDateString()}</span>
        </div>
        <div className="inline-flex items-center rounded-md border px-4 py-2">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{endDate.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};