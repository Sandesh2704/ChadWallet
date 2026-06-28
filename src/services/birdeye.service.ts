const BIRDEYE_API_URL = "https://public-api.birdeye.so";
const USE_LIVE_DATA = process.env.NEXT_PUBLIC_USE_LIVE_DATA === "true";

import type { Token, TokenTrade, TokenHolder, ChartDataPoint, BirdEyeSearchResponse } from "@/types";
import {
  MOCK_TOKENS,
  generateMockTrades,
  generateMockHolders,
  generateChartData,
} from "@/lib/mock-data";



// BirdEye API functions
async function birdeyeFetch<T>(endpoint: string): Promise<T | null> {
  const apiKey = process.env.BIRDEYE_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(`${BIRDEYE_API_URL}${endpoint}`, {
      headers: { "X-API-KEY": apiKey, "x-chain": "solana" },
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? json;
  } catch {
    return null;
  }
}

// DexScreener API functions

export async function getTrendingTokens(limit = 30): Promise<Token[]> {
  if (!USE_LIVE_DATA) {
    return MOCK_TOKENS.slice(0, limit);
  }

  // Try BirdEye first
  const birdEyeData = await birdeyeFetch<{ tokens: Array<Record<string, unknown>> }>(
    `/defi/token_trending?sort_by=rank&sort_type=asc&offset=0&limit=${limit}`
  );



  if (birdEyeData?.tokens) {
    const tokens = birdEyeData.tokens.map((t) => ({
      address: String(t.address ?? ""),
      symbol: String(t.symbol ?? ""),
      name: String(t.name ?? ""),
      logoURI: String(t.logoURI ?? ""),
      price: Number(t.price ?? 0),
      priceChange24h: Number(t.priceChange24hPercent ?? 0),
      marketCap: Number(t.mc ?? 0),
      volume24h: Number(t.v24hUSD ?? 0),
      liquidity: Number(t.liquidity ?? 0),
      holders: Number(t.holder ?? 0),
      category: "Trending",
      chain: "solana",
      decimals: Number(t.decimals ?? 6),
    }));

    // Filter: Only return tokens that have chart support
    return tokens;
  }



  return [];
}



export async function getTokenBySymbol(symbol: string): Promise<Token | null> {
  if (!USE_LIVE_DATA) {
    return (
      MOCK_TOKENS.find(
        (t) => t.symbol.toLowerCase() === symbol.toLowerCase()
      ) ?? null
    );
  }

  const searchResults = await searchTokens(symbol);

  const token = searchResults.find(
    (t) => t.symbol.toLowerCase() === symbol.toLowerCase()
  );

  if (!token) {
    return null;
  }

  const birdEyeData = await birdeyeFetch<Record<string, any>>(
    `/defi/token_overview?address=${token.address}`
  );

  if (!birdEyeData) {
    return token;
  }

  return {
    ...token,
    price: Number(birdEyeData.price ?? token.price),
    priceChange24h: Number(
      birdEyeData.priceChange24hPercent ?? token.priceChange24h
    ),
    marketCap: Number(birdEyeData.mc ?? token.marketCap),
    volume24h: Number(birdEyeData.v24hUSD ?? token.volume24h),
    liquidity: Number(birdEyeData.liquidity ?? token.liquidity),
    holders: Number(birdEyeData.holder ?? token.holders),
  };
}

export async function searchTokens(query: string): Promise<Token[]> {
  if (!query.trim()) return [];

  if (!USE_LIVE_DATA) {
    const q = query.toLowerCase();

    return MOCK_TOKENS.filter(
      (t) =>
        t.symbol.toLowerCase().includes(q) ||
        t.name.toLowerCase().includes(q)
    ).slice(0, 20);
  }

  const birdEyeData = await birdeyeFetch<BirdEyeSearchResponse>(
    `/defi/v3/search?keyword=${encodeURIComponent(query)}&chain=solana`
  );

  if (!birdEyeData?.items?.length) {
    return [];
  }

  const tokenGroup = birdEyeData.items.find(
    (item) => item.type === "token"
  );

  if (!tokenGroup) {
    return [];
  }

  return tokenGroup.result.map((t) => ({
    address: t.address,
    symbol: t.symbol,
    name: t.name,
    logoURI: t.logo_uri ?? "",
    price: t.price ?? 0,
    priceChange24h: t.price_change_24h_percent ?? 0,
    marketCap: t.market_cap ?? t.fdv ?? 0,
    volume24h: t.volume_24h_usd ?? 0,
    liquidity: t.liquidity ?? 0,
    holders: t.unique_wallet_24h ?? 0,
    category: "All",
    chain: t.network ?? "solana",
    decimals: t.decimals ?? 6,
  }));
}

export async function getTokenTrades(symbol: string, limit = 50): Promise<TokenTrade[]> {
  if (!USE_LIVE_DATA) {
    return generateMockTrades(symbol, limit);
  }

  // Search for the token first
  const searchResults = await searchTokens(symbol);
  const token = searchResults.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase());

  if (!token) {
    return generateMockTrades(symbol, limit);
  }

  // Try BirdEye first (it's the only one that provides trade data)
  const data = await birdeyeFetch<{ items: Array<Record<string, unknown>> }>(
    `/defi/txs/token?address=${token.address}&tx_type=swap&limit=${limit}`
  );

  if (data?.items) {
    return data.items.map((tx, i) => ({
      id: String(tx.txHash ?? `trade-${i}`),
      tokenSymbol: symbol,
      type: (tx.side === "buy" ? "buy" : "sell") as "buy" | "sell",
      price: Number(tx.pricePair ?? 0),
      amount: Number(tx.fromAmount ?? 0),
      total: Number(tx.volumeUSD ?? 0),
      wallet: String(tx.owner ?? ""),
      timestamp: Number(tx.blockUnixTime ?? 0) * 1000,
      txHash: String(tx.txHash ?? ""),
    }));
  }

  return generateMockTrades(symbol, limit);
}

