import { Text, TextInput, View } from "react-native";

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
  minHeight = 96,
}: Props) {
  return (
    <View className="rounded-sm border border-border bg-surface p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Text className="font-mono text-[11px] tracking-terminal text-accent">{number}</Text>
          <Text className="font-mono text-[12px] tracking-terminal text-ink">{title}</Text>
        </View>
        {required ? (
          <Text className="font-mono text-[10px] tracking-terminal text-ink-dim">REQUIRED</Text>
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
        className="rounded-sm bg-elevated px-3 py-3 text-[13px] text-ink"
        style={{ minHeight, textAlignVertical: "top" }}
      />
    </View>
  );
}
