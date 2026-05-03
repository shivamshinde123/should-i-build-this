import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
};

export function ScoreDisplay({ label, value }: Props) {
  return (
    <View className="overflow-hidden border border-hairline">
      <LinearGradient
        colors={["#0d0d0d", "#181818", "#0d0d0d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingVertical: 24, paddingHorizontal: 16, alignItems: "center" }}
      >
        <Text className="mb-1 font-mono-bold text-[10px] tracking-wide2 text-accent">
          {label}
        </Text>
        <Text className="font-display text-[40px] leading-[44px] text-ink">{value}</Text>
      </LinearGradient>
    </View>
  );
}
