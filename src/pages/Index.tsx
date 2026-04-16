import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { ContentRow } from "@/components/ContentRow";
import { Footer } from "@/components/Footer";
import { SmartSearch } from "@/components/SmartSearch";
import { trendingMovies, topRated, actionMovies, comedyMovies, recentlyAdded } from "@/data/movies";

const Index = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearchToggle={() => setSearchOpen(true)} />
      {searchOpen && <SmartSearch onClose={() => setSearchOpen(false)} />}

      <HeroBanner />
      <div className="relative z-10 -mt-16 md:-mt-24">
        <ContentRow title="Trending Now" movies={trendingMovies} />
        <ContentRow title="Top Rated" movies={topRated} />
        <ContentRow title="Action Movies" movies={actionMovies} />
        <ContentRow title="Comedy" movies={comedyMovies} />
        <ContentRow title="Recently Added" movies={recentlyAdded} />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
