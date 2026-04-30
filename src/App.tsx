import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import V2 from "./pages/V2";
import LiefBlocks from "./pages/LiefBlocks";
import ProjectsPage from "./pages/ProjectsPage";
import TeamPage from "./pages/TeamPage";
import AIPage from "./pages/AIPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import WhatIsSABS from "./pages/WhatIsSABS";
import SabsVsIcf from "./pages/SabsVsIcf";
import BestIcfAlternativeFire from "./pages/BestIcfAlternativeFire";
import OwnersRepArizona from "./pages/OwnersRepArizona";
import { ContactModalProvider } from "@/contexts/ContactModalContext";
import ContactModal from "@/components/v2/ContactModal";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ContactModalProvider>
          <Routes>
            <Route path="/" element={<V2 />} />
            <Route path="/v1" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/sabs" element={<LiefBlocks />} />
            <Route path="/liefblocks" element={<LiefBlocks />} />
            <Route path="/ai" element={<AIPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/learn/what-is-sabs-construction" element={<WhatIsSABS />} />
            <Route path="/learn/sabs-vs-icf" element={<SabsVsIcf />} />
            <Route path="/learn/best-icf-alternative-fire-resistant" element={<BestIcfAlternativeFire />} />
            <Route path="/learn/owners-rep-alternative-building-systems-arizona" element={<OwnersRepArizona />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ContactModal />
        </ContactModalProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
