import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

describe("Avatar", () => {
  it("renders the component", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders with default rounded-full class", () => {
    render(
      <Avatar>
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    );
    const avatar = screen.getByText("SC").closest("[data-slot]");
    expect(avatar?.className).toContain("rounded-full");
  });

  it("renders fallback with muted background", () => {
    render(
      <Avatar>
        <AvatarFallback>XY</AvatarFallback>
      </Avatar>
    );
    const fallback = screen.getByText("XY");
    expect(fallback.className).toContain("bg-muted");
  });

  it("forwards className to Avatar root", () => {
    const { container } = render(
      <Avatar className="h-16 w-16">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    // The root element should have the custom classes
    const root = container.querySelector("[data-slot='avatar']");
    expect(root?.className).toContain("h-16");
    expect(root?.className).toContain("w-16");
  });
});
