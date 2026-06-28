import { Suspense } from "react";
import { notFound } from "next/navigation";
import { TradingSidebar } from "@/features/trading/trading-sidebar";
import { TradePanel } from "@/features/trading/trade-panel";
import { WalletCard, PortfolioCard } from "@/features/trading/wallet-portfolio";
import { RecentTrades, HolderList, MarketActivityFeed } from "@/features/trading/market-data";
import { Skeleton } from "@/components/ui/skeleton";
import { TradingViewChartWrapper } from "@/features/trading/tradingview-chart-wrapper";
import { getTokenBySymbol, getTrendingTokens, getTokenTrades, getTokenHolders } from "@/services/birdeye.service";
import { MOCK_PORTFOLIO, MOCK_WATCHLISTS, MOCK_MARKET_ACTIVITY } from "@/lib/mock-data";
import { formatNumber } from "@/utils/cn";
import { TokenBannerWrapper } from "@/components/trade/token-banner-wrapper";
import { PriceBadge, StatItem } from "@/components/trade/price-badge";

interface TradePageProps {
  params: Promise<{ symbol: string }>;
}

export default async function TradePage({ params }: TradePageProps) {
  const { symbol } = await params;
  const token = await getTokenBySymbol(symbol);

  if (!token) notFound();

  const [tokens, trades, holders] = await Promise.all([
    getTrendingTokens(30),
    getTokenTrades(symbol, 50),
    getTokenHolders(symbol, 50),
  ]);

  return (
    <>
      <Suspense fallback={<Skeleton className="h-12 w-full fixed top-0" />}>
        <TokenBannerWrapper tokens={tokens} position="top" />
      </Suspense>

      <div className="min-h-screen pt-16 pb-14">
        <div className="w-full mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-9 gap-4">
            {/* Left Sidebar */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="lg:sticky lg:top-16 space-y-4">
                <TradingSidebar
                  tokens={tokens}
                  watchlists={MOCK_WATCHLISTS}
                />
              </div>
            </div>

            {/* Center Content */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
              {/* Token Header */}
              <div className="p-5 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center text-sm font-bold text-white">
                    {token.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{token.name}</h1>
                    <p className="text-sm text-muted-foreground">{token.symbol} / SOL</p>
                  </div>
                </div>
                <PriceBadge price={token.price} change24h={token.priceChange24h} size="lg" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
                  <StatItem label="Market Cap" value={formatNumber(token.marketCap)} />
                  <StatItem label="Volume 24h" value={formatNumber(token.volume24h)} />
                  <StatItem label="Liquidity" value={formatNumber(token.liquidity)} />
                  <StatItem label="Holders" value={token.holders.toLocaleString()} />
                </div>
              </div>

              {/* Chart */}
              <TradingViewChartWrapper symbol={token.symbol} height={500} />

              {/* Token Info */}
              <div className="p-5 rounded-lg border border-border bg-card">
                <h3 className="text-base font-semibold text-foreground mb-3">About {token.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {token.name} ({token.symbol}) is a {token.category.toLowerCase()} token on the {token.chain} blockchain.
                  Current market cap is {formatNumber(token.marketCap)} with {token.holders.toLocaleString()} holders.
                </p>
              </div>

              {/* Market Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RecentTrades trades={trades} />
                <HolderList holders={holders} />
              </div>

              <MarketActivityFeed activities={MOCK_MARKET_ACTIVITY} />
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-2 order-3 ">
              <div className="lg:sticky lg:top-16 space-y-4">
                <TradePanel token={token} />
                <WalletCard
                  balances={[
                    { symbol: "SOL", balance: 12.45, value: 12.45 * token.price, logoURI: "" },
                  ]}
                />
                <PortfolioCard items={MOCK_PORTFOLIO} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <TokenBannerWrapper tokens={tokens} position="bottom" />
      </Suspense>
    </>
  );
}

export async function generateMetadata({ params }: TradePageProps) {
  const { symbol } = await params;
  const token = await getTokenBySymbol(symbol);
  return {
    title: token ? `Trade ${token.symbol}` : "Trade",
    description: token ? `Trade ${token.name} (${token.symbol}) on ChadWallet` : undefined,
  };
}
