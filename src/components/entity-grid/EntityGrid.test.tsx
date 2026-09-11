// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EntityGrid } from "./EntityGrid";

interface Item {
  id: string;
  title: string;
}

const items: Item[] = [
  { id: "1", title: "One" },
  { id: "2", title: "Two" },
  { id: "3", title: "Three" },
];

describe("EntityGrid", () => {
  it("renders a list with one listitem per item and the count", () => {
    render(
      <EntityGrid<Item>
        items={items}
        renderCount={(n) => `${n} results`}
        renderItem={(item) => <span>{item.title}</span>}
      />,
    );
    expect(screen.getByRole("list")).not.toBeNull();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("3 results")).not.toBeNull();
  });

  it("renders the empty node and no list when there are no items", () => {
    render(
      <EntityGrid<Item>
        items={[]}
        renderCount={(n) => `${n} results`}
        empty={<div>Nothing here</div>}
        renderItem={(item) => <span>{item.title}</span>}
      />,
    );
    expect(screen.queryByRole("list")).toBeNull();
    expect(screen.getByText("Nothing here")).not.toBeNull();
    expect(screen.getByText("0 results")).not.toBeNull();
  });
});
