"use client";

import { CopyButton } from "./CopyButton";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  return (
    <div className={cn("relative group", className)}>
      <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-border bg-muted px-4 py-2">
        <span className="text-xs font-medium text-muted-foreground">HTML</span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto rounded-b-lg border border-border bg-muted p-4 text-sm leading-relaxed">
        <code className="font-mono text-foreground">{code}</code>
      </pre>
    </div>
  );
}
