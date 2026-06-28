"use client";
import NextLink from "next/link";
import { Link } from "react-scroll";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/constants";
import { ConnectWalletButton } from "@/features/auth/connect-wallet-button";
import Image from "next/image";

const NAV_LINKS = [
  { to: "features", label: "Features" },
  { to: "chains", label: "Chains" },
  { to: "trending", label: "Trending" },
  { to: "how-it-works", label: "How It Works" },
  { to: "faq", label: "FAQ" },
];
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-20 left-0 right-0 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-6 rounded-lg border border-border/50 bg-background/60 backdrop-blur-xl">
<NextLink href="/" className="flex items-center gap-2">
  <Image
    src="/logo.png" // or /logo.svg
    alt="Agent Threads"
    width={32}
    height={32}
    priority
    className="w-8 h-8"
  />

  <span className="text-lg font-bold text-foreground">
    {APP_NAME}
  </span>
</NextLink>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
        <Link
  key={link.to}
  to={link.to}
  smooth={true}
  duration={700}
  offset={-110}
  spy={true}
  className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors"
>
  {link.label}
</Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
          <NextLink href="/trade/SOL">
              <Button variant="outline" size="sm">Trade</Button>
          </NextLink>
            <ConnectWalletButton size="sm" />
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 p-4 rounded-lg border border-border bg-card/95 backdrop-blur-xl"
            >
              {NAV_LINKS.map((link) => (
               <Link
  key={link.to}
  to={link.to}
  smooth={true}
  duration={700}
  offset={-110}
  spy={true}
  className="block py-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
  onClick={() => setMobileOpen(false)}
>
  {link.label}
</Link>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <Link href="/trade/SOL">
                  <Button variant="outline" className="w-full">Trade</Button>
                </Link>
                <ConnectWalletButton className="w-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
