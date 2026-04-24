import { useEffect, useState } from "react";
import { authFetch } from "@/lib/authFetch";
import { allContent, type Content } from "@/data/movies";

export const useWatchHistory = () => {
  const [recentlyWatched, setRecentlyWatched] = useState<Content[]>([]);
  console.log("FETCHING WATCH HISTORY...");
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await authFetch(
          "https://flixora-cinematic-streaming.onrender.com/api/watch-history"
        );

        const data = await res.json();

        // map backend → frontend content
        const mapped = (data.data || [])
          .map((item: any) =>
            allContent.find((c) => String(c.id) === String(item.movieId))
          )
          .filter(Boolean);

        setRecentlyWatched(mapped);
      } catch (err) {
        console.error("Error fetching watch history:", err);
      }
    };

    fetchHistory();
  }, []);

  return {
    recentlyWatched,
    topGenres: [],
    forYou: [],
    becauseYouWatched: [],
  };
};