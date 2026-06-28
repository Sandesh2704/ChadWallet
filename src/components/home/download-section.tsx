"use client";

import { motion } from "framer-motion";
import { Smartphone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadSection() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 rounded-lg border border-border bg-gradient-to-br from-card to-card/50 overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
          <div className="relative z-10">
            <Smartphone className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trade On The Go
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Download ChadWallet for iOS and Android. Get push notifications for price alerts and never miss a trade.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <Download size={18} /> App Store
              </Button>
              <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                <Download size={18} /> Google Play
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
