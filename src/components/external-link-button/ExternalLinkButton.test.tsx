// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExternalLinkButton } from "./ExternalLinkButton";

describe("ExternalLinkButton", () => {
  it("renders a new-tab anchor to href", () => {
    render(<ExternalLinkButton href="https://example.com" label="Open in new tab" />);

    const link = screen.getByRole("link", { name: "Open in new tab" });
    expect(link.getAttribute("href")).toBe("https://example.com");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("passes target/rel to a caller-supplied render prop", () => {
    const linkRender = vi.fn((props) => <a data-testid="custom" {...props} />);
    render(<ExternalLinkButton href="https://ignored.example" label="Open" render={linkRender} />);

    expect(linkRender).toHaveBeenCalledWith(expect.objectContaining({ target: "_blank", rel: "noopener noreferrer" }));
    const link = screen.getByTestId("custom");
    expect(link.getAttribute("target")).toBe("_blank");
  });
});
