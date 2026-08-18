"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-primary-light),transparent)]" />

      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-8">
          <Badge variant="outline" className="gap-2 px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            New: 50+ components now available
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Build faster with
          <br />
          <span className="text-primary">beautiful components</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          A collection of 50+ accessible, customizable UI components.
          Copy-paste into your Next.js, React, or HTML project in seconds.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30" asChild>
            <a href="#components">
              Browse Components
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <a href="/docs">Get Started</a>
          </Button>
        </div>

        {/* Hero visual — live component showcase */}
        <div className="relative mx-auto mt-16 max-w-2xl">
          <Card className="p-6 shadow-2xl shadow-black/5 dark:shadow-black/30">
            <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <div className="h-3 w-3 rounded-full bg-warning" />
              <div className="h-3 w-3 rounded-full bg-success" />
              <span className="ml-2 text-xs text-muted-foreground">component-preview.tsx</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
              <Button variant="destructive" size="sm">Destructive</Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Badge>New</Badge>
              <Badge variant="outline">Badge</Badge>
              <Badge variant="secondary">Default</Badge>
              <Badge variant="solid" className="bg-success/10 text-success border-transparent">Success</Badge>
              <Badge variant="solid" className="bg-warning/10 text-warning border-transparent">Warning</Badge>
            </div>
          </Card>
          {/* Decorative glow */}
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/5 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
