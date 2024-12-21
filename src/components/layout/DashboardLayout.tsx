import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
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
        <div className="flex">
          <Sidebar>
            <SidebarContent>
              <div className="px-6 py-4">
                <h2 className="text-2xl font-semibold text-primary">Pepperfry Analytics</h2>
              </div>
              <SidebarGroup>
                <SidebarGroupContent>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                            location.pathname === item.href
                              ? "bg-primary text-white"
                              : "hover:bg-primary/10"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div className="flex-1">
            <main className="p-8 animate-fade-in">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}