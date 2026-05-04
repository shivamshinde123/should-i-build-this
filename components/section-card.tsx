import { StyleSheet, Text, TextInput, View } from "react-native";

import { tokens, typography } from "@/constants/theme";

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
          <Text style={styles.required}>Required</Text>
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
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  titleRow: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "flex-start",
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
    ...typography.eyebrowStrong,
    letterSpacing: 0.8,
  },
  title: {
    flex: 1,
    minWidth: 0,
    color: tokens.ink,
    ...typography.titleSans,
    flexShrink: 1,
  },
  required: {
    flexShrink: 0,
    color: tokens.inkDim,
    ...typography.eyebrow,
  },
  input: {
    backgroundColor: tokens.bg,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: tokens.ink,
    ...typography.body,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: tokens.hairline,
  },
});
