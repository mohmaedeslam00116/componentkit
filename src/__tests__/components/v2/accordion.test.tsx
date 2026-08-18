import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

describe("Accordion", () => {
  it("renders trigger text", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Question 1</AccordionTrigger>
          <AccordionContent>Answer 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("Question 1")).toBeInTheDocument();
  });

  it("renders content when expanded", () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Question</AccordionTrigger>
          <AccordionContent>Answer</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("Answer")).toBeInTheDocument();
  });

  it("trigger does not throw on click", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Toggle</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(() => {
      fireEvent.click(screen.getByText("Toggle"));
    }).not.toThrow();
  });

  it("renders multiple items with open triggers", () => {
    render(
      <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>First</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("First").getAttribute("data-state")).toBe("open");
    expect(screen.getByText("Second").getAttribute("data-state")).toBe("open");
  });

  it("renders chevron icon in trigger", () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Open item</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByText("Open item");
    const svg = trigger.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies border-b to item", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Q</AccordionTrigger>
          <AccordionContent>A</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const item = screen.getByText("Q").closest("[data-slot='accordion-item']");
    expect(item?.className).toContain("border-b");
  });
});
