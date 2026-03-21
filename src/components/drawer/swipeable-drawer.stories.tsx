import type { Meta, StoryObj } from "@storybook/react";
import { Box, Container, Flex } from "components/layout";
import { Button } from "components/molecules";
import { Body, BodyLarge, Heading3 } from "components/typography";
import { Gap, Padding } from "foundation/spacing";
import { useArgs } from "storybook/internal/preview-api";
import styled from "styled-components";

import { SwipeableDrawer, SwipeableDrawerProps } from ".";
import { DrawerAnchor } from "./types";

const FLEX_DIRECTION_MAP: Record<DrawerAnchor, string> = {
  left: "row",
  right: "row-reverse",
  top: "column",
  bottom: "column-reverse",
};

const StoryFrame = styled(Flex)<{ $anchor: SwipeableDrawerProps["anchor"] }>`
  flex-direction: ${({ $anchor }) =>
    $anchor ? FLEX_DIRECTION_MAP[$anchor] : "row"};
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
  max-width: 560px;
`;

const DrawerContent = styled.div`
  display: grid;
  gap: 16px;
  padding: 20px;
`;

function SwipeableDrawerContent({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <DrawerContent>
      <Box>
        <Heading3>{title}</Heading3>
      </Box>
      <Body>
        Swipe from the configured edge to open this drawer, then swipe back or
        use the buttons below to close it.
      </Body>
      <Body>
        Interactive children stay clickable by default, so buttons and form
        controls do not accidentally begin a close gesture.
      </Body>
      <Flex gap={Gap.m}>
        <Button primary onClick={onClose}>
          Close drawer
        </Button>
        <Button subtle onClick={onClose}>
          Dismiss
        </Button>
      </Flex>
    </DrawerContent>
  );
}

const meta = {
  title: "Components/SwipeableDrawer",
  component: SwipeableDrawer,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The SwipeableDrawer component adds gesture-driven edge discovery and drag-to-open/close
behavior on top of the shared drawer renderer.

---

## How to use

\`\`\`tsx
import { SwipeableDrawer } from "./index";

<SwipeableDrawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
  Drawer content
</SwipeableDrawer>
\`\`\`

---

## Swipe behavior

- \`swipeAreaWidth\` controls how much edge area can start an open gesture.
- \`disableSwipeToOpen\` removes edge-open gestures while keeping close swipes.
- \`allowSwipeInChildren\` allows gestures to begin from interactive children when needed.
        `,
      },
    },
  },
  args: {
    open: false,
    defaultOpen: undefined,
    anchor: "left",
    variant: "temporary",
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
    swipeAreaWidth: 24,
    disableSwipeToOpen: false,
    disableDiscovery: false,
    allowSwipeInChildren: false,
    className: undefined,
    contentClassName: undefined,
    style: undefined,
    contentStyle: undefined,
    "aria-label": "Demo swipeable drawer",
    "aria-labelledby": undefined,
    children: undefined,
    onOpen: undefined,
    onClose: undefined,
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
    swipeAreaWidth: {
      description: "Width of the edge area that can start an open gesture.",
      table: {
        category: "Gesture",
        defaultValue: { summary: "24" },
      },
    },
    disableSwipeToOpen: {
      description: "Disables edge-open gestures while preserving close swipes.",
      table: {
        category: "Gesture",
        defaultValue: { summary: "false" },
      },
    },
    disableDiscovery: {
      description: "Hides the discovery peek from the swipe area.",
      table: {
        category: "Gesture",
        defaultValue: { summary: "false" },
      },
    },
    allowSwipeInChildren: {
      description:
        "Allows swipe-close gestures to start from interactive children when set to true.",
      control: { type: "boolean" },
      table: {
        category: "Gesture",
        defaultValue: { summary: "false" },
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
    onOpen: {
      description:
        "Called when the component requests opening via a swipe gesture.",
      control: false,
      table: {
        category: "Events",
        defaultValue: { summary: "undefined" },
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
} satisfies Meta<typeof SwipeableDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [{ open, anchor }, updateArgs] = useArgs<SwipeableDrawerProps>();

    const handleOpen = () => {
      updateArgs({ open: true });
    };

    const handleClose = () => {
      updateArgs({ open: false });
    };

    const handleToggle = () => {
      updateArgs({ open: !open });
    };

    return (
      <StoryFrame $anchor={anchor}>
        <SwipeableDrawer
          {...args}
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          anchor={anchor}
        >
          <SwipeableDrawerContent
            title="Swipeable temporary drawer"
            onClose={handleClose}
          />
        </SwipeableDrawer>
        <Container disableGutters style={{ padding: Padding.m }}>
          <StoryHeader>
            <Body>
              Swipe from the selected edge to open this drawer, or use the
              button to force the controlled state from Storybook.
            </Body>
            <Button primary onClick={handleToggle}>
              {open ? "Drawer open" : "Open drawer"}
            </Button>
          </StoryHeader>

          <DemoContent>
            <Body>
              Use the controls panel to adjust gesture settings like swipe area
              width, discovery peek, and child swipe behavior.
            </Body>
            <Body>
              The content buttons remain clickable by default even while close
              swipe gestures are enabled.
            </Body>
          </DemoContent>
        </Container>
      </StoryFrame>
    );
  },
};

export const AllowSwipeInChildren: Story = {
  args: {
    allowSwipeInChildren: true,
  },
  render: function Render(args) {
    const [{ open, anchor }, updateArgs] = useArgs<SwipeableDrawerProps>();

    const handleOpen = () => {
      updateArgs({ open: true });
    };

    const handleClose = () => {
      updateArgs({ open: false });
    };

    return (
      <StoryFrame $anchor={anchor}>
        <SwipeableDrawer
          {...args}
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          anchor={anchor}
        >
          <SwipeableDrawerContent
            title="Swipe enabled from children"
            onClose={handleClose}
          />
        </SwipeableDrawer>
        <Container disableGutters style={{ padding: Padding.m }}>
          <StoryHeader column>
            <BodyLarge>
              When allowSwipeInChildren is enabled (true) element interactions
              will not work, for them to work, you need to specify the elements
              in an array instead of passing true
            </BodyLarge>
            <Body>
              This variant allows swipe-close gestures to begin from interactive
              content blocks while preserving buttons and other controls. It is
              useful when the drawer body should feel draggable without making
              actions inside it unclickable.
            </Body>
            <Button primary onClick={open ? handleClose : handleOpen}>
              {open ? "Close drawer" : "Open drawer"}
            </Button>
          </StoryHeader>
        </Container>
      </StoryFrame>
    );
  },
};
