// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  const items = [
    { label: "Products", href: "/products" },
    { label: "Customer Order", href: "/products/customer-order" },
    { label: "Order API" },
  ];

  it("renders a labelled nav landmark", () => {
    render(<Breadcrumbs label="Breadcrumb" items={items} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).not.toBeNull();
  });

  it("marks the last item as the current page and not a link", () => {
    render(<Breadcrumbs label="Breadcrumb" items={items} />);
    const current = screen.getByText("Order API");
    expect(current.getAttribute("aria-current")).toBe("page");
    expect(current.closest("a")).toBeNull();
  });

  it("invokes linkRender with the computed className for non-terminal items", () => {
    const linkRender = vi.fn((props) => <a data-testid="custom" {...props} />);
    render(<Breadcrumbs label="Breadcrumb" items={items} linkRender={linkRender} />);
    expect(linkRender).toHaveBeenCalledTimes(2);
    expect(linkRender.mock.calls[0][0].className).toContain("ordu:focus-visible:ring-ring");
    expect(screen.getAllByTestId("custom")).toHaveLength(2);
  });

  it("collapses to first + last items with an ellipsis when over maxItems", () => {
    const long = [
      { label: "A", href: "#" },
      { label: "B", href: "#" },
      { label: "C", href: "#" },
      { label: "D", href: "#" },
      { label: "E" },
    ];
    render(<Breadcrumbs label="Breadcrumb" items={long} maxItems={3} collapseLabel="hidden" />);
    expect(screen.getByLabelText("hidden").textContent).toContain("…");
    expect(screen.getByText("A")).not.toBeNull();
    expect(screen.getByText("E")).not.toBeNull();
    expect(screen.queryByText("C")).toBeNull();
  });
});
