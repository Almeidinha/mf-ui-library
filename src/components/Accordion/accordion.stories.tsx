import type { Meta, StoryObj } from "@storybook/react";
import { CardFrame } from "components/shared-styled-components";
import { Caption } from "components/typography";
import { useArgs } from "storybook/internal/preview-api";

import {
  Accordion,
  AccordionActions,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from ".";

type AccordionStoryArgs = {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  collapsible?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  unmountOnExit?: boolean;
  iconPosition?: "start" | "end";
  variant?: "outlined" | "filled" | "ghost";
  size?: "sm" | "md" | "lg";
  hasDividers?: boolean;
};

type StoryAccordionProps = AccordionStoryArgs & {
  onValueChange?:
    | ((value: string | undefined) => void)
    | ((value: string[]) => void);
};

const meta = {
  title: "Components/Accordion",
  component: StoryAccordion,
  decorators: [
    (Story) => (
      <CardFrame
        column
        style={{
          padding: 24,
          width: 680,
          maxWidth: "min(680px, calc(100vw - 32px))",
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
    type: "single",
    collapsible: true,
    disabled: false,
    readOnly: false,
    unmountOnExit: false,
    iconPosition: "end",
    variant: "outlined",
    size: "md",
    hasDividers: true,
  },
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["single", "multiple"],
    },
    value: {
      control: false,
      table: {
        disable: true,
      },
    },
    defaultValue: {
      control: false,
      table: {
        disable: true,
      },
    },
    iconPosition: {
      control: { type: "radio" },
      options: ["start", "end"],
    },
    variant: {
      control: { type: "radio" },
      options: ["outlined", "filled", "ghost"],
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<AccordionStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

function StoryAccordion({
  type = "single",
  value,
  defaultValue,
  collapsible,
  disabled,
  readOnly,
  unmountOnExit,
  iconPosition,
  variant,
  size,
  hasDividers,
  onValueChange,
}: StoryAccordionProps) {
  const sharedProps = {
    disabled,
    readOnly,
    unmountOnExit,
    iconPosition,
    variant,
    size,
    hasDividers,
  };

  const content = (
    <>
      <AccordionItem value="overview">
        <AccordionHeader
          subtitle="Summary, owners, and business context"
          actions={<Caption>Beta</Caption>}
        >
          Overview
        </AccordionHeader>
        <AccordionPanel>
          This section gives a high-level summary of the initiative, its scope,
          and the teams currently involved.
          <AccordionActions style={{ marginTop: 12 }}>
            <Caption>Last updated 2 hours ago</Caption>
          </AccordionActions>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem value="implementation">
        <AccordionHeader subtitle="API boundaries, dependencies, and rollout">
          Implementation details
        </AccordionHeader>
        <AccordionPanel>
          Capture the technical approach here, including migration notes,
          dependency impacts, and any rollout sequencing that matters.
          <AccordionActions style={{ marginTop: 12 }}>
            <Caption>Owner: Design Systems</Caption>
          </AccordionActions>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem value="support" disabled>
        <AccordionHeader subtitle="Disabled item example">
          Support plan
        </AccordionHeader>
        <AccordionPanel>
          This panel is intentionally disabled to demonstrate non-interactive
          accordion items.
        </AccordionPanel>
      </AccordionItem>
    </>
  );

  if (type === "multiple") {
    return (
      <Accordion
        {...sharedProps}
        type="multiple"
        value={Array.isArray(value) ? value : undefined}
        defaultValue={Array.isArray(defaultValue) ? defaultValue : []}
        onValueChange={
          typeof onValueChange === "function"
            ? (nextValue) =>
                (onValueChange as (value: string[]) => void)(nextValue)
            : undefined
        }
      >
        {content}
      </Accordion>
    );
  }

  return (
    <Accordion
      {...sharedProps}
      type="single"
      value={typeof value === "string" ? value : undefined}
      defaultValue={typeof defaultValue === "string" ? defaultValue : undefined}
      collapsible={collapsible}
      onValueChange={
        typeof onValueChange === "function"
          ? (nextValue) =>
              (onValueChange as (value: string | undefined) => void)(nextValue)
          : undefined
      }
    >
      {content}
    </Accordion>
  );
}

export const Playground: Story = {
  args: {},
  render: function Render(args) {
    return <StoryAccordion {...args} />;
  },
};

export const ControlledSingle: Story = {
  args: {
    value: "overview",
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<AccordionStoryArgs>();

    return (
      <StoryAccordion
        {...args}
        value={value}
        type="single"
        onValueChange={(nextValue: string | undefined) =>
          updateArgs({ value: nextValue })
        }
      />
    );
  },
};

export const MultipleOpen: Story = {
  args: {
    value: undefined,
    type: "multiple",
    defaultValue: ["overview", "implementation"],
  },
  render: function Render(args) {
    return <StoryAccordion {...args} />;
  },
};
