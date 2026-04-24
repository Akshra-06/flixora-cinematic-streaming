import { useState, useCallback, useEffect } from "react";

export interface FlixNotification {
  id: string;
  title: string;
  message: string;
  image?: string;
  time: number;
  read: boolean;
  type: "new_episode" | "recommendation" | "system";
}

const KEY = "flixora:notifications";

function load(): FlixNotification[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function save(items: FlixNotification[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("flixora:notifications-updated"));
}

// Generate smart notifications based on user data
function generateDefaults(): FlixNotification[] {
  return [
    {
      id: "n1",
      title: "New Episode Available",
      message: "Signal Lost — Season 2, Episode 8 is now streaming",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=60&fit=crop",
      time: Date.now() - 1000 * 60 * 30,
      read: false,
      type: "new_episode",
    },
    {
      id: "n2",
      title: "Recommended for You",
      message: "Based on your love of Sci-Fi: Orbit is trending now",
      image: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=100&h=60&fit=crop",
      time: Date.now() - 1000 * 60 * 60 * 2,
      read: false,
      type: "recommendation",
    },
    {
      id: "n3",
      title: "New Season Premiere",
      message: "Kitchen Chaos Season 2 just dropped — watch now!",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=60&fit=crop",
      time: Date.now() - 1000 * 60 * 60 * 5,
      read: false,
      type: "new_episode",
    },
    {
      id: "n4",
      title: "Top Pick This Week",
      message: "Starfall is the #1 movie on Flixora right now",
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=100&h=60&fit=crop",
      time: Date.now() - 1000 * 60 * 60 * 12,
      read: true,
      type: "recommendation",
    },
  ];
}

export function useNotifications() {
  const [items, setItems] = useState<FlixNotification[]>(() => {
    const existing = load();
    if (existing.length === 0) {
      const defaults = generateDefaults();
      save(defaults);
      return defaults;
    }
    return existing;
  });

  useEffect(() => {
    const handler = () => setItems(load());
    window.addEventListener("flixora:notifications-updated", handler);
    return () => window.removeEventListener("flixora:notifications-updated", handler);
  }, []);

  const unreadCount = items.filter((n) => !n.read).length;

  const markRead = useCallback((id: string) => {
    const current = load();
    const next = current.map((n) => (n.id === id ? { ...n, read: true } : n));
    save(next);
    setItems(next);
  }, []);

  const markAllRead = useCallback(() => {
    const next = load().map((n) => ({ ...n, read: true }));
    save(next);
    setItems(next);
  }, []);

  const dismiss = useCallback((id: string) => {
    const next = load().filter((n) => n.id !== id);
    save(next);
    setItems(next);
  }, []);

  return { items, unreadCount, markRead, markAllRead, dismiss };
}
