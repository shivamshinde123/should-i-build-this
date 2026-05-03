import { Text, View } from "react-native";

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
    <View className="border-t border-border bg-bg px-4 pb-4 pt-3">
      <Text className="mb-2 font-mono text-[9px] tracking-wide2 text-ink-faint">
        FINAL RECOMMENDATION
      </Text>
      <View className="flex-row gap-2">
        {secondaryLabel ? (
          <View className="flex-1">
            <PrimaryButton
              label={secondaryLabel}
              variant="outline"
              onPress={onSecondary}
              disabled={!onSecondary}
            />
          </View>
        ) : null}
        <View className="flex-1">
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
