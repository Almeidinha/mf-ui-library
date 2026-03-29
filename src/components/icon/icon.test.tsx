import { render, screen } from "@testing-library/react";
import { Button } from "components/molecules/button";
import { withThemeProvider } from "theme/theme";

import { Icon, IconMinor } from "./index";

describe("Icon Tests", () => {
  describe("Icon Tests", () => {
    it("should render the Icon", () => {
      render(<Icon.Book />);

      const icon = screen.getByRole("img", { name: "icon" });

      expect(icon).toBeInTheDocument();
    });

    it("should render the IconMinor", () => {
      render(<IconMinor.Bookmark />);

      const icon = screen.getByRole("img", { name: "icon" });

      expect(icon).toBeInTheDocument();
    });

    it("should render the drag IconMinor", () => {
      render(<IconMinor.Drag />);

      const icon = screen.getByRole("img", { name: "icon" });

      expect(icon).toBeInTheDocument();
    });

    it("Change the color when styles inside a button", () => {
      render(
        withThemeProvider(
          <Button primary IconPrefix={IconMinor.Bookmark}>
            Button Test
          </Button>,
        ),
      );

      expect(screen.getByText("Button Test")).toBeInTheDocument();

      const icon = screen.getByRole("img", { name: "icon" });

      expect(icon).toBeInTheDocument();
      expect(getComputedStyle(icon).color).toBe("var(--icon-color)");
      expect(icon.querySelector("path")).toHaveAttribute("fill", "currentColor");
    });
  });
});
