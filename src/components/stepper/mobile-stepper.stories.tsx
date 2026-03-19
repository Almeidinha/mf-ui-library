import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";
import styled from "styled-components";

import { MobileStepper, MobileStepperProps } from "./mobile-stepper";

const Container = styled.div`
  width: 100%;
  max-width: 640px;
  padding: 24px;
`;

const meta: Meta<typeof MobileStepper> = {
  title: "Components/Mobile Stepper",
  component: MobileStepper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
MobileStepper is a compact progress indicator for narrow layouts.

Use it when the full Stepper would take too much space and you only need lightweight previous/next navigation with progress feedback.
        `,
      },
    },
  },
  args: {
    steps: 3,
    activeStep: 0,
    variant: "dots",
    position: "static",
  },
  argTypes: {
    steps: {
      description: "Total number of steps represented by the mobile stepper.",
      table: {
        category: "Data",
        defaultValue: { summary: "1" },
      },
    },
    activeStep: {
      description: "Zero-based index of the current active step.",
      table: {
        category: "State",
        defaultValue: { summary: "0" },
      },
    },
    variant: {
      description:
        "Chooses whether progress is shown as text, dots, or a progress bar.",
      control: { type: "inline-radio" },
      options: ["text", "dots", "progress"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "dots" },
      },
    },
    position: {
      description: "Sets the positioning mode for the stepper container.",
      control: { type: "inline-radio" },
      options: ["static", "sticky", "fixed"],
      table: {
        category: "Layout",
        defaultValue: { summary: "static" },
      },
    },
    onBack: {
      description: "Called when the back action is triggered.",
      control: false,
      table: {
        category: "Events",
      },
    },
    onNext: {
      description: "Called when the next action is triggered.",
      control: false,
      table: {
        category: "Events",
      },
    },
    backButton: {
      description: "Optional custom back button content.",
      control: false,
      table: {
        category: "Slots",
      },
    },
    nextButton: {
      description: "Optional custom next button content.",
      control: false,
      table: {
        category: "Slots",
      },
    },
    className: {
      description: "Optional class name applied to the mobile stepper root.",
      table: {
        category: "Appearance",
      },
    },
    "aria-label": {
      description: "Accessible label applied to the mobile progress region.",
      table: {
        category: "Accessibility",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MobileStepper>;

function ControlledMobileStepperStory(args: MobileStepperProps) {
  const { activeStep: initialActiveStep, steps: initialSteps } = args;
  const [storyArgs, updateArgs] = useArgs<MobileStepperProps>();
  const { activeStep: storyActiveStep, steps: storySteps } = storyArgs;
  const steps = Math.max(storySteps ?? initialSteps, 1);
  const activeStep = Math.min(
    Math.max(storyActiveStep ?? initialActiveStep, 0),
    steps - 1,
  );

  return (
    <Container>
      <MobileStepper
        {...args}
        {...storyArgs}
        steps={steps}
        activeStep={activeStep}
        onBack={() => updateArgs({ activeStep: Math.max(activeStep - 1, 0) })}
        onNext={() =>
          updateArgs({ activeStep: Math.min(activeStep + 1, steps - 1) })
        }
      />
    </Container>
  );
}

export const Text: Story = {
  args: {
    steps: 3,
    activeStep: 0,
    variant: "text",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays progress as current-step text between the back and next actions.",
      },
    },
  },
  render: ControlledMobileStepperStory,
};

export const Dots: Story = {
  args: {
    steps: 3,
    activeStep: 0,
    variant: "dots",
  },
  parameters: {
    docs: {
      description: {
        story: "Represents progress with a compact set of dots.",
      },
    },
  },
  render: ControlledMobileStepperStory,
};

export const Progress: Story = {
  args: {
    steps: 6,
    activeStep: 0,
    variant: "progress",
  },
  parameters: {
    docs: {
      description: {
        story: "Uses a progress bar for flows with a larger number of steps.",
      },
    },
  },
  render: ControlledMobileStepperStory,
};
