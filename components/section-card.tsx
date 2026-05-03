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
  minHeight = 110,
}: Props) {
  return (
    <View className="border border-border bg-surface p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="bg-accent px-1.5 py-0.5">
            <Text className="font-mono-bold text-[10px] tracking-terminal text-bg">{number}</Text>
          </View>
          <Text className="font-mono-bold text-[11px] tracking-wide2 text-ink">{title}</Text>
        </View>
        {required ? (
          <Text className="font-mono text-[9px] tracking-wide2 text-ink-dim">REQUIRED</Text>
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
        className="bg-bg px-3 py-3 font-sans text-[13px] leading-[18px] text-ink"
        style={{ minHeight, textAlignVertical: "top" }}
      />
    </View>
  );
}
