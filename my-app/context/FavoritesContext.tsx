"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface FavoritesContextValue {
  favorites: string[];
  favoritesCount: number;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      favoritesCount: favorites.length,
      isFavorite: (id: string) => favorites.includes(id),
      toggleFavorite: (id: string) => {
        setFavorites((prev) =>
          prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
        );
      },
      removeFavorite: (id: string) => {
        setFavorites((prev) => prev.filter((favId) => favId !== id));
      },
      clearFavorites: () => {
        setFavorites([]);
      },
    }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  }

  return context;
}
