import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WalletBalance } from "@/types";

interface WalletState {
  address: string | null;
  balances: WalletBalance[];
  isConnected: boolean;
  setAddress: (address: string | null) => void;
  setBalances: (balances: WalletBalance[]) => void;
  setConnected: (connected: boolean) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      balances: [],
      isConnected: false,
      setAddress: (address) => set({ address, isConnected: !!address }),
      setBalances: (balances) => set({ balances }),
      setConnected: (isConnected) => set({ isConnected }),
      disconnect: () => set({ address: null, balances: [], isConnected: false }),
    }),
    { name: "chad-wallet", partialize: (state) => ({ address: state.address, isConnected: state.isConnected }) }
  )
);
