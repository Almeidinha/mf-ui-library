import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "components/layout";
import { Button } from "components/molecules/button";
import { Gap } from "foundation/spacing";
import { If } from "helpers/nothing";
import { useRef } from "react";

import {
  SimpleMenu,
  SimpleMenuItem,
  SimpleMenuProps,
  useSimpleMenuState,
} from "./index";

function DemoMenu(args: SimpleMenuProps) {
  const { usePortal = false } = args;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { clickOutsideRef, isOpen, onItemSelect, toggle, close } =
    useSimpleMenuState({
      closeOnItemSelect: true,
    });
  const isInline = !usePortal;

  return (
    <Flex ref={clickOutsideRef} column gap={Gap.s} style={{ minHeight: 120 }}>
      <div style={{ position: "relative", width: "fit-content" }}>
        <Button
          ref={triggerRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={toggle}
        >
          Toggle menu
        </Button>

        <If is={Boolean(isOpen && isInline)}>
          <SimpleMenu
            {...args}
            open={isOpen}
            anchorRef={triggerRef}
            onClose={close}
          >
            <SimpleMenuItem onClick={onItemSelect}>Open profile</SimpleMenuItem>
            <SimpleMenuItem onClick={onItemSelect}>Duplicate</SimpleMenuItem>
            <SimpleMenuItem destructive onClick={onItemSelect}>
              Delete
            </SimpleMenuItem>
          </SimpleMenu>
        </If>
      </div>

      <If is={Boolean(isOpen && !isInline)}>
        <SimpleMenu
          {...args}
          open={isOpen}
          anchorRef={triggerRef}
          onClose={close}
        >
          <SimpleMenuItem onClick={onItemSelect}>Open profile</SimpleMenuItem>
          <SimpleMenuItem onClick={onItemSelect}>Duplicate</SimpleMenuItem>
          <SimpleMenuItem destructive onClick={onItemSelect}>
            Delete
          </SimpleMenuItem>
        </SimpleMenu>
      </If>
    </Flex>
  );
}

const meta: Meta<SimpleMenuProps> = {
  title: "Components/SimpleMenu",
  component: SimpleMenu,
  parameters: {
    layout: "centered",
  },
  args: {
    usePortal: false,
    width: 240,
    offset: 4,
    position: "bottom-end",
    zIndex: 2000,
  },
  argTypes: {
    anchorRef: { control: false, table: { disable: true } },
    onClose: { control: false, table: { disable: true } },
    open: { control: false, table: { disable: true } },
    position: {
      control: { type: "select" },
      options: ["bottom-end", "bottom-start", "top-end", "top-start"],
      description: "Preferred menu placement relative to the trigger.",
      table: {
        category: "Layout",
        defaultValue: { summary: "bottom-end" },
      },
    },
    usePortal: {
      description:
        "Renders the menu in a portal and positions it from the trigger.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },
    width: {
      description: "Sets the rendered width in pixels or any CSS size.",
      table: {
        category: "Layout",
        defaultValue: { summary: "240" },
      },
    },
    offset: {
      description: "Distance in pixels between the trigger and the menu.",
      table: {
        category: "Layout",
        defaultValue: { summary: "4" },
      },
    },
    zIndex: {
      description: "Stacking order used by the menu surface.",
      table: {
        category: "Layout",
        defaultValue: { summary: "2000" },
      },
    },
  },
} satisfies Meta<SimpleMenuProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  render: (args) => <DemoMenu {...args} usePortal={false} />,
};

export const PortalAnchored: Story = {
  args: {
    usePortal: true,
  },
  render: (args) => <DemoMenu {...args} usePortal />,
};
