import { create } from "zustand";
import type { Token } from "@/types";

interface MarketState {
  trendingTokens: Token[];
  selectedToken: Token | null;
  searchQuery: string;
  selectedCategory: string;
  setTrendingTokens: (tokens: Token[]) => void;
  setSelectedToken: (token: Token | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  trendingTokens: [],
  selectedToken: null,
  searchQuery: "",
  selectedCategory: "All",
  setTrendingTokens: (trendingTokens) => set({ trendingTokens }),
  setSelectedToken: (selectedToken) => set({ selectedToken }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
}));
