// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EntityCard } from "./EntityCard";

describe("EntityCard", () => {
  const base = { title: "Sales Order API" };

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

  it("renders a subdued eyebrow only when kind is provided", () => {
    const { rerender } = render(<EntityCard {...base} />);
    expect(screen.queryByText("API Resource")).toBeNull();
    rerender(<EntityCard {...base} kind="API Resource" />);
    expect(screen.getByText("API Resource")).not.toBeNull();
  });

  it("renders metrics as count chips by default (bold value + label)", () => {
    const { container } = render(<EntityCard {...base} metrics={[{ label: "APIs", value: 12 }]} />);
    expect(container.querySelector("dl")).toBeNull();
    const bold = container.querySelector("b");
    expect(bold?.textContent).toBe("12");
    expect(screen.getByText("APIs")).not.toBeNull();
  });

  it("renders metrics as a definition list when metricsVariant is grid", () => {
    const { container } = render(
      <EntityCard {...base} metricsVariant="grid" metrics={[{ label: "APIs", value: 12 }]} />,
    );
    expect(container.querySelector("dl")).not.toBeNull();
    expect(screen.getByText("APIs")).not.toBeNull();
  });

  it("spreads arbitrary DOM props (data-testid, style) onto the root", () => {
    const { container } = render(<EntityCard {...base} data-testid="card-1" style={{ opacity: 0.5 }} />);
    const el = screen.getByTestId("card-1");
    expect(el).not.toBeNull();
    expect((container.firstChild as HTMLElement).style.opacity).toBe("0.5");
  });

  it("renders a footer with a divider by default and drops it when footerDivider is false", () => {
    const { container, rerender } = render(<EntityCard {...base} footer={<span>my.ord:id</span>} />);
    expect(screen.getByText("my.ord:id")).not.toBeNull();
    const footer = container.querySelector("article > div:last-child") as HTMLElement;
    expect(footer.className).toContain("border-t");
    rerender(<EntityCard {...base} footer={<span>my.ord:id</span>} footerDivider={false} />);
    const footer2 = container.querySelector("article > div:last-child") as HTMLElement;
    expect(footer2.className).not.toContain("border-t");
  });

  it("renders the footerAction slot", () => {
    render(<EntityCard {...base} footerAction={<span>Explore</span>} />);
    expect(screen.getByText("Explore")).not.toBeNull();
  });

  it("renders free-form pills", () => {
    render(<EntityCard {...base} pills={<span>REST</span>} />);
    expect(screen.getByText("REST")).not.toBeNull();
  });

  it("marks the card disabled (native disabled on a button, aria-disabled otherwise)", () => {
    const { rerender } = render(<EntityCard {...base} onClick={() => {}} ariaLabel="Select" disabled />);
    expect(screen.getByRole("button", { name: "Select" }).hasAttribute("disabled")).toBe(true);
    rerender(<EntityCard {...base} href="/x" ariaLabel="Open" disabled />);
    expect(screen.getByRole("link", { name: "Open" }).getAttribute("aria-disabled")).toBe("true");
  });
});
