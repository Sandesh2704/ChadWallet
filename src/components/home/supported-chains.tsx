"use client";

import { motion } from "framer-motion";
import { SUPPORTED_CHAINS } from "@/constants";
import { Check, ChevronRight } from "lucide-react";

export function SupportedChains() {
  return (
    <section id="chains" className="py-24 px-4 md:px-8 relative overflow-y-visible overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
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
            <span className="text-xs font-medium text-accent">🌐 Supported Networks</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Multi-Chain{" "}
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Support
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Trade across the most popular blockchains from a single interface.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {SUPPORTED_CHAINS.map((chain, i) => (
            <motion.div
              key={chain.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.08,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative"
            >
              <motion.div
                className="relative p-5 rounded-xl border border-border bg-card hover:border-accent/40 transition-all duration-300 cursor-pointer"
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative flex flex-col items-center text-center">
                  <motion.div
                    className="text-3xl mb-3"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {chain.icon}
                  </motion.div>
                  
                  <p className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors duration-300">
                    {chain.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {chain.symbol}
                  </p>

                  {/* Status indicator */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="mt-3 flex items-center gap-1.5"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/60 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                    </span>
                    <span className="text-[10px] text-muted-foreground">Active</span>
                  </motion.div>

                  {/* Decorative line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-0.5 bg-accent/60 transition-all duration-500 rounded-full" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm">
            <span className="text-sm text-muted-foreground">
              🚀 More chains coming soon
            </span>
            <ChevronRight className="w-4 h-4 text-accent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}