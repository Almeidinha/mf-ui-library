import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "components/card";
import { Flex, SpaceBetween } from "components/layout";
import { Button } from "components/molecules";
import { CardFrame } from "components/shared-styled-components";
import { Typography } from "components/typography";
import { Surface } from "foundation/colors";
import { useArgs } from "storybook/internal/preview-api";
import styled from "styled-components";

import { Collapse, Fade, Grow, Slide, Zoom } from ".";

type TransitionKind = "fade" | "grow" | "slide" | "zoom" | "collapse";

type TransitionStoryArgs = {
  kind: TransitionKind;
  in: boolean;
  appear: boolean;
  enter: boolean;
  exit: boolean;
  mountOnEnter: boolean;
  unmountOnExit: boolean;
  timeout: number;
  easing: string;
  direction: "up" | "down" | "left" | "right";
  offset: number;
  origin: string;
  collapsedSize: number;
  orientation: "vertical" | "horizontal";
  animateOpacity: boolean;
};

const Stage = styled.div`
  padding: 24px;
  display: grid;
  gap: 20px;
  background: ${Surface.Default.Default};
`;

const DemoArea = styled.div`
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 12px;
  border: 1px dashed rgba(15, 23, 42, 0.18);
  background: ${Surface.Default.Default};
  overflow: hidden;
`;

