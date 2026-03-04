import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconMinor } from "components/icon";
import { Flex, SpaceBetween } from "components/layout";
import { Button } from "components/molecules";
import { BodyLarge } from "components/typography";
import { Gap, Padding } from "foundation/spacing";
import { isDefined } from "helpers/safe-navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useArgs } from "storybook/internal/preview-api";

import { IInputFieldProps, InputField } from "./input-field";
import { InputNumber } from "./input-number";
import { InputText } from "./input-text";

type ReactFormHookExampleData = {
  firstName: string;
  lastName: string;
  age: number;
};

const meta = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
An Input Field is a component where users can enter text or numbers. It supports different input types and configurable options.

## Familiar HTML input API
The Input Field works just like a standard HTML input element.
It accepts all the usual input props, so you can use it the same way you would a normal HTML input.
It also includes a few extra properties for styling the component.

The available optional properties are as follows, try them out in the editable code sample below!

| Prop                | Type            | Description                                                              |
| --------------------| ----------------| ------------------------------------------------------------------------ |
| prefix?             |  string         | add a small text before the input                                        |
| suffix?             | string          | add a small text after the input                                         |
| label?              | string          | a label to be displayed inside the input element, above the input itself |
| labelPosition?      | top \\| side    | The position where the label should be rendered                          |
| invalid?            | boolean         | indicate that the input is invalid                                       |


## Simple Input API

The input-field module also provides simpler components for common use cases.
You can use these instead of the base InputField when you don’t need all the features of a standard HTML input,
or when you’re not working inside a form and just want to manage state with useState.
These components are designed to be straightforward: a string goes in, and a string comes out — no need to handle HTML events.
These simple components obey the following API. In addition they have all the same optional properties described above:

| Prop        | Type                  | Description                                                                       |
| ----------- | --------------------- | --------------------------------------------------------------------------------- |
|  value      |  T                    | The value of the controlled input                                                 |
|  onChange   |  (change: T) => void  | Called when the value changes                                                     |
|  required?  |  boolean              | Passed to the inner HTML element, renders an * (asterisk) next to the inner-label |


## Slots and sub-components

Using a combination of slots, sub-components, and the optional properties described above,
it is possible to customize the components quite a bit. The available components include:

| Slot                  | Type    | Description                                                                                       |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------- |
|  InputField.Icon      | Slot    | Places the children after the input, children should be icons                                     |
|  InputField.Controls  | Slot    | Places the children after the input, children should be small and interactive                     |
|  InputField.Label     | Wrapper | A wrapper for the input field that renders labels, help text, and error messages around the input |


## InputField.Label

The Label sub-component wraps the InputField and provides a label for it.
It can also display additional text, such as help messages or error messages, alongside the input.
As we move toward using inner labels, this outer Label will mainly be used for help text and errors.
Because it renders as an HTML <label> element, clicking the label will focus the input.

The Label's API is given below.

| Prop        | Type                    | Description                                                      |
| ----------- | ----------------------- | ---------------------------------------------------------------- |
|  label?     |  string                 | The primary label, title, or "name" of the wrapped input element |
|  helpText?  |  string                 | A string of help text to be displayed below the input            |
|  errors?    |  { message: string }[]  | An array of error messages to be displayed below the input.      |

Also note that some examples uses 'InputText.Label' rather than 'InputField.Label'. All of the sub-components and
slots available on the 'InputField' are also available on the simple inputs, unless otherwise mentioned.

\`\`\`
        `,
      },
    },
  },
  args: {
    invalid: false,
    disabled: false,
    prefix: "",
    suffix: "",
    label: "Input Label",
    labelPosition: "top",
    required: false,
  },
  argTypes: {
    labelPosition: {
      options: ["top", "side"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "top" },
      },
    },
    required: {
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: { name: "InputField" },
};

