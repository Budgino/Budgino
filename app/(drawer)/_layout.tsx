// app/(drawer)/_layout.tsx
import { Drawer } from "expo-router/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Share, Linking, View, Text, Alert, Image } from "react-native";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const handleRateUs = async () => {
    const url = "https://play.google.com/store/apps/details?id=com.budgino";
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open the store link.");
      }
    } catch (e) {
      Alert.alert("Error", "Something went wrong while opening the store.");
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          "Try Budgino – a simple, private budgeting app.\nhttps://play.google.com/store/apps/details?id=com.budgino",
      });
    } catch (e) {
      console.warn("Share failed", e);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0 }}
    >
      {/* Drawer Header */}
      <View
        style={{
          padding: 20,
          borderBottomWidth: 1,
          borderColor: "#e5e7eb",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/icon.png")}
          style={{ width: 40, height: 40, marginRight: 12 }}
        />
        <View>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#2563eb" }}>
            Budgino
          </Text>
          <Text style={{ color: "#6b7280", marginTop: 2, fontSize: 12 }}>
            Smart Budget Tracking
          </Text>
        </View>
      </View>

      {/* Default Drawer Items */}
      <DrawerItemList {...props} />

      {/* Extra Items */}
      <DrawerItem
        label="Rate Us"
        icon={({ color, size }) => (
          <Ionicons name="star-outline" size={size} color={color} />
        )}
        onPress={handleRateUs}
      />
      <DrawerItem
        label="Share"
        icon={({ color, size }) => (
          <Ionicons name="share-social-outline" size={size} color={color} />
        )}
        onPress={handleShare}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#2563eb",
        drawerActiveTintColor: "#2563eb",
        drawerLabelStyle: { fontSize: 16 },
        drawerItemStyle: { marginVertical: 2 },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          drawerLabel: "Dashboard",
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="set-budget"
        options={{
          drawerLabel: "Set Budget",
          title: "Set Budget",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="manual-update"
        options={{
          drawerLabel: "Manual Update",
          title: "Manual Update",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: "About",
          title: "About",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="contact"
        options={{
          drawerLabel: "Contact Us",
          title: "Contact Us",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="mail-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
