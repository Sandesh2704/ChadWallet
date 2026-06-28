"use client";

import { motion } from "framer-motion";
import { Smartphone, Download, Apple, Chrome, ChevronRight, Star, Users, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  { icon: Zap, label: "Instant trades" },
  { icon: Shield, label: "Secure wallet" },
  { icon: Users, label: "Community driven" },
];

export function DownloadSection() {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden ">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 md:p-12 lg:p-16 rounded-3xl border border-border bg-card/40 backdrop-blur-sm "
        >
          {/* Animated gradient orb */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"
          />
          
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
          />

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6"
                >
                  <Smartphone className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-accent">Mobile App</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
                >
                  Trade On The{" "}
                  <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
                    Go
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground text-lg mb-6 max-w-md"
                >
                  Download our app for iOS and Android. Get push notifications for price alerts and never miss a trade.
                </motion.p>

                {/* Feature list */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-3 gap-4 mb-8"
                >
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex flex-col items-center text-center p-3 rounded-xl border border-border bg-card/30 hover:border-accent/30 transition-all duration-300"
                    >
                      <feature.icon className="w-5 h-5 text-accent mb-1" />
                      <span className="text-xs text-muted-foreground">{feature.label}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Download buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button 
                    size="lg" 
                    className="group relative overflow-hidden gap-3 bg-accent hover:bg-accent/90 text-white w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center gap-3">
                      <Apple className="w-5 h-5" />
                      <div className="text-left">
                        <div className="text-xs opacity-80">Download on the</div>
                        <div className="font-semibold">App Store</div>
                      </div>
                    </span>
                  </Button>

                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="group gap-3 border-border hover:border-accent/50 hover:bg-accent/5 w-full sm:w-auto"
                  >
                    <Chrome className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">Get it on</div>
                      <div className="font-semibold text-foreground">Google Play</div>
                    </div>
                  </Button>
                </motion.div>

                {/* Rating */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 flex items-center gap-4"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    4.9 • 10K+ reviews
                  </span>
                </motion.div>
              </div>

              {/* Right - Phone Mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                className="relative hidden lg:flex justify-center items-center"
              >
                <div className="relative w-72 h-auto">
                  {/* Phone frame */}
                  <div className="relative rounded-[2.5rem] border-2 border-border bg-background p-3 shadow-2xl shadow-accent/10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-background rounded-b-xl z-20" />
                    
                    {/* Phone screen content */}
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent/5 to-purple-500/5 aspect-[9/19]">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-accent" />
                          </div>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-success/50" />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
                            <div className="flex justify-between">
                              <span className="text-xs text-muted-foreground">SOL</span>
                              <span className="text-xs font-medium text-success">+4.2%</span>
                            </div>
                            <div className="text-lg font-bold text-foreground">$142.50</div>
                          </div>
                          
                          <div className="p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
                            <div className="flex justify-between">
                              <span className="text-xs text-muted-foreground">ETH</span>
                              <span className="text-xs font-medium text-success">+2.8%</span>
                            </div>
                            <div className="text-lg font-bold text-foreground">$3,245</div>
                          </div>
                          
                          <div className="p-3 rounded-xl bg-gradient-to-r from-accent/20 to-purple-500/20 border border-accent/20">
                            <div className="text-center">
                              <div className="text-xs text-muted-foreground">Total Portfolio</div>
                              <div className="text-xl font-bold text-foreground">$24,891</div>
                              <div className="text-xs text-success mt-1">+12.3% this week</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-6 -right-6 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-2"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <Zap className="w-3 h-3 text-accent" />
                      <span className="text-foreground font-medium">Live</span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-4 -left-4 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-2"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <Shield className="w-3 h-3 text-accent" />
                      <span className="text-foreground font-medium">Secure</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Bottom indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-8 pt-6 border-t border-border flex justify-center"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Available on</span>
                <span className="font-medium text-foreground">iOS</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span className="font-medium text-foreground">Android</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span className="font-medium text-foreground">Web</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}