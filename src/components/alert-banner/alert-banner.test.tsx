import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { AlertBanner } from "./alert-banner";

describe("Alert banner tests", () => {
  it("should render the alert banner when attribute open is true", () => {
    render(
      <AlertBanner
        open={true}
        onClose={() => {
          return;
        }}
      >
        Alert Banner
      </AlertBanner>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
  it("should not render the close button by default", () => {
    const handleClose = vi.fn();

    render(
      <AlertBanner open={true} onClose={handleClose}>
        Alert Banner
      </AlertBanner>,
    );

    expect(handleClose).not.toHaveBeenCalled();
    const closeButton = screen.queryByLabelText("Close");
    expect(closeButton).not.toBeInTheDocument();
  });
  it("should render the close button and handle the close function", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <AlertBanner open={true} onClose={handleClose} dismissible={true}>
        Alert Banner
      </AlertBanner>,
    );

    expect(handleClose).not.toHaveBeenCalled();
    const closeButton = screen.getByLabelText("Close");
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });
  it("should render the primary action button and handle event after click", async () => {
    const handlePrimaryButtonClick = vi.fn();
    const user = userEvent.setup();

    render(
      <AlertBanner
        primaryButtonLabel="Do thing!"
        onPrimaryAction={handlePrimaryButtonClick}
      >
        Alert Banner
      </AlertBanner>,
    );

    expect(handlePrimaryButtonClick).not.toHaveBeenCalled();
    const primaryButton = screen.getByText("Do thing!");
    expect(primaryButton).toBeInTheDocument();
    await user.click(primaryButton);
    expect(handlePrimaryButtonClick).toHaveBeenCalled();
  });
  it("should render the secondary action button and handle event after click", async () => {
    const handleSecondaryButtonClick = vi.fn();
    const user = userEvent.setup();

    render(
      <AlertBanner
        secondaryButtonLabel="Do other thing!"
        onSecondaryAction={handleSecondaryButtonClick}
      >
        Alert Banner
      </AlertBanner>,
    );

    expect(handleSecondaryButtonClick).not.toHaveBeenCalled();
    const primaryButton = screen.getByText("Do other thing!");
    expect(primaryButton).toBeInTheDocument();
    await user.click(primaryButton);
    expect(handleSecondaryButtonClick).toHaveBeenCalled();
  });
});
