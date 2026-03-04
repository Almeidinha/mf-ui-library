import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { Checkbox } from "./checkbox";

describe("Checkbox Input Tests", () => {
  it("should render the component and handle event after click", async () => {
    const spyOnChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox onChange={spyOnChange} />);

    expect(spyOnChange).not.toHaveBeenCalled();
    const myComponent = screen.getByRole("checkbox");

    expect(myComponent).toBeInTheDocument();

    await user.click(myComponent);
    expect(spyOnChange).toHaveBeenCalled();
  });

  it("should not handle event after click if checkbox has disabled", async () => {
    const spyOnChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox disabled onChange={spyOnChange} />);

    expect(spyOnChange).not.toHaveBeenCalled();
    const myComponent = screen.getByRole("checkbox");

    await user.click(myComponent);

    expect(spyOnChange).not.toHaveBeenCalled();
  });
});
