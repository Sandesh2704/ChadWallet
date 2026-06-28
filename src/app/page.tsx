import { Suspense } from "react";

import { getTrendingTokens } from "@/services/birdeye.service";
import { MARKET_STATS } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { SupportedChains } from "@/components/home/supported-chains";
import { TrendingTokens } from "@/components/trade/trending-tokens";
import { HowItWorks } from "@/components/home/how-it-works";
import { DownloadSection } from "@/components/home/download-section";
import { FAQ } from "@/components/home/faq";
import { Footer } from "@/components/layout/footer";
import { TokenBannerWrapper } from "@/components/trade/token-banner-wrapper";

export default async function HomePage() {
  const tokens = await getTrendingTokens(30);

  return (
    <>
      <Suspense fallback={<Skeleton className="h-12 w-full fixed top-0" />}>
        <TokenBannerWrapper tokens={tokens} position="top" />
      </Suspense>

      <Navbar />

      <main className="pt-10">
        <Hero stats={[...MARKET_STATS]} featuredTokens={tokens} />
        <Features />
        <SupportedChains />
        <TrendingTokens tokens={tokens} />
        <HowItWorks />
        <DownloadSection />
        <FAQ />
      </main>

      <Footer />

      <Suspense fallback={null}>
        <TokenBannerWrapper tokens={tokens} position="bottom" />
      </Suspense>
    </>
  );
}
