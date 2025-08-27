// app/(drawer)/contact.tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as MailComposer from "expo-mail-composer";
import * as Linking from "expo-linking";

export default function Contact() {
  const [message, setMessage] = useState("");

  const send = async () => {
    const options = {
      recipients: ["support@budgino.app"],
      subject: "Budgino Support",
      body: message || "(Describe your issue here)",
    };

    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (isAvailable) {
        await MailComposer.composeAsync(options);
      } else {
        const url = `mailto:support@budgino.app?subject=${encodeURIComponent(
          options.subject
        )}&body=${encodeURIComponent(options.body)}`;
        const opened = await Linking.openURL(url);
        if (!opened) Alert.alert("Error", "No email client available.");
      }
      Alert.alert("Success", "Email client opened successfully.");
      setMessage(""); // Clear message after sending
    } catch (e) {
      console.warn("Error sending email", e);
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
          <Text style={styles.label}>Tell us what went wrong or share feedback</Text>

          <TextInput
            style={styles.input}
            multiline
            numberOfLines={8}
            value={message}
            onChangeText={setMessage}
            placeholder="Write your message..."
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.button} onPress={send} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Send Email</Text>
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
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    minHeight: 160,
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
