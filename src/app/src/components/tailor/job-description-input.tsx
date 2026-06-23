import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Link2 } from "lucide-react";

interface Props {
  mode: "paste" | "url";
  onModeChange: (m: "paste" | "url") => void;
  pasted: string;
  onPastedChange: (v: string) => void;
  url: string;
  onUrlChange: (v: string) => void;
  onImport: () => void;
  importing?: boolean;
}

export function JobDescriptionInput({
  mode,
  onModeChange,
  pasted,
  onPastedChange,
  url,
  onUrlChange,
  onImport,
  importing,
}: Props) {
  const [touched, setTouched] = useState(false);
  return (
    <Tabs value={mode} onValueChange={(v) => onModeChange(v as "paste" | "url")}>
      <TabsList>
        <TabsTrigger value="paste">Paste Job Description</TabsTrigger>
        <TabsTrigger value="url">Import from URL</TabsTrigger>
      </TabsList>
      <TabsContent value="paste" className="mt-3">
        <Textarea
          rows={8}
          placeholder="Paste the full job description here…"
          value={pasted}
          onChange={(e) => onPastedChange(e.target.value)}
        />
      </TabsContent>
      <TabsContent value="url" className="mt-3 space-y-2">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://company.com/jobs/senior-backend-engineer"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          <Button onClick={onImport} disabled={!url || importing} variant="secondary">
            {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
            <span className="ml-2">Import</span>
          </Button>
        </div>
        {touched && url && !/^https?:\/\//.test(url) && (
          <p className="text-xs text-destructive">Enter a valid URL starting with http(s)://</p>
        )}
        {pasted && (
          <Textarea rows={6} value={pasted} onChange={(e) => onPastedChange(e.target.value)} />
        )}
      </TabsContent>
    </Tabs>
  );
}
