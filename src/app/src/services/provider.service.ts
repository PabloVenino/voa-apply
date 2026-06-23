import type { ProviderId } from "./settings.service";

export interface ProviderInfo {
  id: ProviderId;
  name: string;
  models: string[];
  requiresApiKey: boolean;
  requiresBaseUrl: boolean;
}

// Static catalog. A future backend endpoint can replace this.
export const PROVIDERS: ProviderInfo[] = [
  {
    id: "openai",
    name: "OpenAI",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-4.1", "o4-mini"],
    requiresApiKey: true,
    requiresBaseUrl: false,
  },
  {
    id: "anthropic",
    name: "Anthropic",
    models: ["claude-sonnet-4-5", "claude-opus-4-1", "claude-haiku-4-5"],
    requiresApiKey: true,
    requiresBaseUrl: false,
  },
  {
    id: "gemini",
    name: "Google Gemini",
    models: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.5-flash-lite"],
    requiresApiKey: true,
    requiresBaseUrl: false,
  },
  {
    id: "ollama",
    name: "Ollama (local)",
    models: ["llama3.1", "llama3.2", "qwen2.5-coder", "mistral"],
    requiresApiKey: false,
    requiresBaseUrl: true,
  },
];

export const providerService = {
  list: () => PROVIDERS,
  get: (id: ProviderId) => PROVIDERS.find((p) => p.id === id)!,
};
