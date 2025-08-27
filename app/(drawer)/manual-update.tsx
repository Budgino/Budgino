// app/(drawer)/manual-update.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function ManualUpdate() {
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const updateBalance = async () => {
    try {
      const s = await AsyncStorage.getItem("budginoData");
      if (!s) {
        Alert.alert("Error", "No budget data found.");
        return;
      }

      const data = JSON.parse(s);
      const delta = Math.max(0, Number(amount) || 0);
      const next = Math.max(0, (Number(data.remaining) || 0) - delta);

      data.remaining = next;
      await AsyncStorage.setItem("budginoData", JSON.stringify(data));

      Alert.alert("Updated", `₹${delta} deducted. Remaining: ₹${next}`);
      setAmount("");
      router.replace("/(drawer)/dashboard");
    } catch (e) {
      console.warn("Failed to update balance", e);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.label}>Enter Expense Amount (₹)</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholder="e.g. 1200"
            textAlignVertical="center"
          />

          <TouchableOpacity style={styles.button} onPress={updateBalance} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
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
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    color: "#111827",
  },
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