const meta = {
  title: "Components/Transitions",
  component: StoryTransitionPreview,
  decorators: [
    (Story) => (
      <CardFrame
        column
        style={{
          padding: 24,
          width: 760,
          maxWidth: "min(760px, calc(100vw - 32px))",
        }}
      >
        <Story />
      </CardFrame>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    kind: "fade",
    in: true,
    appear: true,
    enter: true,
    exit: true,
    mountOnEnter: false,
    unmountOnExit: false,
    timeout: 220,
    easing: "ease-in-out",
    direction: "down",
    offset: 12,
    origin: "top center",
    collapsedSize: 0,
    orientation: "vertical",
    animateOpacity: true,
  },
  argTypes: {
    kind: {
      description:
        "Chooses which transition implementation to preview in the playground.",
      control: { type: "radio" },
      options: ["fade", "grow", "slide", "zoom", "collapse"],
      table: {
        category: "Controls",
        defaultValue: {
          summary: "fade",
        },
      },
    },
    in: {
      description:
        "Controls whether the preview content is shown in its entered state.",
      table: {
        category: "Common props",
        defaultValue: {
          summary: "true",
        },
      },
    },
    appear: {
      description:
        "Runs the enter animation on the initial mount when the content starts open.",
      table: {
        category: "Common props",
        defaultValue: {
          summary: "true",
        },
      },
    },
    enter: {
      description:
        "Enables the enter transition when the preview changes from closed to open.",
      table: {
        category: "Common props",
        defaultValue: {
          summary: "true",
        },
      },
    },
    exit: {
      description:
        "Enables the exit transition when the preview changes from open to closed.",
      table: {
        category: "Common props",
        defaultValue: {
          summary: "true",
        },
      },
    },
    mountOnEnter: {
      description:
        "Mounts the transition content only after the first open event.",
      table: {
        category: "Common props",
        defaultValue: {
          summary: "false",
        },
      },
    },
    unmountOnExit: {
      description:
        "Removes the transition content from the DOM after the exit sequence completes.",
      table: {
        category: "Common props",
        defaultValue: {
          summary: "false",
        },
      },
    },
    timeout: {
      description:
        "Transition duration in milliseconds used for enter and exit timing.",
      control: { type: "number" },
      table: {
        category: "Common props",
        defaultValue: {
          summary: "220",
        },
      },
    },
    easing: {
      description:
        "CSS timing function applied to the animated properties during the transition.",
      control: { type: "text" },
      table: {
        category: "Common props",
        defaultValue: {
          summary: "ease-in-out",
        },
      },
    },
    direction: {
      description:
        "Slide direction used only by the Slide transition preset and playground mode.",
      control: { type: "radio" },
      options: ["up", "down", "left", "right"],
      table: {
        category: "Slide only",
        defaultValue: {
          summary: "down",
        },
      },
    },
    orientation: {
      description:
        "Collapse axis used only when the selected transition kind is Collapse.",
      control: { type: "radio" },
      options: ["vertical", "horizontal"],
      table: {
        category: "Collapse only",
        defaultValue: {
          summary: "vertical",
        },
      },
    },
    offset: {
      description:
        "Starting offset for Slide before the content reaches its final position.",
      control: { type: "range", min: 0, max: 40, step: 2 },
      table: {
        category: "Slide only",
        defaultValue: {
          summary: "12",
        },
      },
    },
    origin: {
      description:
        "Transform origin used by Grow and Zoom to determine where scaling appears to begin.",
      control: { type: "text" },
      table: {
        category: "Grow / Zoom only",
        defaultValue: {
          summary: "top center",
        },
      },
    },
    collapsedSize: {
      description:
        "Remaining size kept visible when Collapse is closed, in pixels for this story.",
      control: { type: "range", min: 0, max: 80, step: 4 },
      table: {
        category: "Collapse only",
        defaultValue: {
          summary: "0",
        },
      },
    },
    animateOpacity: {
      description:
        "Adds an opacity fade alongside the size animation for Collapse.",
      table: {
        category: "Collapse only",
        defaultValue: {
          summary: "true",
        },
      },
    },
  },
} satisfies Meta<TransitionStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

function StoryTransitionPreview({
  kind,
  in: isOpen,
  appear,
  enter,
  exit,
  mountOnEnter,
  unmountOnExit,
  timeout,
  easing,
  direction,
  offset,
  origin,
  collapsedSize,
  orientation,
  animateOpacity,
}: TransitionStoryArgs) {
  return (
    <Stage>
      <Flex>
        <Typography variant="body">
          Toggle the preview and switch transition types to inspect timing,
          origin, offset, and mount behavior.
        </Typography>
      </Flex>
      <DemoArea>
        <RenderedTransition
          kind={kind}
          in={isOpen}
          appear={appear}
          enter={enter}
          exit={exit}
          mountOnEnter={mountOnEnter}
          unmountOnExit={unmountOnExit}
          timeout={timeout}
          easing={easing}
          direction={direction}
          offset={offset}
          origin={origin}
          collapsedSize={collapsedSize}
          orientation={orientation}
          animateOpacity={animateOpacity}
        />
      </DemoArea>
    </Stage>
  );
}

function RenderedTransition({
  kind,
  in: isOpen,
  appear,
  enter,
  exit,
  mountOnEnter,
  unmountOnExit,
  timeout,
  easing,
  direction,
  offset,
  origin,
  collapsedSize,
  orientation,
  animateOpacity,
}: TransitionStoryArgs) {
  const content = (
    <Card style={{ maxWidth: 350 }}>
      <Typography variant="h2" style={{ marginBottom: 12 }}>
        {kind.charAt(0).toUpperCase()}
        {kind.slice(1)} transition
      </Typography>
      <Typography variant="body">
        This preview helps tune motion, layout behavior, and enter or exit mount
        settings before wiring the transition into a component.
      </Typography>
    </Card>
  );

  const commonProps = {
    in: isOpen,
    appear,
    enter,
    exit,
    mountOnEnter,
    unmountOnExit,
    timeout,
    easing,
  };

  switch (kind) {
    case "grow":
      return (
        <Grow {...commonProps} origin={origin}>
          {content}
        </Grow>
      );
    case "slide":
      return (
        <Slide {...commonProps} direction={direction} offset={offset}>
          {content}
        </Slide>
      );
    case "zoom":
      return (
        <Zoom {...commonProps} origin={origin}>
          {content}
        </Zoom>
      );
    case "collapse":
      return (
        <Collapse
          {...commonProps}
          collapsedSize={collapsedSize}
          orientation={orientation}
          animateOpacity={animateOpacity}
        >
          {content}
        </Collapse>
      );
    case "fade":
    default:
      return <Fade {...commonProps}>{content}</Fade>;
  }
}

export const Playground: Story = {
  render: function Render(args) {
    const [{ in: isOpen }, updateArgs] = useArgs<TransitionStoryArgs>();

    return (
      <>
        <SpaceBetween style={{ padding: "16px 0", alignItems: "center" }}>
          <Typography variant="body">
            Current state: {isOpen ? "visible" : "hidden"}. Use the controls
            panel to switch transition strategies.
          </Typography>
          <Button primary onClick={() => updateArgs({ in: !isOpen })}>
            {isOpen ? "Hide preview" : "Show preview"}
          </Button>
        </SpaceBetween>
        <StoryTransitionPreview {...args} in={isOpen} />
      </>
    );
  },
};

export const SlidePreset: Story = {
  args: {
    kind: "slide",
    direction: "up",
    offset: 20,
  },
};

export const CollapsePreset: Story = {
  args: {
    kind: "collapse",
    orientation: "vertical",
    collapsedSize: 12,
    animateOpacity: true,
  },
};

export const ZoomPreset: Story = {
  args: {
    kind: "zoom",
    origin: "center center",
  },
};
