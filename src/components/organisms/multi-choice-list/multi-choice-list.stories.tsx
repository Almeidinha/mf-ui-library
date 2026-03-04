/* eslint-disable no-unused-vars */

import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "components/layout";
import { Button } from "components/molecules";
import { BodyLarge, Caption } from "components/typography";
import { Gap } from "foundation/spacing";
import { useState } from "react";
import { useArgs } from "storybook/internal/preview-api";

import { MultiChoiceList, MultiChoiceListProps } from "./multi-choice-list";

const meta = {
  title: "Components/MultiChoiceList",
  component: MultiChoiceList,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
This is a organism, composed by checkbox molecule and some atoms.

## How to use

\`\`\`javascript
import { MultiChoiceList } from './index'

<MultiChoiceList
  options={[
    {
      label: 'My Awesome label',
      value: 'my-awesome-label',
      id: '1',
    },
    {
      label: 'Another label',
      value: 'another-label',
      id: '2',
    },
  ]
  value={['my-awesome-label']}
  onChange={(next) => console.log(next)}
/>
\`\`\`

## API
This component receive a list (\`options\` parameter) from N amount of Checkbox if you'd like to render.
So all the possible values from Checkbox component can be passed here.
Also, you can sen this parameters:


| Name | Type | Description | Required (Y/N)|
| ---- | ----- | ------ | ----- |
| \`value\` | \`string\` | The value from each checkbox in the list | Y |
| \`label\` | \`string\` | The label from each checkbox in the list | Y |
| \`id\` | \`string\` | The id from each checkbox in the list | N |
| \`disabled\` | \`boolean\` | Whether the checkbox is disabled | N |
| \`helpMessage\` | \`string\` | Message that will be render bellow each checkbox field | N |

## Examples
        `,
      },
    },
  },
  args: {
    options: [
      {
        label: "Apple",
        value: "apple",
        helpMessage: "This is a helpful message for Apple",
      },
      {
        label: "Banana",
        value: "banana",
        helpMessage: "This is a helpful message for Banana",
      },
      {
        label: "Cherry",
        value: "cherry",
        helpMessage: "This is a helpful message for Cherry",
      },
    ],
    value: [],
    errorMessage: "",
    className: "",
    onChange: () => {},
    defaultValue: undefined,
    name: "",
    "aria-label": "",
    "aria-labelledby": "",
  },
  argTypes: {
    options: {
      table: {
        type: {
          summary: "MultiChoiceOption[]",
          detail:
            "Array of options to render, each with shape { value: string; label: string; helpMessage?: string; disabled?: boolean; id?: string }",
        },
      },
    },
    className: {
      table: {
        type: {
          summary: "string",
          detail: "Additional CSS class names to apply to the component",
        },
      },
    },
    onChange: {
      table: {
        type: {
          summary: "(next: string[]) => void",
          detail:
            "Function that receives the next selected values array when a change occurs, use for controlled mode. For uncontrolled mode, this is optional.",
        },
      },
    },
    value: {
      table: {
        type: {
          summary: "string[]",
          detail:
            "Array<string> representing selected values, use for controlled mode",
        },
      },
    },
    defaultValue: {
      table: {
        type: {
          summary: "string[]",
          detail:
            "string representing the default selected values, use for uncontrolled mode",
        },
      },
    },
    name: {
      table: {
        type: {
          summary: "string",
        },
      },
    },
    "aria-label": {
      table: {
        type: {
          summary: "string",
        },
      },
    },
    "aria-labelledby": {
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
} satisfies Meta<typeof MultiChoiceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<MultiChoiceListProps>();

    const { defaultValue, ...restArgs } = args;
    return (
      <MultiChoiceList
        {...restArgs}
        value={value}
        onChange={(value) => updateArgs({ value })}
      />
    );
  },
};

export const Controlled: Story = {
  render: function Render(args) {
    const [selected, setSelected] = useState<string[]>([]);
    const handleChange = (values: string[]) => {
      setSelected(values);
    };
    const { defaultValue, ...restArgs } = args;
    return (
      <Flex column gap={Gap.m}>
        <BodyLarge>
          For the controlled version, the selected values are managed by the
          parent component. In this example, we display the currently selected
          values below the list.
        </BodyLarge>
        <MultiChoiceList
          {...restArgs}
          value={selected}
          onChange={(values) => handleChange(values)}
        />
        <Caption>{`Currently selected values: ${selected.join(", ")}`}</Caption>
      </Flex>
    );
  },
};

export const Uncontrolled: Story = {
  render: (args) => {
    const handleChange = (values: string[]) => {
      alert(`Selected values: ${values.join(", ")}`);
    };
    const { value, ...restArgs } = args;
    return (
      <Flex column gap={Gap.m}>
        <BodyLarge>
          For the uncontrolled version, the component manages its own state
          internally. In this example, we show an alert with the selected values
          whenever a change occurs.
        </BodyLarge>
        <MultiChoiceList
          {...restArgs}
          defaultValue={[]}
          onChange={(values) => handleChange(values)}
        />
        <Caption>
          In uncontrolled mode, the component manages its own state. The
          onChange callback is optional and can be used to listen for changes,
          but the parent component does not control the selected values.
        </Caption>
      </Flex>
    );
  },
};

export const WithError: Story = {
  render: function Render(args) {
    const { value: argValue, ...restArgs } = args;

    const [value, setValue] = useState<string[]>(argValue ?? []);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const handleClick = () => {
      setErrorMessage(
        value.length < 2 ? "Please select at least two options" : "",
      );
      if (value.length >= 2) {
        alert(`Form submitted with values: ${value.join(", ")}`);
      }
    };

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <Flex column gap={Gap.m}>
          <MultiChoiceList
            {...restArgs}
            defaultValue={[]}
            onChange={(values) => {
              setErrorMessage("");
              setValue(values);
            }}
            errorMessage={errorMessage}
          />
          <Button type="submit" primary onClick={handleClick}>
            Submit
          </Button>
          <Caption>
            In this example, we demonstrate how to display an error message when
            the user tries to submit the form without selecting at least two
            options. The error message will appear below the list if the
            validation fails.
          </Caption>
        </Flex>
      </form>
    );
  },
};
