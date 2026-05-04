import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

import { tokens, typography } from "@/constants/theme";

type Props = {
  label: string;
  value: string;
};

export function ScoreDisplay({ label, value }: Props) {
  return (
    <View style={styles.frame}>
      <LinearGradient
        colors={["#0d0d0d", "#181818", "#0d0d0d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: tokens.hairline,
  },
  gradient: {
    minHeight: 96,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  label: {
    marginBottom: 4,
    color: tokens.accent,
    ...typography.eyebrowStrong,
  },
  value: {
    color: tokens.ink,
    ...typography.sectionValue,
  },
});
