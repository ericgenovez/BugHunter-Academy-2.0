import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "@/contexts/GameContext";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Missions from "./pages/Missions";
import FunctionalTests from "./pages/FunctionalTests";
import ApiTester from "./pages/ApiTester";
import Reports from "./pages/Reports";
// import Challenges from "./pages/Challenges";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GameProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/missions" element={<Missions />} />
              <Route path="/functional-tests" element={<FunctionalTests />} />
              <Route path="/api-tester" element={<ApiTester />} />
              <Route path="/reports" element={<Reports />} />
              {/* <Route path="/challenges" element={<Challenges />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </GameProvider>
  </QueryClientProvider>
);

export default App;