export const PlainHTMLFormExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: function Render() {
    const [{ invalid }, updateArgs] = useArgs<IInputFieldProps>();

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <Flex column gap={Gap.m}>
          <BodyLarge style={{ maxWidth: "720px" }}>
            The input-field module also includes higher-level components with
            simpler, purpose-built APIs for common UI patterns. These components
            are lightweight alternatives to the base InputField when you don’t
            need the full control of a native HTML input. They’re especially
            useful outside traditional forms, such as when managing local state
            with useState and you don’t want to handle DOM events directly.
            Their main goal is to provide a simple, value-focused API —
            essentially “string in, string out” — so you don’t have to work with
            raw HTML event objects. They follow the API described below and
            support the same optional properties mentioned earlier.
          </BodyLarge>
          <InputField
            label="Country code"
            type="text"
            placeholder="Enter a country code..."
            id="country_code"
            name="country_code"
            pattern="[A-Za-z]{3}"
            onInvalid={() => updateArgs({ invalid: true })}
            invalid={invalid}
            onChange={() => updateArgs({ invalid: false })}
            title="Three letter country code"
            required
          />
          <Button type="submit" primary>
            Submit
          </Button>
        </Flex>
      </form>
    );
  },
};

export const ReactFormHookExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: function Render() {
    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm<ReactFormHookExampleData>();
    const onSubmit = (data: ReactFormHookExampleData): void => {
      alert(JSON.stringify(data));
    };

    return (
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
      >
        <Flex column gap={Gap.m}>
          <BodyLarge style={{ maxWidth: "720px" }}>
            Because InputField is a drop-in replacement for a standard HTML
            input, it works smoothly with common state management and form
            libraries. For example, the implementation below shows how it can be
            used with react-hook-form to handle form state and validation. You
            can try the sample to see how the integration works in practice.
          </BodyLarge>
          <InputField
            label="First name"
            invalid={isDefined(errors.firstName)}
            required
            {...register("firstName", { required: true, maxLength: 20 })}
          />
          <InputField
            label="Last name"
            invalid={isDefined(errors.lastName)}
            {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
          />
          <InputField
            label="Age"
            type="number"
            invalid={isDefined(errors.age)}
            {...register("age", { min: 18, max: 99 })}
          />
          <Button primary type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    );
  },
};

export const SimpleInputExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: function Render() {
    const [state, setState] = useState({
      firstName: "",
      lastName: "",
      age: 18,
    });

    const onChange = (change: object) =>
      setState({
        ...state,
        ...change,
      });

    return (
      <Flex column gap={Gap.m}>
        <BodyLarge style={{ maxWidth: "720px" }}>
          The input-field module also provides higher-level components with
          simplified APIs for common UI patterns. These components are
          lightweight alternatives to the base InputField when you don’t need
          the full flexibility of a native HTML input, or when you’re working
          outside a form and only managing local state (for example, with
          useState). They are designed around a simple, value-focused API —
          essentially “string in, string out” — so you don’t have to handle
          low-level HTML events. They follow the API described below and support
          the same optional properties mentioned earlier.
        </BodyLarge>
        <InputText
          label="First name"
          value={state.firstName}
          onChange={(firstName) => onChange({ firstName })}
        />
        <InputText
          label="Last name"
          value={state.lastName}
          onChange={(lastName) => onChange({ lastName })}
        />
        <InputNumber
          label="Age"
          value={state.age}
          onChange={(age) => onChange({ age })}
          required
        />
      </Flex>
    );
  },
};

export const IconExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    return (
      <Flex column gap={Gap.m}>
        <BodyLarge style={{ maxWidth: "720px" }}>
          The Icon slot provides a standard way to display a small graphic
          (about 20×20 px) next to the input. It appears to the right of the
          suffix and just before any control elements. In the examples below,
          the icon shows a folder graphic, and the prefix is a 🍺 emoji.
        </BodyLarge>
        <InputField label="Search" type="text" prefix="🍺">
          <InputField.Icon>
            <IconMinor.FolderOpen title="Icons render before the input" />
          </InputField.Icon>
        </InputField>
      </Flex>
    );
  },
};

