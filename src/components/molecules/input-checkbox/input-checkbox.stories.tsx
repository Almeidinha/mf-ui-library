import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";

import { InputCheckbox, InputCheckboxProps } from "./input-checkbox";

const meta = {
  title: "Components/InputCheckbox",
  component: InputCheckbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Checkbox

This is a molecule, composed by the atoms checkbox input and typography as well.

## How to use

\`\`\`tsx
import { InputCheckbox } from './index'

<InputCheckbox label="MY-TEXT-HERE" />
\`\`\`

---

## API
You can send all the possible values from Checkbox component.
Also, you can sen this parameters:


| Name      | Type     | Description                   | Required (Y/N) |
| --------- | -------- | ----------------------------- | -------------- |
|  label    |  string  |  The label from the checkbox  |  Y             |
|  onChange |  event   |  Listen for changes           |  N             |

\`\`\`
        `,
      },
    },
  },
  args: {
    label: "Checkbox label",
    error: false,
    disabled: false,
    indeterminate: false,
  },
  argTypes: {},
} satisfies Meta<typeof InputCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs<InputCheckboxProps>();

    return (
      <InputCheckbox
        onChange={(val: boolean | undefined) => updateArgs({ checked: val })}
        checked={checked}
        {...args}
      />
    );
  },
};
