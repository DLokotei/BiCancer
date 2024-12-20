import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { AppColors } from '@/assets/Colors';
import { EmitWhenAllDependenciesLoaded } from '@/features/splash/appLoadingHelper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  let [allLoaded, setAllLoaded] = useState(false)
  EmitWhenAllDependenciesLoaded(() => { setAllLoaded(true) })

  // hide splash when all is loaded
  useEffect(() => {
    if (allLoaded) {
      SplashScreen.hideAsync();
    }
  }, [allLoaded]);

  if (!allLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: AppColors.appPinkMain,
          },
          headerTintColor: AppColors.appPinkDarker,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding_screen" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
