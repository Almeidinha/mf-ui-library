import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { RadioButton } from "./radio-button";

describe("RadioButton Input Tests", () => {
  const option = {
    id: "1",
    label: "Canada",
    value: "CA",
  };

  it("should render the radio button and handle event after click", async () => {
    const spyOnChange = vi.fn();
    const user = userEvent.setup();
    render(
      <RadioButton
        onChange={spyOnChange}
        label={option.label}
        value={option.value}
        id={option.id}
      />,
    );

    expect(spyOnChange).not.toHaveBeenCalled();
    const myComponent = screen.getByRole("radio");

    expect(myComponent).toBeInTheDocument();

    await user.click(myComponent);
    expect(spyOnChange).toHaveBeenCalled();

    expect(spyOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        target: expect.objectContaining({
          value: "CA",
          id: "1",
        }),
      }),
    );
  });

  it("should not handle event after click if radio button has disabled", async () => {
    const spyOnChange = vi.fn();
    const user = userEvent.setup();
    render(<RadioButton disabled onChange={spyOnChange} label={""} id={""} />);

    expect(spyOnChange).not.toHaveBeenCalled();
    const myComponent = screen.getByRole("radio");

    await user.click(myComponent);

    expect(spyOnChange).not.toHaveBeenCalled();
  });
});
