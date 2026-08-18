import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-muted",
  {
    variants: {
      progressSize: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      progressSize: "md",
    },
  }
);

interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /** Progress value from 0 to 100 */
  value?: number;
  /** Maximum value (defaults to 100) */
  max?: number;
  /** Show indeterminate animation instead of a fixed value */
  indeterminate?: boolean;
}

function Progress({
  className,
  progressSize,
  value = 0,
  max = 100,
  indeterminate = false,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      data-slot="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : value}
      aria-label={props["aria-label"] ?? "Progress"}
      className={cn(progressVariants({ progressSize, className }))}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full bg-primary transition-all",
          indeterminate && "w-1/3 animate-[indeterminate_1.5s_ease-in-out_infinite]"
        )}
        style={indeterminate ? undefined : { width: `${percentage}%` }}
      />
    </div>
  );
}

export { Progress, progressVariants, type ProgressProps };
