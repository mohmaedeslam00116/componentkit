"use client";

import { Accessibility, Palette, MousePointerClick, ClipboardCheck } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Accessibility,
    title: "Fully Accessible",
    description:
      "WCAG 2.1 AA compliant with proper ARIA attributes, keyboard navigation, and screen reader support built in.",
  },
  {
    icon: Palette,
    title: "Tailwind Customizable",
    description:
      "Every component is styled with Tailwind CSS. Override any class, swap colors, or extend the theme with ease.",
  },
  {
    icon: MousePointerClick,
    title: "Interactive by Default",
    description:
      "Hover states, focus rings, active states, and transitions — all handled out of the box for a polished feel.",
  },
  {
    icon: ClipboardCheck,
    title: "Copy-Paste Ready",
    description:
      "No complex installation. Copy the HTML and Tailwind classes directly into your project and start building.",
  },
];

const staggerDelay = [
  "delay-0",
  "delay-100",
  "delay-200",
  "delay-300",
];

export function Features() {
  return (
    <section id="features" className="bg-background px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to ship faster
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Components designed with accessibility, customizability, and developer experience in mind.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={staggerDelay[i]}>
              <Card hoverable className="group p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
