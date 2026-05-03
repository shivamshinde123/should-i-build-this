import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

import { tokens } from "@/constants/theme";

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
      className={`w-full flex-row items-center justify-center gap-2 px-4 py-4 ${
        solid ? "bg-accent" : "border border-accent"
      }`}
      style={({ pressed }) => ({ opacity: disabled ? 0.4 : pressed ? 0.85 : 1 })}
    >
      {icon ? <Ionicons name={icon} size={14} color={fg} /> : null}
      <Text
        className="font-mono-bold text-[12px] tracking-wide2"
        style={{ color: fg }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
