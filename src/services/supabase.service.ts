import { createClient } from "@supabase/supabase-js";
import type { User, Watchlist, Transaction, UserSettings, Favorite } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function upsertUser(user: Partial<User> & { privyId: string }): Promise<User | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("users")
    .upsert(
      {
        privy_id: user.privyId,
        email: user.email,
        wallet_address: user.walletAddress,
        display_name: user.displayName,
        avatar_url: user.avatarUrl,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "privy_id" }
    )
    .select()
    .single();

  if (error) return null;

  return {
    id: data.id,
    privyId: data.privy_id,
    email: data.email,
    walletAddress: data.wallet_address,
    displayName: data.display_name,
    avatarUrl: data.avatar_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function getUserByPrivyId(privyId: string): Promise<User | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("privy_id", privyId)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    privyId: data.privy_id,
    email: data.email,
    walletAddress: data.wallet_address,
    displayName: data.display_name,
    avatarUrl: data.avatar_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function getWatchlists(userId: string): Promise<Watchlist[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("watchlists")
    .select("*")
    .eq("user_id", userId);

  if (error || !data) return [];

  return data.map((w) => ({
    id: w.id,
    name: w.name,
    tokens: w.tokens ?? [],
    createdAt: w.created_at,
    updatedAt: w.updated_at,
  }));
}

export async function getTransactions(userId: string, limit = 50): Promise<Transaction[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("timestamp", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data.map((t) => ({
    id: t.id,
    userId: t.user_id,
    type: t.type,
    tokenSymbol: t.token_symbol,
    tokenAddress: t.token_address,
    amount: t.amount,
    price: t.price,
    total: t.total,
    fee: t.fee,
    status: t.status,
    txHash: t.tx_hash,
    timestamp: t.timestamp,
  }));
}

export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    userId: data.user_id,
    slippage: data.slippage,
    priorityFee: data.priority_fee,
    defaultChain: data.default_chain,
    notifications: data.notifications,
    theme: "dark",
  };
}

export async function getFavorites(userId: string): Promise<Favorite[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId);

  if (error || !data) return [];

  return data.map((f) => ({
    id: f.id,
    userId: f.user_id,
    tokenAddress: f.token_address,
    tokenSymbol: f.token_symbol,
    createdAt: f.created_at,
  }));
}
