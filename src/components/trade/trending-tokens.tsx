"use client";

import { motion } from "framer-motion";
import { TokenCard } from "./token-card";
import type { Token } from "@/types";

interface TrendingTokensProps {
  tokens: Token[];
}

export function TrendingTokens({ tokens }: TrendingTokensProps) {
  return (
    <section id="trending" className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trending Tokens
          </h2>
          <p className="text-muted-foreground">
            Discover the hottest tokens on Solana right now.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tokens.slice(0, 12).map((token, i) => (
            <motion.div
              key={token.symbol}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <TokenCard token={token} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
