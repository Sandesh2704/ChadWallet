export interface Token {
  address: string;
  symbol: string;
  name: string;
  logoURI: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  holders: number;
  category: string;
  chain: string;
  decimals: number;
  pairAddress?:string;
  dexId?:string;
}

export interface TokenTrade {
  id: string;
  tokenSymbol: string;
  type: "buy" | "sell";
  price: number;
  amount: number;
  total: number;
  wallet: string;
  timestamp: number;
  txHash: string;
}

export interface TokenHolder {
  rank: number;
  address: string;
  balance: number;
  percentage: number;
  value: number;
}

export interface ChartDataPoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PortfolioItem {
  id: string;
  token: Token;
  balance: number;
  value: number;
  avgBuyPrice: number;
  pnl: number;
  pnlPercent: number;
}

export interface Watchlist {
  id: string;
  name: string;
  tokens: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "buy" | "sell" | "swap" | "transfer";
  tokenSymbol: string;
  tokenAddress: string;
  amount: number;
  price: number;
  total: number;
  fee: number;
  status: "completed" | "pending" | "failed";
  txHash: string;
  timestamp: string;
}

export interface User {
  id: string;
  privyId: string;
  email?: string;
  walletAddress?: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  id: string;
  userId: string;
  slippage: number;
  priorityFee: number;
  defaultChain: string;
  notifications: boolean;
  theme: "dark";
}

export interface Favorite {
  id: string;
  userId: string;
  tokenAddress: string;
  tokenSymbol: string;
  createdAt: string;
}

export interface SwapQuote {
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  priceImpactPct: number;
  slippageBps: number;
  route: string;
}

export interface WalletBalance {
  symbol: string;
  balance: number;
  value: number;
  logoURI: string;
}

export interface MarketActivity {
  type: "large_buy" | "large_sell" | "whale_move" | "new_holder";
  description: string;
  amount: number;
  timestamp: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}


export interface BirdEyeSearchToken {
  address: string;
  symbol: string;
  name: string;
  logo_uri?: string;
  price?: number;
  price_change_24h_percent?: number;
  market_cap?: number;
  fdv?: number;
  volume_24h_usd?: number;
  liquidity?: number;
  unique_wallet_24h?: number;
  network?: string;
  decimals?: number;
}

export interface BirdEyeSearchResponse {
  items: {
    type: string;
    result: BirdEyeSearchToken[];
  }[];
}