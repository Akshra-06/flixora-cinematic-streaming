export interface Content {
  id: number;
  tmdbId?: number;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: number;
  duration: string;
  image: string;
  featured?: boolean;
  maturity?: string;
  match?: number;
  type: "movie" | "tv";
  seasons?: number;
  videoUrl?: string;
  cast?: string[];
  director?: string;
}

const SAMPLE_VIDEOS = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
];

const CAST_POOL = [
  ["Ava Mercer", "Liam Castro", "Naomi Park", "Diego Oduya"],
  ["Soren Vale", "Mira Holloway", "Jasper Quinn", "Indira Rao"],
  ["Eli Bishop", "Tessa Lin", "Marcus Wren", "Yuki Tanaka"],
  ["Cleo Marsh", "Owen Drake", "Sasha Volkov", "Reza Khan"],
  ["Nora Vance", "Theo Aslan", "Priya Shah", "Felix Moreau"],
];

const P = "https://images.unsplash.com";

export const allContent: Content[] = [
  { id: 1, tmdbId: 157336, title: "Interstellar", description: "In a dystopian future, a rogue hacker discovers a digital world threatening to consume reality. With time running out, she must navigate both worlds to save humanity.", genre: "Sci-Fi", year: 2024, rating: 8.7, duration: "2h 14m", image: `${P}/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop`, featured: true, maturity: "16+", match: 97, type: "movie" },
  { id: 2, tmdbId: 550, title: "Fight Club", description: "A mountaineer's impossible climb becomes a fight for survival against nature's deadliest forces.", genre: "Adventure", year: 2024, rating: 8.2, duration: "1h 58m", image: `${P}/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop`, maturity: "12+", match: 93, type: "movie" },
  { id: 3, tmdbId: 680, title: "Pulp Fiction", description: "A deaf musician discovers she can hear music from another dimension, unlocking a terrifying secret.", genre: "Thriller", year: 2023, rating: 7.9, duration: "1h 45m", image: `${P}/photo-1511671782779-c97d3d27a1d4?w=400&h=600&fit=crop`, maturity: "16+", match: 88, type: "movie" },
  { id: 4, tmdbId: 13, title: "Forrest Gump", description: "During the Cold War, a double agent must choose between loyalty and love in a game of espionage.", genre: "Drama", year: 2024, rating: 8.5, duration: "2h 22m", image: `${P}/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop`, maturity: "16+", match: 95, type: "movie" },
  { id: 5, tmdbId: 155, title: "The Dark Knight", description: "When a massive wildfire threatens a small town, a group of firefighters risk everything to save their community.", genre: "Action", year: 2024, rating: 7.6, duration: "1h 52m", image: `${P}/photo-1473116763249-2faaef81ccda?w=400&h=600&fit=crop`, maturity: "12+", match: 82, type: "movie" },
  { id: 6, tmdbId: 27205, title: "Inception", description: "An AI researcher uncovers a sentient program that could either save or destroy civilization.", genre: "Sci-Fi", year: 2023, rating: 8.1, duration: "2h 05m", image: `${P}/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop`, maturity: "12+", match: 91, type: "movie" },
  { id: 7, title: "Crimson Tide Rising", description: "A submarine crew faces mutiny and external threats in the depths of the Arctic Ocean.", genre: "Action", year: 2024, rating: 7.8, duration: "2h 10m", image: `${P}/photo-1551244072-5d12893278ab?w=400&h=600&fit=crop`, maturity: "16+", match: 86, type: "movie" },
  { id: 8, title: "The Garden Within", description: "A botanical scientist discovers plants that respond to human emotions, leading to unexpected consequences.", genre: "Drama", year: 2023, rating: 8.3, duration: "1h 48m", image: `${P}/photo-1518882054726-db6f0ea1d052?w=400&h=600&fit=crop`, maturity: "PG", match: 90, type: "movie" },
  { id: 9, title: "Midnight Protocol", description: "When a city's infrastructure is hacked, a cybersecurity expert has 12 hours to prevent catastrophe.", genre: "Thriller", year: 2024, rating: 7.7, duration: "1h 55m", image: `${P}/photo-1478760329108-5c3ed9d495a0?w=400&h=600&fit=crop`, maturity: "16+", match: 84, type: "movie" },
  { id: 10, title: "Starfall", description: "An astronaut stranded on a distant planet discovers ancient alien ruins that hold the key to faster-than-light travel.", genre: "Sci-Fi", year: 2024, rating: 8.9, duration: "2h 30m", image: `${P}/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop`, maturity: "12+", match: 98, type: "movie" },
  { id: 11, title: "Broken Crown", description: "A medieval tale of betrayal and redemption as a disgraced knight fights to reclaim a stolen kingdom.", genre: "Adventure", year: 2023, rating: 8.0, duration: "2h 18m", image: `${P}/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop`, maturity: "16+", match: 87, type: "movie" },
  { id: 12, title: "Deep Current", description: "Marine biologists encounter a massive underwater creature that challenges everything they know about the ocean.", genre: "Horror", year: 2024, rating: 7.4, duration: "1h 42m", image: `${P}/photo-1551244072-5d12893278ab?w=400&h=600&fit=crop`, maturity: "18+", match: 79, type: "movie" },
  { id: 13, title: "Paper Walls", description: "A journalist investigates a powerful corporation hiding dark secrets behind a pristine public image.", genre: "Drama", year: 2023, rating: 8.4, duration: "2h 01m", image: `${P}/photo-1504711434969-e33886168d6c?w=400&h=600&fit=crop`, maturity: "16+", match: 92, type: "movie" },
  { id: 14, title: "Velocity", description: "An underground racing circuit becomes the battleground for a driver seeking revenge and glory.", genre: "Action", year: 2024, rating: 7.5, duration: "1h 50m", image: `${P}/photo-1494976388531-d1058494cdd8?w=400&h=600&fit=crop`, maturity: "12+", match: 81, type: "movie" },
  { id: 15, title: "The Forgotten Season", description: "A family reunites in their childhood home, uncovering long-buried secrets that reshape their understanding of the past.", genre: "Drama", year: 2023, rating: 8.6, duration: "2h 08m", image: `${P}/photo-1510414842594-a61c69b5ae57?w=400&h=600&fit=crop`, maturity: "PG", match: 94, type: "movie" },
  { id: 16, title: "Laugh Track", description: "A struggling stand-up comedian lands a spot on a hit late-night show, but fame comes with unexpected chaos.", genre: "Comedy", year: 2024, rating: 7.8, duration: "1h 38m", image: `${P}/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop`, maturity: "PG", match: 89, type: "movie" },
  { id: 17, title: "Wedding Heist", description: "A group of old friends reunite to pull off the most ridiculous heist ever — at one of their own weddings.", genre: "Comedy", year: 2024, rating: 7.3, duration: "1h 44m", image: `${P}/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop`, maturity: "12+", match: 83, type: "movie" },
  { id: 18, title: "Office Odyssey", description: "An entire office gets trapped in a time loop, reliving the worst Monday in corporate history.", genre: "Comedy", year: 2023, rating: 8.0, duration: "1h 35m", image: `${P}/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop`, maturity: "PG", match: 91, type: "movie" },
  { id: 19, title: "Roommate Wars", description: "Two strangers with opposite lifestyles are forced to share a tiny apartment in the world's most expensive city.", genre: "Comedy", year: 2024, rating: 7.6, duration: "1h 40m", image: `${P}/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop`, maturity: "PG", match: 85, type: "movie" },
  { id: 20, title: "Night Shift", description: "A burnt-out ER nurse discovers her hospital has a supernatural secret that only appears after midnight.", genre: "Horror", year: 2024, rating: 7.9, duration: "1h 48m", image: `${P}/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop`, maturity: "18+", match: 87, type: "movie" },
  // TV Shows
  { id: 21, tmdbId: 1399, title: "Game of Thrones", description: "A team of investigators tracks a mysterious broadcast signal that predicts catastrophic events 48 hours in advance.", genre: "Sci-Fi", year: 2024, rating: 8.8, duration: "45m", image: `${P}/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop`, maturity: "16+", match: 96, type: "tv", seasons: 2 },
  { id: 22, tmdbId: 1396, title: "Breaking Bad", description: "A political drama set inside the halls of power, where every alliance comes with a price.", genre: "Drama", year: 2023, rating: 8.6, duration: "55m", image: `${P}/photo-1495020689067-958852a7765e?w=400&h=600&fit=crop`, maturity: "16+", match: 94, type: "tv", seasons: 3 },
  { id: 23, tmdbId: 66732, title: "Stranger Things", description: "A hostage negotiator becomes personally entangled in a case that spans three continents.", genre: "Thriller", year: 2024, rating: 8.3, duration: "50m", image: `${P}/photo-1492691527719-9d1e07e534b4?w=400&h=600&fit=crop`, maturity: "18+", match: 91, type: "tv", seasons: 1 },
  { id: 24, title: "Folklore", description: "An anthology horror series inspired by myths and legends from cultures around the world.", genre: "Horror", year: 2023, rating: 8.1, duration: "40m", image: `${P}/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop`, maturity: "18+", match: 88, type: "tv", seasons: 2 },
  { id: 25, title: "Fast Lane", description: "An adrenaline-fueled series following undercover agents infiltrating international street racing syndicates.", genre: "Action", year: 2024, rating: 7.9, duration: "48m", image: `${P}/photo-1493238792000-8113da705763?w=400&h=600&fit=crop`, maturity: "16+", match: 85, type: "tv", seasons: 1 },
  { id: 26, title: "The Exchange", description: "Rival families in the world of high-frequency trading wage war on Wall Street.", genre: "Drama", year: 2024, rating: 8.4, duration: "52m", image: `${P}/photo-1486406146926-c627a92ad1ab?w=400&h=600&fit=crop`, maturity: "16+", match: 93, type: "tv", seasons: 2 },
  { id: 27, title: "Backyard Rivals", description: "Neighbors compete in increasingly absurd challenges to prove who rules the cul-de-sac.", genre: "Comedy", year: 2023, rating: 7.7, duration: "30m", image: `${P}/photo-1560169897-fc0cdbdfa4d5?w=400&h=600&fit=crop`, maturity: "PG", match: 84, type: "tv", seasons: 4 },
  { id: 28, title: "Orbit", description: "Life aboard humanity's first deep-space colony ship, where social order begins to fracture.", genre: "Sci-Fi", year: 2024, rating: 8.7, duration: "55m", image: `${P}/photo-1462332420958-a05d1e002413?w=400&h=600&fit=crop`, maturity: "12+", match: 97, type: "tv", seasons: 1 },
  { id: 29, title: "Kitchen Chaos", description: "Behind the scenes of a Michelin-star restaurant where the staff is barely holding it together.", genre: "Comedy", year: 2024, rating: 8.2, duration: "35m", image: `${P}/photo-1414235077428-338989a2e8c0?w=400&h=600&fit=crop`, maturity: "12+", match: 90, type: "tv", seasons: 2 },
  { id: 30, title: "Shadow Bureau", description: "A secret government agency uses psychics to solve cold cases that conventional detectives cannot.", genre: "Thriller", year: 2023, rating: 8.0, duration: "50m", image: `${P}/photo-1557683316-973673baf926?w=400&h=600&fit=crop`, maturity: "16+", match: 86, type: "tv", seasons: 3 },
];

