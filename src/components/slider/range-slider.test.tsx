import { fireEvent, render, screen } from "@testing-library/react";
import { JSX, useState } from "react";
import { vi } from "vitest";

import { RangeSlider } from "./index";

vi.mock("recharts", async () => {
  const original = await vi.importActual<typeof import("recharts")>("recharts");

  return {
    ...original,
    ResponsiveContainer: ({
      height,
      children,
    }: {
      height: number;
      children: JSX.Element;
    }) => (
      <div
        className="recharts-responsive-container"
        style={{ width: 800, height }}
      >
        {children}
      </div>
    ),
  };
});

describe("Slider / RangeSlider Tests", () => {
  const data = [
    10, 11, 11, 12, 19, 10, 12, 12, 11, 13, 14, 15, 16, 12, 17, 13, 19, 18,
  ];

  const ControlledRangeSlider = ({
    initialValues,
    onChange,
    ...rest
  }: {
    editable?: boolean;
    prefix?: string;
    min?: number;
    max?: number;
    initialValues: [number, number];
    onChange?: (values: number[]) => void;
  }) => {
    const [values, setValues] = useState<[number, number]>(initialValues);

    return (
      <RangeSlider
        {...rest}
        values={values}
        onChange={(nextValues) => {
          const nextMin = nextValues[0] ?? values[0];
          const nextMax = nextValues[1] ?? values[1];
          setValues([nextMin, nextMax]);
          onChange?.(nextValues);
        }}
      />
    );
  };

  it("should render the RangeSlider", () => {
    const { container } = render(<RangeSlider max={50} values={[0, 50]} />);

    const slider = screen.getAllByRole("slider");
    const inputs = screen.queryAllByDisplayValue("50");
    const input = container.querySelector("input");

    expect(inputs.length).toBe(0);
    expect(input).not.toBeInTheDocument();
    expect(slider[0]).toBeInTheDocument();
    expect(slider[1]).toBeInTheDocument();
  });

  it("should render With an input", () => {
    const { container } = render(
      <RangeSlider editable max={50} values={[0, 50]} />,
    );

    const slider = screen.getAllByRole("slider");
    const maxInput = screen.queryAllByDisplayValue("50");
    const minInput = screen.queryAllByDisplayValue("0");
    const input = container.querySelector("input");

    expect(maxInput.length).toBe(1);
    expect(minInput.length).toBe(1);
    expect(input).toBeInTheDocument();
    expect(slider[0]).toBeInTheDocument();
    expect(slider[1]).toBeInTheDocument();
  });

  it("should render the prefix", () => {
    render(<RangeSlider prefix="$" max={50} values={[10, 50]} />);

    const slider = screen.getAllByRole("slider");
    const minPrefix = screen.getByText("$ 10");
    const maxPrefix = screen.getByText("$ 50");

    expect(minPrefix).toBeInTheDocument();
    expect(maxPrefix).toBeInTheDocument();
    expect(slider[0]).toBeInTheDocument();
    expect(slider[1]).toBeInTheDocument();
  });

  it("Should change values on RangeSlide", () => {
    const handleChange = vi.fn();

    render(
      <ControlledRangeSlider
        editable
        prefix="$"
        max={50}
        initialValues={[10, 50]}
        onChange={handleChange}
      />,
    );

    const slider = screen.getAllByRole("slider");
    const minInput: HTMLInputElement = screen.getByRole("spinbutton", {
      name: "Minimum value",
    });
    const maxInput: HTMLInputElement = screen.getByRole("spinbutton", {
      name: "Maximum value",
    });

    expect(minInput.value).toBe("10");
    fireEvent.change(minInput, { target: { value: "21" } });
    expect(minInput.value).toBe("21");
    fireEvent.blur(minInput);

    expect(handleChange).toHaveBeenCalledWith([21, 50]);

    expect(maxInput.value).toBe("50");
    fireEvent.change(maxInput, { target: { value: "30" } });
    expect(maxInput.value).toBe("30");
    fireEvent.blur(maxInput);

    expect(handleChange).toHaveBeenCalledWith([21, 30]);

    expect(slider[0]).toBeInTheDocument();
    expect(slider[1]).toBeInTheDocument();
  });

  it("Inputs should validate values to not cross min, max values", () => {
    const handleChange = vi.fn();

    render(
      <ControlledRangeSlider
        editable
        prefix="$"
        min={10}
        max={50}
        initialValues={[10, 50]}
        onChange={handleChange}
      />,
    );

    const minInput: HTMLInputElement = screen.getByRole("spinbutton", {
      name: "Minimum value",
    });
    const maxInput: HTMLInputElement = screen.getByRole("spinbutton", {
      name: "Maximum value",
    });

    expect(minInput.value).toBe("10");
    fireEvent.change(minInput, { target: { value: "60" } });
    fireEvent.blur(minInput);
    expect(minInput.value).toBe("50");
    expect(maxInput.value).toBe("50");
    fireEvent.change(minInput, { target: { value: "5" } });
    fireEvent.blur(minInput);
    expect(minInput.value).toBe("10");
    expect(maxInput.value).toBe("50");
    fireEvent.change(minInput, { target: { value: "25" } });
    fireEvent.blur(minInput);
    expect(minInput.value).toBe("25");

    expect(maxInput.value).toBe("50");
    fireEvent.change(maxInput, { target: { value: "99" } });
    fireEvent.blur(maxInput);
    expect(maxInput.value).toBe("50");
    fireEvent.change(maxInput, { target: { value: "2" } });
    fireEvent.blur(maxInput);
    expect(maxInput.value).toBe("25");
    expect(minInput.value).toBe("25");

    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it("Should Render the Graph", () => {
    render(<RangeSlider values={[10, 50]} data={data} />);

    const slider = screen.getAllByRole("slider");
    const graph = document.querySelector(".recharts-responsive-container");

    expect(slider[0]).toBeInTheDocument();
    expect(slider[1]).toBeInTheDocument();
    expect(graph).toBeInTheDocument();
  });
});
