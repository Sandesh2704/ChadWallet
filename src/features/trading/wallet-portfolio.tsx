"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAddress, formatNumber, formatTokenAmount } from "@/utils/cn";
import type { WalletBalance, PortfolioItem } from "@/types";

interface WalletCardProps {
  balances: WalletBalance[];
  address?: string;
}

export function WalletCard({ balances, address }: WalletCardProps) {
  const totalValue = balances.reduce((sum, b) => sum + b.value, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Wallet Balance</CardTitle>
        {address && (
          <p className="text-xs text-muted-foreground font-mono">{formatAddress(address, 6)}</p>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-foreground mb-4">{formatNumber(totalValue)}</p>
        <div className="space-y-2">
          {balances.map((balance) => (
            <div key={balance.symbol} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center text-[8px] font-bold text-white">
                  {balance.symbol.slice(0, 2)}
                </div>
                <span className="text-sm text-foreground">{balance.symbol}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {formatTokenAmount(balance.balance)}
                </p>
                <p className="text-xs text-muted-foreground">{formatNumber(balance.value)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface PortfolioCardProps {
  items: PortfolioItem[];
}

export function PortfolioCard({ items }: PortfolioCardProps) {
  const totalValue = items.reduce((sum, i) => sum + i.value, 0);
  const totalPnl = items.reduce((sum, i) => sum + i.pnl, 0);
  const isPositive = totalPnl >= 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold text-foreground">{formatNumber(totalValue)}</p>
          <span className={`text-sm font-medium ${isPositive ? "text-success" : "text-danger"}`}>
            {isPositive ? "+" : ""}{formatNumber(totalPnl)}
          </span>
        </div>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center text-[8px] font-bold text-white">
                  {item.token.symbol.slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.token.symbol}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTokenAmount(item.balance)} @ {formatNumber(item.avgBuyPrice)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{formatNumber(item.value)}</p>
                <p className={`text-xs ${item.pnl >= 0 ? "text-success" : "text-danger"}`}>
                  {item.pnl >= 0 ? "+" : ""}{item.pnlPercent.toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
