import { Play, Info } from "lucide-react";
import { motion } from "framer-motion";
import { featuredMovie } from "@/data/movies";
import heroBg from "@/assets/hero-bg.jpg";

export const HeroBanner = () => {
  return (
    <div className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary rounded-full mb-4">
              Featured
            </span>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-4 text-foreground">
              {featuredMovie.title}
            </h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="text-primary font-semibold">{featuredMovie.rating} ★</span>
              <span>{featuredMovie.year}</span>
              <span>{featuredMovie.duration}</span>
              <span className="px-2 py-0.5 border border-border rounded text-xs">{featuredMovie.genre}</span>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
              {featuredMovie.description}
            </p>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
                <Play className="w-5 h-5 fill-current" />
                Play Now
              </button>
              <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium px-6 py-3 rounded-lg transition-all duration-200">
                <Info className="w-5 h-5" />
                More Info
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
