import { Borders } from "@foundations";
import { render, screen } from "@testing-library/react";

import { Divider } from "./index";

describe("Divider Tests", () => {
  describe("Divider Tests", () => {
    it("should render the Divider with default color", () => {
      render(<Divider />);

      const divider = screen.getByTestId("divider-test");
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveStyle({ borderTopWidth: "1px" });
      expect(divider).toHaveStyle({ borderTopStyle: "solid" });
      expect(divider).toHaveStyle({ borderTopColor: Borders.Default.Default });
    });

    it("should render the Divider with default color using parameter", () => {
      render(<Divider />);

      const divider = screen.getByTestId("divider-test");
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveStyle({ borderTopWidth: "1px" });
      expect(divider).toHaveStyle({ borderTopStyle: "solid" });
      expect(divider).toHaveStyle({ borderTopColor: Borders.Default.Default });
    });

    it("should render the Divider with subdued color", () => {
      render(<Divider subdued />);

      const divider = screen.getByTestId("divider-test");
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveStyle({ borderTopWidth: "1px" });
      expect(divider).toHaveStyle({ borderTopStyle: "solid" });
      expect(divider).toHaveStyle({ borderTopColor: Borders.Default.Subdued });
    });
  });
});
