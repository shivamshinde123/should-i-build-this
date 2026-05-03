import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

import { tokens } from "@/constants/theme";

type Props = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ label, icon = "flash", onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="w-full flex-row items-center justify-center gap-2 rounded-sm bg-accent px-4 py-4"
      style={({ pressed }) => ({ opacity: disabled ? 0.4 : pressed ? 0.85 : 1 })}
    >
      <Ionicons name={icon} size={16} color={tokens.bg} />
      <Text className="font-mono text-[14px] font-bold tracking-terminal text-bg">{label}</Text>
    </Pressable>
  );
}
