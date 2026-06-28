"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const TradingViewChart = dynamic(
  () => import("./tradingview-chart").then((m) => m.TradingViewChart),
  { ssr: false, loading: () => <Skeleton className="w-full h-[500px] rounded-lg" /> }
);

interface TradingViewChartWrapperProps {
  symbol: string;
  height?: number;
}

export function TradingViewChartWrapper({ symbol, height = 500 }: TradingViewChartWrapperProps) {
  return <TradingViewChart symbol={symbol} height={height} />;
}
