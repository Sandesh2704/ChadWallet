import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  slippage: number;
  priorityFee: number;
  defaultChain: string;
  notifications: boolean;
  setSlippage: (slippage: number) => void;
  setPriorityFee: (fee: number) => void;
  setDefaultChain: (chain: string) => void;
  setNotifications: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      slippage: 0.5,
      priorityFee: 0.0001,
      defaultChain: "solana",
      notifications: true,
      setSlippage: (slippage) => set({ slippage }),
      setPriorityFee: (priorityFee) => set({ priorityFee }),
      setDefaultChain: (defaultChain) => set({ defaultChain }),
      setNotifications: (notifications) => set({ notifications }),
    }),
    { name: "chad-settings" }
  )
);
