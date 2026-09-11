// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EntityCard } from "./EntityCard";

describe("EntityCard", () => {
  const base = { kind: "API Resource", title: "Sales Order API" };

  it("renders an anchor when href is provided", () => {
    render(<EntityCard {...base} href="/resources/1" ariaLabel="Open Sales Order API" />);
    const link = screen.getByRole("link", { name: "Open Sales Order API" });
    expect(link.getAttribute("href")).toBe("/resources/1");
  });

  it("renders a button that fires onClick when only onClick is provided", () => {
    const onClick = vi.fn();
    render(<EntityCard {...base} onClick={onClick} ariaLabel="Select" />);
    fireEvent.click(screen.getByRole("button", { name: "Select" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders an article when neither href nor onClick is provided", () => {
    const { container } = render(<EntityCard {...base} />);
    expect(container.querySelector("article")).not.toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("prefers the render slot over href", () => {
    const renderSlot = vi.fn((props) => <a data-testid="custom" {...props} />);
    render(<EntityCard {...base} href="/ignored" render={renderSlot} />);
    expect(renderSlot).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("custom")).not.toBeNull();
  });

  it("renders statuses as StatusBadges", () => {
    render(<EntityCard {...base} statuses={[{ label: "Active", tone: "success" }]} />);
    expect(screen.getByText("Active")).not.toBeNull();
  });
});
