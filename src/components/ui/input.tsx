import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full border bg-background text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      inputSize: {
        sm: "h-8 rounded-md px-3 py-1 text-xs",
        md: "h-10 rounded-lg px-3 py-2 text-sm",
        lg: "h-12 rounded-lg px-4 py-3 text-base",
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

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

function Input({
  className,
  inputSize,
  error,
  type,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      className={cn(inputVariants({ inputSize, error, className }))}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}

export { Input, inputVariants, type InputProps };
