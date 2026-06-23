import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

const KEYWORDS = [
  { label: "Python", value: 92 },
  { label: "FastAPI", value: 85 },
  { label: "PostgreSQL", value: 78 },
  { label: "Docker", value: 64 },
  { label: "AWS", value: 41 },
];

const MISSING = ["Kubernetes", "gRPC", "Terraform"];

export function ATSAnalysis() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Keyword Coverage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {KEYWORDS.map((k) => (
            <div key={k.label}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium">{k.label}</span>
                <span className="text-muted-foreground">{k.value}%</span>
              </div>
              <Progress value={k.value} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Experience Match</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium">Years of experience</span>
              <span className="text-muted-foreground">5 / 5+ required</span>
            </div>
            <Progress value={100} />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium">Domain alignment</span>
              <span className="text-muted-foreground">72%</span>
            </div>
            <Progress value={72} />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium">Seniority signal</span>
              <span className="text-muted-foreground">88%</span>
            </div>
            <Progress value={88} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Missing Skills</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {MISSING.map((s) => (
            <Badge key={s} variant="outline" className="border-warning/40 text-warning">
              <AlertCircle className="mr-1 h-3 w-3" />
              {s}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Suggested Improvements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            Highlight container orchestration experience near the top of your skills section.
          </p>
          <p className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            Strong match on backend stack — keep wording concise and metric-driven.
          </p>
          <p className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            Quantify two more bullet points with measurable outcomes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
