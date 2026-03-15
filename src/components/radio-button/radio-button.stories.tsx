import { Meta, StoryObj } from "@storybook/react";
import { Flex } from "components/layout";
import { Gap } from "foundation/spacing";

import { RadioButton } from "./radio-button";

const meta = {
  title: "Components/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# RadioButton

RadioButton is "drop-in" compatible with an html input radio.

## How to use

\`\`\`tsx
import { RadioButton } from '/index'

<RadioButton />
\`\`\`

---

## API

Extends \`HTMLAttributes<HTMLInputElement>\`

| Name        | Type      | Description                                                             |
| ----------- | --------- | ----------------------------------------------------------------------- |
|  label      |  string   | The label for the radio button                                          |
|  checked?   |  boolean  | Set radio button as filled (only one can be filled)                     |
|  disabled?  |  boolean  | Set radio button as a disabled way (can't click or interact with that)  |
|  onChange?  |  event    | You can listen the changes from the component                           |

\`\`\`
        `,
      },
    },
  },
  args: {
    label: "Radio Button label",
  },
  argTypes: {
    label: {
      table: {
        category: "Content",
        defaultValue: {
          summary: "Radio Button label",
        },
      },
      description: "Visible label rendered next to the radio button.",
    },
    checked: {
      description: "Controlled checked state for the radio button.",
      table: {
        category: "Controlled state",
        defaultValue: { summary: "undefined" },
      },
    },
    disabled: {
      description: "Disables the radio button and prevents interaction.",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    readOnly: {
      description: "Prevents changes while preserving the rendered state.",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    name: {
      description: "Radio group name used to associate related radio buttons.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "undefined" },
      },
    },
    onChange: {
      description: "Called when the selected state changes.",
      table: {
        category: "Events",
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Radios: Story = {
  render: () => {
    return (
      <Flex column gap={Gap.xs}>
        <RadioButton name="radios" label="option 1" />
        <RadioButton name="radios" label="option 2" />
        <RadioButton name="radios" label="option 3" disabled />
        <RadioButton name="radios" label="option 4" readOnly />
      </Flex>
    );
  },
};
