
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BrandsAnalytics from "./pages/BrandsAnalytics";
import NotFound from "./pages/NotFound";
import Campaigns from "./pages/Campaigns";
import Experiments from "./pages/Experiments";
import Profiles from "./pages/Profiles";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/brands-analytics" element={<BrandsAnalytics />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/profiles" element={<Profiles />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
