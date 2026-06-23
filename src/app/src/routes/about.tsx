import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Target, Sparkles, Map, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Voa Apply" },
      { name: "description", content: "About Voa Apply: mission, features, roadmap and open source." },
    ],
  }),
  component: AboutPage,
});

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{children}</CardContent>
    </Card>
  );
}

function AboutPage() {
  return (
    <>
      <Header title="About" description="What Voa Apply is and where it's going." />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <Section icon={Target} title="Mission">
            <p>
              Voa Apply helps IT professionals tailor their resume to a specific job position using AI.
              We optimize wording, reorganize information, improve ATS compatibility and readability —
              and we never fabricate experience. Every change is explained.
            </p>
          </Section>

          <Section icon={Sparkles} title="Features">
            <ul className="list-inside list-disc space-y-1">
              <li>Resume tailoring against any job description (paste or URL)</li>
              <li>ATS analysis with keyword coverage and gap detection</li>
              <li>Side-by-side diff between original and tailored resume</li>
              <li>Transparent change log with reasoning and evidence</li>
              <li>Interview prep questions and cover letter generation</li>
              <li>Bring your own AI provider — OpenAI, Anthropic, Gemini, or Ollama</li>
            </ul>
          </Section>

          <Section icon={Map} title="Roadmap">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">FastAPI backend integration</Badge>
              <Badge variant="secondary">PDF / DOCX parsing</Badge>
              <Badge variant="secondary">Multi-resume history</Badge>
              <Badge variant="secondary">Team workspaces</Badge>
              <Badge variant="outline">Browser extension</Badge>
              <Badge variant="outline">Self-hosted deployment guides</Badge>
            </div>
          </Section>

          <Section icon={Heart} title="Open Source">
            <p className="mb-4">
              Voa Apply will be released as an open-source project so anyone can self-host, audit and extend it.
            </p>
            <Button variant="secondary" asChild>
              <a href="#" aria-disabled>
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </Section>
        </div>
      </main>
    </>
  );
}
