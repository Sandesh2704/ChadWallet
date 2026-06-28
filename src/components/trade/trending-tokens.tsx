"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TokenCard } from "./token-card";
import type { Token } from "@/types";
import { Flame, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrendingTokensProps {
  tokens: Token[];
}

export function TrendingTokens({ tokens }: TrendingTokensProps) {
  const [visibleCount, setVisibleCount] = useState(8);
  const displayedTokens = tokens.slice(0, visibleCount);
  const hasMore = visibleCount < tokens.length;

  return (
    <section id="trending" className="py-24 scroll-mt-28 px-4 md:px-8 relative overflow-y-visible overflow-x-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-4"
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-medium text-accent">Live Trending</span>
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trending{" "}
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Tokens
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover the hottest tokens on Solana right now.
          </p>
        </motion.div>

        {/* Token Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayedTokens.map((token, i) => (
            <motion.div
              key={token.symbol}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.06,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              whileHover={{ y: -4 }}
            >
              <TokenCard token={token}  />
            </motion.div>
          ))}
        </div>

        {/* Load More / Show All */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button
              onClick={() => setVisibleCount(prev => Math.min(prev + 4, tokens.length))}
              variant="outline"
              className="group border-border hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Show More Tokens
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
        )}

     

        {/* Live indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>Live prices updated in real-time</span>
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}