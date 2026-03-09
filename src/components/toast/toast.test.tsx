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

  it("uses polite status live region by default", () => {
    render(
      <Toast
        position="top"
        open={true}
        onOpenChange={() => {
          return;
        }}
        title="Toast Title"
        description="This is a toast notification."
      />,
    );

    const toast = screen.getByRole("status");
    expect(toast).toHaveAttribute("aria-live", "polite");
    expect(toast).toHaveAttribute("aria-atomic", "true");
  });

  it("uses assertive alert live region for error variant", () => {
    render(
      <Toast
        position="top"
        open={true}
        onOpenChange={() => {
          return;
        }}
        variant="error"
        title="Toast Title"
        description="This is a toast notification."
      />,
    );

    const toast = screen.getByRole("alert");
    expect(toast).toHaveAttribute("aria-live", "assertive");
    expect(toast).toHaveAttribute("aria-atomic", "true");
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
    expect(onOpenChange).toHaveBeenCalledWith(false);
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

  it("does not render a close button when closeable is false", () => {
    render(
      <Toast
        position="top"
        open={true}
        closeable={false}
        onOpenChange={() => {
          return;
        }}
        title="Toast Title"
        description="This is a toast notification."
      />,
    );

    expect(
      screen.queryByRole("button", { name: "Close notification" }),
    ).not.toBeInTheDocument();
  });

  it("auto-closes after duration", async () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();

    render(
      <Toast
        position="top"
        open={true}
        duration={3000}
        onOpenChange={onOpenChange}
        title="Toast Title"
        description="This is a toast notification."
      />,
    );

    await vi.advanceTimersByTimeAsync(3000);
    expect(onOpenChange).toHaveBeenCalledWith(false);

    vi.useRealTimers();
  });
});
