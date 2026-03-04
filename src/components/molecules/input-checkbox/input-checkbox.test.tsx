import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { InputCheckbox } from "./input-checkbox";

describe("InputCheckbox Tests", () => {
  it("should render the component and handle event after click", async () => {
    const spyOnChange = vi.fn();
    const user = userEvent.setup();
    render(<InputCheckbox label="My Checkbox" onChange={spyOnChange} />);

    expect(spyOnChange).not.toHaveBeenCalled();
    const myComponent = screen.getByRole("checkbox");
    expect(screen.getByText("My Checkbox")).toBeInTheDocument();
    expect(myComponent).toBeInTheDocument();

    await user.click(myComponent);

    expect(spyOnChange).toHaveBeenCalled();
  });
  it("should not render the component if dont receive a label", () => {
    const { container } = render(<InputCheckbox label="" />);

    expect(container).toBeEmptyDOMElement();
  });
});
