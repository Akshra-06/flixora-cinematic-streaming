import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import { MoviesPage, TVShowsPage, BrowseAllPage } from "./pages/Browse.tsx";
import Detail from "./pages/Detail.tsx";
import Watch from "./pages/Watch.tsx";
import Profiles from "./pages/Profiles.tsx";
import Account from "./pages/Account.tsx";
import Help from "./pages/Help.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv-shows" element={<TVShowsPage />} />
          <Route path="/browse" element={<BrowseAllPage />} />
          <Route path="/title/:id" element={<Detail />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/account" element={<Account />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
