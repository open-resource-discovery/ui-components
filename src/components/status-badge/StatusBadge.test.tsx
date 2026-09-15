// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders the label and the tone class", () => {
    render(<StatusBadge tone="success" label="Active" />);
    const badge = screen.getByText("Active").parentElement as HTMLElement;
    expect(badge.className).toContain("ordu:bg-statusbadge-success-bg");
  });

  it("renders a decorative dot by default", () => {
    const { container } = render(<StatusBadge tone="info" label="Proposal" />);
    const dot = container.querySelector('[aria-hidden="true"]');
    expect(dot).not.toBeNull();
    expect(dot?.className).toContain("ordu:bg-statusbadge-info-dot");
  });

  it("omits the dot when dot={false}", () => {
    const { container } = render(<StatusBadge tone="info" label="Proposal" dot={false} />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it("renders the icon slot instead of the dot", () => {
    const { container } = render(<StatusBadge tone="warning" label="Deprecated" icon={<svg data-testid="icon" />} />);
    expect(screen.getByTestId("icon")).not.toBeNull();
    expect(container.querySelector('[class*="statusbadge-warning-dot"]')).toBeNull();
  });
});
