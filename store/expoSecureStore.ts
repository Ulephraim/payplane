/** @format */

import * as SecureStore from 'expo-secure-store';
import { StateStorage } from 'zustand/middleware';

// Define the storage implementation for Zustand persistence
export const zustandStorage: StateStorage = {
  setItem: async (name, value) => {
    await SecureStore.setItemAsync(name, value); // Save data securely
  },
  getItem: async (name) => {
    const value = await SecureStore.getItemAsync(name); // Retrieve data securely
    return value ?? null; // Return value or null if not found
  },
  removeItem: async (name) => {
    // Remove the stored item
    await SecureStore.deleteItemAsync(name);
  },
};
