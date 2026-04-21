import { useState, useEffect, useCallback } from "react";
import { getById, type Content } from "@/data/movies";

const STORAGE_KEY = "flixora_mylist";

function load(): number[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function save(ids: number[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useMyList() {
  const [ids, setIds] = useState<number[]>(load);

  // cross-tab sync
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setIds(load());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const toggle = useCallback((id: number): boolean => {
    const current = load();
    const exists = current.includes(id);
    const next = exists ? current.filter((i) => i !== id) : [...current, id];
    save(next);
    setIds(next);
    return !exists; // true = added, false = removed
  }, []);

  const has = useCallback((id: number) => ids.includes(id), [ids]);

  const items: Content[] = ids.map(getById).filter(Boolean) as Content[];

  return { ids, items, toggle, has };
}
