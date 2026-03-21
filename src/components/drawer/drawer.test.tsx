import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { vi } from "vitest";

import { Drawer } from "./drawer";

function DrawerHarness({
  onOpenSpy,
  onCloseSpy,
  swipeable = false,
}: {
  onOpenSpy: () => void;
  onCloseSpy: () => void;
  swipeable?: boolean;
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

      <Drawer
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        swipeable={swipeable}
      >
        <button type="button" onClick={handleClose}>
          Close drawer
        </button>
      </Drawer>
    </>
  );
}

describe("Drawer", () => {
  it("allows buttons inside temporary drawer content to handle clicks", async () => {
    const onOpenSpy = vi.fn();
    const onCloseSpy = vi.fn();

    render(<DrawerHarness onOpenSpy={onOpenSpy} onCloseSpy={onCloseSpy} />);

    fireEvent.click(screen.getByRole("button", { name: "Open drawer" }));

    expect(onOpenSpy).toHaveBeenCalledTimes(1);

    const dialog = await screen.findByRole("dialog");

    expect(dialog).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close drawer" }));

    expect(onCloseSpy).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("keeps interactive children clickable when swipeable is enabled", async () => {
    const onOpenSpy = vi.fn();
    const onCloseSpy = vi.fn();

    render(
      <DrawerHarness onOpenSpy={onOpenSpy} onCloseSpy={onCloseSpy} swipeable />,
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
});
