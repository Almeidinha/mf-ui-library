import { Meta, StoryObj } from "@storybook/react";
import { Card } from "components/card";
import { Flex } from "components/layout";
import { Button } from "components/molecules";
import { Caption, Label } from "components/typography";
import { Gap } from "foundation/spacing";
import { If } from "helpers/nothing";
import { useArgs } from "storybook/internal/preview-api";

import { Checkbox, CheckboxProps } from "./checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Checkboxes are most commonly used to give users a way to make a range of selections (zero, one, or multiple).
They may also be used as a way to have users indicate they agree to specific terms and services.

## How to use

\`\`\`tsx
import { Checkbox } from './index'

<Checkbox />
\`\`\`

---

## API

Extends HTMLAttributes<HTMLInputElement>

| Name      | Type    | Description                                                         |
| --------- | ------- | ------------------------------------------------------------------- |
| checked?  | boolean | Set checkbox as filled                                              |
| disabled? | boolean | Set checkbox as a disabled way (can't click or interact with that)  |
| error?    | boolean | Useful to work inside a form or show some feedback from user action |
| onChange? | event   | You can listen the changes from the component                       |

\`\`\`
        `,
      },
    },
  },
  args: {
    disabled: false,
    error: false,
    indeterminate: false,
    checked: false,
  },
  argTypes: {
    checked: {
      description: "Controlled checked state of the checkbox.",
      table: {
        category: "Controlled state",
        defaultValue: {
          summary: "false",
        },
      },
    },
    disabled: {
      description: "Disables the checkbox and prevents interaction.",
      table: {
        category: "State",
        defaultValue: {
          summary: "false",
        },
      },
    },
    error: {
      description: "Applies an error style to the checkbox control.",
      table: {
        category: "State",
        defaultValue: {
          summary: "false",
        },
      },
    },
    indeterminate: {
      description: "Displays the checkbox in an indeterminate mixed state.",
      control: "boolean",
      table: {
        category: "State",
        defaultValue: {
          summary: "false",
        },
      },
    },
    readOnly: {
      description: "Prevents changes while preserving the rendered state.",
      table: {
        category: "State",
        defaultValue: {
          summary: "false",
        },
      },
    },
    onChange: {
      description: "Called when the checked state changes.",
      table: {
        category: "Events",
        defaultValue: {
          summary: "undefined",
        },
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: function Render(args: CheckboxProps) {
    const [{ checked }, updateArgs] = useArgs<CheckboxProps>();

    const handleChange = (nextChecked: boolean | undefined) => {
      updateArgs({ checked: nextChecked });
    };

    return (
      <Flex style={{ gap: Gap.m, alignItems: "center" }}>
        <Label>Accept terms and conditions</Label>
        <Checkbox {...args} checked={checked} onChange={handleChange} />
      </Flex>
    );
  },
};

export const CheckBoxExamples: Story = {
  render: function Render() {
    const [{ checked }, updateArgs] = useArgs<CheckboxProps>();

    return (
      <Flex style={{ gap: Gap.m, alignItems: "center" }}>
        <Checkbox
          checked={checked}
          onChange={(nextState) => updateArgs({ checked: nextState })}
        />
        <Checkbox />
        <Checkbox
          checked={checked}
          readOnly
          onChange={(nextState) => updateArgs({ checked: nextState })}
        />
        <Checkbox disabled />
        <Checkbox
          checked={checked}
          disabled
          readOnly
          onChange={(nextState) => updateArgs({ checked: nextState })}
        />
        <Checkbox error />
        <Checkbox
          checked={checked}
          error
          readOnly
          onChange={(nextState) => updateArgs({ checked: nextState })}
        />
      </Flex>
    );
  },
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
  },
};

export const IntegratedExample: Story = {
  render: function Render() {
    const [{ checked, error }, updateArgs] = useArgs<CheckboxProps>();

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Card style={{ width: "300px" }}>
          <Card.Controls>
            <Button
              type="button"
              onClick={() => updateArgs({ checked: false, error: false })}
            >
              Clear
            </Button>
            <Button primary type="submit">
              Submit
            </Button>
          </Card.Controls>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: Gap.xxs,
              padding: Gap.xs,
              height: "40px",
            }}
          >
            <label
              htmlFor="accept_terms"
              style={{
                display: "flex",
                alignItems: "center",
                gap: Gap.xs,
              }}
            >
              <Checkbox
                id="accept_terms"
                checked={checked}
                onInvalid={() => {
                  updateArgs({ error: true });
                }}
                error={error}
                onChange={(value) => {
                  updateArgs({ checked: value, error: false });
                }}
                required
              />
              <Label as="span">I accept these terms.</Label>
            </label>
            <If is={checked === true}>
              <Caption subdued>You have accepted the terms.</Caption>
            </If>
          </div>
        </Card>
      </form>
    );
  },
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
  },
};
