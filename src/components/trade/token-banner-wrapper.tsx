import { TokenBanner } from "./token-banner";
import type { Token } from "@/types";

interface TokenBannerWrapperProps {
  tokens: Token[];
  position: "top" | "bottom";
}

export function TokenBannerWrapper({ tokens, position }: TokenBannerWrapperProps) {
  return <TokenBanner tokens={tokens} position={position} />;
}
