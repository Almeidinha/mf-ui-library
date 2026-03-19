import type { Meta, StoryObj } from "@storybook/react";
import { Container, Flex } from "components/layout";
import { Button } from "components/molecules";
import { Gap } from "foundation/spacing";
import { useState } from "react";
import styled from "styled-components";

import { StepItem, Stepper } from "./stepper";

const VerticalContent = styled.div`
  padding: 12px 0;
  color: #4b5563;
`;

const baseSteps: StepItem[] = [
  {
    label: "Select campaign settings",
    description: "Choose your campaign basics",
    completed: true,
  },
  {
    label: "Create an ad group",
    optional: "Optional",
    description: "Define your audience and placements",
  },
  {
    label: "Create an ad",
    description: "Finish your creative setup",
  },
];

const verticalSteps: StepItem[] = [
  {
    label: "Select campaign settings",
    content: (
      <VerticalContent>
        For each ad campaign that you create, you can control how much you re
        willing to spend and where your ads will appear.
      </VerticalContent>
    ),
  },
  {
    label: "Create an ad group",
    optional: "Optional",
    content: (
      <VerticalContent>
        Create groups to organize targeting, bids, and creative combinations.
      </VerticalContent>
    ),
  },
  {
    label: "Create an ad",
    content: (
      <VerticalContent>
        Add the final copy, assets, and destination settings.
      </VerticalContent>
    ),
  },
];

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    docs: {
      description: {
        component: `
      Steppers communicate progress through a sequence of numbered steps.

      Use the main Stepper for multi-step flows such as onboarding, checkout, or setup.
      This story file focuses on the full Stepper component, including horizontal, vertical, error, and non-linear flows.
        `,
      },
    },
  },
  args: {
    activeStep: 1,
    orientation: "horizontal",
    alternativeLabel: false,
    nonLinear: false,
    steps: baseSteps,
  },
  argTypes: {
    steps: {
      description:
        "Ordered list of step definitions, including labels, optional descriptions, completion state, and optional vertical content.",
      control: false,
      table: {
        category: "Data",
      },
    },
    activeStep: {
      description: "Zero-based index of the currently active step.",
      table: {
        category: "State",
        defaultValue: { summary: "0" },
      },
    },
    orientation: {
      description:
        "Controls whether the stepper is rendered horizontally or vertically.",
      control: { type: "inline-radio" },
      options: ["horizontal", "vertical"],
      table: {
        category: "Layout",
        defaultValue: { summary: "horizontal" },
      },
    },
    alternativeLabel: {
      description:
        "Centers labels below the icons in horizontal mode instead of aligning them beside the connector row.",
      table: {
        category: "Layout",
        defaultValue: { summary: "false" },
      },
    },
    nonLinear: {
      description:
        "Allows navigation to any step without disabling future steps based on the active index.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },
    onStepClick: {
      description: "Called when a clickable step is selected.",
      control: false,
      table: {
        category: "Events",
      },
    },
    className: {
      description: "Optional class name applied to the stepper root.",
      table: {
        category: "Appearance",
      },
    },
    "aria-label": {
      description: "Accessible label applied to the stepper list.",
      table: {
        category: "Accessibility",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default horizontal stepper layout for linear progress across a sequence.",
      },
    },
  },
  render: (args) => (
    <Container>
      <Stepper {...args} />
    </Container>
  ),
};

export const AlternativeLabel: Story = {
  args: {
    alternativeLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Horizontal variant with labels centered below each step icon.",
      },
    },
  },
  render: (args) => (
    <Container>
      <Stepper {...args} />
    </Container>
  ),
};

export const ErrorState: Story = {
  args: {
    steps: [
      {
        label: "Select campaign settings",
        completed: true,
      },
      {
        label: "Create an ad group",
        error: true,
        description: "Alert message",
      },
      {
        label: "Create an ad",
      },
    ],
    activeStep: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows how a step can enter an error state while the rest of the flow remains visible.",
      },
    },
  },
  render: (args) => (
    <Container>
      <Stepper {...args} />
    </Container>
  ),
};

export const Vertical: Story = {
  args: {
    steps: verticalSteps,
    orientation: "vertical",
    activeStep: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Vertical stepper with expandable step content for the active item.",
      },
    },
  },
  render: (args) => (
    <Container>
      <Stepper {...args} />
    </Container>
  ),
};

export const NonLinear: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Interactive non-linear example where users can jump between steps and mark them complete manually.",
      },
    },
  },
  render: function Render() {
    const [activeStep, setActiveStep] = useState(1);
    const [steps, setSteps] = useState<StepItem[]>([
      { label: "Select campaign settings" },
      { label: "Create an ad group" },
      { label: "Create an ad" },
    ]);

    const handleComplete = () => {
      setSteps((current) =>
        current.map((step, index) =>
          index === activeStep ? { ...step, completed: true } : step,
        ),
      );
    };

    return (
      <Container style={{ display: "grid", gap: 16, paddingTop: 32 }}>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          nonLinear
          onStepClick={setActiveStep}
        />

        <Flex gap={Gap.m}>
          <Button
            type="button"
            onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={() =>
              setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
          >
            Next
          </Button>
          <Button type="button" onClick={handleComplete}>
            Complete Step
          </Button>
        </Flex>
      </Container>
    );
  },
};
