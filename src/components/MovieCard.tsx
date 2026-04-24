import { useState, useRef, useEffect } from "react";
import { Play, Plus, Check, ThumbsUp, ThumbsDown, Heart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMyList } from "@/hooks/useMyList";
import { useReactions } from "@/hooks/useReactions";
import { usePlaybackProgress } from "@/hooks/usePlaybackProgress";
import type { Movie } from "@/data/movies";

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export const MovieCard = ({ movie, index }: MovieCardProps) => {
  const navigate = useNavigate();
  const { has, toggle } = useMyList();
  const { getReaction, setReaction } = useReactions();
  const { getProgressPercent } = usePlaybackProgress();
  const inList = has(movie.id);
  const reaction = getReaction(movie.id);
  const progressPct = getProgressPercent(movie.id);
  const [hovered, setHovered] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>();
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Play trailer on expanded hover
  useEffect(() => {
    if (showExpanded && videoRef.current && movie.videoUrl) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    if (!showExpanded && videoRef.current) {
      videoRef.current.pause();
    }
  }, [showExpanded, movie.videoUrl]);

  const handleReaction = (e: React.MouseEvent, type: "like" | "dislike" | "favorite") => {
    e.stopPropagation();
    const wasSet = setReaction(movie.id, type);
    const labels = { like: "Liked", dislike: "Disliked", favorite: "Added to Favorites" };
    const removeLabels = { like: "Like removed", dislike: "Dislike removed", favorite: "Removed from Favorites" };
    toast(wasSet ? labels[type] : removeLabels[type]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="relative flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px] group"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Base Card */}
      <div
        onClick={() => navigate(`/title/${movie.id}`)}
        className="relative aspect-[2/3] rounded-md overflow-hidden bg-card cursor-pointer"
      >
        {/* Skeleton pulse until image loads */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={movie.image}
          alt={movie.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/70 to-transparent" />

        {/* Progress bar overlay */}
        {progressPct > 0 && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-muted-foreground/30">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        )}
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
            {/* Preview — video trailer if available, else image */}
            <div className="relative aspect-video overflow-hidden">
              {movie.videoUrl ? (
                <video
                  ref={videoRef}
                  src={movie.videoUrl}
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>

              {/* Resume indicator */}
              {progressPct > 0 && (
                <div className="absolute bottom-0 inset-x-0 h-1 bg-muted-foreground/30">
                  <div className="h-full bg-primary" style={{ width: `${progressPct}%` }} />
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="p-3.5 flex flex-col gap-3">
              {/* Title — directly below trailer */}
              <h3 className="text-base font-bold text-foreground leading-tight line-clamp-1">
                {movie.title}
              </h3>

              {/* Action buttons — middle section */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => { e.stopPropagation(); navigate(`/watch/${movie.id}`); }}
                  title="Play"
                  className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/85 transition-all duration-200 hover:scale-110 neon-glow"
                >
                  <Play className="w-4 h-4 fill-primary-foreground text-primary-foreground ml-0.5" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const added = toggle(movie.id);
                    toast(added ? "Added to My List" : "Removed from My List");
                  }}
                  title={inList ? "Remove from My List" : "Add to My List"}
                  className="w-9 h-9 rounded-full border-2 border-muted-foreground/40 flex items-center justify-center hover:border-foreground transition-all duration-200 hover:scale-110 bg-background/30"
                >
                  <AnimatePresence mode="wait">
                    {inList ? (
                      <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check className="w-4 h-4 text-primary" />
                      </motion.div>
                    ) : (
                      <motion.div key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Plus className="w-4 h-4 text-foreground" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => handleReaction(e, "like")}
                  title="Like"
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                    reaction === "like"
                      ? "border-primary bg-primary/20 shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                      : "border-muted-foreground/40 hover:border-foreground bg-background/30"
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${reaction === "like" ? "text-primary" : "text-foreground"}`} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => handleReaction(e, "favorite")}
                  title="Favorite"
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                    reaction === "favorite"
                      ? "border-destructive bg-destructive/20 shadow-[0_0_12px_hsl(var(--destructive)/0.3)]"
                      : "border-muted-foreground/40 hover:border-foreground bg-background/30"
                  }`}
                >
                  <Heart className={`w-4 h-4 transition-all ${reaction === "favorite" ? "fill-destructive text-destructive scale-110" : "text-foreground"}`} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => { e.stopPropagation(); navigate(`/title/${movie.id}`); }}
                  title="More Info"
                  className="w-9 h-9 rounded-full border-2 border-muted-foreground/40 flex items-center justify-center hover:border-foreground transition-all duration-200 hover:scale-110 bg-background/30 ml-auto"
                >
                  <ChevronDown className="w-4 h-4 text-foreground" />
                </motion.button>
              </div>

              {/* Divider separating actions from metadata */}
              <div className="h-px bg-border/60" />

              {/* Bottom Section — all metadata grouped together */}
              <div className="flex flex-col gap-1.5">
                {/* Match · Maturity · Duration · HD */}
                <div className="flex items-center gap-2 flex-wrap">
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

                {/* Genre · Year · Rating */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
                  <span className="text-foreground/80">{movie.genre}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span className="text-foreground/80">{movie.year}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span className="text-foreground/80">{movie.rating}★</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
