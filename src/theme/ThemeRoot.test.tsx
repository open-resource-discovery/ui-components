// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import type { CSSProperties } from "react";
import { ThemeRoot, usePortalContainer } from "./ThemeRoot";

function PortalProbe(): React.JSX.Element {
  const container = usePortalContainer();
  return <span data-testid="portal-probe" data-container-ready={container ? "true" : "false"} />;
}

describe("ThemeRoot", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );
  });

  it("applies the isolated root classes and runtime token overrides", async () => {
    const style: CSSProperties & { "--ord-primary": string } = { "--ord-primary": "#123456" };
    const { container } = render(
      <ThemeRoot defaultTheme="light" className="consumer-root" style={style}>
        <PortalProbe />
      </ThemeRoot>,
    );

    const root = container.firstElementChild as HTMLElement;
    expect([...root.classList]).toEqual(expect.arrayContaining(["ord-ui", "ordu:text-foreground", "consumer-root"]));
    expect(root.style.getPropertyValue("--ord-primary")).toBe("#123456");
    await waitFor(() => expect(screen.getByTestId("portal-probe").getAttribute("data-container-ready")).toBe("true"));
  });

  it("keeps dark mode scoped to the root", () => {
    const { container } = render(
      <ThemeRoot defaultTheme="dark">
        <span />
      </ThemeRoot>,
    );

    expect(container.firstElementChild?.classList.contains("ord-ui")).toBe(true);
    expect(container.firstElementChild?.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
