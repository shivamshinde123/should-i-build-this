import { Pressable, Text, View } from "react-native";

export type ReportView = "builder" | "investor";

type Props = {
  value: ReportView;
  onChange: (v: ReportView) => void;
};

export function ViewToggle({ value, onChange }: Props) {
  return (
    <View
      accessibilityRole="tablist"
      className="flex-row rounded-sm border border-border bg-surface p-1"
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
      className={`flex-1 items-center justify-center rounded-sm py-2 ${active ? "bg-accent" : ""}`}
    >
      <Text
        className={`font-mono text-[11px] font-bold tracking-terminal ${
          active ? "text-bg" : "text-ink-muted"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
