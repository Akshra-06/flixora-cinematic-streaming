import { Play, Info } from "lucide-react";
import { motion } from "framer-motion";
import { featuredMovie } from "@/data/movies";
import heroBg from "@/assets/hero-bg.jpg";

export const HeroBanner = () => {
  return (
    <div className="relative w-full h-[90vh] min-h-[550px] overflow-hidden cinema-vignette">
      {/* Background Image with subtle zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <img
          src={heroBg}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-primary/20 text-primary rounded-full mb-5 neon-glow"
            >
              ● Now Streaming
            </motion.span>
            <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.9] mb-5 text-foreground drop-shadow-2xl">
              {featuredMovie.title}
            </h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="text-primary font-bold text-base">{featuredMovie.rating} ★</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{featuredMovie.year}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{featuredMovie.duration}</span>
              <span className="px-2 py-0.5 border border-border rounded text-xs font-medium">{featuredMovie.genre}</span>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 line-clamp-3 max-w-lg">
              {featuredMovie.description}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex items-center gap-3"
            >
              <button className="flex items-center gap-2.5 bg-primary hover:bg-primary/85 text-primary-foreground font-bold px-8 py-3.5 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(1_100%_47%/0.3)] text-sm uppercase tracking-wider">
                <Play className="w-5 h-5 fill-current" />
                Play Now
              </button>
              <button className="flex items-center gap-2.5 bg-secondary/80 hover:bg-secondary text-secondary-foreground font-semibold px-8 py-3.5 rounded-md transition-all duration-300 backdrop-blur-sm text-sm uppercase tracking-wider">
                <Info className="w-5 h-5" />
                More Info
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
