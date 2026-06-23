import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ATSAnalysis } from "./ats-analysis";
import { DiffViewer } from "./diff-viewer";
import { Timeline } from "./timeline";
import { InterviewQuestions } from "./interview-questions";
import { CoverLetter } from "./cover-letter";
import { Sparkles } from "lucide-react";

interface ResultTabsProps {
  hasResult: boolean;
}

export function ResultTabs({ hasResult }: ResultTabsProps) {
  if (!hasResult) {
    return (
      <Card className="flex h-full min-h-[400px] items-center justify-center border-dashed">
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Sparkles className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">No results yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Upload your resume, add a job description, then click Generate.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="flex w-full flex-wrap">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="ats">ATS Analysis</TabsTrigger>
        <TabsTrigger value="diff">Resume Diff</TabsTrigger>
        <TabsTrigger value="changelog">Change Log</TabsTrigger>
        <TabsTrigger value="interview">Interview</TabsTrigger>
        <TabsTrigger value="cover">Cover Letter</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">ATS Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">82<span className="text-base text-muted-foreground">/100</span></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Changes Applied</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">14</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Keyword Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">78%</div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Your tailored resume emphasizes backend scalability and database optimization, matching the
              job's core requirements. Wording was tightened and metrics added where possible.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge variant="secondary">No fabrication</Badge>
              <Badge variant="secondary">ATS-friendly</Badge>
              <Badge variant="secondary">14 changes logged</Badge>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ats" className="mt-4">
        <ATSAnalysis />
      </TabsContent>
      <TabsContent value="diff" className="mt-4">
        <DiffViewer />
      </TabsContent>
      <TabsContent value="changelog" className="mt-4">
        <Timeline />
      </TabsContent>
      <TabsContent value="interview" className="mt-4">
        <InterviewQuestions />
      </TabsContent>
      <TabsContent value="cover" className="mt-4">
        <CoverLetter />
      </TabsContent>
    </Tabs>
  );
}
