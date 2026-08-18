import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Progress } from "@/components/ui/progress";

describe("Progress", () => {
  it("renders the progress bar", () => {
    render(<Progress value={50} />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toBeInTheDocument();
  });

  it("sets aria-valuemin and aria-valuemax", () => {
    render(<Progress value={50} />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "100");
  });

  it("sets aria-valuenow", () => {
    render(<Progress value={75} />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuenow", "75");
  });

  it("does not set aria-valuenow when indeterminate", () => {
    render(<Progress indeterminate />);
    const progress = screen.getByRole("progressbar");
    expect(progress).not.toHaveAttribute("aria-valuenow");
  });

  it("applies size classes", () => {
    const { rerender } = render(<Progress value={50} progressSize="sm" />);
    expect(screen.getByRole("progressbar").className).toContain("h-1");

    rerender(<Progress value={50} progressSize="md" />);
    expect(screen.getByRole("progressbar").className).toContain("h-2");

    rerender(<Progress value={50} progressSize="lg" />);
    expect(screen.getByRole("progressbar").className).toContain("h-3");
  });

  it("forwards className", () => {
    render(<Progress value={50} className="custom-class" />);
    expect(screen.getByRole("progressbar").className).toContain("custom-class");
  });
});
