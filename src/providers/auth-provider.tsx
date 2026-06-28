"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { AuthSync } from "@/features/auth/auth-sync";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? "clpispd2q00h1l50f8q8x8q8q";

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#8B5CF6",
          logo: undefined,
        },
        loginMethods: ["google"],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <AuthSync />
      {children}
    </PrivyProvider>
  );
}
