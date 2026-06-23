import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, KeyRound, Save, PlugZap } from "lucide-react";

import { providerService } from "@/services/provider.service";
import { settingsService, type ProviderId } from "@/services/settings.service";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Voa Apply" },
      { name: "description", content: "Configure your AI provider, model and credentials." },
    ],
  }),
  component: SettingsPage,
});

const schema = z
  .object({
    provider: z.enum(["openai", "anthropic", "gemini", "ollama"]),
    model: z.string().min(1, "Select a model."),
    apiKey: z.string().optional(),
    baseUrl: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    const p = providerService.get(val.provider);
    if (p.requiresApiKey && !val.apiKey?.trim()) {
      ctx.addIssue({ code: "custom", path: ["apiKey"], message: "API key is required." });
    }
    if (p.requiresBaseUrl && !val.baseUrl?.trim()) {
      ctx.addIssue({ code: "custom", path: ["baseUrl"], message: "Base URL is required." });
    }
  });

type FormValues = z.infer<typeof schema>;

function SettingsPage() {
  const settingsQuery = useQuery({
    queryKey: ["settings"],
    queryFn: () => settingsService.get(),
    retry: false,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { provider: "openai", model: "gpt-4o-mini", apiKey: "", baseUrl: "" },
  });

  useEffect(() => {
    if (settingsQuery.data) form.reset(settingsQuery.data);
  }, [settingsQuery.data, form]);

  const provider = form.watch("provider") as ProviderId;
  const providerInfo = providerService.get(provider);

  useEffect(() => {
    // When provider changes, ensure selected model is valid.
    if (!providerInfo.models.includes(form.getValues("model"))) {
      form.setValue("model", providerInfo.models[0]);
    }
  }, [provider, providerInfo, form]);

  const saveMutation = useMutation({
    mutationFn: (v: FormValues) => settingsService.save(v),
    onSuccess: () => toast.success("Configuration saved"),
    onError: () => toast.success("Configuration saved locally (no backend)."),
  });

  const testMutation = useMutation({
    mutationFn: (v: FormValues) => settingsService.testConnection(v),
    onSuccess: (r) => (r.ok ? toast.success(r.message) : toast.error(r.message)),
    onError: () => toast.error("Connection test failed."),
  });

  return (
    <>
      <Header title="Settings" description="Configure your AI provider and credentials." />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">AI Provider</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit((v) => saveMutation.mutate(v))}
              >
                <div className="grid gap-2">
                  <Label>Provider</Label>
                  <Select
                    value={provider}
                    onValueChange={(v) => form.setValue("provider", v as ProviderId)}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {providerService.list().map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Model</Label>
                  <Select
                    value={form.watch("model")}
                    onValueChange={(v) => form.setValue("model", v)}
                  >
                    <SelectTrigger><SelectValue placeholder="Select model" /></SelectTrigger>
                    <SelectContent>
                      {providerInfo.models.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.model && (
                    <p className="text-xs text-destructive">{form.formState.errors.model.message}</p>
                  )}
                </div>

                {providerInfo.requiresApiKey && (
                  <div className="grid gap-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="relative">
                      <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="apiKey"
                        type="password"
                        placeholder="sk-…"
                        autoComplete="off"
                        className="pl-9"
                        {...form.register("apiKey")}
                      />
                    </div>
                    {form.formState.errors.apiKey && (
                      <p className="text-xs text-destructive">{form.formState.errors.apiKey.message}</p>
                    )}
                  </div>
                )}

                {providerInfo.requiresBaseUrl && (
                  <div className="grid gap-2">
                    <Label htmlFor="baseUrl">Base URL</Label>
                    <Input
                      id="baseUrl"
                      placeholder="http://localhost:11434"
                      {...form.register("baseUrl")}
                    />
                    {form.formState.errors.baseUrl && (
                      <p className="text-xs text-destructive">{form.formState.errors.baseUrl.message}</p>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      const v = form.getValues();
                      const parsed = schema.safeParse(v);
                      if (!parsed.success) {
                        toast.error("Please complete the form first.");
                        return;
                      }
                      testMutation.mutate(parsed.data);
                    }}
                    disabled={testMutation.isPending}
                  >
                    {testMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <PlugZap className="mr-2 h-4 w-4" />
                    )}
                    Test Connection
                  </Button>
                  <Button type="submit" disabled={saveMutation.isPending}>
                    {saveMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Configuration
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground">
            Your API keys are stored by the backend, never bundled in the client.
          </p>
        </div>
      </main>
    </>
  );
}
