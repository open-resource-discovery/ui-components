// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkButton } from "./LinkButton";

describe("LinkButton", () => {
  it("renders a native anchor to href", () => {
    render(<LinkButton href="/products/order" label="Open resource" />);

    const link = screen.getByRole("link", { name: "Open resource" });
    expect(link.getAttribute("href")).toBe("/products/order");
  });

  it("renders through a caller-supplied render prop", () => {
    const linkRender = vi.fn((props) => <a data-testid="custom" {...props} />);
    render(<LinkButton href="/ignored" label="Open resource" render={linkRender} />);

    expect(linkRender).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("custom")).toBeTruthy();
  });
});
