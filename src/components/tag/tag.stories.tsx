import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "components/layout";
import { Gap } from "foundation/spacing";
import { useState } from "react";

import { Tag } from "./tag";

const meta = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Checkbox

Checkboxes are most commonly used to give users a way to make a range
of selections (zero, one, or multiple). They may also be used as a way to have users indicate they agree to specific terms and services.

## How to use

\`\`\`tsx

import { Tag } from './index'

<Tag>Label</Tag>
\`\`\`

### API

The available optional properties are as follows.

| Prop         | Type           | Description                                          |
| ------------ | -------------- | ---------------------------------------------------- |
| \`closable?\`  | \`boolean\`  | Add a close button to the tag                        |
| \`disabled?\`  | \`boolean\`  | Disabled the tag                                     |
| \`className?\` | \`string\`   | Add the class to the tag                             |
| \`onClick?\`   | \`function\` | Called when the close button is clicked              |
| \`onClose?\`   | \`function\` | Called when the close button is clicked              |

---

\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  args: {
    closable: false,
    disabled: false,
    className: "",
    children: "This is My TAG!",
  },
  argTypes: {},
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: (args) => <Tag {...args} color="red" />,
};

export const Example: Story = {
  render: function Render() {
    const [selectedCities, setSelected] = useState([
      { id: 1, name: "Vancouver, BC", disabled: true },
      { id: 2, name: "Montreal, QC" },
      { id: 3, name: "Toronto, ON" },
    ]);

    return (
      <Flex gap={Gap.l}>
        {selectedCities.map((city) => {
          return (
            <Tag
              closable
              disabled={city.disabled}
              key={city.id}
              onClick={() => {
                setSelected((prevCities) =>
                  prevCities.filter(
                    (filteredCity) => filteredCity.id !== city.id,
                  ),
                );
              }}
            >
              {city.name}
            </Tag>
          );
        })}
      </Flex>
    );
  },
  parameters: {
    docs: { disable: true },
  },
};
