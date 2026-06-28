"use client";

import { useState } from "react";
import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { TOKEN_CATEGORIES } from "@/constants";
import { usePortfolioStore } from "@/store/portfolio-store";
import { debounce } from "@/utils/cn";
import type { Token, Watchlist } from "@/types";
import { TokenCard } from "@/components/trade/token-card";

interface TradingSidebarProps {
  tokens: Token[];
  watchlists: Watchlist[];
  onSearch?: (query: string) => void;
}

export function TradingSidebar({ tokens, watchlists, onSearch }: TradingSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { favorites, addFavorite, removeFavorite, isFavorite } = usePortfolioStore();

  const handleSearch = debounce((query: string) => {
    onSearch?.(query);
  }, 300);

  const filteredTokens =
    selectedCategory === "All"
      ? tokens
      : selectedCategory === "Trending"
        ? tokens.slice(0, 10)
        : tokens.filter((t) => t.category === selectedCategory);

  const favoriteTokens = tokens.filter((t) => favorites.includes(t.address));

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search tokens..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </div>

      <Tabs defaultValue="trending">
        <TabsList className="w-full">
          <TabsTrigger value="trending" className="flex-1 text-xs">Trending</TabsTrigger>
          <TabsTrigger value="watchlist" className="flex-1 text-xs">Watchlist</TabsTrigger>
          <TabsTrigger value="favorites" className="flex-1 text-xs">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-1 mt-3">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {TOKEN_CATEGORIES.map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className="cursor-pointer text-xs"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
          <div className="max-h-[calc(100vh-280px)] overflow-y-auto space-y-0.5">
            {filteredTokens.map((token) => (
              <div key={token.address} className="relative group">
                <TokenCard token={token} variant="compact" />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.preventDefault();
                    isFavorite(token.address)
                      ? removeFavorite(token.address)
                      : addFavorite(token.address);
                  }}
                >
                  <Star
                    size={14}
                    className={isFavorite(token.address) ? "fill-warning text-warning" : "text-muted-foreground"}
                  />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="watchlist" className="mt-3">
          <div className="max-h-[calc(100vh-180px)] overflow-y-auto ">
 {watchlists.map((wl) => (
            <div key={wl.id} className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">{wl.name}</h4>
              <div className="space-y-0.5">
                {tokens
                  .filter((t) => wl.tokens.includes(t.address))
                  .map((token) => (
                    <TokenCard key={token.address} token={token} variant="compact" />
                  ))}
              </div>
            </div>
          ))}
          </div>
         
        </TabsContent>

        <TabsContent value="favorites" className="mt-3">
          <div className="space-y-0.5 max-h-[calc(100vh-180px)] overflow-y-auto">
            {favoriteTokens.length > 0 ? (
              favoriteTokens.map((token) => (
                <TokenCard key={token.address} token={token} variant="compact" />
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No favorites yet. Star tokens to add them here.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
