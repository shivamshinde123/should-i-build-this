import { Pressable, StyleSheet, Text, View } from "react-native";

import { tokens } from "@/constants/theme";

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
        label="BUILDER"
        active={value === "builder"}
        onPress={() => onChange("builder")}
      />
      <Toggle
        label="INVESTOR"
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
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: tokens.accent,
  },
  label: {
    fontFamily: "SpaceMono_700Bold",
    fontSize: 11,
    letterSpacing: 1.2,
  },
  activeLabel: {
    color: tokens.bg,
  },
  inactiveLabel: {
    color: tokens.inkMuted,
  },
});
