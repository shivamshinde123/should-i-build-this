import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

import { tokens } from "@/constants/theme";

export function NeuralEngineCard() {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={["#202020", "#101010", "#1a1a1a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.visual}
      >
        <Ionicons name="hardware-chip" size={48} color={tokens.inkDim} />
      </LinearGradient>
      <View style={styles.footer}>
        <View style={styles.dot} />
        <Text style={styles.label}>NEURAL ENGINE ACTIVE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: tokens.border,
    backgroundColor: tokens.surface,
  },
  visual: {
    height: 112,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: tokens.hairline,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: tokens.pass,
  },
  label: {
    color: tokens.accent,
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    letterSpacing: 1.1,
  },
});
