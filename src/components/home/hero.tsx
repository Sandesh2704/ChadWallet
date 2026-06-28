"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "@/features/auth/connect-wallet-button";
import { formatNumber } from "@/utils/cn";
import type { Token } from "@/types";

interface HeroProps {
  stats: { label: string; value: string; change: number }[];
  featuredTokens: Token[];
}

export function Hero({ stats, featuredTokens }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
        <div
         
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Live on Solana Mainnet</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6">
            Trade Like a{" "}
            <span className="bg-gradient-to-r from-accent via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Chad
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Lightning-fast swaps, real-time market data, and portfolio tracking.
            The premium crypto trading experience you deserve.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <ConnectWalletButton size="lg" />
            <Link href="/trade/SOL">
              <Button variant="outline" size="lg" className="gap-2">
                Start Trading <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button variant="secondary" size="lg" className="gap-2">
              <Smartphone size={18} /> Download Android
            </Button>
            <Button variant="secondary" size="lg" className="gap-2">
              <Smartphone size={18} /> Download iPhone
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm"
            >
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <FloatingTokens tokens={featuredTokens} />
    </section>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "3s" }} />
    </div>
  );
}

function FloatingTokens({ tokens }: { tokens: Token[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      {tokens.slice(0, 6).map((token, i) => (
        <motion.div
          key={token.symbol}
          className="absolute p-3 rounded-lg border border-border/30 bg-card/40 backdrop-blur-sm"
          style={{
            top: `${15 + (i % 3) * 25}%`,
            left: i < 3 ? `${5 + i * 5}%` : undefined,
            right: i >= 3 ? `${5 + (i - 3) * 5}%` : undefined,
          }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center text-xs font-bold text-white">
              {token.symbol.slice(0, 2)}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{token.symbol}</p>
              <p className="text-xs text-muted-foreground">{formatNumber(token.marketCap)}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
