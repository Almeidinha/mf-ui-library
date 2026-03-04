import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { InputField } from "./index";

describe("InputField", () => {
  describe("the inner input element", () => {
    it("should receive nice html props", () => {
      render(
        <InputField
          value="value"
          onChange={() => undefined}
          type="text"
          label="Label"
          placeholder="placeholder"
        />,
      );

      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("placeholder")).toBeInTheDocument();
      expect(screen.getByDisplayValue("value")).toBeInTheDocument();
    });

    it("should call the onChange callback on change events", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<InputField value="value" onChange={handleChange} />);

      await user.type(screen.getByRole("textbox"), "hello");

      expect(handleChange).toHaveBeenCalledTimes(5);
    });
  });

  describe("Label", () => {
    it("should render when given", () => {
      render(<InputField label="Label" />);

      expect(screen.getByLabelText("Label")).toBeInTheDocument();
    });

    it("should not render when not given", () => {
      render(<InputField />);

      expect(screen.queryByLabelText("Label")).not.toBeInTheDocument();
    });
  });

  describe("Prefix", () => {
    it("should render when given", () => {
      render(<InputField prefix="$" />);

      expect(screen.getByText("$")).toBeInTheDocument();
    });

    it("should not render when not given", () => {
      render(<InputField />);

      expect(screen.queryByText("$")).not.toBeInTheDocument();
    });
  });

  describe("Suffix", () => {
    it("should render when given", () => {
      render(<InputField suffix="%" />);

      expect(screen.getByText("%")).toBeInTheDocument();
    });

    it("should not render when not given", () => {
      render(<InputField />);

      expect(screen.queryByText("&")).not.toBeInTheDocument();
    });
  });

  describe("Slots", () => {
    it("should render the Icon slot", () => {
      render(
        <InputField>
          <InputField.Icon>Icon</InputField.Icon>
        </InputField>,
      );

      expect(screen.getByText("Icon")).toBeInTheDocument();
    });

    it("should render the Controls slot", () => {
      render(
        <InputField>
          <InputField.Controls>Controls</InputField.Controls>
        </InputField>,
      );

      expect(screen.getByText("Controls")).toBeInTheDocument();
    });

    it("should not render other kinds of children", () => {
      render(
        <InputField>
          <div>Other Children</div>
        </InputField>,
      );

      expect(screen.queryByText("Other Children")).not.toBeInTheDocument();
    });
  });
});
