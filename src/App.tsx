import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QueryPerformance from "./pages/QueryPerformance";
import Demographic from "./pages/Demographic";
import CustomerSegment from "./pages/CustomerSegment";
import Inventory from "./pages/Inventory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/pepperfry-analytics">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/query-performance" element={<QueryPerformance />} />
          <Route path="/demographic" element={<Demographic />} />
          <Route path="/customer-segment" element={<CustomerSegment />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
