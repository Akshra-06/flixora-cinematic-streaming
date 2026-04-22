import { useCallback, useEffect, useState } from "react";

export interface Profile {
  id: string;
  name: string;
  avatar: string; // emoji or color key
  color: string; // tailwind gradient class fragment
  isKids: boolean;
  createdAt: number;
}

const PROFILES_KEY = "flixora:profiles";
const ACTIVE_KEY = "flixora:active-profile";
export const MAX_PROFILES = 5;

export const AVATAR_OPTIONS = [
  { key: "🦊", color: "from-orange-500 to-red-600" },
  { key: "🐼", color: "from-slate-300 to-slate-700" },
  { key: "🦁", color: "from-yellow-500 to-amber-700" },
  { key: "🐧", color: "from-sky-400 to-indigo-700" },
  { key: "🦄", color: "from-pink-400 to-purple-600" },
  { key: "🐲", color: "from-emerald-500 to-teal-700" },
  { key: "🦉", color: "from-amber-600 to-stone-800" },
  { key: "🐯", color: "from-orange-400 to-yellow-600" },
  { key: "🐸", color: "from-lime-400 to-green-700" },
  { key: "🦋", color: "from-cyan-400 to-blue-700" },
  { key: "🤖", color: "from-zinc-400 to-zinc-800" },
  { key: "👻", color: "from-violet-300 to-violet-700" },
];

const DEFAULT_PROFILES: Profile[] = [
  { id: "p1", name: "You", avatar: "🦊", color: "from-orange-500 to-red-600", isKids: false, createdAt: Date.now() },
  { id: "p2", name: "Kids", avatar: "🦄", color: "from-pink-400 to-purple-600", isKids: true, createdAt: Date.now() },
];

const read = (): Profile[] => {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(DEFAULT_PROFILES));
      return DEFAULT_PROFILES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PROFILES;
  }
};

const readActive = (): string | null => {
  try {
    return localStorage.getItem(ACTIVE_KEY);
  } catch {
    return null;
  }
};

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>(() => read());
  const [activeId, setActiveId] = useState<string | null>(() => readActive());

  useEffect(() => {
    const sync = () => {
      setProfiles(read());
      setActiveId(readActive());
    };
    window.addEventListener("flixora:profiles-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("flixora:profiles-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const persist = (next: Profile[]) => {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(next));
    setProfiles(next);
    window.dispatchEvent(new Event("flixora:profiles-updated"));
  };

  const addProfile = useCallback(
    (data: Omit<Profile, "id" | "createdAt">) => {
      const current = read();
      if (current.length >= MAX_PROFILES) return null;
      const profile: Profile = { ...data, id: `p${Date.now()}`, createdAt: Date.now() };
      persist([...current, profile]);
      return profile;
    },
    [],
  );

  const updateProfile = useCallback((id: string, patch: Partial<Omit<Profile, "id" | "createdAt">>) => {
    const next = read().map(p => (p.id === id ? { ...p, ...patch } : p));
    persist(next);
  }, []);

  const deleteProfile = useCallback(
    (id: string) => {
      const next = read().filter(p => p.id !== id);
      persist(next);
      if (readActive() === id) {
        localStorage.removeItem(ACTIVE_KEY);
        setActiveId(null);
      }
    },
    [],
  );

  const selectProfile = useCallback((id: string) => {
    localStorage.setItem(ACTIVE_KEY, id);
    setActiveId(id);
    window.dispatchEvent(new Event("flixora:profiles-updated"));
  }, []);

  const clearActive = useCallback(() => {
    localStorage.removeItem(ACTIVE_KEY);
    setActiveId(null);
    window.dispatchEvent(new Event("flixora:profiles-updated"));
  }, []);

  const activeProfile = profiles.find(p => p.id === activeId) || null;

  return {
    profiles,
    activeProfile,
    activeId,
    addProfile,
    updateProfile,
    deleteProfile,
    selectProfile,
    clearActive,
  };
};
