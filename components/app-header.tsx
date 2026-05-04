import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { tokens, typography } from "@/constants/theme";

export function AppHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Ionicons name="terminal-sharp" size={16} color={tokens.accent} />
        <Text style={styles.title}>Should I Build This?</Text>
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
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: tokens.hairline,
  },
  left: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  title: {
    flex: 1,
    minWidth: 0,
    color: tokens.accent,
    ...typography.titleMono,
    fontSize: 11,
    lineHeight: 16,
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
