"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated logo */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{ 
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          }}
          className="relative"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center shadow-2xl shadow-accent/10">
            <span className="text-3xl font-bold text-accent">⚡</span>
          </div>
          
          {/* Pulsing ring */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 -m-4 rounded-2xl border-2 border-accent/20"
          />
        </motion.div>

        {/* Loading text with animated dots */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-lg font-semibold text-foreground">Loading</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
              className="text-lg font-semibold text-foreground"
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
              className="text-lg font-semibold text-foreground"
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}
              className="text-lg font-semibold text-foreground"
            >
              .
            </motion.span>
          </div>
          <p className="text-sm text-muted-foreground">Preparing your trading experience</p>
        </div>

        {/* Progress bar */}
        <motion.div 
          className="w-48 h-1 rounded-full bg-border overflow-hidden mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-purple-400"
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
}