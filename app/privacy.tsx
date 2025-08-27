// app/privacy.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AccessibilityInfo,
  Alert,
} from "react-native";

export default function Privacy() {
  const router = useRouter();

  const accept = async () => {
    try {
      await AsyncStorage.setItem("hasAcceptedTerms", "true");
      router.replace("/(drawer)/dashboard");
    } catch (e) {
      console.warn("Failed to save acceptance", e);
      Alert.alert("Error", "Something went wrong saving your choice. Please try again.");
    }
  };

  // Announce screen to accessibility on load
  AccessibilityInfo.announceForAccessibility("Privacy & Terms screen");

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.title}>Privacy & Terms</Text>

        <Text style={styles.body}>
          Budgino stores your data only on your device (no cloud, no servers).
          SMS reading is optional and exists solely to auto-update balances from
          bank messages. We do not use AI or send any personal data to external
          services.
        </Text>

        <Text style={styles.body}>
          By tapping Accept, you agree that Budgino may process SMS locally on
          your phone (if you enable the feature) and that you are responsible
          for managing your data.
        </Text>

        <TouchableOpacity style={styles.button} onPress={accept} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Accept & Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    maxWidth: 500,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  body: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 12,
    lineHeight: 20,
  },
  button: {
    marginTop: 8,
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
