import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

describe("Tooltip", () => {
  it("renders trigger element", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("content is rendered in portal when open", () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>Visible tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.getByText("Visible tip")).toBeInTheDocument();
  });

  it("forwards className to content", () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent className="custom-tooltip">Text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    const content = screen.getByText("Text");
    expect(content.className).toContain("custom-tooltip");
  });
});
