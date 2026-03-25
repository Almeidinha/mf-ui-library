import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { Modal } from "./index";

describe("Modal tests", () => {
  it("should render the modal when attribute open is true", () => {
    render(
      <Modal
        open={true}
        onClose={() => {
          return;
        }}
      >
        <p>modal</p>
      </Modal>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
  it("should render the close button and handle the close function", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal open={true} onClose={handleClose} closeButtonLabel="Close me">
        <p>modal</p>
      </Modal>,
    );

    expect(handleClose).not.toHaveBeenCalled();
    const closeButton = screen.getByText("Close me");
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });
  it("should render the primary action button and handle event after click", async () => {
    const handlePrimaryButtonClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal
        open={true}
        onClose={() => {
          return;
        }}
        primaryButtonLabel="Go!"
        onPrimaryAction={handlePrimaryButtonClick}
      >
        <p>modal</p>
      </Modal>,
    );

    expect(handlePrimaryButtonClick).not.toHaveBeenCalled();
    const primaryButton = screen.getByText("Go!");
    expect(primaryButton).toBeInTheDocument();
    await user.click(primaryButton);
    expect(handlePrimaryButtonClick).toHaveBeenCalled();
  });

  it("should render the secondary action button and handle event after click", async () => {
    const handleSecondaryButtonClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal
        open={true}
        onClose={() => {
          return;
        }}
        secondaryButtonLabel="Open docs"
        onSecondaryAction={handleSecondaryButtonClick}
      >
        <p>modal</p>
      </Modal>,
    );

    expect(handleSecondaryButtonClick).not.toHaveBeenCalled();
    const secondaryButton = screen.getByText("Open docs");
    expect(secondaryButton).toBeInTheDocument();
    await user.click(secondaryButton);
    expect(handleSecondaryButtonClick).toHaveBeenCalled();
  });

  it('should call the close function on press "Esc" key', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal open={true} onClose={handleClose}>
        <p>modal</p>
      </Modal>,
    );

    expect(handleClose).not.toHaveBeenCalled();
    await user.keyboard("{Escape}");
    expect(handleClose).toHaveBeenCalled();
  });

  it('should not call the close function on press "Esc" key if the closeOnEsc is false', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal open={true} onClose={handleClose} closeOnEsc={false}>
        <p>modal</p>
      </Modal>,
    );

    expect(handleClose).not.toHaveBeenCalled();
    await user.keyboard("{Escape}");
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("should call a function we pass on onOverlayClick when click on the overlay section", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal open={true} onClose={handleClose} onOverlayClick={handleClose}>
        <p>modal</p>
      </Modal>,
    );

    expect(handleClose).not.toHaveBeenCalled();
    const outside = screen.getByRole("dialog").parentElement;

    expect(outside).not.toBeNull();
    await user.click(outside as HTMLElement);
    expect(handleClose).toHaveBeenCalled();
  });
});
