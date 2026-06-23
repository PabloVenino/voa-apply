import { http } from "./http";

export type ProviderId = "openai" | "anthropic" | "gemini" | "ollama";

export interface ProviderSettings {
  provider: ProviderId;
  model: string;
  apiKey?: string;
  baseUrl?: string;
}

export const settingsService = {
  get: () => http<ProviderSettings>("/settings"),
  save: (s: ProviderSettings) =>
    http<ProviderSettings>("/settings", { method: "PUT", body: JSON.stringify(s) }),
  testConnection: (s: ProviderSettings) =>
    http<{ ok: boolean; message: string }>("/settings/test", {
      method: "POST",
      body: JSON.stringify(s),
    }),
};
