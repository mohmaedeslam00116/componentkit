import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex min-h-[80px] w-full resize-none border bg-background text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      inputSize: {
        sm: "rounded-md px-3 py-1.5 text-xs",
        md: "rounded-lg px-3 py-2 text-sm",
        lg: "rounded-lg px-4 py-3 text-base",
      },
      error: {
        true: "border-destructive focus-visible:ring-destructive/20",
        false: "border-border",
      },
    },
    defaultVariants: {
      inputSize: "md",
      error: false,
    },
  }
);

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {}

function Textarea({
  className,
  inputSize,
  error,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={cn(textareaVariants({ inputSize, error, className }))}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}

export { Textarea, textareaVariants, type TextareaProps };
