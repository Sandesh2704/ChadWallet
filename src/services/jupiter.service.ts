import type { SwapQuote } from "@/types";

const JUPITER_API = process.env.NEXT_PUBLIC_JUPITER_API_URL ?? "https://quote-api.jup.ag/v6";
const USE_LIVE_DATA = process.env.NEXT_PUBLIC_USE_LIVE_DATA === "true";

const SOL_MINT = "So11111111111111111111111111111111111111112";

export async function getSwapQuote(
  inputMint: string,
  outputMint: string,
  amount: number,
  slippageBps = 50
): Promise<SwapQuote | null> {
  if (!USE_LIVE_DATA) {
    const mockRate = 0.95 + Math.random() * 0.1;
    return {
      inputMint,
      outputMint,
      inAmount: String(amount),
      outAmount: String(Math.floor(amount * mockRate)),
      priceImpactPct: Math.random() * 0.5,
      slippageBps,
      route: "Mock Route via Jupiter",
    };
  }

  try {
    const res = await fetch(
      `${JUPITER_API}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      inputMint: data.inputMint,
      outputMint: data.outputMint,
      inAmount: data.inAmount,
      outAmount: data.outAmount,
      priceImpactPct: Number(data.priceImpactPct ?? 0),
      slippageBps,
      route: data.routePlan?.map((r: { swapInfo: { label: string } }) => r.swapInfo.label).join(" → ") ?? "Direct",
    };
  } catch {
    return null;
  }
}

export async function executeSwap(
  quote: SwapQuote,
  userPublicKey: string
): Promise<{ success: boolean; txHash?: string; error?: string }> {
  if (!USE_LIVE_DATA) {
    await new Promise((r) => setTimeout(r, 1500));
    return {
      success: true,
      txHash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
    };
  }

  try {
    const res = await fetch(`${JUPITER_API}/swap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quoteResponse: quote,
        userPublicKey,
        wrapAndUnwrapSol: true,
      }),
    });
    if (!res.ok) return { success: false, error: "Swap failed" };
    const data = await res.json();
    return { success: true, txHash: data.swapTransaction };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}

export { SOL_MINT };
