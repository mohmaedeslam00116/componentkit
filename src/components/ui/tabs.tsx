"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  variant = "underline",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
  variant?: "underline" | "pill" | "enclosed";
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        "flex",
        variant === "underline" && "gap-1 border-b border-border",
        variant === "pill" &&
          "inline-flex gap-1 rounded-lg bg-muted p-1 w-fit",
        variant === "enclosed" && "gap-1",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  variant = "underline",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  variant?: "underline" | "pill" | "enclosed";
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variant === "underline" &&
          "border-b-2 border-transparent px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary",
        variant === "pill" &&
          "rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        variant === "enclosed" &&
          "rounded-t-lg border border-b-0 border-border bg-muted px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground data-[state=active]:border-border data-[state=active]:border-b-transparent data-[state=active]:bg-background data-[state=active]:text-foreground",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
