import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";

import { TextArea, TextAreaProps } from "./text-area";

const meta = {
  title: "Components/TextArea",
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component: `
The TextArea component is an extension of HTML's \`<textarea>\` element with design-system styling,
an optional label, an \`invalid\` state for validation feedback, configurable \`resize\` behavior, and an \`onChange\` callback that returns the current value.
---

## How to use

\`\`\`tsx
import { TextArea } from './index'

<TextArea />
\`\`\`

        `,
      },
    },
  },
  args: {
    label: "Text Area Label",
    placeholder: "Type something here...",
    invalid: false,
    value: "",
    resize: "none",
    onChange: (value: string) => console.log("TextArea value:", value),
  },
  argTypes: {
    resize: {
      control: { type: "radio" },
      options: ["none", "vertical", "horizontal", "both"],
      table: { defaultValue: { summary: "none" } },
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<TextAreaProps>();

    return (
      <div style={{ width: 350, margin: "auto" }}>
        <TextArea {...args} onChange={(value) => updateArgs({ value })} />
      </div>
    );
  },
};
