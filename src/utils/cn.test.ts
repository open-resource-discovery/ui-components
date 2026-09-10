import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("lets public utilities replace prefixed internal defaults", () => {
    expect(cn("ordu:h-9 ordu:px-4 ordu:text-sm", "h-12 px-8 text-lg")).toBe("h-12 px-8 text-lg");
  });

  it("merges state variants across the internal prefix", () => {
    expect(cn("ordu:hover:bg-primary ordu:focus:ring-1", "hover:bg-red-500 focus:ring-2")).toBe(
      "hover:bg-red-500 focus:ring-2",
    );
  });

  it("merges responsive and arbitrary variants", () => {
    expect(cn("ordu:sm:h-9 ordu:[&>svg]:size-4", "sm:h-12 [&>svg]:size-6")).toBe("sm:h-12 [&>svg]:size-6");
  });

  it("preserves an important consumer override", () => {
    expect(cn("ordu:bg-primary", "bg-red-500!")).toBe("ordu:bg-primary bg-red-500!");
  });

  it("keeps the internal utility when a consumer repeats the same class", () => {
    expect(cn("ordu:flex ordu:h-9", "flex h-9")).toBe("ordu:flex ordu:h-9");
  });

  it("merges arbitrary values and properties", () => {
    expect(cn("ordu:w-[320px] ordu:[color:red]", "w-[480px] [color:blue]")).toBe("w-[480px] [color:blue]");
  });

  it("retains the unaffected sides of a partial shorthand override", () => {
    expect(cn("ordu:p-6", "pb-0")).toBe("ordu:p-6 pb-0");
  });

  it("preserves non-Tailwind classes", () => {
    expect(cn("ord-code-block ordu:flex", "consumer-class")).toBe("ord-code-block ordu:flex consumer-class");
  });
});
