import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Cpu, BrainCircuit, Sparkles, ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Voa Apply" },
      { name: "description", content: "Your resume tailoring overview, AI provider and recent activity." },
    ],
  }),
  component: Dashboard,
});

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof FileText;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="truncate text-2xl font-semibold tracking-tight">{value}</div>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  return (
    <>
      <Header title="Dashboard" description="Overview of your tailoring activity." />
      <main className="flex-1 space-y-6 p-6">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={FileText} label="Resume Uploaded" value="resume.pdf" hint="Uploaded 2h ago" />
          <StatCard icon={Cpu} label="AI Provider" value="OpenAI" hint="Connected" />
          <StatCard icon={BrainCircuit} label="Selected Model" value="gpt-4o-mini" />
          <StatCard icon={Clock} label="Last Generated" value="Today, 14:21" hint="Senior Backend Engineer" />
        </section>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Ready to tailor your resume?</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Upload your resume, paste a job description, and let Voa Apply optimize wording and ATS coverage.
                </p>
              </div>
              <Badge variant="secondary" className="hidden md:inline-flex">Beta</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg">
              <Link to="/tailor">
                <Sparkles className="mr-2 h-4 w-4" />
                Quick Start
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">No fabrication</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Voa Apply never invents experience. It only rewrites what you've written.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">ATS optimization</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Aligns your resume with keywords and structure recruiters' systems expect.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Full transparency</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Every change is logged with the reasoning and the source evidence.
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
