import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { Toast } from "./toast";

describe("Toast Tests", () => {
  it("renders title, description, and action button", () => {
    const onOpenChange = vi.fn();
    const onActionClick = vi.fn();
    render(
      <Toast
        position="top"
        open={true}
        onOpenChange={onOpenChange}
        actionText="Action"
        title="Toast Title"
        description="This is a toast notification."
        onActionClick={onActionClick}
      />,
    );

    expect(screen.getByText("Toast Title")).toBeInTheDocument();
    expect(
      screen.getByText("This is a toast notification."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });

  it("calls onActionClick when action button is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onActionClick = vi.fn();

    render(
      <Toast
        position="top"
        open={true}
        onOpenChange={onOpenChange}
        title="Toast Title"
        description="This is a toast notification."
        actionText="Action"
        onActionClick={onActionClick}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Action" }));
    expect(onActionClick).toHaveBeenCalledTimes(1);
  });

  it("calls onOpenChange(false) when close is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Toast
        position="top"
        open={true}
        onOpenChange={onOpenChange}
        title="Toast Title"
        description="This is a toast notification."
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Close notification" }),
    );
    expect(onOpenChange).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
