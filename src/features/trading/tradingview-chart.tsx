"use client";

import { useEffect, useRef } from "react";

interface TradingViewChartProps {
  symbol: string;
  height?: number;
}

export function TradingViewChart({ symbol, height = 500 }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

      const exchange = (() => {
    switch (symbol.toUpperCase()) {
      case "BTC":
      case "ETH":
      case "SOL":
      case "BNB":
      case "XRP":
      case "DOGE":
      case "ADA":
      case "LINK":
        return "BINANCE";

      case "PUMP":
        return "BYBIT";

      default:
        return "BYBIT";
    }
  })();


    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (typeof window.TradingView !== "undefined") {
        new window.TradingView.widget({
          container_id: containerRef.current?.id ?? "tradingview_chart",
symbol: `${exchange}:${symbol}USD`,
          interval: "60",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#18181B",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          backgroundColor: "#18181B",
          gridColor: "#27272A",
          width: "100%",
          height,
          studies: ["RSI@tv-basicstudies", "MASimple@tv-basicstudies"],
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [symbol, height]);

  return (
    <div
      id="tradingview_chart"
      ref={containerRef}
      className="w-full rounded-lg overflow-hidden border border-border"
      style={{ height }}
    />
  );
}

declare global {
  interface Window {
    TradingView: {
      widget: new (config: Record<string, unknown>) => void;
    };
  }
}



interface DexScreenerChartProps {
  pairAddress: string;
  chain?: string;
  height?: number;
}

export function DexScreenerChart({
  pairAddress,
  chain = "solana",
  height = 500,
}: DexScreenerChartProps) {
  return (
    <div
      className="w-full rounded-lg overflow-hidden border border-border bg-card"
      style={{ height }}
    >
      <iframe
        title="DexScreener Chart"
        src={`https://dexscreener.com/${chain}/${pairAddress}?embed=1&theme=dark`}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}

