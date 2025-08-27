// app/(drawer)/dashboard.tsx
import { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

interface BudginoData {
  budget?: number;
  remaining?: number;
  threshold?: number;
  lastResetMonth?: number;
  lastResetYear?: number;
}

export default function Dashboard() {
  const [remaining, setRemaining] = useState<number>(0);
  const [threshold, setThreshold] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadData = async () => {
        try {
          const s = await AsyncStorage.getItem("budginoData");
          let data: BudginoData = s ? JSON.parse(s) : {};

          // Auto reset on 1st of month
          const today = new Date();
          const m = today.getMonth();
          const y = today.getFullYear();

          if ((data.lastResetMonth !== m || data.lastResetYear !== y) && today.getDate() === 1) {
            data.remaining = Number(data.budget) || 0;
            data.lastResetMonth = m;
            data.lastResetYear = y;
            await AsyncStorage.setItem("budginoData", JSON.stringify(data));
          }

          if (isActive) {
            setRemaining(Number(data.remaining) || 0);
            setThreshold(Number(data.threshold) || 0);
          }
        } catch (e) {
          console.warn("Failed to load budget data", e);
          if (isActive) {
            setRemaining(0);
            setThreshold(0);
          }
        }
      };

      loadData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  // Color logic
  let color = "#22c55e"; // green
  if (!remaining) color = "#3b82f6"; // blue when 0
  if (remaining <= threshold && (remaining || threshold)) color = "#ef4444"; // red when ≤ threshold

  return (
    <View style={styles.container}>
      <View style={[styles.card, { borderColor: color }]}>
        <Text style={[styles.amount, { color }]}>₹{remaining}</Text>
        <Text style={styles.label}>Remaining Balance</Text>
      </View>
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
  card: {
    width: "85%",
    maxWidth: 520,
    padding: 30,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  amount: {
    fontSize: 40,
    fontWeight: "800",
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    color: "#6b7280",
  },
});
