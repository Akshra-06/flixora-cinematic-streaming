import { useCallback, useEffect, useState } from "react";

interface ProgressEntry {
  id: number;
  time: number;      // seconds into the video
  duration: number;   // total duration
  updatedAt: number;
}

const KEY = "flixora:playback-progress";

function load(): ProgressEntry[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function save(entries: ProgressEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(entries));
  window.dispatchEvent(new Event("flixora:progress-updated"));
}

export function usePlaybackProgress() {
  const [entries, setEntries] = useState<ProgressEntry[]>(load);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === KEY) setEntries(load());
    };
    const custom = () => setEntries(load());
    window.addEventListener("storage", handler);
    window.addEventListener("flixora:progress-updated", custom);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("flixora:progress-updated", custom);
    };
  }, []);

  const saveProgress = useCallback((id: number, time: number, duration: number) => {
    // Don't save if almost at start or end
    if (time < 5 || duration - time < 10) return;
    const current = load();
    const next = [
      { id, time, duration, updatedAt: Date.now() },
      ...current.filter((e) => e.id !== id),
    ].slice(0, 50);
    save(next);
    setEntries(next);
  }, []);

  const getProgress = useCallback(
    (id: number): ProgressEntry | undefined => entries.find((e) => e.id === id),
    [entries]
  );

  const clearProgress = useCallback((id: number) => {
    const next = load().filter((e) => e.id !== id);
    save(next);
    setEntries(next);
  }, []);

  const getProgressPercent = useCallback(
    (id: number): number => {
      const entry = entries.find((e) => e.id === id);
      if (!entry || !entry.duration) return 0;
      return Math.round((entry.time / entry.duration) * 100);
    },
    [entries]
  );

  return { entries, saveProgress, getProgress, clearProgress, getProgressPercent };
}
