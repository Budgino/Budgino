// app/index.tsx
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  AccessibilityInfo,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const boot = async () => {
      try {
        const accepted = await AsyncStorage.getItem("hasAcceptedTerms");

        // Accessibility: announce app is loading
        AccessibilityInfo.announceForAccessibility("Loading Budgino...");

        timeout = setTimeout(() => {
          if (accepted === "true") {
            router.replace("/(drawer)/dashboard");
          } else {
            router.replace("/privacy");
          }
        }, 1000); // splash delay
      } catch (e) {
        console.warn("Error reading AsyncStorage", e);
        router.replace("/privacy"); // fallback if storage fails
      }
    };

    boot();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budgino</Text>
      <Text style={styles.subtitle}>Smart Budget Tracking</Text>
      <ActivityIndicator size="large" color="#2563eb" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563eb",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 8,
  },
  loader: {
    marginTop: 16,
  },
});
