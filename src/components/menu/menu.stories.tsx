import type { Meta, StoryObj } from "@storybook/react";
import { Icon, IconMinor } from "components/icon";
import { Flex } from "components/layout";
import { Button } from "components/molecules";
import { Gap } from "foundation/spacing";
import React, { useRef } from "react";
import { useArgs } from "storybook/internal/preview-api";

import { Menu } from "./menu";

type MenuStoryArgs = React.ComponentProps<typeof Menu> & {
  anchor?: undefined | "button" | "icon";
};

const meta: Meta<MenuStoryArgs> = {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  args: {
    items: getOptions(),
    placement: "bottom-start",
    open: false,
    anchor: undefined,
    width: 150,
  },
  argTypes: {
    anchor: {
      control: { type: "radio" },
      options: [undefined, "button", "icon"],
      table: {
        defaultValue: { summary: "undefined" },
        type: {
          summary: "anchor",
          detail: "Story only prop to select the anchor element for the menu",
        },
      },
    },
    placement: {
      control: { type: "select" },
      options: [
        "bottom-start",
        "bottom-end",
        "top-start",
        "top-end",
        "right-start",
        "left-start",
      ],
      table: {
        defaultValue: { summary: "bottom-start" },
      },
    },
    width: {
      table: {
        defaultValue: { summary: "auto" },
      },
    },
  },
} satisfies Meta<MenuStoryArgs>;

export default meta;
type Story = StoryObj<MenuStoryArgs>;

export const Primary: Story = {
  render: function Render(args) {
    const [{ open, placement }, updateArgs] = useArgs<MenuStoryArgs>();

    const buttonRef = useRef<HTMLButtonElement>(null);
    const iconRef = useRef<HTMLElement>(null);

    const getAnchorRef = () => {
      if (args.anchor === "button") {
        return buttonRef;
      }
      if (args.anchor === "icon") {
        return iconRef;
      }
      return undefined;
    };

    return (
      <Flex column>
        <Flex gap={Gap.xxl}>
          <Button ref={buttonRef} onClick={() => updateArgs({ open: !open })}>
            Open Menu
          </Button>
          <Icon.CommentLines ref={iconRef} />
        </Flex>
        <Menu
          open={open}
          items={args.items}
          anchorRef={getAnchorRef()}
          width={args.width}
          placement={placement}
          onSelect={(item) => {
            console.log("Menu item selected: ", item);
            updateArgs({ open: false });
          }}
        />
      </Flex>
    );
  },
  argTypes: {
    anchorRef: { control: false, table: { disable: true } },
    onSelect: { control: false, table: { disable: true } },
    getOptionKey: { control: false, table: { disable: true } },
  },
};

function getOptions() {
  return [
    {
      value: "1",
      disabled: false,
      label: "My option 1",
      icon: <IconMinor.Clone />,
      options: [
        {
          value: "1.1",
          disabled: false,
          label: "My option 1.1",
          onItemSelect: () => {
            alert("Option 1.1 selected");
          },
        },
      ],
    },
    {
      value: "2",
      disabled: false,
      label: "My option 2",
      options: [
        {
          value: "2.1",
          disabled: false,
          label: "My option 2.1",
          onItemSelect: () => {
            alert("Option 2.1 selected");
          },
        },
        {
          value: "2.2",
          label: "My option 2.2",
          options: [
            {
              value: "2.2.1",
              label: "My option 2.2.1",
              onItemSelect: () => {
                alert("Option 2.2.1 selected");
              },
            },
            {
              value: "2.2.2",
              label: "My option 2.2.2",
              onItemSelect: () => {
                alert("Option 2.2.2 selected");
              },
            },
            {
              value: "2.2.3",
              label: "My option 2.2.3",
              onItemSelect: () => {
                alert("Option 2.2.3 selected");
              },
            },
          ],
        },
      ],
    },
    {
      value: "3",
      disabled: false,
      label: "My option 3",
      onItemSelect: () => {
        alert("Option 3 selected");
      },
    },
  ];
}
