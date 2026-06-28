"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrendingTokens, getTokenBySymbol, searchTokens } from "@/services/birdeye.service";

export function useTrendingTokens(limit = 30) {
  return useQuery({
    queryKey: ["trending-tokens", limit],
    queryFn: () => getTrendingTokens(limit),
  });
}

export function useToken(symbol: string) {
  return useQuery({
    queryKey: ["token", symbol],
    queryFn: () => getTokenBySymbol(symbol),
    enabled: !!symbol,
  });
}

export function useTokenSearch(query: string) {
  return useQuery({
    queryKey: ["token-search", query],
    queryFn: () => searchTokens(query),
    enabled: query.length > 0,
  });
}
