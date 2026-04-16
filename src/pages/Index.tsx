import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { ContentRow } from "@/components/ContentRow";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import {
  trendingMovies, topRated, newReleases, actionMovies,
  comedyMovies, recentlyAdded, movies,
} from "@/data/movies";

const Index = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return movies.filter(
      (m) => m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const showSearch = searchOpen && searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onSearchToggle={() => {
          setSearchOpen(!searchOpen);
          if (searchOpen) setSearchQuery("");
        }}
        searchOpen={searchOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {showSearch ? (
        <div className="pt-24 md:pt-28 pb-12">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-6 tracking-wide">
              Results for "{searchQuery}"
            </h3>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {searchResults.map((movie, i) => (
                  <MovieCard key={movie.id} movie={movie} index={i} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No titles found. Try a different search.</p>
            )}
          </div>
        </div>
      ) : (
        <>
          <HeroBanner />
          <div className="relative z-10 -mt-16 md:-mt-24">
            <ContentRow title="Trending Now" movies={trendingMovies} />
            <ContentRow title="Top Rated" movies={topRated} />
            <ContentRow title="Action Movies" movies={actionMovies} />
            <ContentRow title="Comedy" movies={comedyMovies} />
            <ContentRow title="Recently Added" movies={recentlyAdded} />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Index;
