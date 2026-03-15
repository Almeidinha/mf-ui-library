import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";

import { ChoiceList, IOptionGroup } from "./choice-list";

const meta = {
  title: "Components/ChoiceList",
  component: ChoiceList,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
This is a organism, composed by radio button molecule and some atoms.

## How to use

\`\`\`tsx
import { ChoiceList } from './index'

const [selected, setSelected] = useState('')
const handleChange = (value: string) => setSelected(value)
const options = [
  {
    label: 'My Awesome label',
    value: '1',
    id: '1',
  }
]

<ChoiceList
  options={options}
  onChange={handleChange}
  selected={selectedState}
/>
\`\`\`

---

## API
This component receive a list (\`options\` parameter) from N amount of Radio Buttons if you'd like to render.
So all the possible values from Radio Buttons component can be passed here.
Also, you can sen this parameters:

| Name | Type | Description | Required (Y/N)|
| ---- | ----- | ------ | ----- |
| \`options\` | \`IOption[]\` | The items that are going to be rendered inside the list | Y |
| \`onChange\` | \`function\` | Function that will return the value of the option that was chosen | Y |
| \`selected\` | \`string\` | Variable that contains the value of the selected item | Y |
| \`name\` | \`string\` | The name that will represent the group of radios, in order to render more instances and they not affect each other | N |

\`\`\`
        `,
      },
    },
  },
  args: {
    direction: "vertical",
    name: "Choose your favorite fruit",
    options: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Cherry", value: "cherry" },
    ],
    selected: "banana",
    onChange: (value: string) => void value,
  },
  argTypes: {
    direction: {
      description: "Arranges the radio options vertically or horizontally.",
      table: {
        defaultValue: { summary: "vertical" },
      },
    },
    options: {
      description: "Options rendered inside the choice list.",
      control: false,
      table: {
        defaultValue: { summary: "3 demo options" },
      },
    },
    selected: {
      description: "Controlled selected option value.",
      table: {
        defaultValue: { summary: "banana" },
      },
    },
    name: {
      description: "Radio group name used to link the options together.",
      table: {
        defaultValue: { summary: "Choose your favorite fruit" },
      },
    },
    onChange: {
      description: "Called when the selected option changes.",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof ChoiceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [{ selected }, updateArgs] = useArgs<IOptionGroup>();
    return (
      <ChoiceList
        {...args}
        selected={selected}
        onChange={(val) => updateArgs({ selected: val })}
      />
    );
  },
  argTypes: {
    className: { control: false, table: { disable: true } },
    onChange: { control: false, table: { disable: true } },
  },
};
