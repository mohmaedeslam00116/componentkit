import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Textarea } from "@/components/ui/textarea";

describe("Textarea", () => {
  it("renders with placeholder", () => {
    render(<Textarea placeholder="Type here..." />);
    expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
  });

  it("applies md size by default", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.className).toContain("rounded-lg");
  });

  it("applies sm size", () => {
    render(<Textarea inputSize="sm" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.className).toContain("text-xs");
  });

  it("applies lg size", () => {
    render(<Textarea inputSize="lg" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.className).toContain("text-base");
  });

  it("applies error styles when error is true", () => {
    render(<Textarea error />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea.className).toContain("border-destructive");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("has resize-none by default", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox").className).toContain("resize-none");
  });

  it("forwards className", () => {
    render(<Textarea className="custom-class" />);
    expect(screen.getByRole("textbox").className).toContain("custom-class");
  });
});
