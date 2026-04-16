import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Film } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FilterBar, type Filters } from "@/components/FilterBar";
import { MovieCard } from "@/components/MovieCard";
import { Footer } from "@/components/Footer";
import { SmartSearch } from "@/components/SmartSearch";
import { allContent, type Content } from "@/data/movies";

const PAGE_SIZE = 12;

interface BrowsePageProps {
  contentType?: "movie" | "tv" | "all";
  pageTitle: string;
}

const BrowsePage = ({ contentType = "all", pageTitle }: BrowsePageProps) => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [searchOpen, setSearchOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    genre: "All", year: "All", rating: "All", sortBy: "Popular",
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loaderRef = useRef<HTMLDivElement>(null);

  const baseContent = useMemo(() => {
    let items = contentType === "all"
      ? allContent
      : allContent.filter(c => c.type === contentType);

    // Search filter
    if (initialSearch) {
      const q = initialSearch.toLowerCase();
      items = items.filter(c =>
        c.title.toLowerCase().includes(q) || c.genre.toLowerCase().includes(q)
      );
    }

    return items;
  }, [contentType, initialSearch]);

  const filtered = useMemo(() => {
    let items = [...baseContent];

    if (filters.genre !== "All") items = items.filter(c => c.genre === filters.genre);
    if (filters.year !== "All") items = items.filter(c => c.year === parseInt(filters.year));
    if (filters.rating !== "All") {
      const min = parseInt(filters.rating);
      items = items.filter(c => c.rating >= min);
    }

    switch (filters.sortBy) {
      case "Rating": items.sort((a, b) => b.rating - a.rating); break;
      case "Year": items.sort((a, b) => b.year - a.year); break;
      case "A-Z": items.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: items.sort((a, b) => (b.match || 80) - (a.match || 80)); break;
    }

    return items;
  }, [baseContent, filters]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount((v) => v + PAGE_SIZE);
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [hasMore]);

  // Reset visible count on filter change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onSearchToggle={() => setSearchOpen(true)}
        searchOpen={false}
        searchQuery=""
        onSearchChange={() => {}}
      />

      {searchOpen && <SmartSearch onClose={() => setSearchOpen(false)} />}

      <div className="pt-24 md:pt-28 pb-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground tracking-wide mb-2">
              {initialSearch ? `Results for "${initialSearch}"` : pageTitle}
            </h1>
            <p className="text-muted-foreground text-sm">
              {filtered.length} title{filtered.length !== 1 ? "s" : ""} found
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <FilterBar filters={filters} onChange={setFilters} />
          </motion.div>

          {/* Grid */}
          {visible.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
              {visible.map((item, i) => (
                <MovieCard key={item.id} movie={item} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Film className="w-12 h-12 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground text-lg">No titles match your filters</p>
              <p className="text-muted-foreground/60 text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Infinite scroll loader */}
          {hasMore && (
            <div ref={loaderRef} className="flex justify-center py-12">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export const MoviesPage = () => <BrowsePage contentType="movie" pageTitle="Movies" />;
export const TVShowsPage = () => <BrowsePage contentType="tv" pageTitle="TV Shows" />;
export const BrowseAllPage = () => <BrowsePage contentType="all" pageTitle="Browse" />;
