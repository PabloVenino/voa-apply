import { useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ResumeUploaderProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ACCEPT = ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export function ResumeUploader({ file, onFileChange }: ResumeUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <Card>
      <CardContent className="p-4">
        {file ? (
          <div className="flex items-center justify-between gap-3 rounded-md border bg-muted/40 p-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-background">
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onFileChange(null)}
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files?.[0];
              if (f) onFileChange(f);
            }}
            className={`flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed py-10 text-center transition-colors ${
              dragOver ? "border-ring bg-accent" : "border-border hover:bg-accent/50"
            }`}
          >
            <Upload className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">PDF or DOCX, up to 10MB</p>
            </div>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            onFileChange(f);
            e.target.value = "";
          }}
        />
      </CardContent>
    </Card>
  );
}
