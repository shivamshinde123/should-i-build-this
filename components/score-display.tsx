import { Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
};

export function ScoreDisplay({ label, value }: Props) {
  return (
    <View className="items-center rounded-sm bg-elevated px-4 py-5">
      <Text className="mb-1 font-mono text-[10px] tracking-terminal text-accent">{label}</Text>
      <Text className="text-[36px] font-black text-ink">{value}</Text>
    </View>
  );
}
