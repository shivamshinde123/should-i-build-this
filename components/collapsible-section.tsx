import { Ionicons } from "@expo/vector-icons";
import { useState, type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
    <View style={[styles.container, open ? styles.openBorder : styles.closedBorder]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={`${title}, section ${number}`}
        onPress={() => setOpen((v) => !v)}
        style={styles.trigger}
      >
        <View style={styles.left}>
          {icon ? <Ionicons name={icon} size={14} color={tokens.inkMuted} /> : null}
          <Text style={styles.number}>{number}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={16}
          color={tokens.inkMuted}
        />
      </Pressable>
      {open && children ? (
        <View style={styles.content}>{children}</View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: tokens.surface,
  },
  openBorder: {
    borderColor: tokens.accent,
  },
  closedBorder: {
    borderColor: tokens.border,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },
  number: {
    color: tokens.accent,
    fontFamily: "SpaceMono_700Bold",
    fontSize: 11,
    letterSpacing: 1.2,
  },
  title: {
    color: tokens.ink,
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    letterSpacing: 1.2,
    flexShrink: 1,
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: tokens.hairline,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
});
