"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/constants";
import { HelpCircle, MessageCircle, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredItems = FAQ_ITEMS.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 px-4 md:px-8 relative overflow-y-visible overflow-x-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative">
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
            <HelpCircle className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-accent">FAQ</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
            <span className="text-xs text-muted-foreground">{FAQ_ITEMS.length} Questions</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about our platform.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <MessageCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No questions found matching your search.</p>
            </motion.div>
          ) : (
            <Accordion 
              type="single" 
              collapsible 
              className="space-y-3"
              onValueChange={(value) => {
                const index = parseInt(value?.split("-")[1] || "-1");
                setActiveIndex(index);
              }}
            >
              {filteredItems.map((item, i) => {
                const originalIndex = FAQ_ITEMS.indexOf(item);
                const isActive = activeIndex === originalIndex;
                
                return (
                  <AccordionItem
                    key={originalIndex}
                    value={`item-${originalIndex}`}
                    className={cn(
                      "border rounded-xl overflow-hidden transition-all duration-300",
                      isActive 
                        ? "border-accent/40 bg-accent/5 shadow-lg shadow-accent/5" 
                        : "border-border bg-card/50 hover:border-accent/20"
                    )}
                  >
                    <AccordionTrigger className={cn(
                      "px-6 py-4 hover:no-underline text-foreground hover:text-accent transition-colors duration-300",
                      "data-[state=open]:text-accent"
                    )}>
                      <span className="flex items-center gap-3 text-left">
                        <span className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                          isActive ? "bg-accent/20 text-accent" : "bg-accent/5 text-muted-foreground"
                        )}>
                          {i + 1}
                        </span>
                        <span className="text-sm md:text-base font-medium">
                          {item.question}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-0">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-9 text-muted-foreground leading-relaxed border-l-2 border-accent/30 pl-6"
                      >
                        {item.answer}
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </motion.div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="relative p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-purple-500/5" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
            
            <div className="relative">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span className="text-foreground font-medium">Still have questions?</span>
                </div>
                <Button className="bg-accent hover:bg-accent/90 text-white">
                  Contact Support
                  <MessageCircle className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Our team is ready to help you 24/7
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}