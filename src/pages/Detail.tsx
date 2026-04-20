import { useNavigate, useParams } from "react-router-dom";
import { Play, Plus, ThumbsUp, Share2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { MovieCard } from "@/components/MovieCard";
import { getById, getSimilar } from "@/data/movies";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getById(Number(id));

  if (!item) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        Title not found.
      </div>
    );
  }

  const similar = getSimilar(item);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero backdrop */}
      <div className="relative h-[75vh] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.4 }}
          src={item.image} alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-6 w-11 h-11 rounded-full bg-background/40 backdrop-blur-md flex items-center justify-center hover:bg-background/60 transition z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3 text-sm">
              <span className="text-primary font-bold">{item.match || 90}% Match</span>
              <span className="text-muted-foreground">{item.year}</span>
              <span className="px-1.5 py-0.5 border border-muted-foreground/40 rounded text-xs">
                {item.maturity}
              </span>
              <span className="text-muted-foreground">{item.duration}</span>
              <span className="px-1.5 py-0.5 border border-muted-foreground/40 rounded text-xs">HD</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display tracking-tight mb-4 uppercase">
              {item.title}
            </h1>
            <p className="text-base md:text-lg text-foreground/85 max-w-2xl mb-6 leading-relaxed">
              {item.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate(`/watch/${item.id}`)}
                className="bg-foreground text-background px-7 py-3 rounded font-semibold flex items-center gap-2 hover:bg-foreground/90 transition"
              >
                <Play className="w-5 h-5 fill-background" /> Play
              </button>
              <button className="bg-secondary/80 text-foreground px-5 py-3 rounded font-semibold flex items-center gap-2 hover:bg-secondary transition">
                <Plus className="w-5 h-5" /> My List
              </button>
              <button className="w-11 h-11 rounded-full border-2 border-muted-foreground/40 flex items-center justify-center hover:border-foreground transition">
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button className="w-11 h-11 rounded-full border-2 border-muted-foreground/40 flex items-center justify-center hover:border-foreground transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Meta */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">About {item.title}</h2>
            <p className="text-foreground/80 leading-relaxed">{item.description}</p>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-muted-foreground">Cast: </span>
            <span className="text-foreground/90">{item.cast?.join(", ")}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Director: </span>
            <span className="text-foreground/90">{item.director}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Genre: </span>
            <span className="text-foreground/90">{item.genre}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Rating: </span>
            <span className="text-foreground/90">{item.rating}★ • {item.maturity}</span>
          </div>
          {item.seasons && (
            <div>
              <span className="text-muted-foreground">Seasons: </span>
              <span className="text-foreground/90">{item.seasons}</span>
            </div>
          )}
        </div>
      </div>

      {/* Similar */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">More Like This</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {similar.map((c, i) => (
            <MovieCard key={c.id} movie={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
