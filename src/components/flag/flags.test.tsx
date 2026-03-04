import { render, screen } from "@testing-library/react";

import { Flag } from "./index";

describe("Flag Tests", () => {
  describe("Flag Tests", () => {
    it("should render the flag", () => {
      render(<Flag code="CA" />);

      const flag = screen.getByRole("img");

      expect(flag.closest("i")).toBeInTheDocument();
      expect(flag).toBeInTheDocument();
    });

    it("should render the large flag", () => {
      render(<Flag large code="CA" />);

      const flag = screen.getByRole("img");

      expect(flag).toBeInTheDocument();
      expect(flag).toHaveStyle({ width: "32px", height: "24px" });
    });

    it("should render the medium flag", () => {
      render(<Flag medium code="CA" />);

      const flag = screen.getByRole("img");

      expect(flag).toBeInTheDocument();
      expect(flag).toHaveStyle({ width: "20px", height: "20px" });
    });

    it("should apply a class to the container", () => {
      render(<Flag medium code="CA" className="foo" />);

      const flag = screen.getByRole("img");

      expect(flag.closest("i")).toHaveClass("foo");
    });

    it("should apply styles to the container", () => {
      render(<Flag medium code="CA" style={{ display: "block" }} />);

      const flag = screen.getByRole("img");

      expect(flag.closest("i")).toHaveStyle({ display: "block" });
    });
  });
});
