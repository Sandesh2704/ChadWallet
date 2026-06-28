"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatTokenAmount, formatAddress, formatNumber } from "@/utils/cn";
import type { TokenTrade, TokenHolder, MarketActivity } from "@/types";

interface RecentTradesProps {
  trades: TokenTrade[];
}

export function RecentTrades({ trades }: RecentTradesProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-4 text-xs text-muted-foreground pb-2 border-b border-border">
            <span>Type</span>
            <span className="text-right">Price</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Time</span>
          </div>
          {trades.slice(0, 20).map((trade) => (
            <div key={trade.id} className="grid grid-cols-4 text-xs py-1.5 hover:bg-border/20 rounded">
              <Badge variant={trade.type === "buy" ? "success" : "destructive"} className="w-fit text-[10px]">
                {trade.type}
              </Badge>
              <span className="text-right text-foreground">{formatPrice(trade.price)}</span>
              <span className="text-right text-muted-foreground">{formatTokenAmount(trade.amount)}</span>
              <span className="text-right text-muted-foreground">
                {new Date(trade.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface HolderListProps {
  holders: TokenHolder[];
}

export function HolderList({ holders }: HolderListProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Top Holders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-4 text-xs text-muted-foreground pb-2 border-b border-border">
            <span>#</span>
            <span>Address</span>
            <span className="text-right">%</span>
            <span className="text-right">Value</span>
          </div>
          {holders.slice(0, 15).map((holder) => (
            <div key={holder.address} className="grid grid-cols-4 text-xs py-1.5 hover:bg-border/20 rounded">
              <span className="text-muted-foreground">{holder.rank}</span>
              <span className="text-foreground font-mono">{formatAddress(holder.address)}</span>
              <span className="text-right text-foreground">{holder.percentage.toFixed(2)}%</span>
              <span className="text-right text-muted-foreground">{formatNumber(holder.value)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface MarketActivityFeedProps {
  activities: MarketActivity[];
}

export function MarketActivityFeed({ activities }: MarketActivityFeedProps) {
  const typeColors = {
    large_buy: "text-success",
    large_sell: "text-danger",
    whale_move: "text-warning",
    new_holder: "text-accent",
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Market Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <div className={`w-2 h-2 rounded-full mt-1.5 ${typeColors[activity.type].replace("text-", "bg-")}`} />
              <div className="flex-1">
                <p className={`${typeColors[activity.type]}`}>{activity.description}</p>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(activity.amount)} &middot; {new Date(activity.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
