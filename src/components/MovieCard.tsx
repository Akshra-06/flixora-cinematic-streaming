import { useState } from "react";
import { Play, Plus, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import type { Movie } from "@/data/movies";

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export const MovieCard = ({ movie, index }: MovieCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px] group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-card transition-all duration-500 group-hover:scale-105 group-hover:z-10 group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.7)]">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Permanent subtle bottom gradient for title readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover overlay */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-3.5"
        >
          <div className="flex items-center gap-2 mb-2.5">
            <button className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/85 transition-all duration-200 hover:scale-110 neon-glow">
              <Play className="w-4 h-4 fill-primary-foreground text-primary-foreground ml-0.5" />
            </button>
            <button className="w-9 h-9 rounded-full border-2 border-muted-foreground/40 flex items-center justify-center hover:border-foreground transition-all duration-200 hover:scale-110 bg-background/30 backdrop-blur-sm">
              <Plus className="w-4 h-4 text-foreground" />
            </button>
            <button className="w-9 h-9 rounded-full border-2 border-muted-foreground/40 flex items-center justify-center hover:border-foreground transition-all duration-200 hover:scale-110 bg-background/30 backdrop-blur-sm">
              <ThumbsUp className="w-4 h-4 text-foreground" />
            </button>
          </div>
          <h3 className="text-sm font-bold text-foreground truncate">{movie.title}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <span className="text-primary font-bold">{movie.rating}★</span>
            <span>{movie.year}</span>
            <span className="px-1.5 py-0.5 border border-border rounded text-[10px]">{movie.genre}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
