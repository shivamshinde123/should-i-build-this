import { Ionicons } from "@expo/vector-icons";
import { useState, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { tokens } from "@/constants/theme";

type Props = {
  number: string;
  title: string;
  defaultOpen?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  children?: ReactNode;
};

export function CollapsibleSection({
  number,
  title,
  defaultOpen = false,
  icon,
  children,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View
      className={`border bg-surface ${open ? "border-accent" : "border-border"}`}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={`${title}, section ${number}`}
        onPress={() => setOpen((v) => !v)}
        className="flex-row items-center justify-between px-4 py-4"
      >
        <View className="flex-row items-center gap-3">
          {icon ? <Ionicons name={icon} size={14} color={tokens.inkMuted} /> : null}
          <Text className="font-mono-bold text-[11px] tracking-wide2 text-accent">
            {number}
          </Text>
          <Text className="font-mono-bold text-[11px] tracking-wide2 text-ink">
            {title}
          </Text>
        </View>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={16}
          color={tokens.inkMuted}
        />
      </Pressable>
      {open && children ? (
        <View className="border-t border-hairline px-4 pb-4 pt-4">{children}</View>
      ) : null}
    </View>
  );
}
