export interface Movie {
  id: number;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: number;
  duration: string;
  image: string;
  featured?: boolean;
}

const POSTER_BASE = "https://images.unsplash.com";

export const movies: Movie[] = [
  {
    id: 1,
    title: "Neon Horizon",
    description: "In a dystopian future, a rogue hacker discovers a digital world threatening to consume reality. With time running out, she must navigate both worlds to save humanity.",
    genre: "Sci-Fi",
    year: 2024,
    rating: 8.7,
    duration: "2h 14m",
    image: `${POSTER_BASE}/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop`,
    featured: true,
  },
  {
    id: 2,
    title: "The Last Summit",
    description: "A mountaineer's impossible climb becomes a fight for survival against nature's deadliest forces.",
    genre: "Adventure",
    year: 2024,
    rating: 8.2,
    duration: "1h 58m",
    image: `${POSTER_BASE}/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop`,
  },
  {
    id: 3,
    title: "Echoes of Silence",
    description: "A deaf musician discovers she can hear music from another dimension, unlocking a terrifying secret.",
    genre: "Thriller",
    year: 2023,
    rating: 7.9,
    duration: "1h 45m",
    image: `${POSTER_BASE}/photo-1511671782779-c97d3d27a1d4?w=400&h=600&fit=crop`,
  },
  {
    id: 4,
    title: "Iron Veil",
    description: "During the Cold War, a double agent must choose between loyalty and love in a game of espionage.",
    genre: "Drama",
    year: 2024,
    rating: 8.5,
    duration: "2h 22m",
    image: `${POSTER_BASE}/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop`,
  },
  {
    id: 5,
    title: "Wildfire",
    description: "When a massive wildfire threatens a small town, a group of firefighters risk everything to save their community.",
    genre: "Action",
    year: 2024,
    rating: 7.6,
    duration: "1h 52m",
    image: `${POSTER_BASE}/photo-1473116763249-2faaef81ccda?w=400&h=600&fit=crop`,
  },
  {
    id: 6,
    title: "Phantom Code",
    description: "An AI researcher uncovers a sentient program that could either save or destroy civilization.",
    genre: "Sci-Fi",
    year: 2023,
    rating: 8.1,
    duration: "2h 05m",
    image: `${POSTER_BASE}/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop`,
  },
  {
    id: 7,
    title: "Crimson Tide Rising",
    description: "A submarine crew faces mutiny and external threats in the depths of the Arctic Ocean.",
    genre: "Action",
    year: 2024,
    rating: 7.8,
    duration: "2h 10m",
    image: `${POSTER_BASE}/photo-1551244072-5d12893278ab?w=400&h=600&fit=crop`,
  },
  {
    id: 8,
    title: "The Garden Within",
    description: "A botanical scientist discovers plants that respond to human emotions, leading to unexpected consequences.",
    genre: "Drama",
    year: 2023,
    rating: 8.3,
    duration: "1h 48m",
    image: `${POSTER_BASE}/photo-1518882054726-db6f0ea1d052?w=400&h=600&fit=crop`,
  },
  {
    id: 9,
    title: "Midnight Protocol",
    description: "When a city's infrastructure is hacked, a cybersecurity expert has 12 hours to prevent catastrophe.",
    genre: "Thriller",
    year: 2024,
    rating: 7.7,
    duration: "1h 55m",
    image: `${POSTER_BASE}/photo-1478760329108-5c3ed9d495a0?w=400&h=600&fit=crop`,
  },
  {
    id: 10,
    title: "Starfall",
    description: "An astronaut stranded on a distant planet discovers ancient alien ruins that hold the key to faster-than-light travel.",
    genre: "Sci-Fi",
    year: 2024,
    rating: 8.9,
    duration: "2h 30m",
    image: `${POSTER_BASE}/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop`,
  },
  {
    id: 11,
    title: "Broken Crown",
    description: "A medieval tale of betrayal and redemption as a disgraced knight fights to reclaim a stolen kingdom.",
    genre: "Adventure",
    year: 2023,
    rating: 8.0,
    duration: "2h 18m",
    image: `${POSTER_BASE}/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop`,
  },
  {
    id: 12,
    title: "Deep Current",
    description: "Marine biologists encounter a massive underwater creature that challenges everything they know about the ocean.",
    genre: "Horror",
    year: 2024,
    rating: 7.4,
    duration: "1h 42m",
    image: `${POSTER_BASE}/photo-1551244072-5d12893278ab?w=400&h=600&fit=crop`,
  },
  {
    id: 13,
    title: "Paper Walls",
    description: "A journalist investigates a powerful corporation hiding dark secrets behind a pristine public image.",
    genre: "Drama",
    year: 2023,
    rating: 8.4,
    duration: "2h 01m",
    image: `${POSTER_BASE}/photo-1504711434969-e33886168d6c?w=400&h=600&fit=crop`,
  },
  {
    id: 14,
    title: "Velocity",
    description: "An underground racing circuit becomes the battleground for a driver seeking revenge and glory.",
    genre: "Action",
    year: 2024,
    rating: 7.5,
    duration: "1h 50m",
    image: `${POSTER_BASE}/photo-1494976388531-d1058494cdd8?w=400&h=600&fit=crop`,
  },
  {
    id: 15,
    title: "The Forgotten Season",
    description: "A family reunites in their childhood home, uncovering long-buried secrets that reshape their understanding of the past.",
    genre: "Drama",
    year: 2023,
    rating: 8.6,
    duration: "2h 08m",
    image: `${POSTER_BASE}/photo-1510414842594-a61c69b5ae57?w=400&h=600&fit=crop`,
  },
];

export const genres = ["All", "Sci-Fi", "Action", "Drama", "Thriller", "Adventure", "Horror"];

export const trendingMovies = movies.filter(m => m.rating >= 8.0);
export const newReleases = movies.filter(m => m.year === 2024);
export const sciFiMovies = movies.filter(m => m.genre === "Sci-Fi");
export const actionMovies = movies.filter(m => m.genre === "Action");
export const dramaMovies = movies.filter(m => m.genre === "Drama");
export const featuredMovie = movies.find(m => m.featured)!;
