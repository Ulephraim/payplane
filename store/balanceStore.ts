/** @format */

import { create } from 'zustand';
import { zustandStorage } from './expoSecureStore';
import { createJSONStorage, persist } from 'zustand/middleware';

// Define interfaces for Transaction and BalanceState
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
}

export interface BalanceState {
  transactions: Array<Transaction>;
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransactions: () => void;
}

// Create Zustand store with persistence using Expo Secure Store
export const useBalanceStore = create<BalanceState>()(
  persist(
    (set, get) => ({
      transactions: [], // Initialize with an empty array
      runTransaction: (transaction: Transaction) => {
        set((state) => ({
          transactions: [...state.transactions, transaction],
        }));
      },
      balance: () =>
        get().transactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        ), // Calculate the balance
      clearTransactions: () => {
        set({ transactions: [] }); // Clear the transactions state
      },
    }),
    {
      name: 'balance', // The name of the persisted key in Secure Store
      storage: createJSONStorage(() => zustandStorage), // Use Expo Secure Store for persistence
    }
  )
);
