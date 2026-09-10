import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NearMeScreen from './src/screens/NearMeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NearMeScreen />
    </SafeAreaProvider>
  );
}