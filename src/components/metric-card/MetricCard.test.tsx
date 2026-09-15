// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MetricCard } from "./MetricCard";

describe("MetricCard", () => {
  it("renders the label and value", () => {
    render(<MetricCard label="Compliance score" value="87%" />);
    expect(screen.getByText("Compliance score")).not.toBeNull();
    expect(screen.getByText("87%")).not.toBeNull();
  });

  it("uses the success tone for an up trend by default", () => {
    render(<MetricCard label="Resources" value="124" trend={{ direction: "up", value: "+8", label: "up 8" }} />);
    const trend = screen.getByLabelText("up 8");
    expect(trend.className).toContain("ordu:text-success");
  });

  it("uses the critical tone for a down trend by default", () => {
    render(<MetricCard label="Violations" value="31" trend={{ direction: "down", value: "-5", label: "down 5" }} />);
    expect(screen.getByLabelText("down 5").className).toContain("ordu:text-destructive");
  });

  it("renders the detail slot", () => {
    render(<MetricCard label="Score" value="87%" detail="across 142 resources" />);
    expect(screen.getByText("across 142 resources")).not.toBeNull();
  });
});
