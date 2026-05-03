import { StyleSheet, Text, TextInput, View } from "react-native";

import { tokens } from "@/constants/theme";

type Props = {
  number: string;
  title: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  minHeight?: number;
};

export function SectionCard({
  number,
  title,
  required,
  placeholder,
  value,
  onChangeText,
  minHeight = 110,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{number}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
        {required ? (
          <Text style={styles.required}>REQUIRED</Text>
        ) : null}
      </View>
      <TextInput
        multiline
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.inkDim}
        accessibilityLabel={title}
        accessibilityHint={placeholder}
        style={[styles.input, { minHeight }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: tokens.border,
    backgroundColor: tokens.surface,
    padding: 16,
  },
  header: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },
  badge: {
    backgroundColor: tokens.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: tokens.bg,
    fontFamily: "SpaceMono_700Bold",
    fontSize: 10,
    letterSpacing: 0.8,
  },
  title: {
    color: tokens.ink,
    fontFamily: "SpaceMono_700Bold",
    fontSize: 11,
    letterSpacing: 1.2,
    flexShrink: 1,
  },
  required: {
    color: tokens.inkDim,
    fontFamily: "SpaceMono_400Regular",
    fontSize: 9,
    letterSpacing: 1.2,
  },
  input: {
    backgroundColor: tokens.bg,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: tokens.ink,
    fontFamily: "SpaceMono_400Regular",
    fontSize: 13,
    lineHeight: 20,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: tokens.hairline,
  },
});
