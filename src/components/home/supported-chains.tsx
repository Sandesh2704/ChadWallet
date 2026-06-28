"use client";

import { motion } from "framer-motion";
import { SUPPORTED_CHAINS } from "@/constants";

export function SupportedChains() {
  return (
    <section id="chains" className="py-24 px-4 md:px-8 bg-card/30">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Multi-Chain Support
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Trade across the most popular blockchains from a single interface.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {SUPPORTED_CHAINS.map((chain, i) => (
            <motion.div
              key={chain.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-6 py-4 rounded-lg border border-border bg-card hover:border-accent/30 transition-all cursor-pointer"
            >
              <span className="text-2xl">{chain.icon}</span>
              <div className="text-left">
                <p className="font-semibold text-foreground">{chain.name}</p>
                <p className="text-xs text-muted-foreground">{chain.symbol}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
