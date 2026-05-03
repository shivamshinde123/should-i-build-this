import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { tokens } from "@/constants/theme";

export function AppHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Ionicons name="terminal-sharp" size={16} color={tokens.accent} />
        <Text style={styles.title}>SHOULD I BUILD THIS?</Text>
      </View>
      <View style={styles.avatar}>
        <Ionicons name="person" size={12} color={tokens.accent} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: tokens.hairline,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  title: {
    color: tokens.accent,
    fontFamily: "SpaceMono_700Bold",
    fontSize: 12,
    letterSpacing: 1.5,
    flexShrink: 1,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: tokens.accent,
    backgroundColor: tokens.elevated,
    shadowColor: tokens.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});
