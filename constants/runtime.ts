import Constants from "expo-constants";

type ExtraConfig = {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  publicReportBaseUrl?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as ExtraConfig;

export const runtimeConfig = {
  supabaseUrl: requireExtraConfig("supabaseUrl", extra.supabaseUrl),
  supabaseAnonKey: requireExtraConfig("supabaseAnonKey", extra.supabaseAnonKey),
  publicReportBaseUrl: requireExtraConfig("publicReportBaseUrl", extra.publicReportBaseUrl),
} as const;

export function buildPublicReportUrl(slug: string): string {
  return `${runtimeConfig.publicReportBaseUrl.replace(/\/$/, "")}/r/${slug}`;
}

function requireExtraConfig(name: keyof ExtraConfig, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing Expo runtime config: ${name}`);
  }

  return value;
}
