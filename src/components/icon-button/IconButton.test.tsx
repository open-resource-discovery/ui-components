// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { IconButton } from "./IconButton";

const Icon = <svg data-testid="idle-icon" aria-hidden="true" viewBox="0 0 24 24" />;
const ActiveIcon = <svg data-testid="active-icon" aria-hidden="true" viewBox="0 0 24 24" />;

describe("IconButton", () => {
  it("renders the icon and fires the onClick callback", () => {
    const onClick = vi.fn();
    render(<IconButton icon={Icon} label="Do thing" onClick={onClick} />);

    fireEvent.click(screen.getByRole("button", { name: "Do thing" }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("idle-icon")).toBeTruthy();
  });

  it("swaps to activeIcon when active is true", () => {
    render(<IconButton icon={Icon} activeIcon={ActiveIcon} active label="Do thing" />);

    expect(screen.queryByTestId("idle-icon")).toBeNull();
    expect(screen.getByTestId("active-icon")).toBeTruthy();
  });
});
