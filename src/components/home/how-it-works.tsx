"use client";

import { motion } from "framer-motion";
import { Wallet, Search, ArrowLeftRight, TrendingUp } from "lucide-react";

const STEPS = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Sign in with Google or Apple. Your wallet is created instantly.",
  },
  {
    icon: Search,
    title: "Find Tokens",
    description: "Search trending tokens or browse categories to find your next trade.",
  },
  {
    icon: ArrowLeftRight,
    title: "Execute Swaps",
    description: "Get the best rates via Jupiter routing across all Solana DEXs.",
  },
  {
    icon: TrendingUp,
    title: "Track Portfolio",
    description: "Monitor your holdings, P&L, and performance in real-time.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 md:px-8 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start trading in four simple steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto">
                  <step.icon className="w-7 h-7 text-accent" />
                </div>
                <span className="absolute -top-2 -right-2 md:right-auto md:-left-2 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
