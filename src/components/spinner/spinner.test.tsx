import { render, screen } from "@testing-library/react";

import { Spinner } from "./index";

describe("Spinner Tests", () => {
  describe("Spinner Tests", () => {
    it("should render the Spinner with default size", () => {
      render(<Spinner />);

      const spinner = screen.getByRole("status", { name: "Loading" });
      const svg = spinner.querySelector("svg");
      expect(svg).not.toBeNull();

      expect(spinner).toBeInTheDocument();
      expect(svg).toHaveStyle("height: 40px");
    });

    it("should render the Spinner with small size", () => {
      render(<Spinner small />);

      const spinner = screen.getByRole("status", { name: "Loading" });
      const svg = spinner.querySelector("svg");
      expect(svg).not.toBeNull();

      expect(spinner).toBeInTheDocument();
      expect(svg).toHaveStyle("height: 18px");
    });
  });
});
