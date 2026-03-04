import { Actions } from "@foundations";
import { render, screen } from "@testing-library/react";

import { Button } from "./index";

describe("Button Tests", () => {
  describe("ButtonBasic Tests", () => {
    it("should render Button with given Text", () => {
      render(<Button>Test Button</Button>);

      expect(screen.getByText("Test Button")).toBeInTheDocument();
      expect(screen.queryByRole("button")).toBeInTheDocument();
    });
  });

  describe("ButtonPrimary Tests", () => {
    it("should render Button with given Text", () => {
      render(<Button primary>Test Button</Button>);

      expect(screen.getByText("Test Button")).toBeInTheDocument();
      expect(screen.queryByRole("button")).toBeInTheDocument();
    });
  });

  describe("ButtonDestructive Tests", () => {
    it("should render Button with given Text", () => {
      render(<Button destructive>Test Button</Button>);

      expect(screen.getByText("Test Button")).toBeInTheDocument();
      expect(screen.queryByRole("button")).toBeInTheDocument();
      expect(screen.queryByRole("button")).toHaveStyle("background: none");
    });

    it("should render Button with given Text", () => {
      render(
        <Button destructive primary>
          Test Button
        </Button>,
      );

      expect(screen.getByText("Test Button")).toBeInTheDocument();
      expect(screen.queryByRole("button")).toBeInTheDocument();
      expect(screen.queryByRole("button")).toHaveStyle(
        `background: ${Actions.Critical.Default}`,
      );
    });
  });

  describe("ButtonOutline Tests", () => {
    it("should render Button with given Text", () => {
      render(<Button outline>Test Button</Button>);

      expect(screen.getByText("Test Button")).toBeInTheDocument();
      expect(screen.queryByRole("button")).toBeInTheDocument();
    });
  });

  describe("ButtonPlain Tests", () => {
    it("should render Button with given Text", () => {
      render(<Button plain>Test Button</Button>);

      expect(screen.getByText("Test Button")).toBeInTheDocument();
      expect(screen.queryByRole("button")).toBeInTheDocument();
    });
  });
});
