const BIRDEYE_API_URL = "https://public-api.birdeye.so";
const DEXSCREENER_API_URL = "https://api.dexscreener.com/latest/dex";
const USE_LIVE_DATA = process.env.NEXT_PUBLIC_USE_LIVE_DATA === "true";

import type { Token, TokenTrade, TokenHolder, ChartDataPoint } from "@/types";
import {
  MOCK_TOKENS,
  generateMockTrades,
  generateMockHolders,
  generateChartData,
} from "@/lib/mock-data";

// Helper function to generate a deterministic token address from symbol
function generateAddressFromSymbol(symbol: string): string {
  // Simple hash function to generate a consistent address
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    const char = symbol.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `0x${Math.abs(hash).toString(16).padStart(40, '0')}`;
}

// Helper to map DexScreener data to our Token type
function mapDexScreenerToToken(pair: any, defaultCategory = "All"): Token {
  const baseToken = pair.baseToken || {};
  const priceChange = pair.priceChange || {};
  const info = pair.info || {};

  return {
    address:
      baseToken.address ||
      generateAddressFromSymbol(baseToken.symbol || "UNKNOWN"),

    // Keep these
    pairAddress: pair.pairAddress,
    dexId: pair.dexId,

    symbol: baseToken.symbol || "UNKNOWN",
    name: baseToken.name || baseToken.symbol || "Unknown Token",

    logoURI: info.imageUrl || "",

    price: Number(pair.priceUsd ?? 0),
    priceChange24h: Number(priceChange.h24 ?? 0),
    marketCap: Number(pair.marketCap ?? pair.fdv ?? 0),
    volume24h: Number(pair.volume?.h24 ?? 0),
    liquidity: Number(pair.liquidity?.usd ?? 0),

    holders: 0,

    category: defaultCategory,
    chain: pair.chainId || "solana",
    decimals: Number(baseToken.decimals ?? 6),
  };
}

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
async function dexscreenerFetch<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${DEXSCREENER_API_URL}${endpoint}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

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
    return filterTokensWithChartSupport(tokens);
  }

  const queries = [
  "sol",
  "btc",
  "eth",
  "doge",
  "BTC",

  "BNB",
  "XRP",
   "ADA",

  // Additional
  
];
  // Fallback to DexScreener
  const results = await Promise.all(
    queries.map((q) =>
      dexscreenerFetch<{ pairs: any[] }>(`/search?q=${q}`)
    )
  );

  const unique = new Map<string, any>();

  for (const result of results) {
    if (!result?.pairs) continue;

    for (const pair of result.pairs) {
      if (!pair.baseToken?.address) continue;

      const existing = unique.get(pair.baseToken.address);

      if (
        !existing ||
        (pair.volume?.h24 ?? 0) > (existing.volume?.h24 ?? 0)
      ) {
        unique.set(pair.baseToken.address, pair);
      }
    }
  }

  const sortedPairs = [...unique.values()]
    .sort((a, b) => (b.volume?.h24 ?? 0) - (a.volume?.h24 ?? 0))
    .slice(0, limit);

  return sortedPairs.map((p: any) => {
    const baseToken = p.baseToken || {};
    const priceChange = p.priceChange || {};

    return {
      address: baseToken.address || generateAddressFromSymbol(baseToken.symbol || "UNKNOWN"),
      symbol: baseToken.symbol || "UNKNOWN",
      name: baseToken.name || baseToken.symbol || "Unknown Token",
      logoURI: p.info?.imageUrl || "",
      price: Number(p.priceUsd ?? 0),
      priceChange24h: Number(priceChange.h24 ?? 0),
      marketCap: Number(p.marketCap ?? 0),
      volume24h: Number(p.volume?.h24 ?? 0),
      liquidity: Number(p.liquidity?.usd ?? 0),
      holders: 0,
      category: "Trending",
      chain: p.chainId || "solana",
      decimals: Number(baseToken.decimals ?? 6),
      pairAddress: p.pairAddress,
    };
  });

  return [];
}