export const ControlsExample: Story = {
  render: function Render() {
    const [likes, setLikes] = useState(0);

    const onLike = () => setLikes(likes + 1);
    const onDislike = () => setLikes(Math.max(likes - 1, 0));
    return (
      <Flex column gap={Gap.m}>
        <BodyLarge style={{ maxWidth: "720px" }}>
          The Controls slot lets you place a small interactive element to the
          right of the suffix. It’s commonly used for things like numeric
          steppers or a “clear” button (for example, an icon that clears the
          field when clicked). While you can pass any valid React node, it’s
          mainly intended for clickable controls. In the example below, the
          suffix is a 🍺 emoji. Notice that it aligns with the input and prefix
          on the left side, not with the controls on the right.
        </BodyLarge>
        <InputField
          label="Do you like this storybook?"
          value={likes}
          onChange={() => undefined}
          type="number"
        >
          <InputField.Controls>
            <SpaceBetween style={{ width: Padding.xll }}>
              <div onClick={onLike}>️👍</div>
              <div>/</div>
              <div onClick={onDislike}>👎️</div>
            </SpaceBetween>
          </InputField.Controls>
        </InputField>
      </Flex>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

export const OuterLabelExample: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>("");
    const [errors, setErrors] = useState<{ message: string }[]>([]);

    const handleChange = (change: string) => {
      const errors: { message: string }[] = [];

      if (!change) {
        errors.push({ message: "This field is required" });
      }

      if (!change.match(/[A-Za-z]{3}/)) {
        errors.push({ message: "Input was not a 3 letter country code" });
      }

      setValue(change);
      setErrors(errors);
    };
    return (
      <Flex column gap={Gap.m} style={{ maxWidth: "720px" }}>
        <BodyLarge>
          The Label sub-component wraps the InputField and renders the
          corresponding HTML label element. In addition to providing an
          accessible label, it also displays supporting text such as help
          messages and validation errors. As we move to an inner-labeling
          approach, the outer Label is now mainly used for help and error text
          rather than the primary label itself. Because it renders a native
          label, clicking anywhere within it — including the help or error text
          — will focus the associated input.
        </BodyLarge>
        <BodyLarge>
          The example below shows how to use InputText.Label instead of
          InputField.Label. All sub-components and slots available on InputField
          are also available on the simplified input components, unless noted
          otherwise.
        </BodyLarge>
        <InputText.Label
          label="Country Code"
          helpText="Please enter a 3 letter country code"
          errors={errors}
        >
          <InputText
            value={value}
            name="country_code"
            invalid={errors.length > 0}
            placeholder="e.g. AUD"
            onChange={handleChange}
          />
        </InputText.Label>
      </Flex>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

export const StepperExample: Story = {
  render: function Render() {
    const [age, setAge] = useState<number>(0);
    const onUp = () => setAge((prevAge) => Math.min(prevAge + 1, 99));
    const onDown = () => setAge((prevAge) => Math.max(prevAge - 1, 0));
    const errors = [];

    if (0 > age || age > 100) {
      errors.push({ message: "Please choose an age between 0 and 99" });
    }
    return (
      <Flex column gap={Gap.m}>
        <BodyLarge style={{ maxWidth: "720px" }}>
          This utility is provided as a sub-component of the InputNumber simple
          input, but it can be used with any input component, as shown in the
          example below.
        </BodyLarge>
        <form onSubmit={(e) => e.preventDefault()}>
          <InputNumber.Label
            helpText="Age should be a number between 0 and 99"
            errors={errors}
          >
            <InputNumber
              label="Age"
              name="age"
              onChange={(age) => age && setAge(age)}
              value={age}
              invalid={errors.length > 0}
              placeholder="Enter your age..."
            >
              <InputNumber.Controls>
                <InputNumber.Stepper onUpClick={onUp} onDownClick={onDown} />
              </InputNumber.Controls>
            </InputNumber>
          </InputNumber.Label>
          <Button type="submit" primary>
            Submit
          </Button>
        </form>
      </Flex>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

export const FullyDressedExample: Story = {
  render: function Render() {
    return (
      <Flex column gap={Gap.m}>
        <BodyLarge>
          Here is an example of an input with everything! Never actually do
          this...
        </BodyLarge>
        <InputField.Label
          label="Price"
          helpText="Enter a price in AUD"
          errors={[{ message: "Too many UI decorations!" }]}
        >
          <InputField
            type="number"
            label="Price"
            prefix="$"
            suffix="AUD"
            step={0.01}
            min={0.0}
            placeholder="Enter an amount..."
          >
            <InputField.Icon>
              <IconMinor.CircleDollar title="Icons render before the input" />
            </InputField.Icon>
            <InputField.Controls>
              <IconMinor.FolderOpen title="Controls render after the input" />
            </InputField.Controls>
          </InputField>
        </InputField.Label>
      </Flex>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};
