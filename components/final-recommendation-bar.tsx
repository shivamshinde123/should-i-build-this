import { StyleSheet, Text, View } from "react-native";

import { tokens, typography } from "@/constants/theme";

type Props = {
  primaryLabel: string;
  secondaryLabel?: string;
};

export function FinalRecommendationBar({
  primaryLabel,
  secondaryLabel,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Final recommendation</Text>
      <View style={styles.card}>
        <View style={styles.copyBlock}>
          <Text style={styles.label}>Primary recommendation</Text>
          <Text style={styles.body}>{primaryLabel}</Text>
        </View>
        {secondaryLabel ? (
          <View style={styles.copyBlock}>
            <Text style={styles.label}>Alternative path</Text>
            <Text style={styles.body}>{secondaryLabel}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: tokens.border,
    backgroundColor: tokens.bg,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  caption: {
    marginBottom: 8,
    color: tokens.inkFaint,
    ...typography.eyebrow,
  },
  card: {
    gap: 14,
    borderWidth: 1,
    borderColor: tokens.border,
    backgroundColor: tokens.surface,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  copyBlock: {
    gap: 6,
  },
  label: {
    color: tokens.accent,
    ...typography.titleMono,
  },
  body: {
    color: tokens.ink,
    ...typography.body,
  },
});
