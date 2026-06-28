"use client";

import { motion } from "framer-motion";
import { Wallet, Search, ArrowLeftRight, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Sign in with Google or Apple. Your wallet is created instantly.",
    color: "from-violet-500/20 to-purple-500/10",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: Search,
    title: "Find Tokens",
    description: "Search trending tokens or browse categories to find your next trade.",
    color: "from-blue-500/20 to-cyan-500/10",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: ArrowLeftRight,
    title: "Execute Swaps",
    description: "Get the best rates via Jupiter routing across all Solana DEXs.",
    color: "from-emerald-500/20 to-teal-500/10",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: TrendingUp,
    title: "Track Portfolio",
    description: "Monitor your holdings, P&L, and performance in real-time.",
    color: "from-amber-500/20 to-orange-500/10",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    iconColor: "text-amber-400",
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="py-24 scroll-mt-28 px-4 md:px-8 relative overflow-y-visible overflow-x-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-4"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-accent">Simple Process</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start trading in four simple steps. Get started in minutes.
          </p>
        </motion.div>

        {/* Desktop: Horizontal flow with connecting lines */}
        <div className="hidden lg:grid grid-cols-4 gap-6 relative">
          {/* Connecting lines */}
          <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-0.5 -translate-y-1/2">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-accent/60 to-accent/30" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-accent via-accent to-accent origin-left"
                style={{ transformOrigin: "left" }}
              />
            </div>
          </div>

          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              onHoverStart={() => setActiveStep(i)}
              onHoverEnd={() => setActiveStep(null)}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                {/* Step number with icon */}
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={cn(
                    "w-20 h-20 rounded-2xl border flex items-center justify-center mx-auto transition-all duration-300 relative",
                    step.borderColor,
                    activeStep === i ? "bg-accent/20 scale-110" : "bg-card/50"
                  )}>
                    {/* Background glow */}
                    <div className={cn(
                      "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 bg-gradient-to-br",
                      step.color,
                      activeStep === i && "opacity-100"
                    )} />
                    
                    <step.icon className={cn(
                      "w-8 h-8 relative z-10 transition-all duration-300",
                      step.iconColor,
                      activeStep === i && "scale-110"
                    )} />
                    
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-accent/30">
                      {i + 1}
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  className="mt-4"
                  animate={{
                    y: activeStep === i ? -4 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>

                {/* Decorative indicator */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-accent/30" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet: Vertical/Card layout */}
        <div className="lg:hidden space-y-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
              className="relative"
            >
              <div className={cn(
                "flex items-start gap-4 p-5 rounded-xl border transition-all duration-300",
                step.borderColor,
                "bg-card/50 backdrop-blur-sm hover:bg-card/80"
              )}>
                {/* Step number */}
                <div className="flex-shrink-0">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    step.bgColor
                  )}>
                    <step.icon className={cn("w-6 h-6", step.iconColor)} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                      Step {i + 1}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {/* Arrow indicator */}
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block flex-shrink-0 self-center">
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl border border-border bg-card/30 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-foreground">Ready to start?</span>
            </div>
            <button className="text-sm font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-2">
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}