import type { Token, TokenTrade, TokenHolder, ChartDataPoint, Transaction, PortfolioItem, Watchlist, MarketActivity } from "@/types";

const TOKEN_NAMES = [
  { symbol: "SOL", name: "Solana", category: "Layer 1" },
  { symbol: "BONK", name: "Bonk", category: "Meme" },
  { symbol: "JUP", name: "Jupiter", category: "DeFi" },
  { symbol: "WIF", name: "dogwifhat", category: "Meme" },
  { symbol: "RAY", name: "Raydium", category: "DeFi" },
  { symbol: "ORCA", name: "Orca", category: "DeFi" },
  { symbol: "PYTH", name: "Pyth Network", category: "DeFi" },
  { symbol: "JTO", name: "Jito", category: "DeFi" },
  { symbol: "RENDER", name: "Render", category: "AI" },
  { symbol: "POPCAT", name: "Popcat", category: "Meme" },
  { symbol: "MEW", name: "cat in a dogs world", category: "Meme" },
  { symbol: "BOME", name: "BOOK OF MEME", category: "Meme" },
  { symbol: "SLERF", name: "Slerf", category: "Meme" },
  { symbol: "MYRO", name: "Myro", category: "Meme" },
  { symbol: "SAMO", name: "Samoyedcoin", category: "Meme" },
  { symbol: "MNGO", name: "Mango", category: "DeFi" },
  { symbol: "STEP", name: "Step Finance", category: "DeFi" },
  { symbol: "SRM", name: "Serum", category: "DeFi" },
  { symbol: "FIDA", name: "Bonfida", category: "DeFi" },
  { symbol: "COPE", name: "Cope", category: "Meme" },
  { symbol: "MEDIA", name: "Media Network", category: "DeFi" },
  { symbol: "ROPE", name: "Rope", category: "Meme" },
  { symbol: "TULIP", name: "Tulip Protocol", category: "DeFi" },
  { symbol: "SNY", name: "Synthetify", category: "DeFi" },
  { symbol: "ATLAS", name: "Star Atlas", category: "Gaming" },
  { symbol: "POLIS", name: "Star Atlas DAO", category: "Gaming" },
  { symbol: "GRAPE", name: "Grape Protocol", category: "DeFi" },
  { symbol: "LIKE", name: "Only1", category: "NFT" },
  { symbol: "PORT", name: "Port Finance", category: "DeFi" },
  { symbol: "TNSR", name: "Tensor", category: "NFT" },
  { symbol: "WEN", name: "Wen", category: "Meme" },
  { symbol: "MOBILE", name: "Helium Mobile", category: "DeFi" },
  { symbol: "HNT", name: "Helium", category: "DeFi" },
  { symbol: "IO", name: "io.net", category: "AI" },
  { symbol: "DRIFT", name: "Drift Protocol", category: "DeFi" },
];

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateAddress(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateTxHash(): string {
  const chars = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateMockTokens(count = 35): Token[] {
  return TOKEN_NAMES.slice(0, count).map((token, i) => {
    const price = token.symbol === "SOL" ? randomBetween(140, 180) : randomBetween(0.00001, 50);
    const marketCap = price * randomBetween(1_000_000, 5_000_000_000);
    return {
      address: generateAddress(),
      symbol: token.symbol,
      name: token.name,
      logoURI: `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${generateAddress().slice(0, 8)}/logo.png`,
      price,
      priceChange24h: randomBetween(-25, 45),
      marketCap,
      volume24h: marketCap * randomBetween(0.05, 0.3),
      liquidity: marketCap * randomBetween(0.01, 0.1),
      holders: Math.floor(randomBetween(1000, 500000)),
      category: token.category,
      chain: "solana",
      decimals: token.symbol === "SOL" ? 9 : 6,
    };
  });
}

export const MOCK_TOKENS = generateMockTokens(35);

export function generateChartData(days = 30, basePrice = 100): ChartDataPoint[] {
  const points: ChartDataPoint[] = [];
  const now = Date.now();
  let price = basePrice;

  for (let i = days * 24; i >= 0; i--) {
    const change = randomBetween(-0.03, 0.03);
    price = Math.max(price * (1 + change), 0.00001);
    const high = price * randomBetween(1, 1.02);
    const low = price * randomBetween(0.98, 1);
    points.push({
      timestamp: now - i * 3600000,
      open: price,
      high,
      low,
      close: price,
      volume: randomBetween(10000, 5000000),
    });
  }
  return points;
}

export function generateMockTrades(tokenSymbol: string, count = 50): TokenTrade[] {
  const trades: TokenTrade[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const type = Math.random() > 0.5 ? "buy" : "sell";
    const price = randomBetween(0.01, 200);
    const amount = randomBetween(1, 100000);
    trades.push({
      id: `trade-${i}`,
      tokenSymbol,
      type,
      price,
      amount,
      total: price * amount,
      wallet: generateAddress(),
      timestamp: now - i * randomBetween(1000, 60000),
      txHash: generateTxHash(),
    });
  }
  return trades.sort((a, b) => b.timestamp - a.timestamp);
}

export function generateMockHolders(tokenPrice: number, count = 55): TokenHolder[] {
  const holders: TokenHolder[] = [];
  let remaining = 100;

  for (let i = 0; i < count; i++) {
    const percentage = i < 5 ? randomBetween(2, 15) : randomBetween(0.01, 2);
    const actualPct = Math.min(percentage, remaining);
    remaining -= actualPct;
    const balance = randomBetween(1000, 10000000);
    holders.push({
      rank: i + 1,
      address: generateAddress(),
      balance,
      percentage: actualPct,
      value: balance * tokenPrice,
    });
  }
  return holders;
}

export function generateMockTransactions(count = 120): Transaction[] {
  const transactions: Transaction[] = [];
  const types: Transaction["type"][] = ["buy", "sell", "swap", "transfer"];
  const statuses: Transaction["status"][] = ["completed", "completed", "completed", "pending", "failed"];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const token = MOCK_TOKENS[Math.floor(Math.random() * MOCK_TOKENS.length)];
    const amount = randomBetween(0.1, 10000);
    transactions.push({
      id: `tx-${i}`,
      userId: "user-1",
      type: types[Math.floor(Math.random() * types.length)],
      tokenSymbol: token.symbol,
      tokenAddress: token.address,
      amount,
      price: token.price,
      total: amount * token.price,
      fee: randomBetween(0.001, 0.5),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      txHash: generateTxHash(),
      timestamp: new Date(now - i * randomBetween(60000, 3600000)).toISOString(),
    });
  }
  return transactions;
}

export function generateMockPortfolio(): PortfolioItem[] {
  const selected = MOCK_TOKENS.slice(0, 8);
  return selected.map((token, i) => {
    const balance = randomBetween(10, 50000);
    const avgBuyPrice = token.price * randomBetween(0.7, 1.3);
    const value = balance * token.price;
    const cost = balance * avgBuyPrice;
    const pnl = value - cost;
    return {
      id: `portfolio-${i}`,
      token,
      balance,
      value,
      avgBuyPrice,
      pnl,
      pnlPercent: (pnl / cost) * 100,
    };
  });
}

export function generateMockWatchlists(): Watchlist[] {
  return [
    {
      id: "wl-1",
      name: "Meme Coins",
      tokens: MOCK_TOKENS.filter((t) => t.category === "Meme").map((t) => t.address),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "wl-2",
      name: "DeFi Blue Chips",
      tokens: MOCK_TOKENS.filter((t) => t.category === "DeFi").map((t) => t.address),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "wl-3",
      name: "AI Tokens",
      tokens: MOCK_TOKENS.filter((t) => t.category === "AI").map((t) => t.address),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "wl-4",
      name: "Gaming",
      tokens: MOCK_TOKENS.filter((t) => t.category === "Gaming").map((t) => t.address),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export function generateMarketActivity(count = 20): MarketActivity[] {
  const types: MarketActivity["type"][] = ["large_buy", "large_sell", "whale_move", "new_holder"];
  const descriptions = {
    large_buy: "Large buy order detected",
    large_sell: "Large sell order detected",
    whale_move: "Whale wallet movement",
    new_holder: "New significant holder",
  };
  const now = Date.now();

  return Array.from({ length: count }, (_, i) => ({
    type: types[Math.floor(Math.random() * types.length)],
    description: descriptions[types[Math.floor(Math.random() * types.length)]],
    amount: randomBetween(10000, 5000000),
    timestamp: now - i * randomBetween(30000, 300000),
  }));
}

export const MOCK_TRANSACTIONS = generateMockTransactions(120);
export const MOCK_PORTFOLIO = generateMockPortfolio();
export const MOCK_WATCHLISTS = generateMockWatchlists();
export const MOCK_MARKET_ACTIVITY = generateMarketActivity(20);
