import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PortfolioItem, Watchlist } from "@/types";

interface PortfolioState {
  items: PortfolioItem[];
  watchlists: Watchlist[];
  favorites: string[];
  setItems: (items: PortfolioItem[]) => void;
  setWatchlists: (watchlists: Watchlist[]) => void;
  addFavorite: (tokenAddress: string) => void;
  removeFavorite: (tokenAddress: string) => void;
  isFavorite: (tokenAddress: string) => boolean;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      items: [],
      watchlists: [],
      favorites: [],
      setItems: (items) => set({ items }),
      setWatchlists: (watchlists) => set({ watchlists }),
      addFavorite: (tokenAddress) =>
        set((state) => ({
          favorites: state.favorites.includes(tokenAddress)
            ? state.favorites
            : [...state.favorites, tokenAddress],
        })),
      removeFavorite: (tokenAddress) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f !== tokenAddress),
        })),
      isFavorite: (tokenAddress) => get().favorites.includes(tokenAddress),
    }),
    { name: "chad-portfolio", partialize: (state) => ({ favorites: state.favorites }) }
  )
);
