import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";

import { Slider, SliderProps } from "./slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: `
The slider is built on top of the \`react-compound-slider\` library,
which provides a solid foundation for building sliders with complex interactions.
The component is designed to be flexible and customizable, allowing you to easily integrate it into your projects.
---

## How to use

\`\`\`tsx
import { Slider } from './index'

<Slider
  max={max}
  value={number}
/>
\`\`\`

---
        `,
      },
    },
  },
  args: {
    min: 10,
    max: 100,
    value: 50,
    prefix: "$",
    onChange: undefined,
    editable: false,
    onKeyUp: undefined,
  },
  argTypes: {
    min: {
      description: "Minimum allowed slider value.",
      table: {
        defaultValue: { summary: "0" },
      },
    },
    max: {
      description: "Maximum allowed slider value.",
      table: {
        defaultValue: { summary: "100" },
      },
    },
    value: {
      description: "Controlled numeric value for the slider.",
      table: {
        defaultValue: { summary: "50" },
      },
    },
    editable: {
      description: "Allows typing the value directly in the paired input.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    prefix: {
      description: "Optional prefix shown with the current value.",
      table: {
        defaultValue: { summary: '""' },
      },
    },
    onChange: {
      description:
        "(value: number) => void) - Callback function that is called when the slider value changes.",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    onKeyUp: {
      description:
        "(value: number) => void) - Callback function that is called when a key is released while the slider handle is focused.",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<SliderProps>();

    return <Slider {...args} onChange={(value) => updateArgs({ value })} />;
  },
};
