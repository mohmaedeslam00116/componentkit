"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "ComponentKit saved us weeks of work. The components are beautiful, accessible, and just work out of the box.",
    author: "Sarah Chen",
    role: "Lead Engineer, Vercel",
  },
  {
    quote:
      "Finally, a component library that designers and developers both love. The Tailwind integration is seamless.",
    author: "Marcus Johnson",
    role: "Product Designer, Stripe",
  },
  {
    quote:
      "We migrated our entire design system to ComponentKit. The accessibility compliance alone was worth it.",
    author: "Aisha Patel",
    role: "Engineering Manager, GitHub",
  },
];

const stats = [
  { value: "50+", label: "Components" },
  { value: "10K+", label: "Downloads" },
  { value: "99%", label: "A11y Score" },
  { value: "4.9★", label: "Rating" },
];

const staggerDelay = [
  "delay-0",
  "delay-100",
  "delay-200",
  "delay-300",
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-muted px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Loved by developers & designers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              See what teams are saying about ComponentKit.
            </p>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={staggerDelay[i]}>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.author} delay={staggerDelay[i]}>
              <Card hoverable className="p-6">
                <div className="mb-4 text-primary">
                  <Badge variant="solid" className="gap-1">
                    ★★★★★
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {t.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {t.author}
                      </div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
