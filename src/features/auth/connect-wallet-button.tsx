"use client";

import { usePrivy } from "@privy-io/react-auth";
import { LogOut, User, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useWalletStore } from "@/store/wallet-store";
import { handleLogout } from "@/services/auth.service";
import { cn } from "@/lib/utils";

interface ConnectWalletButtonProps {
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
}

export function ConnectWalletButton({
  size = "default",
  className,
  variant = "default",
}: ConnectWalletButtonProps) {
  const { login, logout, authenticated, user, ready } = usePrivy();
  const { isAuthenticated } = useAuthStore();
  const { address, disconnect } = useWalletStore();

  const handleLogin = () => {
    login({
      loginMethods: ["google", "apple"],
    });
  };

  const handleLogoutClick = async () => {
    await logout();
    await handleLogout();
    useAuthStore.getState().logout();
    disconnect();
  };

  if (!ready) {
    return (
      <Button size={size} variant={variant} className={cn("gap-2", className)} disabled>
        <Wallet size={16} /> Loading...
      </Button>
    );
  }

  if (authenticated || isAuthenticated) {
    const displayName =
      user?.google?.name ??
      user?.email?.address?.split("@")[0] ??
      address?.slice(0, 6) ??
      "User";

    return (
      <div className="flex items-center gap-2">
        <Button size={size} variant="outline" className={cn("gap-2", className)}>
          <User size={16} />
          {displayName}
        </Button>
        <Button size={size} variant="ghost" onClick={handleLogoutClick}>
          <LogOut size={16} />
        </Button>
      </div>
    );
  }

  return (
    <Button size={size} variant={variant} className={cn("gap-2", className)} onClick={handleLogin}>
      <Wallet size={16} /> Connect Wallet
    </Button>
  );
}
