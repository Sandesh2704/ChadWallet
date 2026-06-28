"use client";

import { motion } from "framer-motion";
import {
  Zap, Activity, PieChart, Star, Globe, Shield, TrendingUp, Users, Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FEATURES } from "@/constants";
import { cn } from "@/lib/utils";

const ICON_MAP = { 
  Zap, Activity, PieChart, Star, Globe, Shield, TrendingUp, Users, Lock 
};

const gradientColors = [
  "from-violet-500/20 to-purple-500/10",
  "from-blue-500/20 to-cyan-500/10",
  "from-emerald-500/20 to-teal-500/10",
  "from-amber-500/20 to-orange-500/10",
  "from-rose-500/20 to-pink-500/10",
  "from-indigo-500/20 to-violet-500/10",
];

export function Features() {
  return (
    <section id="features" className="py-24 scroll-mt-28 px-4 md:px-8 relative overflow-y-visible overflow-x-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
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
            <span className="text-xs font-medium text-accent">✨ Features</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Trade Smarter
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Professional-grade tools designed for both beginners and experienced traders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon as keyof typeof ICON_MAP];
            const gradient = gradientColors[i % gradientColors.length];
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full hover:border-accent/40 transition-all duration-500 group relative overflow-hidden bg-card/50 backdrop-blur-sm">
                  {/* Gradient background on hover */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                    gradient
                  )} />
                  
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  
                  <CardContent className="p-8 relative">
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-all duration-300 relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-7 h-7 text-accent group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Decorative line */}
                    <div className="mt-4 w-12 h-0.5 bg-accent/30 group-hover:w-full group-hover:bg-accent/60 transition-all duration-500 rounded-full" />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}