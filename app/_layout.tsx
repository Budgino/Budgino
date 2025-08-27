// app/_layout.tsx
import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

// Prevent splash from hiding automatically
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadResources() {
      try {
        // Load custom fonts here (add more if needed)
        await Font.loadAsync({
          "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        console.warn("Error loading fonts", e);
      } finally {
        setIsReady(true);
      }
    }

    loadResources();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [isReady]);

  if (!isReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerTintColor: "#2563eb" }}>
            <Stack.Screen
              name="privacy"
              options={{
                title: "Privacy & Terms",
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="(drawer)" // keep the parentheses
              options={{ headerShown: false }} 
            />
            {/* ⚡️ You don’t need to explicitly define (drawer) here.
                Expo Router automatically handles it via (drawer)/_layout.tsx */}
          </Stack>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
