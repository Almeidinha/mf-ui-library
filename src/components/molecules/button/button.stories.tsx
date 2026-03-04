import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "components/icon";
import { InputField, InputText } from "components/input-field";
import { Flex } from "components/layout";
import { Gap } from "foundation/spacing";
import { useState } from "react";

import { Button, ButtonProps } from "./button";

type ButtonType =
  | "basic"
  | "primary"
  | "destructive"
  | "primary destructive"
  | "outline"
  | "plain"
  | "plain subtle";

type ButtonTypeToken =
  | "basic"
  | "primary"
  | "destructive"
  | "outline"
  | "plain"
  | "subtle";

type Size = "small" | "default" | "large";

type ButtonStoryArgs = Omit<
  ButtonProps,
  | "type"
  | "basic"
  | "primary"
  | "destructive"
  | "destructivePrimary"
  | "outline"
  | "plain"
  | "subtle"
  | "plainSubtle"
  | "small"
  | "default"
  | "large"
> & {
  buttonType?: ButtonType;
  size?: Size;
};

const BUTTON_TYPE_TOKENS: ReadonlySet<ButtonTypeToken> = new Set([
  "basic",
  "primary",
  "destructive",
  "outline",
  "plain",
  "subtle",
]);

function isButtonTypeToken(token: string): token is ButtonTypeToken {
  return BUTTON_TYPE_TOKENS.has(token as ButtonTypeToken);
}

function StoryButton({ buttonType, size, ...buttonArgs }: ButtonStoryArgs) {
  const typeProp: Partial<Record<ButtonTypeToken, true>> = buttonType
    ? buttonType
        .split(" ")
        .reduce<Partial<Record<ButtonTypeToken, true>>>((acc, token) => {
          if (isButtonTypeToken(token)) {
            acc[token] = true;
          }
          return acc;
        }, {})
    : {};

  const sizeProp =
    size === "small"
      ? { small: true }
      : size === "large"
        ? { large: true }
        : {};

  return <Button {...buttonArgs} {...typeProp} {...sizeProp} />;
}

const meta: Meta<ButtonStoryArgs> = {
  title: "Components/Button",
  component: StoryButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

## How to use

\`\`\`javascript
import { Button } from './index'

<Button primary label="SOME-label-HERE" />
\`\`\`

## Properties 

The Buttons accepts the same properties as a normal button and has some additional ones.

The available optional properties are as follows, try them out in the editable code sample below!

| Prop          | Type           | Description                                                          |
| ----------    | ---------      | -------------------------------------------------------------------- |
|  IconPrefix?  |  Icon          | It will add the given Icon before the text                           |
|  IconSuffix?  |  Icon          | It will add the given Icon after the text                            |
|  loading?     |  boolean       | Replaces the text for a loading icon                                 |  
|  size ?       |  small / large | Changes the size of the button. Leave it empty for the default size  |
|  type ?       |  string        | Changes the type of the button. Leave it empty for the default type  |

The available types are: \`basic\`, \`primary\`, \`destructive\`, \`outline\`, \`plain\`.
Types primary and destructive can also be combined by passing \`primary destructive\` as the type.

        `,
      },
    },
  },
  tags: ["autodocs"],
  args: {
    buttonType: undefined,
    size: "default",
    children: "Button",
    loading: false,
    disabled: false,
    IconPrefix: undefined,
    IconSuffix: undefined,
  },
  argTypes: {
    buttonType: {
      control: { type: "select" },
      options: [
        "basic",
        "primary",
        "destructive",
        "primary destructive",
        "outline",
        "plain",
        "plain subtle",
      ],
      table: {
        defaultValue: { summary: "basic" },
      },
    },
    size: {
      control: { type: "radio" },
      options: ["small", "default", "large"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    IconPrefix: {
      control: { type: "select" },
      options: ["Bell", "CircleInfo"],
      mapping: {
        Bell: () => <Icon.Bell />,
        CircleInfo: () => <Icon.CircleInfo />,
      },
    },
    IconSuffix: {
      control: { type: "select" },
      options: ["Bell", "CircleInfo"],
      mapping: {
        Bell: () => <Icon.Bell />,
        CircleInfo: () => <Icon.CircleInfo />,
      },
    },
  },
} satisfies Meta<ButtonStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: (args) => <StoryButton {...args} />,
};

export const DisabledLoadingExample: Story = {
  render: function Render() {
    const [invalid, setInvalid] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
        }}
      >
        <Flex column gap={Gap.xs}>
          <InputText.Label label="Country Code" htmlFor="country_code">
            <InputField
              type="text"
              placeholder="Enter a country code..."
              id="country_code"
              name="country_code"
              pattern="[A-Za-z]{3}"
              onInvalid={() => setInvalid(true)}
              invalid={invalid}
              onChange={() => {
                setInvalid(false);
                setDisabled(false);
              }}
              title="Three letter country code"
              required
            />
          </InputText.Label>
          <Button primary type="submit" disabled={disabled} loading={loading}>
            Send
          </Button>
        </Flex>
      </form>
    );
  },
  parameters: {
    docs: { disable: true },
  },
};
