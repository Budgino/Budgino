// app/(drawer)/set-budget.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const BANKS = [
  { name: "— Select Bank —", short: "" },
  { name: "HDFC Bank", short: "HDFC" },
  { name: "ICICI Bank", short: "ICICI" },
  { name: "State Bank of India", short: "SBI" },
  { name: "Axis Bank", short: "AXIS" },
  { name: "Kotak Mahindra Bank", short: "KOTAK" },
  { name: "Yes Bank", short: "YES" },
  { name: "IDFC First Bank", short: "IDFC" },
  { name: "Punjab National Bank", short: "PNB" },
];

export default function SetBudget() {
  const [budget, setBudget] = useState("");
  const [threshold, setThreshold] = useState("");
  const [bankIndex, setBankIndex] = useState(0);
  const router = useRouter();

  const saveBudget = async () => {
    try {
      const b = Math.max(0, Number(budget) || 0);
      const t = Math.max(0, Number(threshold) || 0);
      const bank = BANKS[bankIndex] || BANKS[0];

      if (b === 0) {
        Alert.alert("Invalid Budget", "Please enter a valid budget amount.");
        return;
      }

      const now = new Date();
      const data = {
        budget: b,
        remaining: b,
        threshold: t,
        bankName: bank.name,
        bankShort: bank.short,
        lastResetMonth: now.getMonth(),
        lastResetYear: now.getFullYear(),
      };

      await AsyncStorage.setItem("budginoData", JSON.stringify(data));
      Alert.alert("Saved", `Budget set: ₹${b}`, [
        { text: "OK", onPress: () => router.replace("/(drawer)/dashboard") },
      ]);
    } catch (e) {
      console.warn("Failed to save budget", e);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.label}>Monthly Budget (₹)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={budget}
            onChangeText={setBudget}
            placeholder="e.g. 50000"
          />

          <Text style={styles.label}>Minimum Threshold (₹)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={threshold}
            onChangeText={setThreshold}
            placeholder="e.g. 5000"
          />

          <Text style={styles.label}>Bank</Text>
          <View style={styles.pickerWrap}>
            <Picker selectedValue={bankIndex} onValueChange={(v) => setBankIndex(v)}>
              {BANKS.map((b, idx) => (
                <Picker.Item key={b.name} label={b.name} value={idx} />
              ))}
            </Picker>
          </View>

          <Text style={styles.hint}>
            Shortcut: <Text style={{ fontWeight: "700" }}>{BANKS[bankIndex].short || "—"}</Text>
          </Text>

          <TouchableOpacity style={styles.button} onPress={saveBudget} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Save Budget</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  card: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  label: { fontSize: 14, color: "#374151", marginTop: 12, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: "#111827",
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
  },
  hint: { fontSize: 13, color: "#6b7280", marginBottom: 16, marginTop: 6 },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
