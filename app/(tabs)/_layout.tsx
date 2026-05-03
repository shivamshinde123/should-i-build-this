import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { HapticTab } from "@/components/haptic-tab";
import { tokens } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: tokens.accent,
        tabBarInactiveTintColor: tokens.inkDim,
        tabBarStyle: {
          backgroundColor: tokens.bg,
          borderTopColor: tokens.border,
          borderTopWidth: 1,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          letterSpacing: 1.5,
          fontFamily: "SpaceMono_700Bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "VALIDATE",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-circle-outline" size={size ?? 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "REPORTS",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size ?? 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "PROFILE",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size ?? 22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
