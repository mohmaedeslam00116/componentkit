import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Switch } from "@/components/ui/switch";

describe("Switch", () => {
  it("renders the switch", () => {
    render(<Switch />);
    const sw = screen.getByRole("switch");
    expect(sw).toBeInTheDocument();
  });

  it("is off by default", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "unchecked");
  });

  it("toggles on click", () => {
    render(<Switch />);
    const sw = screen.getByRole("switch");
    fireEvent.click(sw);
    expect(sw).toHaveAttribute("data-state", "checked");
  });

  it("respects defaultChecked", () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Switch disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("does not toggle when disabled", () => {
    render(<Switch disabled />);
    const sw = screen.getByRole("switch");
    fireEvent.click(sw);
    expect(sw).toHaveAttribute("data-state", "unchecked");
  });

  it("forwards className", () => {
    render(<Switch className="custom-class" />);
    expect(screen.getByRole("switch").className).toContain("custom-class");
  });
});
