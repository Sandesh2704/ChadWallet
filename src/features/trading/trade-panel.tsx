"use client";

import { useState } from "react";
import { ArrowDownUp, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSettingsStore } from "@/store/settings-store";
import { useNotificationStore } from "@/store/notification-store";
import { getSwapQuote, executeSwap } from "@/services/jupiter.service";
import { formatPrice, formatTokenAmount } from "@/utils/cn";
import type { Token } from "@/types";

interface TradePanelProps {
  token: Token;
  solBalance?: number;
}

export function TradePanel({ token, solBalance = 12.45 }: TradePanelProps) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState<string | null>(null);
  const { slippage } = useSettingsStore();
  const addNotification = useNotificationStore((s) => s.addNotification);

  const handleGetQuote = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setIsLoading(true);
    const result = await getSwapQuote(
      "So11111111111111111111111111111111111111112",
      token.address,
      parseFloat(amount) * 1e9,
      slippage * 100
    );
    if (result) {
      setQuote(formatTokenAmount(parseFloat(result.outAmount) / Math.pow(10, token.decimals)));
    }
    setIsLoading(false);
  };

  const handleSwap = async () => {
    if (!amount) return;
    setIsLoading(true);
    const swapQuote = await getSwapQuote(
      "So11111111111111111111111111111111111111112",
      token.address,
      parseFloat(amount) * 1e9,
      slippage * 100
    );
    if (!swapQuote) {
      addNotification({ type: "error", title: "Failed to get quote" });
      setIsLoading(false);
      return;
    }
    const result = await executeSwap(swapQuote, "mock-wallet-address");
    if (result.success) {
      addNotification({
        type: "success",
        title: "Swap Successful",
        message: `Bought ${quote} ${token.symbol}`,
      });
      setAmount("");
      setQuote(null);
    } else {
      addNotification({ type: "error", title: "Swap Failed", message: result.error });
    }
    setIsLoading(false);
  };

  const setPercentage = (pct: number) => {
    setAmount((solBalance * pct).toFixed(4));
  };

  return (
    <Card className="">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          Trade
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="buy" className="flex-1 data-[state=active]:text-success">
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="flex-1 data-[state=active]:text-danger">
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted-foreground">You pay</label>
                <span className="text-xs text-muted-foreground">
                  Balance: {solBalance.toFixed(2)} SOL
                </span>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pr-16 text-lg h-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                  SOL
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                {[0.25, 0.5, 0.75, 1].map((pct) => (
                  <Button
                    key={pct}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs h-7"
                    onClick={() => setPercentage(pct)}
                  >
                    {pct * 100}%
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowDownUp size={16} className="text-muted-foreground" />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">You receive</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="0.00"
                  value={quote ?? ""}
                  readOnly
                  className="pr-20 text-lg h-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                  {token.symbol}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Price</span>
                <span>{formatPrice(token.price)}</span>
              </div>
              <div className="flex justify-between">
                <span>Slippage</span>
                <span>{slippage}%</span>
              </div>
            </div>

            <Button
              className="w-full h-12 text-base"
              variant="success"
              disabled={!amount || isLoading}
              onClick={quote ? handleSwap : handleGetQuote}
            >
              {isLoading ? "Processing..." : quote ? `Buy ${token.symbol}` : "Get Quote"}
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">You sell</label>
              <div className="relative">
                <Input type="number" placeholder="0.00" className="pr-20 text-lg h-12" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                  {token.symbol}
                </span>
              </div>
            </div>
            <Button className="w-full h-12 text-base" variant="destructive" disabled>
              Sell {token.symbol}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
