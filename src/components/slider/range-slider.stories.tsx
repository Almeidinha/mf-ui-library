import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "components/layout";
import { Body } from "components/typography";
import { Gap } from "foundation/spacing";
import { useArgs } from "storybook/internal/preview-api";

import { RangeSlider, RangeSliderProps } from "./range-slider";

const prices: number[] = [];
for (let i = 0; i < 500; i++) {
  prices.push(Math.floor(Math.random() * 50) + 1);
}

const meta = {
  title: "Components/RangeSlider",
  component: RangeSlider,
  parameters: {
    docs: {
      description: {
        component: `
 The Graph is built on top of the \`recharts\` library, which provides a solid
 foundation for building charts with complex interactions.
---

## How to use

\`\`\`tsx
import { RangeSlider } from './index'

<RangeSlider
  max={max}
  values={[min, max]}
/>
\`\`\`

---
        `,
      },
    },
  },
  args: {
    min: 0,
    max: 100,
    values: [0, 100],
    prefix: "",
    graphHeight: 100,
    editable: false,
    data: undefined,
    maxLabel: "Max",
    minLabel: "Min",
    onChange: undefined,
    onKeyUp: undefined,
  },
  argTypes: {
    min: {
      table: {
        defaultValue: { summary: "0" },
      },
    },
    max: {
      table: {
        defaultValue: { summary: "100" },
      },
    },
    prefix: {
      table: {
        defaultValue: { summary: '""' },
      },
    },
    editable: {
      table: {
        defaultValue: { summary: "false" },
      },
    },
    graphHeight: {
      table: {
        defaultValue: { summary: "100" },
      },
    },
    data: {
      description:
        "readonly number[] - An array of numbers representing the data points for the graph. " +
        "The graph will use the minimum and maximum values of this array as the range for the slider.",
      table: {
        type: { summary: "readonly number[]" },
        defaultValue: { summary: "undefined" },
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
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<RangeSliderProps>();

    return (
      <RangeSlider {...args} onChange={(values) => updateArgs({ values })} />
    );
  },
};

export const withGraph: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<RangeSliderProps>();

    return (
      <Flex column gap={Gap.l}>
        <Body style={{ whiteSpace: "pre-line" }}>
          <p>
            If you provide a data property, the component will build Bar graph
            on top of the slider and use it`s minimum and maximum values as a
            range
          </p>
        </Body>
        <RangeSlider
          {...args}
          data={prices}
          onChange={(values) => updateArgs({ values })}
        />
      </Flex>
    );
  },
};
