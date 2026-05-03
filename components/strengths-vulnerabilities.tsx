import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { tokens } from "@/constants/theme";

type Props = {
  strengths: string[];
  vulnerabilities: string[];
};

export function StrengthsVulnerabilities({ strengths, vulnerabilities }: Props) {
  return (
    <View className="flex-row gap-4">
      <Column
        title="STRENGTHS"
        items={strengths}
        icon="checkmark-circle"
        color={tokens.accent}
      />
      <Column
        title="VULNERABILITIES"
        items={vulnerabilities}
        icon="warning"
        color={tokens.danger}
      />
    </View>
  );
}

function Column({
  title,
  items,
  icon,
  color,
}: {
  title: string;
  items: string[];
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}) {
  return (
    <View className="flex-1 gap-2">
      <Text
        className="font-mono-bold text-[10px] tracking-wide2"
        style={{ color }}
      >
        {title}
      </Text>
      {items.map((item) => (
        <View key={item} className="flex-row items-start gap-2">
          <Ionicons name={icon} size={11} color={color} style={{ marginTop: 3 }} />
          <Text className="flex-1 font-sans text-[11px] leading-[15px] text-ink-muted">
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}
