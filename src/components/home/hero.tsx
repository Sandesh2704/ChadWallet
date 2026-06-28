"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Smartphone, Zap, Shield, TrendingUp, Sparkles, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "@/features/auth/connect-wallet-button";
import { formatNumber } from "@/utils/cn";
import type { Token } from "@/types";
import { TokenLogo } from "../trade/token-card";

interface HeroProps {
  stats: { label: string; value: string; change: number }[];
  featuredTokens: Token[];
}

export function Hero({ stats, featuredTokens }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={ref}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      <AnimatedBackground />
      
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Status Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            <span className="text-sm font-medium text-accent">Live on Solana Mainnet</span>
            <Sparkles className="w-3 h-3 text-accent" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Trade Like a{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-accent via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%] animate-shimmer">
                Chad
              </span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                className="absolute -top-2 -right-8"
              >
                <Star className="w-6 h-6 text-accent fill-accent" />
              </motion.span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Lightning-fast swaps, real-time market data, and portfolio tracking.
            The premium crypto trading experience you deserve.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <ConnectWalletButton size="lg" />
            <Link href="/trade/SOL">
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 border-border hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 group"
              >
                Start Trading 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Download Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          >
            <Button 
              variant="secondary" 
              size="lg" 
              className="gap-2 bg-card/50 backdrop-blur-sm border border-border hover:border-accent/30 hover:bg-accent/10 transition-all duration-300 group"
            >
              <Smartphone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Download Android</span>
              <span className="text-xs text-muted-foreground">• APK</span>
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="gap-2 bg-card/50 backdrop-blur-sm border border-border hover:border-accent/30 hover:bg-accent/10 transition-all duration-300 group"
            >
              <Smartphone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Download iPhone</span>
              <span className="text-xs text-muted-foreground">• iOS</span>
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 group"
              >
                <p className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {stat.value}
                  {stat.change && (
                    <span className={`text-xs ml-1 ${stat.change >= 0 ? 'text-success' : 'text-danger'}`}>
                      {stat.change >= 0 ? '↑' : '↓'}
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1 text-muted-foreground/50"
            >
              <span className="text-xs">Scroll to explore</span>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <FloatingTokens tokens={featuredTokens} />
    </section>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary glow */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[128px]"
      />
      
      {/* Secondary glow */}
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]"
      />
      
      {/* Tertiary glow */}
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[128px]"
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #8B5CF6 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}

function FloatingTokens({ tokens }: { tokens: Token[] }) {
  const tokenColors = [
    "from-violet-500 to-purple-500",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-rose-500 to-pink-500",
    "from-indigo-500 to-violet-500",
  ];

  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
      {tokens.slice(0, 8).map((token, i) => {
        const isLeft = i < 4;
        const position = isLeft ? i : i - 4;
        const yOffset = 10 + position * 18;
        const xOffset = 3 + position * 4;
        const delay = i * 0.3;
        const duration = 5 + (i % 3) * 2;
        const colorIndex = i % tokenColors.length;

        return (
          <motion.div
            key={token.symbol}
            className="absolute p-3 rounded-xl border border-border/30 bg-card/60 backdrop-blur-md shadow-lg"
            style={{
              top: `${yOffset}%`,
              [isLeft ? 'left' : 'right']: `${xOffset}%`,
            }}
            initial={{ opacity: 0, scale: 0.8, x: isLeft ? -50 : 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: 0,
              y: [0, -20, 0],
            }}
            transition={{ 
              opacity: { delay, duration: 0.6 },
              scale: { delay, duration: 0.6, type: "spring", stiffness: 200 },
              x: { delay, duration: 0.6, type: "spring", stiffness: 100 },
              y: { 
                delay: delay + 1,
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{ scale: 1.1, borderColor: "rgba(139, 92, 246, 0.4)" }}
          >
            <div className="flex items-center gap-3">
              <TokenLogo
                    symbol={token.symbol}
                    logoURI={token.logoURI}
                    size="sm"
                  />
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">{token.symbol}</p>
                <p className="text-xs text-muted-foreground">
                  ${token.price?.toFixed(2) || '0.00'}
                </p>
              </div>
              {token.priceChange24h && (
                <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${token.priceChange24h >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                  {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(1)}%
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}