// Add this helper function at the top of the file
function filterTokensWithChartSupport(tokens: Token[]): Token[] {
  // Tokens that TradingView supports
  const TRADING_VIEW_SUPPORTED = ['SOL', 'BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'DOGE', 'AVAX', 'MATIC', 'LINK'];

  return tokens.filter(token => {
    // Keep if it has a pairAddress (DexScreener support)
    if (token.pairAddress) return true;

    // Keep if it's a major token (TradingView support)
    if (TRADING_VIEW_SUPPORTED.includes(token.symbol.toUpperCase())) return true;

    // Otherwise filter out
    return false;
  });
}

// export async function getTrendingTokens(limit = 30): Promise<Token[]> {
//   if (!USE_LIVE_DATA) {
//     return MOCK_TOKENS.slice(0, limit);
//   }

//   // Try BirdEye first
//   const birdEyeData = await birdeyeFetch<{ tokens: Array<Record<string, unknown>> }>(
//     `/defi/token_trending?sort_by=rank&sort_type=asc&offset=0&limit=${limit}`
//   );

//   if (birdEyeData?.tokens) {
//     return birdEyeData.tokens.map((t) => ({
//       address: String(t.address ?? ""),
//       symbol: String(t.symbol ?? ""),
//       name: String(t.name ?? ""),
//       logoURI: String(t.logoURI ?? ""),
//       price: Number(t.price ?? 0),
//       priceChange24h: Number(t.priceChange24hPercent ?? 0),
//       marketCap: Number(t.mc ?? 0),
//       volume24h: Number(t.v24hUSD ?? 0),
//       liquidity: Number(t.liquidity ?? 0),
//       holders: Number(t.holder ?? 0),
//       category: "Trending",
//       chain: "solana",
//       decimals: Number(t.decimals ?? 6),
//     }));
//   }

//   // Fallback to DexScreener
//   const dexData = await dexscreenerFetch<{ pairs: any[] }>(
//     "/search?q=usd"
//   );

//   if (dexData?.pairs?.length) {
//     const unique = new Map<string, any>();

//     for (const pair of dexData.pairs) {
//       if (!pair.baseToken?.address) continue;

//       // keep highest-volume pair for each token
//       const existing = unique.get(pair.baseToken.address);

//       if (
//         !existing ||
//         (pair.volume?.h24 ?? 0) > (existing.volume?.h24 ?? 0)
//       ) {
//         unique.set(pair.baseToken.address, pair);
//       }
//     }

//     const sortedPairs = [...unique.values()]
//       .sort((a, b) => (b.volume?.h24 ?? 0) - (a.volume?.h24 ?? 0))
//       .slice(0, limit)

//     return sortedPairs.map((p: any) => {
//       const baseToken = p.baseToken || {};
//       const priceChange = p.priceChange || {};

//       return {
//         address: baseToken.address || generateAddressFromSymbol(baseToken.symbol || "UNKNOWN"),
//         symbol: baseToken.symbol || "UNKNOWN",
//         name: baseToken.name || baseToken.symbol || "Unknown Token",
//         logoURI: p.info?.imageUrl || "",
//         price: parseFloat(p.priceUsd) || 0,
//         priceChange24h: parseFloat(priceChange.h24) || 0,
//         marketCap: p.marketCap || 0,
//         volume24h: p.volume?.h24 || 0,
//         liquidity: p.liquidity?.usd || 0,
//         holders: 0,
//         category: "Trending",
//         chain: p.chainId || "solana",
//         decimals: parseInt(baseToken.decimals) || 6,
//       };
//     });
//   }

//   return MOCK_TOKENS.slice(0, limit);
// }

export async function getTokenBySymbol(symbol: string): Promise<Token | null> {
  if (!USE_LIVE_DATA) {
    return MOCK_TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase()) ?? MOCK_TOKENS[0] ?? null;
  }

  // Try BirdEye first - we need the token address from our mock data
  const searchResults = await searchTokens(symbol);
  const token = searchResults.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase());

  if (!token) {
    return MOCK_TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase()) ?? null;
  }

  const birdEyeData = await birdeyeFetch<Record<string, unknown>>(`/defi/token_overview?address=${token.address}`);
  if (birdEyeData) {
    return {
      ...token,
      price: Number(birdEyeData.price ?? token.price),
      priceChange24h: Number(birdEyeData.priceChange24hPercent ?? token.priceChange24h),
      marketCap: Number(birdEyeData.mc ?? token.marketCap),
      volume24h: Number(birdEyeData.v24hUSD ?? token.volume24h),
      liquidity: Number(birdEyeData.liquidity ?? token.liquidity),
      holders: Number(birdEyeData.holder ?? token.holders),
    };
  }

  // Fallback to DexScreener
  const dexData = await dexscreenerFetch<{ pairs: any[] }>(`/search?q=${symbol}`);

  if (dexData?.pairs) {
    const pair = dexData.pairs.find(p =>
      p.baseToken?.symbol?.toLowerCase() === symbol.toLowerCase() ||
      p.quoteToken?.symbol?.toLowerCase() === symbol.toLowerCase()
    );

    if (pair) {
      return mapDexScreenerToToken(pair);
    }
  }

  return MOCK_TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase()) ?? null;
}

export async function searchTokens(query: string): Promise<Token[]> {
  if (!query.trim()) return [];

  if (!USE_LIVE_DATA) {
    const q = query.toLowerCase();
    return MOCK_TOKENS.filter(
      (t) => t.symbol.toLowerCase().includes(q) || t.name.toLowerCase().includes(q)
    ).slice(0, 20);
  }

  // Try BirdEye first
  const birdEyeData = await birdeyeFetch<{ items: Array<Record<string, unknown>> }>(
    `/defi/v3/search?keyword=${encodeURIComponent(query)}&chain=solana`
  );

  if (birdEyeData?.items) {
    return birdEyeData.items.map((t) => ({
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
      category: "All",
      chain: "solana",
      decimals: 6,
    }));
  }

  // Fallback to DexScreener
  const dexData = await dexscreenerFetch<{ pairs: any[] }>(`/search?q=${encodeURIComponent(query)}`);

  if (dexData?.pairs) {
    // Filter for Solana pairs and deduplicate by token symbol
    const uniqueTokens = new Map();
    dexData.pairs
      .filter(p => p.quoteToken?.symbol === "SOL" || p.chainId === "solana")
      .forEach(p => {
        if (p.baseToken?.symbol && !uniqueTokens.has(p.baseToken.symbol)) {
          uniqueTokens.set(p.baseToken.symbol, p);
        }
      });

    return Array.from(uniqueTokens.values()).map(p =>
      mapDexScreenerToToken(p, "All")
    ).slice(0, 20);
  }

  // Fallback to mock data if live data fails
  const q = query.toLowerCase();
  return MOCK_TOKENS.filter(
    (t) => t.symbol.toLowerCase().includes(q) || t.name.toLowerCase().includes(q)
  ).slice(0, 20);
}

export async function getTokenTrades(symbol: string, limit = 50): Promise<TokenTrade[]> {
  if (USE_LIVE_DATA) {
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
  if (USE_LIVE_DATA) {
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



