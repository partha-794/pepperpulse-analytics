import DashboardLayout from "@/components/layout/DashboardLayout";
import { KPIContainer } from "@/components/kpi/KPIContainer";
import { Users, MapPin, UserCircle } from "lucide-react";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { Card } from "@/components/ui/card";

const Demographic = () => {
  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date()
  });

  console.log("Date range selected:", date);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Demographics</h1>
            <p className="text-muted-foreground mt-2">
              Analyze customer demographics across age groups, locations, and gender.
            </p>
          </div>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <KPIContainer
            name="Age Distribution"
            icon={Users}
            value="32.5"
            change="+2.1%"
            trend="up"
            dateRange={date}
            subStats={[
              { label: "18-24", value: "25%", change: "+3.2%" },
              { label: "25-34", value: "35%", change: "+1.8%" },
              { label: "35-44", value: "22%", change: "-0.5%" },
              { label: "45+", value: "18%", change: "-0.8%" }
            ]}
          />

          <KPIContainer
            name="Top Locations"
            icon={MapPin}
            value="Mumbai"
            change="+15.3%"
            trend="up"
            dateRange={date}
            subStats={[
              { label: "Mumbai", value: "28%", change: "+2.1%" },
              { label: "Delhi", value: "22%", change: "+1.5%" },
              { label: "Bangalore", value: "18%", change: "+3.2%" },
              { label: "Hyderabad", value: "12%", change: "+0.8%" }
            ]}
          />

          <KPIContainer
            name="Gender Distribution"
            icon={UserCircle}
            value="52% F"
            change="+3.2%"
            trend="up"
            dateRange={date}
            subStats={[
              { label: "Female", value: "52%", change: "+3.2%" },
              { label: "Male", value: "47%", change: "-2.8%" },
              { label: "Other", value: "1%", change: "+0.4%" }
            ]}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                The 25-34 age group continues to be our largest demographic at 35%, 
                showing steady growth with a 1.8% increase from the previous period.
              </p>
              <p>
                Mumbai leads user concentration with 28% of total users, followed by 
                Delhi (22%) and Bangalore (18%). Tier 2 cities show promising growth.
              </p>
              <p>
                Female users now represent 52% of our user base, marking a significant 
                3.2% increase. This shift aligns with our recent marketing initiatives.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Demographic;