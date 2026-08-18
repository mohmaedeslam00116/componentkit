"use client";

import { CopyButton } from "@/components/shared/CopyButton";

export function CodePreview({ code, title }: { code: string; title?: string }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
        <span className="text-xs font-medium text-muted-foreground">
          {title || "Code"}
        </span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto bg-muted p-4 text-sm leading-relaxed">
        <code className="font-mono text-foreground">{code}</code>
      </pre>
    </div>
  );
}
