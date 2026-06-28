import { upsertUser, getUserByPrivyId } from "./supabase.service";
import type { User } from "@/types";

export async function syncPrivyUser(privyUser: {
  id: string;
  email?: { address: string };
  wallet?: { address: string };
  google?: { email: string; name: string };
  apple?: { email: string };
}): Promise<User | null> {
  const existing = await getUserByPrivyId(privyUser.id);

  const userData = {
    privyId: privyUser.id,
    email: privyUser.email?.address ?? privyUser.google?.email ?? privyUser.apple?.email,
    walletAddress: privyUser.wallet?.address,
    displayName: privyUser.google?.name,
  };

  if (existing) {
    return upsertUser(userData);
  }

  return upsertUser(userData);
}

export async function handleLogout(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("chad-auth");
    localStorage.removeItem("chad-wallet");
  }
}
