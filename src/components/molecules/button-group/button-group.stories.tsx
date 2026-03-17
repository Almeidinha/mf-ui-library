import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconMinor } from "components/icon";

import { InputField } from "../../input-field";
import { Button } from "../button";
import { ButtonGroup } from "./button-group";

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
ButtonGroup visually merges adjacent controls into a single row or column.
It works with Button and with input components such as InputField, so you can build search bars and split actions without custom CSS.
When the outlined option is enabled, Button children render using the library's plain subtle button treatment.
The size prop applies a shared button size so you do not need to repeat small or large on each Button inside the group.
        `,
      },
    },
  },
  args: {
    fullWidth: false,
    outlined: false,
    orientation: "horizontal",
    size: undefined,
  },
  argTypes: {
    fullWidth: {
      control: { type: "boolean" },
    },
    outlined: {
      control: { type: "boolean" },
    },
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
    size: {
      control: { type: "radio" },
      options: [undefined, "small", "default", "large"],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonsOnly: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Back</Button>
      <Button primary>Save</Button>
      <Button outline>Preview</Button>
    </ButtonGroup>
  ),
};

export const InputAndButton: Story = {
  render: (args) => (
    <div style={{ width: 420 }}>
      <ButtonGroup {...args}>
        <InputField aria-label="Search" placeholder="Search by country" />
        <Button primary IconPrefix={IconMinor.Whatsapp} />
      </ButtonGroup>
    </div>
  ),
};
