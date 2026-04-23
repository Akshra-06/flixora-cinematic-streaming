import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { ContentRow } from "@/components/ContentRow";
import { Footer } from "@/components/Footer";
import { SmartSearch } from "@/components/SmartSearch";
import { trendingMovies, topRated, actionMovies, comedyMovies, recentlyAdded } from "@/data/movies";
import { useWatchHistory } from "@/hooks/useWatchHistory";
import { useReactions } from "@/hooks/useReactions";
const [continueWatching, setContinueWatching] = useState([]);
const Index = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { recentlyWatched, forYou, becauseYouWatched, topGenres } = useWatchHistory();
  const { liked, favorites } = useReactions();

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearchToggle={() => setSearchOpen(true)} />
      {searchOpen && <SmartSearch onClose={() => setSearchOpen(false)} />}

      <HeroBanner />
      <div className="relative z-10 -mt-16 md:-mt-24 space-y-2">
        {recentlyWatched.length > 0 && (
          <ContentRow title="Continue Watching" movies={recentlyWatched} />
        )}

        {forYou.length > 0 && (
          <ContentRow
            title={topGenres[0] ? `Top Picks for You · ${topGenres[0]}` : "Top Picks for You"}
            movies={forYou}
          />
        )}

        {becauseYouWatched.map(({ seed, items }) =>
          items.length > 0 ? (
            <ContentRow
              key={`bcw-${seed.id}`}
              title={`Because you watched ${seed.title}`}
              movies={items}
            />
          ) : null,
        )}

        {liked.length > 0 && (
          <ContentRow title="Highly Rated by You" movies={liked} />
        )}

        {favorites.length > 0 && (
          <ContentRow title="Your Favorites ❤️" movies={favorites} />
        )}

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
