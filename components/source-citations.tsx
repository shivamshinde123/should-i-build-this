import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Alert, Linking, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { tokens, typography } from "@/constants/theme";
import type { SourceCitation } from "@/types/analysis";

type Props = {
  sources: SourceCitation[];
};

export function SourceCitations({ sources }: Props) {
  if (sources.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="link-outline" size={14} color={tokens.accent} />
        <Text style={styles.title}>Source citations</Text>
      </View>

      <View style={styles.list}>
        {sources.map((source) => (
          <Pressable
            key={source.url}
            accessibilityRole="link"
            accessibilityLabel={source.title}
            onPress={() => {
              void openSourceUrl(source.url);
            }}
            style={({ pressed }) => [styles.card, pressed ? styles.cardPressed : null]}
          >
            <Text style={styles.sourceTitle}>{source.title}</Text>
            <Text style={styles.sourceUrl}>{source.url}</Text>
            {source.citedText ? <Text style={styles.sourceExcerpt}>{source.citedText}</Text> : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

async function openSourceUrl(rawUrl: string) {
  const normalizedUrl = normalizeUrl(rawUrl);

  try {
    if (Platform.OS === "web") {
      await Linking.openURL(normalizedUrl);
      return;
    }

    await WebBrowser.openBrowserAsync(normalizedUrl);
    return;
  } catch {
    try {
      const supported = await Linking.canOpenURL(normalizedUrl);
      if (supported) {
        await Linking.openURL(normalizedUrl);
        return;
      }
    } catch {
      // Fall through to user-facing error.
    }
  }

  Alert.alert("Unable to open source", "This source link could not be opened on this device.");
}

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, "")}`;
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: tokens.ink,
    ...typography.titleMono,
  },
  list: {
    gap: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: tokens.border,
    backgroundColor: tokens.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 6,
  },
  cardPressed: {
    borderColor: tokens.accent,
    backgroundColor: tokens.elevated,
  },
  sourceTitle: {
    color: tokens.ink,
    ...typography.bodyStrong,
  },
  sourceUrl: {
    color: tokens.accent,
    ...typography.eyebrow,
  },
  sourceExcerpt: {
    color: tokens.inkMuted,
    ...typography.bodyCompact,
  },
});
