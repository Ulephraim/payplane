/** @format */

import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Utility to save to SecureStore
export const saveToSecureStore = async (
  key: string,
  value: string
): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`Data saved: ${key} = ${value}`);
  } catch (error) {
    console.error('Error saving to SecureStore', error);
  }
};

// Utility to get from SecureStore
const getFromSecureStore = async (key: string): Promise<string | null> => {
  try {
    const result = await SecureStore.getItemAsync(key);
    return result || null;
  } catch (error) {
    console.error('Error retrieving from SecureStore', error);
    return null;
  }
};

// Storage key
const storageKey = 'inactivity-storage';

// User Inactivity Provider
export const UserInactivityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const recordStartTime = async () => {
    console.log('Recording start time...');
    const now = Date.now();
    await saveToSecureStore('startTime', now.toString());
  };

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === 'background') {
      await recordStartTime();
    } else if (nextAppState === 'active' && appState.current === 'background') {
      const storedStartTime = await getFromSecureStore('startTime');
      const startTime = storedStartTime ? parseInt(storedStartTime, 10) : 0;
      const elapsed = Date.now() - startTime;

      if (elapsed > 3000) {
        router.replace('/(auth)/(modals)/lock');
      }
    }
    appState.current = nextAppState;
    console.log('App state changed to:', nextAppState);
  };

  return children;
};
