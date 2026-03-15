import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "components/layout";
import { Body, Label } from "components/typography";
import { Gap } from "foundation/spacing";
import { useState } from "react";
import { useArgs } from "storybook/internal/preview-api";

import { Switch, SwitchProps } from "./switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Alert Banners inform users about important changes or persistent conditions.  
Switches allow users to toggle a setting on or off.
They are commonly used to control features, preferences, or system states that can be enabled or disabled.

---

## How to use

\`\`\`tsx
import { Switch } from './index'

<Switch />
\`\`\`


Extends \`HTMLAttributes<HTMLInputElement>\`

        `,
      },
    },
  },
  args: {
    label: "Enable feature",
    name: undefined,
    id: undefined,
    checked: true,
    defaultChecked: undefined,
    disabled: false,
    onChange: (checked: boolean) =>
      console.log("Switch is now", checked ? "ON" : "OFF"),
    helpText: "This is a help text",
  },
  argTypes: {
    id: {
      description:
        "Optional id for the underlying input. Defaults to a generated id.",
      table: {
        defaultValue: { summary: "useId()" },
      },
    },
    disabled: {
      description: "Disables the switch and prevents interaction.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    checked: {
      description: "Controlled checked state of the switch.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    defaultChecked: {
      description:
        "Use this prop to make the switch uncontrolled. It will manage its own state internally.",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    label: {
      description: "Visible label rendered next to the switch.",
      table: {
        defaultValue: { summary: "Enable feature" },
      },
    },
    name: {
      description: "Name applied to the underlying input element.",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    helpText: {
      description: "Supporting helper text shown below the label.",
      table: {
        defaultValue: { summary: "This is a help text" },
      },
    },
    onChange: {
      description:
        "Called with the next checked state when the switch changes.",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs<SwitchProps>();
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={(newChecked) => updateArgs({ checked: newChecked })}
      />
    );
  },
};

export const Uncontrolled: Story = {
  render: function Render() {
    const [isChecked, setIsChecked] = useState<boolean>(true);

    return (
      <Flex column gap={Gap.l} style={{ maxWidth: 350 }}>
        <Body>
          Switch is drop-in compatible with an html input checkbox. You can use
          states to be affected on the onChange and change label values.
        </Body>
        <Label>{`Now you can ${isChecked ? "see me!" : "can't!"}`}</Label>
        <Switch
          label="Uncontrolled Switch"
          defaultChecked
          helpText="This switch is uncontrolled, it manages its own state internally."
          onChange={setIsChecked}
        />
      </Flex>
    );
  },
};
