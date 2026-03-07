import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { Slider } from "./index";

describe("Slider / RangeSlider Tests", () => {
  it("should render the Slider", () => {
    const { container } = render(<Slider max={50} value={50} />);

    const slider = screen.getByRole("slider");
    const inputs = screen.queryAllByDisplayValue("50");
    const input = container.querySelector("input");

    expect(inputs.length).toBe(0);
    expect(input).not.toBeInTheDocument();
    expect(slider).toBeInTheDocument();
  });

  it("should render With an input", () => {
    const { container } = render(<Slider editable max={50} value={50} />);

    const slider = screen.getByRole("slider");
    const inputs = screen.queryAllByDisplayValue("50");
    const input = container.querySelector("input");

    expect(inputs.length).toBe(1);
    expect(input).toBeInTheDocument();
    expect(slider).toBeInTheDocument();
  });

  it("should render the prefix", () => {
    render(<Slider prefix="$" max={50} value={50} />);

    const slider = screen.getByRole("slider");
    const prefix = screen.getByText("$");

    expect(prefix).toBeInTheDocument();
    expect(slider).toBeInTheDocument();
  });

  it("Should change values on slide", () => {
    const handleChange = vi.fn();

    render(
      <Slider
        editable
        prefix="$"
        max={50}
        value={50}
        onChange={handleChange}
      />,
    );

    const slider = screen.getByRole("slider");
    const input: HTMLInputElement = screen.getByLabelText("Slider value");

    expect(input.value).toBe("50");
    fireEvent.change(input, { target: { value: "30" } });
    expect(input.value).toBe("30");
    fireEvent.blur(input);

    expect(handleChange).toHaveBeenCalledWith(30);
    expect(slider).toBeInTheDocument();
  });
});
