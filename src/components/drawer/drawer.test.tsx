import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { vi } from "vitest";

import { Drawer } from "./drawer";

function DrawerHarness({
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

      <Drawer
        open={open}
        onClose={handleClose}
        onOpenChange={setOpen}
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
});
