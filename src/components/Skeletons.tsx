import { motion } from "framer-motion";

interface SkeletonCardProps {
  count?: number;
}

export const SkeletonCard = () => (
  <div className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px]">
    <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-muted animate-pulse">
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/40 to-transparent" />
    </div>
  </div>
);

export const SkeletonRow = ({ count = 6 }: SkeletonCardProps) => (
  <div className="mb-10 md:mb-14">
    <div className="h-8 w-48 bg-muted rounded animate-pulse mx-4 sm:mx-6 lg:mx-10 mb-4 md:mb-5" />
    <div className="flex gap-3 md:gap-4 px-4 sm:px-6 lg:px-10 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  </div>
);

export const SkeletonHero = () => (
  <div className="relative w-full h-[90vh] min-h-[550px] overflow-hidden">
    <div className="absolute inset-0 bg-muted animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/20" />
    <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
    <div className="relative z-10 h-full flex items-end pb-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
        <div className="max-w-xl space-y-4">
          <div className="h-6 w-32 bg-muted-foreground/20 rounded-full animate-pulse" />
          <div className="h-20 w-96 bg-muted-foreground/20 rounded animate-pulse" />
          <div className="h-4 w-64 bg-muted-foreground/15 rounded animate-pulse" />
          <div className="h-4 w-80 bg-muted-foreground/10 rounded animate-pulse" />
          <div className="flex gap-3 pt-4">
            <div className="h-12 w-36 bg-muted-foreground/20 rounded animate-pulse" />
            <div className="h-12 w-36 bg-muted-foreground/15 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
