"use client";

import { TokenCard } from "./token-card";
import type { Token } from "@/types";

interface TokenBannerProps {
  tokens: Token[];
  position?: "top" | "bottom";
}

export function TokenBanner({ tokens, position = "top" }: TokenBannerProps) {
  const duplicated = [...tokens, ...tokens];

  return (
    <div
      className={`fixed ${position === "top" ? "top-0" : "bottom-0"} left-0 right-0 z-40 overflow-hidden border-${position === "top" ? "b" : "t"} border-border bg-background/80 backdrop-blur-xl`}
    >
      <div className="flex animate-scroll-left hover:[animation-play-state:paused] py-2 gap-3">
        {duplicated.map((token, i) => (
          <TokenCard key={`${token.symbol}-${i}`} token={token} variant="banner" />
        ))}
      </div>
    </div>
  );
}
