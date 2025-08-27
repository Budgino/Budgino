// app/(drawer)/about.tsx
import { View, Text, StyleSheet } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.app}>Budgino</Text>
        <Text style={styles.tag}>Minimal. Private. Offline-first.</Text>

        <Text style={styles.body}>
          Budgino helps you set a monthly budget, track spending, and get warned when you hit your
          minimum threshold. Your data stays on your phone — no cloud, no accounts.
        </Text>

        <Text style={styles.meta}>Version 1.0.0</Text>
        <Text style={styles.meta}>© {new Date().getFullYear()} Budgino</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  app: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2563eb",
  },
  tag: {
    marginTop: 4,
    color: "#6b7280",
    marginBottom: 12,
    fontSize: 14,
  },
  body: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
    marginBottom: 16,
  },
  meta: {
    fontSize: 12,
    color: "#6b7280",
  },
});
