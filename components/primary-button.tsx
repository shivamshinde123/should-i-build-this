import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

import { tokens, typography } from "@/constants/theme";

type Variant = "solid" | "outline";

type Props = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  disabled?: boolean;
  variant?: Variant;
};

export function PrimaryButton({ label, icon, onPress, disabled, variant = "solid" }: Props) {
  const solid = variant === "solid";
  const fg = solid ? tokens.bg : tokens.accent;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        styles.base,
        solid ? styles.solid : styles.outline,
        disabled ? (solid ? styles.disabledSolid : styles.disabledOutline) : null,
        pressed && !disabled ? (solid ? styles.pressedSolid : styles.pressedOutline) : null,
      ]}
    >
      {icon ? <Ionicons name={icon} size={14} color={fg} /> : null}
      <Text style={[styles.label, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: tokens.accent,
  } satisfies ViewStyle,
  solid: {
    backgroundColor: tokens.accent,
  },
  outline: {
    backgroundColor: "transparent",
  },
  label: {
    flexShrink: 1,
    minWidth: 0,
    ...typography.buttonLabel,
    textAlign: "center",
  },
  disabledSolid: {
    backgroundColor: tokens.accentDim,
    borderColor: tokens.accentDim,
  },
  disabledOutline: {
    borderColor: tokens.accentDim,
    opacity: 0.65,
  },
  pressedSolid: {
    backgroundColor: tokens.accentGlow,
    borderColor: tokens.accentGlow,
  },
  pressedOutline: {
    backgroundColor: "rgba(245, 200, 66, 0.08)",
  },
});
