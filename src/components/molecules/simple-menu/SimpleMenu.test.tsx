import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";
import { vi } from "vitest";

import { SimpleMenu, SimpleMenuItem, useSimpleMenuState } from "./index";

function PortalMenuHarness({
  open = true,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      <button
        ref={(element) => {
          if (!element) {
            triggerRef.current = null;
            return;
          }

          Object.defineProperty(element, "getBoundingClientRect", {
            configurable: true,
            value: () => ({
              x: 120,
              y: 64,
              top: 64,
              right: 220,
              bottom: 96,
              left: 120,
              width: 100,
              height: 32,
              toJSON: () => ({}),
            }),
          });

          triggerRef.current = element;
        }}
        type="button"
      >
        Trigger
      </button>

      <SimpleMenu
        usePortal
        open={open}
        anchorRef={triggerRef}
        onClose={onClose}
      >
        <SimpleMenuItem>Edit</SimpleMenuItem>
        <SimpleMenuItem disabled>Disabled</SimpleMenuItem>
        <SimpleMenuItem>Archive</SimpleMenuItem>
      </SimpleMenu>
    </div>
  );
}

function MenuStateHarness({ onAction }: { onAction: () => void }) {
  const { clickOutsideRef, close, isOpen, toggle, withItemAction } =
    useSimpleMenuState({
      closeOnItemSelect: true,
    });

  return (
    <div>
      <div ref={clickOutsideRef}>
        <button type="button" onClick={toggle}>
          Toggle
        </button>

        {isOpen ? (
          <SimpleMenu onClose={close}>
            <SimpleMenuItem onClick={withItemAction(onAction)}>
              Run action
            </SimpleMenuItem>
          </SimpleMenu>
        ) : null}
      </div>

      <button type="button">Outside</button>
    </div>
  );
}

describe("SimpleMenu tests", () => {
  it("should render inline menu items", () => {
    render(
      <SimpleMenu>
        <SimpleMenuItem>Profile</SimpleMenuItem>
        <SimpleMenuItem>Settings</SimpleMenuItem>
      </SimpleMenu>,
    );

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: "Profile" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: "Settings" }),
    ).toBeInTheDocument();
  });

  it("should render in a portal when open and focus the first enabled item", async () => {
    render(<PortalMenuHarness />);

    const menu = await screen.findByRole("menu");
    const firstItem = await screen.findByRole("menuitem", { name: "Edit" });

    expect(document.body).toContainElement(menu);

    await waitFor(() => {
      expect(firstItem).toHaveFocus();
    });
  });

  it("should support keyboard navigation and close on escape", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(<PortalMenuHarness onClose={onClose} />);

    const trigger = screen.getByRole("button", { name: "Trigger" });
    const firstItem = await screen.findByRole("menuitem", { name: "Edit" });
    const lastItem = await screen.findByRole("menuitem", { name: "Archive" });

    await waitFor(() => {
      expect(firstItem).toHaveFocus();
    });

    await user.keyboard("{ArrowDown}");
    expect(lastItem).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    expect(firstItem).toHaveFocus();

    await user.keyboard("{End}");
    expect(lastItem).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveFocus();
  });

  it("should not render a portal menu when open is false", () => {
    render(<PortalMenuHarness open={false} />);

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("should close on item selection and outside click when using the menu state hook", async () => {
    const onAction = vi.fn();
    const user = userEvent.setup();

    render(<MenuStateHarness onAction={onAction} />);

    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.click(screen.getByRole("menuitem", { name: "Run action" }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Outside" }));
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });
});
