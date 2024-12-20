import { useState } from "react";
import { Card } from "@/components/ui/card";
import { KPIPerformanceCharts } from "./KPIPerformanceCharts";
import { cn } from "@/lib/utils";

interface KPIContainerProps {
  name: string;
  value: string;
  change?: string;
  trend?: string;
  icon: React.ComponentType<{ className?: string }>;
  subStats?: { label: string; value: string; change: string }[];
  dateRange?: { from: Date; to: Date };
}

export const KPIContainer = ({ 
  name, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  subStats,
  dateRange 
}: KPIContainerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <Card 
        className={cn(
          "p-6 hover:shadow-lg transition-shadow cursor-pointer",
          isExpanded && "ring-2 ring-primary"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{name}</p>
            {subStats ? (
              <div className="mt-2 space-y-1">
                {subStats.map((subStat) => (
                  <div key={subStat.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{subStat.label}:</span>
                    <div>
                      <span className="text-lg font-semibold">{subStat.value}</span>
                      <span className={`ml-2 text-sm ${
                        subStat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {subStat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
            )}
          </div>
          <div className={`p-3 rounded-full ${
            trend === 'up' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <Icon className={`w-6 h-6 ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`} />
          </div>
        </div>
        {!subStats && change && (
          <div className="mt-4">
            <span className={`text-sm font-medium ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {change}
            </span>
            <span className="text-sm text-gray-600"> vs last month</span>
          </div>
        )}
      </Card>
      
      {isExpanded && dateRange && (
        <KPIPerformanceCharts 
          kpiName={name} 
          dateRange={dateRange}
          className="animate-fade-in"
        />
      )}
    </div>
  );
};