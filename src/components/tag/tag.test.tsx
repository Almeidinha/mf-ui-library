import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { Tag } from "./index";

describe("Tag Tests", () => {
  it("should render Tag with given Text", () => {
    render(<Tag>Test</Tag>);
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should render a disabled Tag with the close button and with given Text", () => {
    render(
      <Tag disabled closable>
        Close
      </Tag>,
    );
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeInTheDocument();
  });

  it("should render the Tag with close button and handle event after click", async () => {
    const spyOnClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Tag closable onClose={spyOnClose}>
        Clicked
      </Tag>,
    );
    expect(screen.getByText("Clicked")).toBeInTheDocument();

    const closeIcon = screen.getByRole("button", { name: "Remove tag" });
    await user.click(closeIcon);
    expect(spyOnClose).toHaveBeenCalled();
  });
});