export async function getTokenHolders(symbol: string, limit = 50): Promise<TokenHolder[]> {
  if (!USE_LIVE_DATA) {
    const token = MOCK_TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase()) ?? MOCK_TOKENS[0];
    return generateMockHolders(token?.price || 0, limit);
  }

  // Search for the token first
  const searchResults = await searchTokens(symbol);
  const token = searchResults.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase());

  if (!token) {
    const mockToken = MOCK_TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase()) ?? MOCK_TOKENS[0];
    return generateMockHolders(mockToken?.price || 0, limit);
  }

  // Try BirdEye first (it's the only one that provides holder data)
  const data = await birdeyeFetch<{ items: Array<Record<string, unknown>> }>(
    `/defi/v3/token/holder?address=${token.address}&offset=0&limit=${limit}`
  );

  if (data?.items) {
    return data.items.map((h, i) => ({
      rank: i + 1,
      address: String(h.owner ?? ""),
      balance: Number(h.amount ?? 0),
      percentage: Number(h.percentage ?? 0),
      value: Number(h.value ?? 0),
    }));
  }

  const mockToken = MOCK_TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase()) ?? MOCK_TOKENS[0];
  return generateMockHolders(mockToken?.price || 0, limit);
}

export async function getTokenChart(symbol: string, days = 30): Promise<ChartDataPoint[]> {
  const token = MOCK_TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase()) ?? MOCK_TOKENS[0];

  if (!USE_LIVE_DATA) {
    return generateChartData(days, token.price);
  }

  // Try BirdEye first
  const type = days <= 1 ? "1H" : days <= 7 ? "1D" : "1W";
  const data = await birdeyeFetch<{ items: Array<Record<string, unknown>> }>(
    `/defi/ohlcv?address=${token.address}&type=${type}&time_from=${Math.floor(Date.now() / 1000) - days * 86400}&time_to=${Math.floor(Date.now() / 1000)}`
  );

  if (data?.items) {
    return data.items.map((c) => ({
      timestamp: Number(c.unixTime ?? 0) * 1000,
      open: Number(c.o ?? 0),
      high: Number(c.h ?? 0),
      low: Number(c.l ?? 0),
      close: Number(c.c ?? 0),
      volume: Number(c.v ?? 0),
    }));
  }

  // Fallback to mock data if live data fails
  return generateChartData(days, token.price);
}



