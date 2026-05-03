import { StyleSheet, Text, View } from "react-native";

import { tokens } from "@/constants/theme";

import { PrimaryButton } from "@/components/primary-button";

type Props = {
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
};

export function FinalRecommendationBar({
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>FINAL RECOMMENDATION</Text>
      <View style={styles.row}>
        {secondaryLabel ? (
          <View style={styles.flex}>
            <PrimaryButton
              label={secondaryLabel}
              variant="outline"
              onPress={onSecondary}
              disabled={!onSecondary}
            />
          </View>
        ) : null}
        <View style={styles.flex}>
          <PrimaryButton
            label={primaryLabel}
            variant="solid"
            icon="rocket"
            onPress={onPrimary}
            disabled={!onPrimary}
          />
        </View>
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
    fontFamily: "SpaceMono_400Regular",
    fontSize: 9,
    letterSpacing: 1.2,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  flex: {
    flex: 1,
  },
});
