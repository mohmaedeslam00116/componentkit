import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders with text content", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("applies solid variant classes by default", () => {
    render(<Badge>Solid</Badge>);
    const badge = screen.getByText("Solid");
    expect(badge.className).toContain("bg-primary/10");
    expect(badge.className).toContain("text-primary");
  });

  it("applies secondary variant classes", () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    const badge = screen.getByText("Secondary");
    expect(badge.className).toContain("bg-muted");
  });

  it("applies destructive variant classes", () => {
    render(<Badge variant="destructive">Error</Badge>);
    const badge = screen.getByText("Error");
    expect(badge.className).toContain("bg-destructive/10");
  });

  it("applies outline variant classes", () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText("Outline");
    expect(badge.className).toContain("border-border");
  });

  it("shows dot indicator when showDot is true", () => {
    render(<Badge variant="dot" showDot>With Dot</Badge>);
    const badge = screen.getByText("With Dot");
    const dot = badge.querySelector("span");
    expect(dot).toBeInTheDocument();
    expect(dot?.className).toContain("rounded-full");
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<Badge badgeSize="sm">Small</Badge>);
    expect(screen.getByText("Small").className).toContain("text-[10px]");

    rerender(<Badge badgeSize="md">Medium</Badge>);
    expect(screen.getByText("Medium").className).toContain("text-xs");
  });

  it("forwards className", () => {
    render(<Badge className="custom-class">Test</Badge>);
    expect(screen.getByText("Test").className).toContain("custom-class");
  });
});
