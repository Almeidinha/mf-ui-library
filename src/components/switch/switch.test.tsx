import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { Switch } from "./switch";

describe("Switch Tests", () => {
  it("should render the component and handle event after click", async () => {
    const spyOnChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch onChange={spyOnChange} />);

    expect(spyOnChange).not.toHaveBeenCalled();
    const myComponent = screen.getByRole("switch");

    expect(myComponent).toBeInTheDocument();

    await user.click(myComponent.closest("label") ?? myComponent);
    expect(spyOnChange).toHaveBeenCalled();
  });

  it("should not handle event after click if switch is disabled", async () => {
    const spyOnChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch disabled onChange={spyOnChange} />);

    expect(spyOnChange).not.toHaveBeenCalled();
    const myComponent = screen.getByRole("switch");

    await user.click(myComponent.closest("label") ?? myComponent);

    expect(spyOnChange).not.toHaveBeenCalled();
  });
});
