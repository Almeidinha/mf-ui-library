import type { Meta, StoryObj } from "@storybook/react";
import { IconMinor } from "components/icon";
import { Container, Flex } from "components/layout";
import { Button, SimpleMenu, SimpleMenuItem } from "components/molecules";
import { Body } from "components/typography";
import { Gap, Padding } from "foundation/spacing";
import { useArgs } from "storybook/internal/preview-api";
import styled from "styled-components";

import { Drawer, DrawerProps } from ".";

const getFlexDirection = (anchor: DrawerProps["anchor"]) => {
  switch (anchor) {
    case "left":
      return "row";
    case "right":
      return "row-reverse";
    case "top":
      return "column";
    case "bottom":
      return "column-reverse";
    default:
      return "row";
  }
};

const StoryFrame = styled(Flex)<{ $anchor: DrawerProps["anchor"] }>`
  flex-direction: ${({ $anchor }) => getFlexDirection($anchor)};
  height: 100%;
  position: relative;
  border: 1px dashed rgba(15, 23, 42, 0.2);
  width: 100%;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
`;

const StoryHeader = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const DemoContent = styled.div`
  display: grid;
  gap: 12px;
  max-width: 520px;
`;

const DrawerContent = styled.div`
  display: grid;
  gap: 16px;
  padding: 20px;
`;

const ActionRow = styled(Flex)`
  gap: 12px;
  flex-wrap: wrap;
`;

const MainPanel = styled.div`
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 24px;
  background: #f8fafc;
`;

const Menu = styled(SimpleMenu)`
  position: relative;
  width: 100%;
  border-radius: 0;
  height: 100%;
  margin: auto;
  padding: 0;
  top: 0;
  background: transparent;
  border: none;
  & button {
    width: unset;
    margin: 4px;
  }
`;

function DefaultDrawerContent({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <DrawerContent>
      <div>
        <strong>{title}</strong>
      </div>
      <Body>
        Use this drawer for navigation, filters, or secondary workflows that
        should stay adjacent to the current page context.
      </Body>
      <Body>
        This story keeps the drawer state controlled through Storybook args so
        you can toggle anchors, variants, overlay behavior, swipe support, and
        mini mode from the controls panel.
      </Body>
      <ActionRow>
        <Button primary onClick={onClose}>
          Close drawer
        </Button>
        <Button subtle onClick={onClose}>
          Dismiss
        </Button>
      </ActionRow>
    </DrawerContent>
  );
}

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The Drawer component provides temporary and persistent side panels with support for
anchor positioning, overlays, mini mode, swipe gestures, and configurable entry transitions.

---

## How to use

