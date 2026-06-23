import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ORIGINAL = [
  "Worked with SQL.",
  "Built APIs in Python.",
  "Used Docker for deployments.",
  "Collaborated with the frontend team.",
];

const TAILORED = [
  "Designed and optimized SQL Server queries, reducing report latency by 40%.",
  "Built and maintained FastAPI services serving 10k+ requests/min.",
  "Containerized services with Docker and deployed via CI/CD pipelines.",
  "Collaborated with frontend engineers to design clean REST contracts.",
];

export function DiffViewer() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm">Original Resume</CardTitle>
          <Badge variant="outline">Source</Badge>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm leading-relaxed">
            {ORIGINAL.map((line, i) => (
              <li key={i} className="rounded-md border bg-muted/30 px-3 py-2 font-mono text-xs">
                {line}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm">Tailored Resume</CardTitle>
          <Badge className="bg-success text-success-foreground hover:bg-success">Modified</Badge>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm leading-relaxed">
            {TAILORED.map((line, i) => (
              <li
                key={i}
                className="rounded-md border border-success/30 bg-success/5 px-3 py-2 font-mono text-xs"
              >
                {line}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
