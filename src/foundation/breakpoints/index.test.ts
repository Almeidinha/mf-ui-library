import { describe, expect, it } from "vitest";

import { createBreakpoints } from "./index";

describe("createBreakpoints", () => {
  it("creates the expected media query strings", () => {
    const custom = createBreakpoints({
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1440,
    });

    expect(custom.up("md")).toBe("@media (min-width:768px)");
    expect(custom.down("lg")).toBe("@media (max-width:1023.95px)");
    expect(custom.between("sm", "lg")).toBe(
      "@media (min-width:480px) and (max-width:1023.95px)",
    );
  });

  it("uses the passed breakpoint keys when resolving only()", () => {
    const custom = createBreakpoints({
      xs: 0,
      sm: 500,
      md: 700,
      lg: 900,
      xl: 1200,
    });

    expect(custom.only("md")).toBe(
      "@media (min-width:700px) and (max-width:899.95px)",
    );
    expect(custom.only("xl")).toBe("@media (min-width:1200px)");
  });
});
