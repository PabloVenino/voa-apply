import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

const DEFAULT = `Dear Hiring Manager,

I'm excited to apply for the Senior Backend Engineer position. With 5+ years building high-throughput Python services and optimizing data layers, I believe my experience aligns closely with what your team is looking for.

In my most recent role I designed FastAPI services handling 10k+ requests per minute and reduced report latency by 40% through targeted SQL Server tuning. I also led the migration of our deployment pipeline to a fully containerized CI/CD workflow.

I'd welcome the chance to discuss how I can contribute to your team.

Best regards,
[Your name]`;

export function CoverLetter() {
  const [content, setContent] = useState(DEFAULT);

  const handleExport = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Cover letter exported");
  };

  return (
    <div className="space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={18}
        className="font-mono text-sm leading-relaxed"
      />
      <div className="flex justify-end">
        <Button onClick={handleExport} variant="secondary">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
