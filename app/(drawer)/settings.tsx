// app/(drawer)/settings.tsx
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  Button,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

type ThemeOption = "system" | "light" | "dark";

export default function Settings() {
  const [automation, setAutomation] = useState(false);
  const [theme, setTheme] = useState<ThemeOption>("system");

  // Load saved settings
  useEffect(() => {
    (async () => {
      const automationVal = await AsyncStorage.getItem("automation");
      if (automationVal) setAutomation(automationVal === "true");

      const themeVal = await AsyncStorage.getItem("theme");
      if (themeVal === "system" || themeVal === "light" || themeVal === "dark") {
        setTheme(themeVal);
      }
    })();
  }, []);

  const maybeAskSmsPermission = async () => {
    if (Platform.OS !== "android") return true;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: "Budgino SMS Permission",
          message:
            "Allow Budgino to read bank SMS to auto-update your remaining balance. This stays on your device.",
          buttonPositive: "Allow",
          buttonNegative: "Deny",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
      return false;
    }
  };

  const onToggleAutomation = async () => {
    if (!automation) {
      const ok = await maybeAskSmsPermission();
      if (!ok) {
        Alert.alert("Permission required", "SMS permission was not granted.");
        return;
      }
    }
    const next = !automation;
    setAutomation(next);
    await AsyncStorage.setItem("automation", String(next));
  };

  const onChangeTheme = async (value: ThemeOption) => {
    setTheme(value);
    await AsyncStorage.setItem("theme", value);
    Alert.alert("Theme changed", `Applied ${value} mode`);
  };

  const clearData = async () => {
    await AsyncStorage.removeItem("budginoData");
    Alert.alert("Cleared", "All local data has been cleared.");
  };

  return (
    <View style={styles.container}>
      {/* Automation Toggle */}
      <View style={styles.row}>
        <Text style={styles.label}>Enable Automation (SMS Reading)</Text>
        <Switch value={automation} onValueChange={onToggleAutomation} />
      </View>
      <Text style={styles.note}>
        SMS reading is optional. Data never leaves your device. You can disable this anytime.
      </Text>

      {/* Theme Picker */}
      <Text style={[styles.label, { marginTop: 20 }]}>App Theme</Text>
      <View style={styles.pickerWrap}>
        <Picker selectedValue={theme} onValueChange={onChangeTheme}>
          <Picker.Item label="System Default" value="system" />
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
        </Picker>
      </View>

      {/* Clear Data Button */}
      <Button title="Clear All Data" color={"#ef4444"} onPress={clearData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: { fontSize: 16, color: "#111827" },
  note: { fontSize: 12, color: "#6b7280", marginBottom: 20 },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
});
