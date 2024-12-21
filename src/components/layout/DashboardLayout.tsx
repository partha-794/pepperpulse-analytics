import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { BarChart3, Search, Users, UserCircle, Package2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Overview", href: "/", icon: BarChart3 },
  { name: "Query Performance", href: "/query-performance", icon: Search },
  { name: "Demographic", href: "/demographic", icon: Users },
  { name: "Customer Segment", href: "/customer-segment", icon: UserCircle },
  { name: "Inventory", href: "/inventory", icon: Package2 },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-secondary/30">
        <header className="bg-white border-b">
          <div className="max-w-screen-2xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <h2 className="text-2xl font-semibold text-primary">Pepperfry Analytics</h2>
              <nav className="flex space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      location.pathname === item.href
                        ? "bg-primary text-white"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </header>
        <div className="flex-1">
          <main className="p-8 animate-fade-in max-w-screen-2xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}