// Backward compat
export type Movie = Content;
export const movies = allContent;

export const genres = ["All", "Sci-Fi", "Action", "Drama", "Thriller", "Adventure", "Comedy", "Horror"];
export const years = [2024, 2023, 2022, 2021, 2020];
export const ratings = ["9+", "8+", "7+", "6+"];

export const featuredMovie = allContent.find(m => m.featured)!;

// Category helpers
export const getMovies = () => allContent.filter(c => c.type === "movie");
export const getTVShows = () => allContent.filter(c => c.type === "tv");

export const trendingMovies = allContent.filter(m => m.rating >= 8.0);
export const topRated = [...allContent].sort((a, b) => b.rating - a.rating).slice(0, 10);
export const newReleases = allContent.filter(m => m.year === 2024);
export const actionMovies = allContent.filter(m => m.genre === "Action");
export const comedyMovies = allContent.filter(m => m.genre === "Comedy");
export const recentlyAdded = [...allContent].reverse().slice(0, 10);

allContent.forEach((c, i) => {
  // Only assign fallback video if NO tmdbId (no trailer)
  c.videoUrl = c.videoUrl || SAMPLE_VIDEOS[i % SAMPLE_VIDEOS.length];

  c.cast = CAST_POOL[i % CAST_POOL.length];
  c.director = ["Aria Vance", "Kenji Mori", "Lena Okafor", "Sam Hartley", "Iris Bloom"][i % 5];
});

export const getById = (id: number) => allContent.find(c => c.id === id);

export const getSimilar = (item: Content, limit = 6) =>
  allContent
    .filter(c => c.id !== item.id && (c.genre === item.genre || c.type === item.type))
    .slice(0, limit);

export const getNextEpisode = (item: Content) => {
  const pool = allContent.filter(c => c.type === item.type && c.id !== item.id);
  return pool[Math.floor(Math.random() * pool.length)] || allContent[0];
};
