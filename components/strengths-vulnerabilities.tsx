import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { tokens } from "@/constants/theme";

type Props = {
  strengths: string[];
  vulnerabilities: string[];
};

export function StrengthsVulnerabilities({ strengths, vulnerabilities }: Props) {
  return (
    <View style={styles.container}>
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
    <View style={styles.column}>
      <Text style={[styles.title, { color }]}>{title}</Text>
      {items.map((item) => (
        <View key={item} style={styles.row}>
          <Ionicons name={icon} size={11} color={color} style={{ marginTop: 3 }} />
          <Text style={styles.item}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
  },
  column: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontFamily: "SpaceMono_700Bold",
    fontSize: 10,
    letterSpacing: 1.2,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  item: {
    flex: 1,
    color: tokens.inkMuted,
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    lineHeight: 15,
  },
});
