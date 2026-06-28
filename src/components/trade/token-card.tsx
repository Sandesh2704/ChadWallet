"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatPrice, formatPercent, formatNumber } from "@/utils/cn";
import type { Token } from "@/types";

interface TokenCardProps {
  token: Token;
  variant?: "default" | "compact" | "banner";
  className?: string;
}

export function TokenCard({ token, variant = "default", className }: TokenCardProps) {
  const isPositive = token.priceChange24h >= 0;

  if (variant === "banner") {
    return (
      <Link href={`/trade/${token.symbol}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm hover:border-accent/30 transition-all cursor-pointer whitespace-nowrap",
            className
          )}
        >
          <TokenLogo symbol={token.symbol} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">{token.symbol}</span>
            <span className="text-xs text-muted-foreground">{token.name}</span>
          </div>
          <span className="text-sm font-medium text-foreground ml-2">{formatPrice(token.price)}</span>
          <span className={cn("text-xs font-medium", isPositive ? "text-success" : "text-danger")}>
            {formatPercent(token.priceChange24h)}
          </span>
          <span className="text-xs text-muted-foreground ml-1">MC {formatNumber(token.marketCap)}</span>
          <span className="text-xs text-muted-foreground">Vol {formatNumber(token.volume24h)}</span>
        </motion.div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/trade/${token.symbol}`}>
        <motion.div
          whileHover={{ backgroundColor: "rgba(39, 39, 42, 0.8)" }}
          className={cn(
            "flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-border/30 transition-all cursor-pointer",
            className
          )}
        >
          <div className="flex items-center gap-2.5">
            <TokenLogo symbol={token.symbol} size="sm" />
            <div>
              <p className="text-sm font-medium text-foreground">{token.symbol}</p>
              <p className="text-xs text-muted-foreground">{token.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{formatPrice(token.price)}</p>
            <p className={cn("text-xs", isPositive ? "text-success" : "text-danger")}>
              {formatPercent(token.priceChange24h)}
            </p>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/trade/${token.symbol}`}>
      <motion.div
        whileHover={{ y: -2 }}
        className={cn(
          "p-4 rounded-lg border border-border bg-card hover:border-accent/30 transition-all cursor-pointer",
          className
        )}
      >
        <div className="flex items-center gap-3 mb-3">
          <TokenLogo symbol={token.symbol} />
          <div>
            <p className="font-semibold text-foreground">{token.symbol}</p>
            <p className="text-xs text-muted-foreground">{token.name}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">{formatPrice(token.price)}</span>
          <span className={cn("text-sm font-medium px-2 py-0.5 rounded-md", isPositive ? "text-success bg-success/10" : "text-danger bg-danger/10")}>
            {formatPercent(token.priceChange24h)}
          </span>
        </div>
        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
          <span>MC {formatNumber(token.marketCap)}</span>
          <span>Vol {formatNumber(token.volume24h)}</span>
        </div>
      </motion.div>
    </Link>
  );
}

function TokenLogo({ symbol, size = "md" }: { symbol: string; size?: "sm" | "md" }) {
  const colors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-yellow-500",
    "from-red-500 to-rose-500",
  ];
  const colorIndex = symbol.charCodeAt(0) % colors.length;

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-white shrink-0",
        colors[colorIndex],
        size === "sm" ? "w-7 h-7 text-[10px]" : "w-9 h-9 text-xs"
      )}
    >
      {symbol.slice(0, 2)}
    </div>
  );
}
