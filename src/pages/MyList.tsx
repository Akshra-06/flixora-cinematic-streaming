import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { useMyList } from "@/hooks/useMyList";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SmartSearch } from "@/components/SmartSearch";

const MyList = () => {
  const { items } = useMyList();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onSearchToggle={() => setSearchOpen(true)} />
      {searchOpen && <SmartSearch onClose={() => setSearchOpen(false)} />}

      <div className="pt-28 pb-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-8">My List</h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <Bookmark className="w-16 h-16 text-muted-foreground/40 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your list is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Add movies and TV shows to your list to watch them later.
            </p>
            <Link
              to="/"
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded font-semibold hover:bg-primary/90 transition"
            >
              Browse content
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {items.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyList;
