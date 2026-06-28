"use client";

import { cn } from "@/lib/utils";
import { formatPrice, formatPercent, formatNumber } from "@/utils/cn";

interface PriceBadgeProps {
  price: number;
  change24h: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceBadge({ price, change24h, size = "md", className }: PriceBadgeProps) {
  const isPositive = change24h >= 0;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn("font-semibold text-foreground", {
          "text-sm": size === "sm",
          "text-base": size === "md",
          "text-2xl": size === "lg",
        })}
      >
        {formatPrice(price)}
      </span>
      <span
        className={cn("font-medium rounded-md px-1.5 py-0.5", {
          "text-xs": size === "sm",
          "text-sm": size === "md",
          "text-base": size === "lg",
          "text-success bg-success/10": isPositive,
          "text-danger bg-danger/10": !isPositive,
        })}
      >
        {formatPercent(change24h)}
      </span>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: string | number;
  className?: string;
}

export function StatItem({ label, value, className }: StatItemProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">
        {typeof value === "number" ? formatNumber(value) : value}
      </span>
    </div>
  );
}
