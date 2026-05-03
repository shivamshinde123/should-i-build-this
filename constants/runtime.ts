import Constants from "expo-constants";

type ExtraConfig = {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  publicReportBaseUrl?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as ExtraConfig;

export const runtimeConfig = {
  supabaseUrl: extra.supabaseUrl ?? "https://hexcsdactbhdkcmdrnzj.supabase.co",
  supabaseAnonKey:
    extra.supabaseAnonKey
    ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhleGNzZGFjdGJoZGtjbWRybnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MTAzMzcsImV4cCI6MjA5MzM4NjMzN30.0983qPQ-aKankekobLuDG3o5SGEJZdXBkzkOrSOduP0",
  publicReportBaseUrl: extra.publicReportBaseUrl ?? "https://should-i-build-this.vercel.app",
} as const;

export function buildPublicReportUrl(slug: string): string {
  return `${runtimeConfig.publicReportBaseUrl.replace(/\/$/, "")}/r/${slug}`;
}
