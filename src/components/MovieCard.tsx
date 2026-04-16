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
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-card">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Hover overlay */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex flex-col justify-end p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Play className="w-4 h-4 fill-primary-foreground text-primary-foreground" />
            </button>
            <button className="w-8 h-8 rounded-full border border-muted-foreground/50 flex items-center justify-center hover:border-foreground transition-colors">
              <Plus className="w-4 h-4 text-foreground" />
            </button>
            <button className="w-8 h-8 rounded-full border border-muted-foreground/50 flex items-center justify-center hover:border-foreground transition-colors">
              <ThumbsUp className="w-4 h-4 text-foreground" />
            </button>
          </div>
          <h3 className="text-sm font-semibold text-foreground truncate">{movie.title}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <span className="text-primary">{movie.rating}★</span>
            <span>{movie.year}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
