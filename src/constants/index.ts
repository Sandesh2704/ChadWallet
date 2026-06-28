export const APP_NAME = "ChadWallet";
export const APP_DESCRIPTION =
  "The ultimate crypto trading platform. Trade, track, and manage your portfolio across multiple chains.";

export const THEME = {
  background: "#09090B",
  card: "#18181B",
  border: "#27272A",
  borderRadius: "16px",
} as const;

export const SUPPORTED_CHAINS = [
  { id: "solana", name: "Solana", symbol: "SOL", icon: "◎" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "Ξ" },
  { id: "base", name: "Base", symbol: "BASE", icon: "🔵" },
  { id: "arbitrum", name: "Arbitrum", symbol: "ARB", icon: "🔷" },
  { id: "polygon", name: "Polygon", symbol: "MATIC", icon: "⬡" },
  { id: "bsc", name: "BNB Chain", symbol: "BNB", icon: "🟡" },
] as const;

export const TOKEN_CATEGORIES = [
  "All",
  "Trending",
  "DeFi",
  "Meme",
  "AI",
  "Gaming",
  "NFT",
  "Layer 1",
  "Layer 2",
] as const;

export const FAQ_ITEMS = [
  {
    question: "What is ChadWallet?",
    answer:
      "ChadWallet is a premium cryptocurrency trading platform that lets you trade, track, and manage your portfolio across multiple blockchains with lightning-fast execution and real-time market data.",
  },
  {
    question: "Which chains are supported?",
    answer:
      "We currently support Solana, Ethereum, Base, Arbitrum, Polygon, and BNB Chain. More chains are being added regularly.",
  },
  {
    question: "Is ChadWallet secure?",
    answer:
      "Yes. We use industry-leading security practices including Privy authentication, non-custodial wallet connections, and encrypted data storage via Supabase.",
  },
  {
    question: "How do I start trading?",
    answer:
      "Connect your wallet using Google or Apple login, fund your wallet with SOL or other supported tokens, search for a token, and execute your trade through our Jupiter-powered swap engine.",
  },
  {
    question: "What fees does ChadWallet charge?",
    answer:
      "ChadWallet charges a minimal 0.1% platform fee on swaps. Standard network gas fees apply separately.",
  },
  {
    question: "Can I track my portfolio?",
    answer:
      "Absolutely. ChadWallet provides real-time portfolio tracking, P&L calculations, watchlists, and detailed transaction history across all connected wallets.",
  },
] as const;

export const FEATURES = [
  {
    title: "Lightning Swaps",
    description:
      "Execute trades in milliseconds with Jupiter-powered routing across all Solana DEXs.",
    icon: "Zap",
  },
  {
    title: "Real-Time Data",
    description:
      "Live prices, charts, and market data powered by BirdEye and TradingView integration.",
    icon: "Activity",
  },
  {
    title: "Portfolio Tracking",
    description:
      "Track your holdings, P&L, and performance across multiple wallets and chains.",
    icon: "PieChart",
  },
  {
    title: "Smart Watchlists",
    description:
      "Create custom watchlists, set price alerts, and never miss a trading opportunity.",
    icon: "Star",
  },
  {
    title: "Multi-Chain",
    description:
      "Trade across Solana, Ethereum, Base, and more from a single unified interface.",
    icon: "Globe",
  },
  {
    title: "Secure Auth",
    description:
      "Sign in with Google or Apple via Privy. Your keys, your crypto, always.",
    icon: "Shield",
  },
] as const;

export const MARKET_STATS = [
  { label: "Total Volume", value: "$2.4B", change: 12.5 },
  { label: "Active Traders", value: "48.2K", change: 8.3 },
  { label: "Tokens Listed", value: "12,450", change: 5.1 },
  { label: "Avg. Swap Time", value: "0.4s", change: -15.2 },
] as const;
