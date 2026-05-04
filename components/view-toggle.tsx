import { Pressable, StyleSheet, Text, View } from "react-native";

import { tokens, typography } from "@/constants/theme";

export type ReportView = "builder" | "investor";

type Props = {
  value: ReportView;
  onChange: (v: ReportView) => void;
};

export function ViewToggle({ value, onChange }: Props) {
  return (
    <View
      accessibilityRole="tablist"
      style={styles.container}
    >
      <Toggle
        label="Builder"
        active={value === "builder"}
        onPress={() => onChange("builder")}
      />
      <Toggle
        label="Investor"
        active={value === "investor"}
        onPress={() => onChange("investor")}
      />
    </View>
  );
}

function Toggle({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
      style={[styles.tab, active ? styles.activeTab : null]}
    >
      <Text style={[styles.label, active ? styles.activeLabel : styles.inactiveLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: tokens.border,
    backgroundColor: tokens.surface,
    padding: 4,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 0,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: tokens.accent,
  },
  label: {
    ...typography.titleSans,
    textAlign: "center",
  },
  activeLabel: {
    color: tokens.bg,
  },
  inactiveLabel: {
    color: tokens.inkMuted,
  },
});
