// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyButton } from "./CopyButton";

describe("CopyButton", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("writes the value to the clipboard and announces success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    const onCopy = vi.fn();

    render(
      <CopyButton value="hello" label="Copy" copiedAnnouncement="Copied" errorAnnouncement="Failed" onCopy={onCopy} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    expect(writeText).toHaveBeenCalledWith("hello");
    await waitFor(() => expect(onCopy).toHaveBeenCalledWith(true));
    expect(screen.getByRole("status").textContent).toContain("Copied");
  });

  it("announces an error when the clipboard write rejects", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    const onCopy = vi.fn();

    render(
      <CopyButton value="hello" label="Copy" copiedAnnouncement="Copied" errorAnnouncement="Failed" onCopy={onCopy} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    await waitFor(() => expect(onCopy).toHaveBeenCalledWith(false));
    expect(screen.getByRole("status").textContent).toContain("Failed");
  });
});
