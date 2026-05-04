import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { tokens, typography } from "@/constants/theme";

export type Concern = {
  title: string;
  description: string;
  severity?: "warn" | "info";
};

export function CriticalConcerns({ concerns }: { concerns: Concern[] }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="warning" size={14} color={tokens.accent} />
        <Text style={styles.title}>Critical concerns</Text>
      </View>
      <View style={styles.list}>
        {concerns.map((c) => {
          const color = c.severity === "info" ? tokens.inkMuted : tokens.accent;
          return (
            <View key={c.title} style={styles.card}>
              <View style={styles.concernHeader}>
                <Ionicons name="warning-outline" size={12} color={color} />
                <Text style={[styles.concernTitle, { color }]}>{c.title}</Text>
              </View>
              <Text style={styles.description}>{c.description}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: tokens.ink,
    ...typography.titleSans,
  },
  list: {
    gap: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: tokens.border,
    backgroundColor: tokens.surface,
    padding: 12,
  },
  concernHeader: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  concernTitle: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    ...typography.eyebrowStrong,
  },
  description: {
    flexShrink: 1,
    color: tokens.inkMuted,
    ...typography.bodyCompact,
  },
});
