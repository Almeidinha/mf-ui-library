import { render, screen } from "@testing-library/react";
import { Borders } from "foundation/colors";

import { Divider } from "./index";

describe("Divider Tests", () => {
  describe("Divider Tests", () => {
    it("should render the Divider with default color", () => {
      render(<Divider />);

      const divider = screen.getByTestId("divider-test");
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveAttribute("aria-orientation", "horizontal");
      expect(divider).toHaveStyle({ background: Borders.Default.Default });
      expect(divider.getAttribute("style")).toContain("align-self: stretch");
    });

    it("should render the Divider with default color using parameter", () => {
      render(<Divider />);

      const divider = screen.getByTestId("divider-test");
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveAttribute("aria-orientation", "horizontal");
      expect(divider).toHaveStyle({ background: Borders.Default.Default });
      expect(divider.getAttribute("style")).toContain("align-self: stretch");
    });

    it("should render the Divider with muted color", () => {
      render(<Divider muted />);

      const divider = screen.getByTestId("divider-test");
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveStyle({ background: Borders.Default.Muted });
    });

    it("should render the Divider vertically", () => {
      render(<Divider direction="vertical" />);

      const divider = screen.getByTestId("divider-test");
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveAttribute("aria-orientation", "vertical");
      expect(divider).toHaveStyle({ background: Borders.Default.Default });
      expect(divider.getAttribute("style")).toContain("align-self: stretch");
    });

    it("should render the Divider with custom width and height", () => {
      render(<Divider direction="vertical" width={2} height={48} />);

      const divider = screen.getByTestId("divider-test");
      expect(divider).toBeInTheDocument();
      expect(divider.getAttribute("style")).toContain("width: 2px");
      expect(divider.getAttribute("style")).toContain("height: 48px");
    });
  });
});
