import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

describe("Tabs", () => {
  it("renders tabs with triggers", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    // Active content is visible, inactive may not be in DOM
    expect(screen.queryByText("Content 1")).toBeTruthy();
  });

  it("initial trigger has active state", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    expect(screen.getByText("Tab 1").getAttribute("data-state")).toBe("active");
    expect(screen.getByText("Tab 2").getAttribute("data-state")).toBe("inactive");
  });

  it("applies underline variant classes", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList variant="underline">
          <TabsTrigger variant="underline" value="tab1">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    const list = screen.getByRole("tablist");
    expect(list.className).toContain("border-b");
  });

  it("applies pill variant classes", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList variant="pill">
          <TabsTrigger variant="pill" value="tab1">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    const list = screen.getByRole("tablist");
    expect(list.className).toContain("rounded-lg");
    expect(list.className).toContain("bg-muted");
  });

  it("applies enclosed variant classes", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList variant="enclosed">
          <TabsTrigger variant="enclosed" value="tab1">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    const trigger = screen.getByText("Tab 1");
    expect(trigger.className).toContain("rounded-t-lg");
  });
});
