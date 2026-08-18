import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
  });

  it("applies md size classes by default", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("h-10");
  });

  it("applies sm size classes", () => {
    render(<Input inputSize="sm" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("h-8");
  });

  it("applies lg size classes", () => {
    render(<Input inputSize="lg" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("h-12");
  });

  it("applies error styles when error is true", () => {
    render(<Input error />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.className).toContain("border-destructive");
  });

  it("does not set aria-invalid when error is false", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("handles email type", () => {
    render(<Input type="email" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
  });

  it("forwards className", () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole("textbox").className).toContain("custom-class");
  });

  it("forwards value and onChange", () => {
    const handleChange = vi.fn();
    render(<Input value="test" onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("test");
  });
});
