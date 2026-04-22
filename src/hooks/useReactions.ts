import { useState, useEffect, useCallback } from "react";
import { getById, type Content } from "@/data/movies";

export type Reaction = "like" | "dislike" | "favorite";

interface ReactionEntry {
  movieId: number;
  reaction: Reaction;
}

const KEY = "flixora_reactions";

function load(): ReactionEntry[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function save(entries: ReactionEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(entries));
  window.dispatchEvent(new Event("flixora:reactions-updated"));
}

export function useReactions() {
  const [entries, setEntries] = useState<ReactionEntry[]>(load);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === KEY) setEntries(load());
    };
    const custom = () => setEntries(load());
    window.addEventListener("storage", handler);
    window.addEventListener("flixora:reactions-updated", custom);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("flixora:reactions-updated", custom);
    };
  }, []);

  const getReaction = useCallback(
    (movieId: number): Reaction | null => {
      return entries.find((e) => e.movieId === movieId)?.reaction ?? null;
    },
    [entries]
  );

  const setReaction = useCallback(
    (movieId: number, reaction: Reaction): boolean => {
      const current = load();
      const existing = current.find((e) => e.movieId === movieId);
      // Toggle off if same reaction
      if (existing?.reaction === reaction) {
        const next = current.filter((e) => e.movieId !== movieId);
        save(next);
        setEntries(next);
        return false; // removed
      }
      // Set or update
      const next = [
        ...current.filter((e) => e.movieId !== movieId),
        { movieId, reaction },
      ];
      save(next);
      setEntries(next);
      return true; // set
    },
    []
  );

  const removeReaction = useCallback((movieId: number) => {
    const next = load().filter((e) => e.movieId !== movieId);
    save(next);
    setEntries(next);
  }, []);

  const favorites: Content[] = entries
    .filter((e) => e.reaction === "favorite")
    .map((e) => getById(e.movieId))
    .filter(Boolean) as Content[];

  const liked: Content[] = entries
    .filter((e) => e.reaction === "like")
    .map((e) => getById(e.movieId))
    .filter(Boolean) as Content[];

  const disliked: Content[] = entries
    .filter((e) => e.reaction === "dislike")
    .map((e) => getById(e.movieId))
    .filter(Boolean) as Content[];

  return { entries, getReaction, setReaction, removeReaction, favorites, liked, disliked };
}
