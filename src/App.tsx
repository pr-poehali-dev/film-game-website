import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import MarvelPage from "@/pages/MarvelPage";
import PlayerPage from "@/pages/PlayerPage";
import GamesPage from "@/pages/GamesPage";
import SubscriptionPage from "@/pages/SubscriptionPage";
import ProfilePage from "@/pages/ProfilePage";
import SupportPage from "@/pages/SupportPage";
import { Movie } from "@/data/movies";

const queryClient = new QueryClient();

type Page = "home" | "catalog" | "marvel" | "player" | "games" | "subscription" | "profile" | "support";

const App = () => {
  const [page, setPage] = useState<Page>("home");
  const [selectedFilm, setSelectedFilm] = useState<Movie | undefined>(undefined);

  const navigate = (to: string, data?: unknown) => {
    setPage(to as Page);
    if (data) setSelectedFilm(data as Movie);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNavigate={navigate} />;
      case "catalog": return <CatalogPage onNavigate={navigate} />;
      case "marvel": return <MarvelPage onNavigate={navigate} />;
      case "player": return <PlayerPage film={selectedFilm} onNavigate={navigate} />;
      case "games": return <GamesPage onNavigate={navigate} />;
      case "subscription": return <SubscriptionPage onNavigate={navigate} />;
      case "profile": return <ProfilePage onNavigate={navigate} />;
      case "support": return <SupportPage />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div style={{ minHeight: '100vh', background: 'var(--dark-bg)' }}>
          <Navbar currentPage={page} onNavigate={navigate} />
          <main key={page} className="animate-fade-in">
            {renderPage()}
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
