import { useState, useRef, useEffect } from "react";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Movie } from "@/data/movies";

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export const MovieCard = ({ movie, index }: MovieCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  const handleEnter = () => {
    setHovered(true);
    hoverTimer.current = setTimeout(() => setShowExpanded(true), 400);
  };

  const handleLeave = () => {
    setHovered(false);
    setShowExpanded(false);
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="relative flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px] group"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Base Card */}
      <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-card cursor-pointer">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Subtle gradient always visible */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/70 to-transparent" />
      </div>

      {/* Expanded Hover Card */}
      <AnimatePresence>
        {showExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute -top-4 -left-4 -right-4 z-30 rounded-lg overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,0.8)] bg-card border border-border/50"
          >
            {/* Preview Image with animated overlay */}
            <div className="relative aspect-video overflow-hidden">
              <motion.img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 6, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

              {/* Simulated preview indicator */}
              <div className="absolute top-3 right-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
            </div>

            {/* Info Section */}
            <div className="p-3.5">
              {/* Action buttons */}
              <div className="flex items-center gap-2 mb-3">
                <button className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/85 transition-all duration-200 hover:scale-110 neon-glow">
                  <Play className="w-4 h-4 fill-primary-foreground text-primary-foreground ml-0.5" />
                </button>
                <button className="w-9 h-9 rounded-full border-2 border-muted-foreground/40 flex items-center justify-center hover:border-foreground transition-all duration-200 hover:scale-110 bg-background/30">
                  <Plus className="w-4 h-4 text-foreground" />
                </button>
                <button className="w-9 h-9 rounded-full border-2 border-muted-foreground/40 flex items-center justify-center hover:border-foreground transition-all duration-200 hover:scale-110 bg-background/30">
                  <ThumbsUp className="w-4 h-4 text-foreground" />
                </button>
                <button className="w-9 h-9 rounded-full border-2 border-muted-foreground/40 flex items-center justify-center hover:border-foreground transition-all duration-200 hover:scale-110 bg-background/30 ml-auto">
                  <ChevronDown className="w-4 h-4 text-foreground" />
                </button>
              </div>

              {/* Metadata row */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-primary font-bold text-sm">{movie.match || 85}% Match</span>
                {movie.maturity && (
                  <span className="px-1.5 py-0.5 border border-muted-foreground/40 rounded text-[11px] text-muted-foreground font-medium">
                    {movie.maturity}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">{movie.duration}</span>
                <span className="px-1.5 py-0.5 border border-muted-foreground/30 rounded text-[10px] text-muted-foreground">
                  HD
                </span>
              </div>

              {/* Genre tags */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="text-foreground/80">{movie.genre}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span className="text-foreground/80">{movie.year}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span className="text-foreground/80">{movie.rating}★</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
