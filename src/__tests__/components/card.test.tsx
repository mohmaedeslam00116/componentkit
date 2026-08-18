import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    render(<Card>Test</Card>);
    const card = screen.getByText("Test").closest("[data-slot]");
    expect(card).toBeInTheDocument();
    expect(card?.className).toContain("rounded-xl");
    expect(card?.className).toContain("border");
  });

  it("applies hoverable variant classes", () => {
    render(<Card hoverable>Hoverable</Card>);
    const card = screen.getByText("Hoverable").closest("[data-slot]");
    expect(card?.className).toContain("transition-all");
    expect(card?.className).toContain("hover:shadow-lg");
  });

  it("renders CardHeader", () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
      </Card>
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("renders CardTitle", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Title").tagName).toBe("H3");
  });

  it("renders CardDescription", () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>Description</CardDescription>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders CardContent", () => {
    render(
      <Card>
        <CardContent>Content</CardContent>
      </Card>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders CardFooter", () => {
    render(
      <Card>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("renders full compound card", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>My Card</CardTitle>
          <CardDescription>A description</CardDescription>
        </CardHeader>
        <CardContent>Body content</CardContent>
        <CardFooter>Footer actions</CardFooter>
      </Card>
    );
    expect(screen.getByText("My Card")).toBeInTheDocument();
    expect(screen.getByText("A description")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
    expect(screen.getByText("Footer actions")).toBeInTheDocument();
  });

  it("forwards className", () => {
    render(<Card className="custom-class">Test</Card>);
    const card = screen.getByText("Test").closest("[data-slot]");
    expect(card?.className).toContain("custom-class");
  });
});
