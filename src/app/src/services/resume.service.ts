import { http, httpForm } from "./http";

export interface UploadedResume {
  id: string;
  filename: string;
  uploadedAt: string;
}

export interface JobDescription {
  source: "paste" | "url";
  content: string;
  url?: string;
}

export interface GenerateRequest {
  resumeId: string;
  extraInfo?: string;
  jobDescription: JobDescription;
}

export interface GenerateResult {
  id: string;
  createdAt: string;
}

export const resumeService = {
  upload: (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    return httpForm<UploadedResume>("/resume/upload", fd);
  },
  importJobFromUrl: (url: string) =>
    http<JobDescription>("/job/import", { method: "POST", body: JSON.stringify({ url }) }),
  generate: (payload: GenerateRequest) =>
    http<GenerateResult>("/resume/generate", { method: "POST", body: JSON.stringify(payload) }),
};
