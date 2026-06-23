import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import { ResumeUploader } from "@/components/tailor/resume-uploader";
import { JobDescriptionInput } from "@/components/tailor/job-description-input";
import { ResultTabs } from "@/components/tailor/result-tabs";

import { resumeService } from "@/services/resume.service";

export const Route = createFileRoute("/tailor")({
  head: () => ({
    meta: [
      { title: "Resume Tailoring — Voa Apply" },
      {
        name: "description",
        content: "Upload your resume, paste a job description, and generate a tailored, ATS-optimized resume.",
      },
    ],
  }),
  component: TailorPage,
});

const generateSchema = z.object({
  file: z.instanceof(File, { message: "Please upload your resume." }),
  jobDescription: z.string().trim().min(40, "Add a longer job description (at least 40 characters)."),
});

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="h-6 w-6 justify-center p-0 font-mono">{n}</Badge>
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function TailorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [extraInfo, setExtraInfo] = useState("");
  const [jdMode, setJdMode] = useState<"paste" | "url">("paste");
  const [jdText, setJdText] = useState("");
  const [jdUrl, setJdUrl] = useState("");
  const [hasResult, setHasResult] = useState(false);

  const importMutation = useMutation({
    mutationFn: (url: string) => resumeService.importJobFromUrl(url),
    onSuccess: (data) => {
      setJdText(data.content);
      toast.success("Job description imported");
    },
    onError: () => toast.error("Couldn't import — paste manually instead."),
  });

  const uploadMutation = useMutation({ mutationFn: (f: File) => resumeService.upload(f) });

  const generateMutation = useMutation({
    mutationFn: async () => {
      const uploaded = await uploadMutation.mutateAsync(file!);
      return resumeService.generate({
        resumeId: uploaded.id,
        extraInfo,
        jobDescription: { source: jdMode, content: jdText, url: jdMode === "url" ? jdUrl : undefined },
      });
    },
    onSuccess: () => {
      setHasResult(true);
      toast.success("Tailored resume generated");
    },
    onError: () => {
      // Allow demo flow even without backend.
      setHasResult(true);
      toast.message("Showing preview results (no backend connected).");
    },
  });

  const handleGenerate = () => {
    const parsed = generateSchema.safeParse({ file, jobDescription: jdText });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please complete the form.");
      return;
    }
    generateMutation.mutate();
  };

  const generating = generateMutation.isPending;

  return (
    <>
      <Header
        title="Resume Tailoring"
        description="Upload, describe the role, and generate a tailored resume."
      />
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          {/* LEFT */}
          <div className="space-y-6">
            <Step n={1} title="Upload Resume">
              <ResumeUploader file={file} onFileChange={setFile} />
            </Step>

            <Step n={2} title="Additional Candidate Information">
              <Card>
                <CardContent className="p-4">
                  <Textarea
                    rows={5}
                    placeholder="Add information not present in your resume (recent projects, certifications, context)…"
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Voa Apply will never fabricate experience — only use what you provide.
                  </p>
                </CardContent>
              </Card>
            </Step>

            <Step n={3} title="Job Description">
              <JobDescriptionInput
                mode={jdMode}
                onModeChange={setJdMode}
                pasted={jdText}
                onPastedChange={setJdText}
                url={jdUrl}
                onUrlChange={setJdUrl}
                onImport={() => importMutation.mutate(jdUrl)}
                importing={importMutation.isPending}
              />
            </Step>

            <Step n={4} title="Generate">
              <Button
                size="lg"
                className="w-full"
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Tailored Resume
              </Button>
            </Step>
          </div>

          {/* RIGHT */}
          <div>
            <Card className="overflow-hidden">
              <CardHeader className="border-b">
                <CardTitle className="text-sm">Results</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ResultTabs hasResult={hasResult} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
