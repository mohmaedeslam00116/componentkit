import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
  {
    variants: {
      variant: {
        solid: "border-transparent bg-primary/10 text-primary",
        secondary: "border-transparent bg-muted text-muted-foreground",
        destructive:
          "border-transparent bg-destructive/10 text-destructive",
        outline: "border-border text-foreground",
        dot: "border-transparent bg-primary/10 text-primary",
      },
      badgeSize: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "solid",
      badgeSize: "md",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show a dot indicator before the label */
  showDot?: boolean;
}

function Badge({
  className,
  variant,
  badgeSize,
  showDot,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, badgeSize, className }))}
      {...props}
    >
      {showDot && (
        <span className="mr-1.5 h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants, type BadgeProps };
