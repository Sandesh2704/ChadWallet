"use client";

import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useAuthStore } from "@/store/auth-store";
import { useWalletStore } from "@/store/wallet-store";
import { syncPrivyUser } from "@/services/auth.service";

export function AuthSync() {
  const { authenticated, user, ready } = usePrivy();
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);
  const setAddress = useWalletStore((s) => s.setAddress);

  useEffect(() => {
    if (!ready) return;

    if (authenticated && user) {
      syncPrivyUser({
        id: user.id,
        email: user.email ? { address: user.email.address } : undefined,
        google: user.google
          ? { email: user.google.email ?? "", name: user.google.name ?? "" }
          : undefined,
        apple: user.apple ? { email: user.apple.email ?? "" } : undefined,
        wallet: user.wallet ? { address: user.wallet.address } : undefined,
      }).then((dbUser) => {
        if (dbUser) {
          setUser(dbUser);
        } else {
          setUser({
            id: user.id,
            privyId: user.id,
            email: user.email?.address,
            walletAddress: user.wallet?.address,
            displayName: user.google?.name ?? undefined,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      });

      if (user.wallet?.address) {
        setAddress(user.wallet.address);
      }
    } else {
      setLoading(false);
    }
  }, [authenticated, user, ready, setUser, setLoading, setAddress]);

  return null;
}
