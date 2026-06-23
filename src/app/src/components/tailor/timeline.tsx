import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";

interface Item {
  before: string;
  after: string;
  reason: string;
  evidence: string;
}

const ITEMS: Item[] = [
  {
    before: "Worked with SQL",
    after: "Designed optimized SQL Server queries",
    reason: "Job description emphasizes SQL optimization.",
    evidence: "Experience section",
  },
  {
    before: "Built APIs in Python",
    after: "Built and maintained FastAPI services serving 10k+ requests/min",
    reason: "Posting requires high-throughput Python services.",
    evidence: "Experience section",
  },
  {
    before: "Used Docker",
    after: "Containerized services with Docker and deployed via CI/CD pipelines",
    reason: "Posting requires DevOps & CI/CD experience.",
    evidence: "Skills + Experience",
  },
];

export function Timeline() {
  return (
    <div className="space-y-4">
      {ITEMS.map((item, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-md border bg-muted/40 p-3 text-sm font-mono">
                {item.before}
              </div>
              <div className="flex items-center justify-center text-muted-foreground">
                <ArrowDown className="h-4 w-4 md:rotate-[-90deg]" />
              </div>
              <div className="rounded-md border border-success/30 bg-success/5 p-3 text-sm font-mono">
                {item.after}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="secondary">Reason</Badge>
              <span className="text-muted-foreground">{item.reason}</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="outline">Evidence</Badge>
              <span className="text-muted-foreground">{item.evidence}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