\`\`\`tsx
import { Drawer } from "./index";

<Drawer open={open} onClose={() => setOpen(false)}>
  Drawer content
</Drawer>
\`\`\`

---

## Variants

- \`temporary\` renders as an overlay panel.
- \`persistent\` stays in the layout and can optionally use mini mode.

## State modes

- Controlled: provide \`open\` and react to \`onOpenChange\`.
- Uncontrolled: provide \`defaultOpen\` and let the component manage its own state.
        `,
      },
    },
  },
  args: {
    open: false,
    defaultOpen: undefined,
    anchor: "left",
    variant: "temporary",
    swipeable: false,
    swipeEdgeSize: 20,
    keepMounted: true,
    mini: false,
    miniSize: 64,
    size: 280,
    overlay: true,
    closeOnOverlayClick: true,
    closeOnEsc: true,
    lockScroll: true,
    transitionDuration: 220,
    transitionOffset: 8,
    zIndex: 1300,
    className: undefined,
    contentClassName: undefined,
    style: undefined,
    contentStyle: undefined,
    "aria-label": "Demo drawer",
    "aria-labelledby": undefined,
    children: undefined,
    onClose: undefined,
    onOpen: undefined,
    onOpenChange: undefined,
    container: undefined,
  },
  argTypes: {
    open: {
      description:
        "Controlled open state. When provided, the parent is responsible for updating the value.",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    defaultOpen: {
      description:
        "Initial open state for uncontrolled usage. Ignored when `open` is provided.",
      table: {
        category: "State",
        defaultValue: { summary: "undefined" },
      },
    },
    anchor: {
      description:
        "The edge of the viewport or layout where the drawer appears.",
      control: { type: "radio" },
      options: ["left", "right", "top", "bottom"],
      table: {
        category: "Layout",
        defaultValue: { summary: "left" },
      },
    },
    variant: {
      description: "Whether the drawer is an overlay or part of the layout.",
      control: { type: "radio" },
      options: ["temporary", "persistent"],
      table: {
        category: "Layout",
        defaultValue: { summary: "temporary" },
      },
    },
    size: {
      description:
        "Drawer size. Width for left or right anchors, height for top or bottom.",
      control: "text",
      table: {
        category: "Layout",
        defaultValue: { summary: "280" },
      },
    },
    mini: {
      description:
        "Enables mini rail mode for persistent left or right drawers when closed.",
      table: {
        category: "Layout",
        defaultValue: { summary: "false" },
      },
    },
    miniSize: {
      description: "Visible rail size used by persistent mini drawers.",
      table: {
        category: "Layout",
        defaultValue: { summary: "64" },
      },
    },
    swipeable: {
      description:
        "Enables pointer or touch swipe gestures to open and close the drawer.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },
    swipeEdgeSize: {
      description:
        "Gesture area size used to start opening a closed swipeable drawer.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "20" },
      },
    },
    overlay: {
      description: "Shows a backdrop when the temporary drawer is open.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "true" },
      },
    },
    closeOnOverlayClick: {
      description: "Closes the drawer when the overlay is clicked.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "true" },
      },
    },
    closeOnEsc: {
      description: "Closes the drawer when the Escape key is pressed.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "true" },
      },
    },
    lockScroll: {
      description: "Locks document scrolling while a temporary drawer is open.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "true" },
      },
    },
    transitionDuration: {
      description:
        "Animation duration, in milliseconds, for drawer and backdrop transitions.",
      table: {
        category: "Motion",
        defaultValue: { summary: "220" },
      },
    },
    transitionOffset: {
      description:
        "Initial offset used by the temporary drawer slide transition.",
      table: {
        category: "Motion",
        defaultValue: { summary: "8" },
      },
    },
    keepMounted: {
      description: "Keeps the drawer mounted even while it is closed.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "true" },
      },
    },
    onClose: {
      description: "Called when the drawer requests to close.",
      control: false,
      table: {
        category: "Events",
        defaultValue: { summary: "undefined" },
      },
    },
    onOpen: {
      description: "Called when a swipe gesture requests opening the drawer.",
      control: false,
      table: {
        category: "Events",
        defaultValue: { summary: "undefined" },
      },
    },
    onOpenChange: {
      description:
        "Called whenever the component requests a change to its open state, in both controlled and uncontrolled modes.",
      control: false,
      table: {
        category: "Events",
        defaultValue: { summary: "undefined" },
      },
    },
    children: {
      description: "Content rendered inside the drawer surface.",
      control: false,
      table: {
        category: "Content",
        defaultValue: { summary: "undefined" },
      },
    },
    container: {
      description:
        "Optional portal container element or getter used by temporary drawers.",
      control: false,
      table: {
        category: "Advanced",
        defaultValue: { summary: "document.body" },
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [{ open, anchor }, updateArgs] = useArgs<DrawerProps>();

    const handleOpen = () => {
      updateArgs({ open: true });
      args.onOpen?.();
    };

    const handleClose = () => {
      updateArgs({ open: false });
      args.onClose?.();
    };

    return (
      <StoryFrame $anchor={anchor}>
        <Drawer
          {...args}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          anchor={anchor}
        >
          <DefaultDrawerContent
            title="Temporary drawer"
            onClose={handleClose}
          />
        </Drawer>
        <Container disableGutters style={{ padding: Padding.m }}>
          <StoryHeader>
            <Body>
              Temporary drawers overlay the current page and are a good fit for
              short-lived tasks, navigation, and mobile interactions.
            </Body>
            <Button primary onClick={handleOpen}>
              {open ? "Drawer open" : "Open drawer"}
            </Button>
          </StoryHeader>

          <DemoContent>
            <Body>
              Change the anchor, overlay behavior, or swipeability from the
              controls panel and reopen the drawer to inspect the behavior.
            </Body>
            <Body>
              The story controls the \`open\` arg so the component remains fully
              interactive inside Storybook.
            </Body>
          </DemoContent>
        </Container>
      </StoryFrame>
    );
  },
};

export const PersistentMini: Story = {
  args: {
    variant: "persistent",
    mini: true,
    open: false,
    anchor: "left",
    overlay: false,
  },
  render: function Render(args) {
    const [{ open, anchor }, updateArgs] = useArgs<DrawerProps>();

    const handleOpen = () => {
      updateArgs({ open: true });
      args.onOpen?.();
    };

    const handleClose = () => {
      updateArgs({ open: false });
      args.onClose?.();
    };

    return (
      <StoryFrame $anchor={anchor}>
        <Drawer
          {...args}
          size={150}
          miniSize={48}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          anchor={anchor}
        >
          <Menu>
            <SimpleMenuItem>
              <Flex gap={Gap.xs}>
                <IconMinor.Bars />
                {open ? "Navigation" : null}
              </Flex>
            </SimpleMenuItem>
            <SimpleMenuItem>
              <Flex gap={Gap.xs}>
                <IconMinor.User />
                {open ? "Profile" : null}
              </Flex>
            </SimpleMenuItem>
            <SimpleMenuItem>
              <Flex gap={Gap.xs}>
                <IconMinor.Utensils />
                {open ? "Settings" : null}
              </Flex>
            </SimpleMenuItem>
            <SimpleMenuItem>
              <Flex gap={Gap.xs}>
                <IconMinor.BarsFilter />
                {open ? "Notifications" : null}
              </Flex>
            </SimpleMenuItem>
            <SimpleMenuItem>
              <Flex gap={Gap.xs}>
                <IconMinor.MugTea />
                {open ? "Messages" : null}
              </Flex>
            </SimpleMenuItem>
            <SimpleMenuItem>
              <Flex gap={Gap.xs}>
                <IconMinor.ShareNodes />
                {open ? "Help" : null}
              </Flex>
            </SimpleMenuItem>
          </Menu>
        </Drawer>

        <MainPanel>
          <Body>
            Persistent drawers stay in the layout instead of overlaying the
            page. When mini mode is enabled, the closed state leaves a small
            rail visible for compact navigation patterns.
          </Body>
          <ActionRow>
            <Button primary onClick={open ? handleClose : handleOpen}>
              {open ? "Collapse rail" : "Expand rail"}
            </Button>
          </ActionRow>
        </MainPanel>
      </StoryFrame>
    );
  },
};
