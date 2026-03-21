import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { vi } from "vitest";

import { SwipeableDrawer } from "./swipeable-drawer";

const allowSwipeFromContent = (target: HTMLElement) => {
  return target.closest("button") === null;
};

function SwipeableDrawerHarness({
  onOpenSpy,
  onCloseSpy,
}: {
  onOpenSpy: () => void;
  onCloseSpy: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    onOpenSpy();
    setOpen(true);
  };

  const handleClose = () => {
    onCloseSpy();
    setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={handleOpen}>
        Open drawer
      </button>

      <SwipeableDrawer
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onOpenChange={setOpen}
      >
        <button type="button" onClick={handleClose}>
          Close drawer
        </button>
      </SwipeableDrawer>
    </>
  );
}

describe("SwipeableDrawer", () => {
  it("keeps interactive children clickable while swipe support is enabled", async () => {
    const onOpenSpy = vi.fn();
    const onCloseSpy = vi.fn();

    render(
      <SwipeableDrawerHarness onOpenSpy={onOpenSpy} onCloseSpy={onCloseSpy} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open drawer" }));

    expect(onOpenSpy).toHaveBeenCalledTimes(1);

    await screen.findByRole("dialog");

    const closeButton = screen.getByRole("button", { name: "Close drawer" });

    fireEvent.pointerDown(closeButton, {
      pointerId: 1,
      clientX: 100,
      clientY: 100,
    });
    fireEvent.pointerMove(closeButton, {
      pointerId: 1,
      clientX: 32,
      clientY: 100,
    });
    fireEvent.pointerUp(closeButton, {
      pointerId: 1,
      clientX: 32,
      clientY: 100,
    });
    fireEvent.click(closeButton);

    expect(onCloseSpy).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("keeps buttons clickable when allowSwipeInChildren uses a target filter", async () => {
    const onOpenSpy = vi.fn();
    const onCloseSpy = vi.fn();

    function Harness() {
      const [open, setOpen] = useState(false);

      const handleOpen = () => {
        onOpenSpy();
        setOpen(true);
      };

      const handleClose = () => {
        onCloseSpy();
        setOpen(false);
      };

      return (
        <>
          <button type="button" onClick={handleOpen}>
            Open filtered drawer
          </button>

          <SwipeableDrawer
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            onOpenChange={setOpen}
            allowSwipeInChildren={allowSwipeFromContent}
          >
            <button type="button" onClick={handleClose}>
              Close filtered drawer
            </button>
          </SwipeableDrawer>
        </>
      );
    }

    render(<Harness />);

    fireEvent.click(screen.getByRole("button", { name: "Open filtered drawer" }));

    expect(onOpenSpy).toHaveBeenCalledTimes(1);

    await screen.findByRole("dialog");

    const closeButton = screen.getByRole("button", {
      name: "Close filtered drawer",
    });

    fireEvent.pointerDown(closeButton, {
      pointerId: 2,
      clientX: 100,
      clientY: 100,
    });
    fireEvent.pointerMove(closeButton, {
      pointerId: 2,
      clientX: 32,
      clientY: 100,
    });
    fireEvent.pointerUp(closeButton, {
      pointerId: 2,
      clientX: 32,
      clientY: 100,
    });
    fireEvent.click(closeButton);

    expect(onCloseSpy).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
