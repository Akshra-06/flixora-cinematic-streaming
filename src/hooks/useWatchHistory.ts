import { useCallback, useEffect, useState } from "react";
import { allContent, type Content } from "@/data/movies";

export interface HistoryEntry {
  id: number;
  watchedAt: number;
}

const KEY = "flixora:watch-history";
const MAX = 30;

const read = (): HistoryEntry[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const useWatchHistory = () => {
  const [history, setHistory] = useState<HistoryEntry[]>(() => read());

  // Cross-tab + intra-app sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setHistory(read());
    };
    const onCustom = () => setHistory(read());
    window.addEventListener("storage", onStorage);
    window.addEventListener("flixora:history-updated", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("flixora:history-updated", onCustom);
    };
  }, []);

  const recordWatch = useCallback((id: number) => {
    const next = [{ id, watchedAt: Date.now() }, ...read().filter(h => h.id !== id)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
    setHistory(next);
    window.dispatchEvent(new Event("flixora:history-updated"));
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(KEY);
    setHistory([]);
    window.dispatchEvent(new Event("flixora:history-updated"));
  }, []);

  // Materialize: history items hydrated with content
  const recentlyWatched: Content[] = history
    .map(h => allContent.find(c => c.id === h.id))
    .filter((c): c is Content => Boolean(c));

  // Genre affinity score (recent watches weighted higher)
  const genreScores = history.reduce<Record<string, number>>((acc, h, i) => {
    const item = allContent.find(c => c.id === h.id);
    if (!item) return acc;
    const weight = 1 / (i + 1); // newest = 1, then 1/2, 1/3...
    acc[item.genre] = (acc[item.genre] || 0) + weight;
    return acc;
  }, {});

  const topGenres = Object.entries(genreScores)
    .sort((a, b) => b[1] - a[1])
    .map(([genre]) => genre);

  // Personalized "For You" — blend top genres, exclude already watched
  const watchedIds = new Set(history.map(h => h.id));
  const forYou: Content[] = topGenres
    .flatMap(genre =>
      allContent
        .filter(c => c.genre === genre && !watchedIds.has(c.id))
        .sort((a, b) => b.rating - a.rating)
    )
    // Dedupe while preserving order
    .filter((c, i, arr) => arr.findIndex(x => x.id === c.id) === i)
    .slice(0, 12);

  // "Because you watched X" — most recent watched + similar items
  const becauseYouWatched = recentlyWatched.slice(0, 2).map(seed => ({
    seed,
    items: allContent
      .filter(c => c.id !== seed.id && !watchedIds.has(c.id) && (c.genre === seed.genre || c.type === seed.type))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 12),
  }));

  return {
    history,
    recentlyWatched,
    topGenres,
    forYou,
    becauseYouWatched,
    recordWatch,
    clearHistory,
  };
};
