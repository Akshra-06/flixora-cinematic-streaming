import { useState, useEffect, useRef, useMemo } from "react";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { allContent, type Content } from "@/data/movies";
import { useNavigate } from "react-router-dom";

interface SmartSearchProps {
  onClose: () => void;
}

export const SmartSearch = ({ onClose }: SmartSearchProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allContent
      .filter(c => c.title.toLowerCase().includes(q) || c.genre.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  const trendingSearches = ["Sci-Fi", "Action", "Neon Horizon", "Starfall", "Comedy"];

  const handleSelect = (item: Content) => {
    onClose();
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      navigate(`/browse?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={containerRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="max-w-2xl mx-auto mt-20 px-4"
      >
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            placeholder="Search for movies, TV shows, genres..."
            className="w-full bg-card border border-border rounded-xl pl-12 pr-12 py-4 text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        <AnimatePresence mode="wait">
          {query.trim() ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-2 bg-card border border-border rounded-xl overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,0.6)]"
            >
              {suggestions.length > 0 ? (
                <div className="max-h-[420px] overflow-y-auto">
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-secondary/50 transition-colors text-left group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span>{item.type === "tv" ? "TV Show" : "Movie"}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                          <span>{item.genre}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                          <span>{item.year}</span>
                        </div>
                      </div>
                      <span className="text-primary text-xs font-bold flex-shrink-0">{item.rating}★</span>
                    </button>
                  ))}
                  {query.trim() && (
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors border-t border-border text-left"
                    >
                      See all results for "<span className="text-foreground font-medium">{query}</span>"
                    </button>
                  )}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-muted-foreground text-sm">No results for "{query}"</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">Try different keywords</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="trending"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-2 bg-card border border-border rounded-xl overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trending Searches</span>
              </div>
              <div className="py-1">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors text-left"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
