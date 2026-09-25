// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders the provided slots", () => {
    render(
      <EmptyState
        icon={<svg data-testid="icon" />}
        title="No results"
        description="Try again"
        actions={<button>Reset</button>}
      />,
    );
    expect(screen.getByTestId("icon")).not.toBeNull();
    expect(screen.getByText("No results")).not.toBeNull();
    expect(screen.getByText("Try again")).not.toBeNull();
    expect(screen.getByRole("button", { name: "Reset" })).not.toBeNull();
  });

  it("omits slots that are not provided", () => {
    render(<EmptyState title="Only a title" />);
    expect(screen.getByText("Only a title")).not.toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });
});
