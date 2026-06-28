import type { WalletBalance } from "@/types";
import { MOCK_TOKENS } from "@/lib/mock-data";

const USE_LIVE_DATA = process.env.NEXT_PUBLIC_USE_LIVE_DATA === "true";
const RPC_URL = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL;

export async function getWalletBalances(address: string): Promise<WalletBalance[]> {
  if (!USE_LIVE_DATA || !RPC_URL) {
    return [
      {
        symbol: "SOL",
        balance: 12.45,
        value: 12.45 * (MOCK_TOKENS[0]?.price ?? 150),
        logoURI: "",
      },
      ...MOCK_TOKENS.slice(1, 5).map((t) => ({
        symbol: t.symbol,
        balance: Math.random() * 10000,
        value: Math.random() * 10000 * t.price,
        logoURI: t.logoURI,
      })),
    ];
  }

  try {
    const res = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [address],
      }),
    });
    const json = await res.json();
    const lamports = json.result?.value ?? 0;
    const solBalance = lamports / 1e9;
    const solPrice = MOCK_TOKENS[0]?.price ?? 150;

    return [
      {
        symbol: "SOL",
        balance: solBalance,
        value: solBalance * solPrice,
        logoURI: "",
      },
    ];
  } catch {
    return [];
  }
}

export async function getSolanaBalance(address: string): Promise<number> {
  const balances = await getWalletBalances(address);
  const sol = balances.find((b) => b.symbol === "SOL");
  return sol?.balance ?? 0;
}
