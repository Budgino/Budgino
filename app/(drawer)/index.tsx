// app/(drawer)/index.tsx
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function DrawerIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard when drawer root is accessed
    router.replace("/(drawer)/dashboard");
  }, []);

  return null; // nothing is rendered
}
